/**
 * FarmIQ Logo — The Modern Wordmark
 * Matching reference: overlapping gradient leaves + bold orange arrow
 */
export default function FarmIQLogo({ variant = "white", size = "md", showTagline = true }) {
    const sizes = {
        sm: { icon: 32, text: 18, tagline: 9, gap: 6 },
        md: { icon: 40, text: 24, tagline: 11, gap: 8 },
        lg: { icon: 56, text: 32, tagline: 14, gap: 10 },
        xl: { icon: 80, text: 48, tagline: 18, gap: 12 },
    };
    const s = sizes[size] || sizes.md;
    const isGreen = variant === "green";
    const textColor = isGreen ? "#FFFFFF" : "#1B5E3B";
    const iqColor = "#FF9933";
    const taglineColor = isGreen ? "rgba(255,255,255,0.8)" : "#FF9933";

    return (
        <div style={{ display: "flex", alignItems: "center", gap: s.gap }}>
            {/* Wheat + Arrow Icon */}
            <WheatIcon size={s.icon} />
            {/* Text */}
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: s.text,
                        fontWeight: 700,
                        color: textColor,
                        letterSpacing: "-0.02em",
                    }}>
                        Farm
                    </span>
                    <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: s.text,
                        fontWeight: 800,
                        color: iqColor,
                        letterSpacing: "-0.02em",
                    }}>
                        IQ
                    </span>
                </div>
                {showTagline && (
                    <span style={{
                        fontFamily: "var(--font-hindi)",
                        fontSize: s.tagline,
                        color: taglineColor,
                        marginTop: 2,
                        fontWeight: 500,
                    }}>
                        किसान की आवाज़
                    </span>
                )}
            </div>
        </div>
    );
}

/** The wheat stalk icon with gradient leaves and orange arrow */
function WheatIcon({ size = 40 }) {
    const id = `wheat-grad-${Math.random().toString(36).slice(2, 6)}`;
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2E7D32" />
                    <stop offset="50%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#FF9933" />
                </linearGradient>
                <linearGradient id={`${id}-stem`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2E7D32" />
                    <stop offset="100%" stopColor="#1B5E3B" />
                </linearGradient>
            </defs>

            {/* Central stem */}
            <path d="M50 92 L50 35" stroke={`url(#${id}-stem)`} strokeWidth="3" strokeLinecap="round" />

            {/* === Leaf pairs — 6 leaves, alternating left/right, overlapping === */}

            {/* Bottom pair — largest */}
            <path d="M50 78 C42 76 30 70 28 62 C34 62 46 68 50 78Z" fill={`url(#${id}-leaf)`} opacity="0.85" />
            <path d="M50 78 C58 76 70 70 72 62 C66 62 54 68 50 78Z" fill={`url(#${id}-leaf)`} opacity="0.85" />

            {/* Middle-bottom pair */}
            <path d="M50 68 C41 66 28 58 26 50 C33 50 45 57 50 68Z" fill={`url(#${id}-leaf)`} opacity="0.9" />
            <path d="M50 68 C59 66 72 58 74 50 C67 50 55 57 50 68Z" fill={`url(#${id}-leaf)`} opacity="0.9" />

            {/* Middle pair */}
            <path d="M50 58 C42 56 30 48 28 40 C35 40 46 48 50 58Z" fill={`url(#${id}-leaf)`} opacity="0.92" />
            <path d="M50 58 C58 56 70 48 72 40 C65 40 54 48 50 58Z" fill={`url(#${id}-leaf)`} opacity="0.92" />

            {/* Upper pair */}
            <path d="M50 48 C43 46 33 40 32 33 C38 33 47 40 50 48Z" fill={`url(#${id}-leaf)`} opacity="0.95" />
            <path d="M50 48 C57 46 67 40 68 33 C62 33 53 40 50 48Z" fill={`url(#${id}-leaf)`} opacity="0.95" />

            {/* Top pair — smallest */}
            <path d="M50 40 C45 38 38 33 37 28 C42 28 48 34 50 40Z" fill={`url(#${id}-leaf)`} />
            <path d="M50 40 C55 38 62 33 63 28 C58 28 52 34 50 40Z" fill={`url(#${id}-leaf)`} />

            {/* Topmost single leaf / bud */}
            <path d="M50 35 C47 30 46 24 48 18 C52 22 53 30 50 35Z" fill="#2E7D32" />
            <path d="M50 35 C53 30 54 24 52 18 C48 22 47 30 50 35Z" fill="#2E7D32" />

            {/* === Bold orange upward arrow === */}
            <line x1="58" y1="38" x2="76" y2="16" stroke="#FF9933" strokeWidth="5" strokeLinecap="round" />
            <path d="M69 10 L79 12 L73 22" fill="none" stroke="#FF9933" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/** Standalone app icon for PWA / favicon */
export function FarmIQAppIcon({ size = 120 }) {
    const id = "app-icon";
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="120" rx="26" fill="#1B5E3B" />
            <defs>
                <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4CAF50" />
                    <stop offset="60%" stopColor="#81C784" />
                    <stop offset="100%" stopColor="#FF9933" />
                </linearGradient>
            </defs>

            {/* Stem */}
            <path d="M55 100 L55 45" stroke="#66BB6A" strokeWidth="3" strokeLinecap="round" />

            {/* Leaves */}
            <path d="M55 88 C47 86 35 80 33 72 C39 72 51 78 55 88Z" fill={`url(#${id}-leaf)`} opacity="0.85" />
            <path d="M55 88 C63 86 75 80 77 72 C71 72 59 78 55 88Z" fill={`url(#${id}-leaf)`} opacity="0.85" />
            <path d="M55 76 C46 74 33 66 31 58 C38 58 50 65 55 76Z" fill={`url(#${id}-leaf)`} opacity="0.9" />
            <path d="M55 76 C64 74 77 66 79 58 C72 58 60 65 55 76Z" fill={`url(#${id}-leaf)`} opacity="0.9" />
            <path d="M55 64 C47 62 36 55 35 48 C41 48 51 55 55 64Z" fill={`url(#${id}-leaf)`} opacity="0.95" />
            <path d="M55 64 C63 62 74 55 75 48 C69 48 59 55 55 64Z" fill={`url(#${id}-leaf)`} opacity="0.95" />
            <path d="M55 54 C49 52 41 46 40 40 C45 40 52 46 55 54Z" fill={`url(#${id}-leaf)`} />
            <path d="M55 54 C61 52 69 46 70 40 C65 40 58 46 55 54Z" fill={`url(#${id}-leaf)`} />

            {/* Top bud */}
            <path d="M55 45 C52 39 51 32 53 26 C57 31 58 39 55 45Z" fill="#66BB6A" />
            <path d="M55 45 C58 39 59 32 57 26 C53 31 52 39 55 45Z" fill="#66BB6A" />

            {/* Arrow */}
            <line x1="64" y1="46" x2="84" y2="22" stroke="#FF9933" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M77 16 L87 18 L81 28" fill="none" stroke="#FF9933" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
