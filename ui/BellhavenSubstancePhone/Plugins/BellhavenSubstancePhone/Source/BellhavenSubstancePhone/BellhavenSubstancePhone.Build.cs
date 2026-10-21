using UnrealBuildTool;

public class BellhavenSubstancePhone : ModuleRules
{
    public BellhavenSubstancePhone(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
        PublicDependencyModuleNames.AddRange(new string[] {
            "Core", "CoreUObject", "Engine", "UMG", "WebBrowserWidget"
        });
        PrivateDependencyModuleNames.AddRange(new string[] {
            "Slate", "SlateCore", "Json"
        });
    }
}
