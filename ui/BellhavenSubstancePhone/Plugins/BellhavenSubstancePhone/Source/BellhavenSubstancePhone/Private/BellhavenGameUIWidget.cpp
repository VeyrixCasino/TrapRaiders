#include "BellhavenGameUIWidget.h"
#include "BellhavenGameUIHtml.h"
#include "Blueprint/WidgetTree.h"
#include "WebBrowser.h"
#include "Dom/JsonObject.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"
#include "GenericPlatform/GenericPlatformHttp.h"

TSharedRef<SWidget> UBellhavenGameUIWidget::RebuildWidget()
{
    if (WidgetTree && !WidgetTree->RootWidget)
    {
        Browser = WidgetTree->ConstructWidget<UWebBrowser>(UWebBrowser::StaticClass(), TEXT("BellhavenGameBrowser"));
        WidgetTree->RootWidget = Browser;
    }
    return Super::RebuildWidget();
}

void UBellhavenGameUIWidget::NativeConstruct()
{
    Super::NativeConstruct();
    if (Browser)
    {
        Browser->OnUrlChanged.AddDynamic(this, &UBellhavenGameUIWidget::HandleUrlChanged);
    }
    ReloadPage();
}

void UBellhavenGameUIWidget::NativeDestruct()
{
    if (Browser)
    {
        Browser->OnUrlChanged.RemoveDynamic(this, &UBellhavenGameUIWidget::HandleUrlChanged);
    }
    Super::NativeDestruct();
}

void UBellhavenGameUIWidget::ReloadPage()
{
    if (!Browser) return;
    FString Html = FString(BellhavenGameUIHtml::GetHtml());
    FString Prefix(TEXT("<script>window.__BellhavenUnrealMode=true;</script>"));
    if (!PendingStateJson.IsEmpty())
    {
        FString SafeJson = PendingStateJson;
        // Escape HTML-sensitive characters in JSON inserted into the script element.
        SafeJson.ReplaceInline(TEXT("<"), TEXT("\\u003c"), ESearchCase::CaseSensitive);
        SafeJson.ReplaceInline(TEXT(">"), TEXT("\\u003e"), ESearchCase::CaseSensitive);
        SafeJson.ReplaceInline(TEXT("&"), TEXT("\\u0026"), ESearchCase::CaseSensitive);
        Prefix += FString::Printf(TEXT("<script>window.__BellhavenBootState=%s;</script>"), *SafeJson);
    }
    const FString Target(TEXT("<script>window.BellhavenDrugProfiles="));
    Html.ReplaceInline(*Target, *(Prefix + Target), ESearchCase::CaseSensitive);
    Browser->LoadString(MoveTemp(Html), TEXT("http://bellhaven.local/"));
}

bool UBellhavenGameUIWidget::SetStateJson(const FString& StateJson)
{
    TSharedPtr<FJsonObject> Parsed;
    const TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(StateJson);
    if (!FJsonSerializer::Deserialize(Reader, Parsed) || !Parsed.IsValid()
        || !Parsed->HasTypedField<EJson::Array>(TEXT("stacks"))
        || !Parsed->HasTypedField<EJson::Array>(TEXT("equipped"))
        || !Parsed->HasTypedField<EJson::Array>(TEXT("clients")))
    {
        UE_LOG(LogTemp, Warning, TEXT("Bellhaven: expected {stacks:[], equipped:[], clients:[]} JSON."));
        return false;
    }
    PendingStateJson = StateJson;
    ReloadPage();
    return true;
}

void UBellhavenGameUIWidget::OpenPage(const FString& Page)
{
    if (Page != TEXT("inventory") && Page != TEXT("dealer") && Page != TEXT("clients") && Page != TEXT("lab")) return;
    if (Browser) Browser->ExecuteJavascript(FString::Printf(TEXT("window.BellhavenUI && window.BellhavenUI.setPage('%s');"), *Page));
}

void UBellhavenGameUIWidget::OpenSubstancePhone()
{
    if (Browser) Browser->ExecuteJavascript(TEXT("window.BellhavenUI && window.BellhavenUI.openPhone();"));
}

void UBellhavenGameUIWidget::HandleUrlChanged(const FText& NewUrl)
{
    const FString Url = NewUrl.ToString();
    const FString Prefix(TEXT("#bhintent="));
    const int32 Start = Url.Find(Prefix, ESearchCase::CaseSensitive);
    if (Start == INDEX_NONE) return;
    const FString EventJson = FGenericPlatformHttp::UrlDecode(Url.Mid(Start + Prefix.Len()));
    TSharedPtr<FJsonObject> Event;
    const TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(EventJson);
    if (!FJsonSerializer::Deserialize(Reader, Event) || !Event.IsValid()) return;
    FString Type;
    if (!Event->TryGetStringField(TEXT("type"), Type)) return;
    if (Type == TEXT("completeTrade") || Type == TEXT("inspectItem"))
    {
        OnUIAction.Broadcast(EventJson);
    }
}
