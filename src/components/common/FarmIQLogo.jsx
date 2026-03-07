/**
 * FarmIQ Logo — Original Gold Identity
 * Uses the actual brand logo images (brain-wheat, gold #FFD700)
 * Variants: "light" (white bg), "green" (dark green bg), "icon" (app icon only)
 */
export default function FarmIQLogo({ variant = "green", size = "md", className = "" }) {
    const sizes = {
        sm: { height: 32 },
        md: { height: 44 },
        lg: { height: 64 },
        xl: { height: 100 },
    };
    const s = sizes[size] || sizes.md;

    // Pick the right logo file based on variant
    const src = variant === "green"
        ? "/logos/farmiq-logo-green.png"
        : variant === "icon"
            ? "/logos/farmiq-appicon.png"
            : "/logos/farmiq-logo-light.png";

    return (
        <img
            src={src}
            alt="FarmIQ — किसान की आवाज़"
            className={className}
            style={{
                height: s.height,
                width: "auto",
                objectFit: "contain",
                display: "block",
            }}
            draggable={false}
        />
    );
}
