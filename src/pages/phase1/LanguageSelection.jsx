import { useState } from "react";
import { motion } from "framer-motion";
import FarmIQLogo from "../../components/common/FarmIQLogo";

/**
 * Sprint 1, Fix #4 — Language Selection Screen
 * Full screen dark green, 10 Hindi/regional language pills.
 * Saves selection to localStorage under 'farmiq_lang'.
 */

const languages = [
    { code: "hi", label: "हिंदी", flag: "🇮🇳" },
    { code: "pa", label: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "bn", label: "বাংলা", flag: "🇮🇳" },
    { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
    { code: "te", label: "తెలుగు", flag: "🇮🇳" },
    { code: "mr", label: "मराठी", flag: "🇮🇳" },
    { code: "gu", label: "ગુજરાતી", flag: "🇮🇳" },
    { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "ml", label: "മലയാളം", flag: "🇮🇳" },
    { code: "or", label: "ଓଡ଼ିଆ", flag: "🇮🇳" },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };

export default function LanguageSelection({ onSelect }) {
    const [selected, setSelected] = useState("hi");

    const handleContinue = () => {
        localStorage.setItem("farmiq_lang", selected);
        onSelect(selected);
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-6 py-10"
            style={{ background: "linear-gradient(180deg, #14472D 0%, #1B5E3B 50%, #2E7D32 100%)" }}
        >
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
            >
                <FarmIQLogo variant="green" size="lg" />
            </motion.div>

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[22px] font-bold text-white mb-2 text-center"
                style={{ fontFamily: "var(--font-hindi)" }}
            >
                अपनी भाषा चुनें
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.3 }}
                className="text-[14px] text-white/70 mb-8 text-center"
                style={{ fontFamily: "var(--font-english)" }}
            >
                Choose your language
            </motion.p>

            {/* Language Pills */}
            <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-3 max-w-[380px] mb-10"
            >
                {languages.map((lang) => (
                    <motion.button
                        key={lang.code}
                        variants={fadeUp}
                        onClick={() => setSelected(lang.code)}
                        className="border-0 cursor-pointer active:scale-95 transition-all"
                        style={{
                            padding: "12px 22px",
                            borderRadius: "50px",
                            fontSize: "15px",
                            fontWeight: 600,
                            fontFamily: "var(--font-hindi)",
                            minHeight: "48px",
                            background: selected === lang.code
                                ? "linear-gradient(135deg, #FFD700 0%, #FFA000 100%)"
                                : "rgba(255,255,255,0.12)",
                            color: selected === lang.code ? "#14472D" : "white",
                            border: selected === lang.code
                                ? "2px solid #FFD700"
                                : "2px solid rgba(255,255,255,0.15)",
                            boxShadow: selected === lang.code
                                ? "0 4px 16px rgba(255,215,0,0.3)"
                                : "none",
                        }}
                    >
                        {lang.flag} {lang.label}
                    </motion.button>
                ))}
            </motion.div>

            {/* Continue Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={handleContinue}
                className="w-full max-w-[320px] h-[56px] rounded-[16px] text-[17px] font-bold border-0 cursor-pointer active:scale-95 transition-transform"
                style={{
                    background: "linear-gradient(135deg, #FFD700 0%, #FFA000 100%)",
                    color: "#14472D",
                    fontFamily: "var(--font-hindi)",
                    boxShadow: "0 6px 24px rgba(255,215,0,0.3)",
                }}
            >
                आगे बढ़ें →
            </motion.button>

            {/* Bottom text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8 }}
                className="text-[12px] text-white/50 mt-6 text-center"
                style={{ fontFamily: "var(--font-hindi)" }}
            >
                बाद में Settings से भाषा बदल सकते हैं
            </motion.p>
        </div>
    );
}
