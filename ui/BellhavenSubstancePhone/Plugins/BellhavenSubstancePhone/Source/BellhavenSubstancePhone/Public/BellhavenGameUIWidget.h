#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "BellhavenGameUIWidget.generated.h"

class UWebBrowser;

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FBellhavenOnUIAction, const FString&, EventJson);

/**
 * Desktop UE5 offline HTML prototype embedded in a standard UWebBrowser widget.
 * Events use a same-document URL fragment change, handled by OnUrlChanged.
 * Validate trading and inventory changes on the authoritative game server.
 */
UCLASS(BlueprintType, Blueprintable)
class BELLHAVENSUBSTANCEPHONE_API UBellhavenGameUIWidget : public UUserWidget
{
    GENERATED_BODY()
public:
    UPROPERTY(BlueprintAssignable, Category="Bellhaven|UI")
    FBellhavenOnUIAction OnUIAction;

    /** Pass character-visible data only. Hidden drug composition/tolerance must stay server-side. */
    UFUNCTION(BlueprintCallable, Category="Bellhaven|UI")
    bool SetStateJson(const FString& StateJson);

    /** inventory / dealer / clients / lab. Lab is developer-only. */
    UFUNCTION(BlueprintCallable, Category="Bellhaven|UI")
    void OpenPage(const FString& Page);

    UFUNCTION(BlueprintCallable, Category="Bellhaven|UI")
    void OpenSubstancePhone();

protected:
    virtual TSharedRef<SWidget> RebuildWidget() override;
    virtual void NativeConstruct() override;
    virtual void NativeDestruct() override;

private:
    UPROPERTY(Transient)
    TObjectPtr<UWebBrowser> Browser;

    FString PendingStateJson;

    void ReloadPage();

    UFUNCTION()
    void HandleUrlChanged(const FText& NewUrl);
};
