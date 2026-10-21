#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "BellhavenSubstancePhoneWidget.generated.h"

class UWebBrowser;

/** One record known by the in-game player, not necessarily its hidden server-side composition. */
USTRUCT(BlueprintType)
struct BELLHAVENSUBSTANCEPHONE_API FBellhavenSubstancePhoneEntry
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Identity")
    FString Id;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Identity")
    FString Name;

    /** Opioids, Benzodiazepines, Stimulants, or Dissociatives. */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Identity")
    FString DrugClass;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Identity")
    bool bVerified = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Identity")
    FString ClaimedAs;

    /** Fictional game descriptor; not a real-world dose conversion. */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Knowledge")
    FString Potency;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Knowledge")
    FString Reference;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Knowledge")
    FString Description;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Knowledge")
    FString Onset;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Knowledge")
    FString Effects;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Knowledge")
    FString Risks;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Knowledge")
    FString Composition;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Knowledge")
    FString Knowledge;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Bellhaven|Knowledge")
    TArray<FString> Routes;
};

/**
 * UMG-compatible screen for embedding in an existing in-game smartphone.
 * Uses UE's optional WebBrowser plugin and an embedded, offline HTML UI.
 * Desktop UE5 target; WebBrowser runtime/platform support varies by target platform.
 */
UCLASS(BlueprintType, Blueprintable)
class BELLHAVENSUBSTANCEPHONE_API UBellhavenSubstancePhoneWidget : public UUserWidget
{
    GENERATED_BODY()

public:
    /** Replaces the demonstration records with this character's KNOWN information. */
    UFUNCTION(BlueprintCallable, Category="Bellhaven|Phone")
    void SetCatalogEntries(const TArray<FBellhavenSubstancePhoneEntry>& Entries);

    /** Accepts a JSON array using the same field names as the preview's setCatalog method. */
    UFUNCTION(BlueprintCallable, Category="Bellhaven|Phone")
    bool SetCatalogJson(const FString& JsonArray);

    /** All Classes, Opioids, Benzodiazepines, Stimulants, Dissociatives. */
    UFUNCTION(BlueprintCallable, Category="Bellhaven|Phone")
    void SelectClass(const FString& ClassName);

protected:
    virtual TSharedRef<SWidget> RebuildWidget() override;
    virtual void NativeConstruct() override;

private:
    UPROPERTY(Transient)
    TObjectPtr<UWebBrowser> Browser;

    FString PendingCatalogJson;
    FString PendingClass = TEXT("All Classes");

    /** Rebuild local page with bootstrapped, validated character knowledge. */
    void ReloadPage();
};
