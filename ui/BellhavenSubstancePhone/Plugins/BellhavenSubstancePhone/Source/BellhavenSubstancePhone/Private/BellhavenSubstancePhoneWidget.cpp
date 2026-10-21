#include "BellhavenSubstancePhoneWidget.h"
#include "BellhavenSubstancePhoneHtml.h"
#include "Blueprint/WidgetTree.h"
#include "WebBrowser.h"
#include "Dom/JsonObject.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"
#include "Policies/CondensedJsonPrintPolicy.h"

TSharedRef<SWidget> UBellhavenSubstancePhoneWidget::RebuildWidget()
{
    if (WidgetTree && !WidgetTree->RootWidget)
    {
        Browser = WidgetTree->ConstructWidget<UWebBrowser>(UWebBrowser::StaticClass(), TEXT("SubstancePhoneBrowser"));
        WidgetTree->RootWidget = Browser;
    }
    return Super::RebuildWidget();
}

void UBellhavenSubstancePhoneWidget::NativeConstruct()
{
    Super::NativeConstruct();
    ReloadPage();
}

void UBellhavenSubstancePhoneWidget::ReloadPage()
{
    if (!Browser)
    {
        return;
    }

    FString Html = FString(BellhavenSubstancePhoneHTML::GetHtml());
    FString SafeCatalog = PendingCatalogJson;
    // JSON belongs inside an HTML script tag. Escape markup-sensitive codepoints.
    SafeCatalog.ReplaceInline(TEXT("<"), TEXT("\\u003c"), ESearchCase::CaseSensitive);
    SafeCatalog.ReplaceInline(TEXT(">"), TEXT("\\u003e"), ESearchCase::CaseSensitive);
    SafeCatalog.ReplaceInline(TEXT("&"), TEXT("\\u0026"), ESearchCase::CaseSensitive);

    FString EncodedClass;
    TSharedRef<TJsonWriter<TCHAR, TCondensedJsonPrintPolicy<TCHAR>>> Writer = TJsonWriterFactory<TCHAR, TCondensedJsonPrintPolicy<TCHAR>>::Create(&EncodedClass);
    Writer->WriteValue(PendingClass);
    Writer->Close();

    FString Bootstrap = FString::Printf(
        TEXT("<script>window.__BellhavenPhoneBootCatalog=%s;window.__BellhavenPhoneBootClass=%s;</script>"),
        SafeCatalog.IsEmpty() ? TEXT("null") : *SafeCatalog,
        *EncodedClass
    );
    Html.ReplaceInline(TEXT("<!-- BELLHAVEN_BOOTSTRAP -->"), *Bootstrap, ESearchCase::CaseSensitive);
    Browser->LoadString(MoveTemp(Html), TEXT("http://bellhaven.phone.local/"));
}

bool UBellhavenSubstancePhoneWidget::SetCatalogJson(const FString& JsonArray)
{
    // Validate before interpolating into JS. Trusted game data only.
    TArray<TSharedPtr<FJsonValue>> Items;
    TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(JsonArray);
    if (!FJsonSerializer::Deserialize(Reader, Items))
    {
        UE_LOG(LogTemp, Warning, TEXT("BellhavenSubstancePhone: Expected a JSON array of substance records."));
        return false;
    }

    PendingCatalogJson = JsonArray;
    ReloadPage();
    return true;
}

void UBellhavenSubstancePhoneWidget::SetCatalogEntries(const TArray<FBellhavenSubstancePhoneEntry>& Entries)
{
    TArray<TSharedPtr<FJsonValue>> Array;
    Array.Reserve(Entries.Num());
    for (const FBellhavenSubstancePhoneEntry& Entry : Entries)
    {
        TSharedPtr<FJsonObject> Object = MakeShared<FJsonObject>();
        Object->SetStringField(TEXT("id"), Entry.Id);
        Object->SetStringField(TEXT("name"), Entry.Name);
        Object->SetStringField(TEXT("drugClass"), Entry.DrugClass);
        Object->SetBoolField(TEXT("verified"), Entry.bVerified);
        Object->SetStringField(TEXT("claimedAs"), Entry.ClaimedAs);
        Object->SetStringField(TEXT("potency"), Entry.Potency);
        Object->SetStringField(TEXT("reference"), Entry.Reference);
        Object->SetStringField(TEXT("description"), Entry.Description);
        Object->SetStringField(TEXT("onset"), Entry.Onset);
        Object->SetStringField(TEXT("effects"), Entry.Effects);
        Object->SetStringField(TEXT("risks"), Entry.Risks);
        Object->SetStringField(TEXT("composition"), Entry.Composition);
        Object->SetStringField(TEXT("knowledge"), Entry.Knowledge);

        TArray<TSharedPtr<FJsonValue>> Routes;
        for (const FString& Route : Entry.Routes)
        {
            Routes.Add(MakeShared<FJsonValueString>(Route));
        }
        Object->SetArrayField(TEXT("routes"), Routes);
        Array.Add(MakeShared<FJsonValueObject>(Object));
    }
    FString Json;
    const TSharedRef<TJsonWriter<>> Writer = TJsonWriterFactory<>::Create(&Json);
    FJsonSerializer::Serialize(Array, Writer);
    SetCatalogJson(Json);
}

void UBellhavenSubstancePhoneWidget::SelectClass(const FString& ClassName)
{
    PendingClass = ClassName;
    ReloadPage();
}
