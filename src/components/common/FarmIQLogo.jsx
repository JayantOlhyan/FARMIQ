/**
 * FarmIQ Logo — The Modern Wordmark
 * Wheat stalk with orange arrow + "FarmIQ" + "किसान की आवाज़"
 */
export default function FarmIQLogo({ variant = "white", size = "md", showTagline = true }) {
    const sizes = {
        sm: { icon: 28, text: 16, tagline: 8 },
        md: { icon: 36, text: 22, tagline: 10 },
        lg: { icon: 52, text: 32, tagline: 14 },
        xl: { icon: 72, text: 44, tagline: 18 },
    };
    const s = sizes[size] || sizes.md;
    const isGreen = variant === "green";
    const textColor = isGreen ? "#FFFFFF" : "#1B5E3B";
    const iqColor = "#FF9933";
    const taglineColor = isGreen ? "rgba(255,255,255,0.8)" : "#FF9933";

    return (
        <div className="flex items-center gap-2">
            {/* Wheat + Arrow Icon */}
            <svg width={s.icon} height={s.icon} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Wheat stalk */}
                <path d="M30 70 L30 30" stroke="#1B5E3B" strokeWidth="3" strokeLinecap="round" />
                {/* Wheat grains - left */}
                <ellipse cx="22" cy="28" rx="6" ry="10" fill="#FF9933" transform="rotate(-20 22 28)" />
                <ellipse cx="20" cy="42" rx="5" ry="9" fill="#FF9933" transform="rotate(-15 20 42)" />
                <ellipse cx="22" cy="55" rx="4" ry="8" fill="#FF9933" transform="rotate(-10 22 55)" />
                {/* Wheat grains - right */}
                <ellipse cx="38" cy="28" rx="6" ry="10" fill="#FF9933" transform="rotate(20 38 28)" />
                <ellipse cx="40" cy="42" rx="5" ry="9" fill="#FF9933" transform="rotate(15 40 42)" />
                <ellipse cx="38" cy="55" rx="4" ry="8" fill="#FF9933" transform="rotate(10 38 55)" />
                {/* Top leaf / sprout */}
                <path d="M30 25 Q35 15 42 12 Q36 20 30 25Z" fill="#1B5E3B" />
                <path d="M30 25 Q25 15 18 12 Q24 20 30 25Z" fill="#1B5E3B" />
                {/* Orange arrow going up-right */}
                <path d="M42 30 L58 14" stroke="#FF9933" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M50 12 L60 12 L60 22" stroke="#FF9933" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Text */}
            <div className="flex flex-col leading-none">
                <div className="flex items-baseline">
                    <span style={{ fontFamily: "var(--font-english)", fontSize: s.text, fontWeight: 700, color: textColor, letterSpacing: "-0.5px" }}>
                        Farm
                    </span>
                    <span style={{ fontFamily: "var(--font-english)", fontSize: s.text, fontWeight: 800, color: iqColor, letterSpacing: "-0.5px" }}>
                        IQ
                    </span>
                </div>
                {showTagline && (
                    <span style={{ fontFamily: "var(--font-hindi)", fontSize: s.tagline, color: taglineColor, marginTop: 1 }}>
                        किसान की आवाज़
                    </span>
                )}
            </div>
        </div>
    );
}

/** Standalone app icon (for favicon/PWA) */
export function FarmIQAppIcon({ size = 64 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="120" rx="24" fill="#1B5E3B" />
            {/* Wheat stalk */}
            <path d="M50 95 L50 45" stroke="#F9A825" strokeWidth="3" strokeLinecap="round" />
            {/* Grains left */}
            <ellipse cx="41" cy="43" rx="7" ry="11" fill="#FF9933" transform="rotate(-20 41 43)" />
            <ellipse cx="39" cy="58" rx="6" ry="10" fill="#FF9933" transform="rotate(-15 39 58)" />
            <ellipse cx="41" cy="72" rx="5" ry="9" fill="#FF9933" transform="rotate(-10 41 72)" />
            {/* Grains right */}
            <ellipse cx="59" cy="43" rx="7" ry="11" fill="#FF9933" transform="rotate(20 59 43)" />
            <ellipse cx="61" cy="58" rx="6" ry="10" fill="#FF9933" transform="rotate(15 61 58)" />
            <ellipse cx="59" cy="72" rx="5" ry="9" fill="#FF9933" transform="rotate(10 59 72)" />
            {/* Top leaves */}
            <path d="M50 38 Q56 27 64 23 Q57 33 50 38Z" fill="#2E7D32" />
            <path d="M50 38 Q44 27 36 23 Q43 33 50 38Z" fill="#2E7D32" />
            {/* Arrow */}
            <path d="M62 45 L80 27" stroke="#FF9933" strokeWidth="4" strokeLinecap="round" />
            <path d="M72 24 L82 24 L82 34" stroke="#FF9933" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
