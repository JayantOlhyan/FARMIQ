import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check, User } from "lucide-react";
import useStore from "../../store/useStore";

export default function Settings() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const isEn = i18n.language === "en";
    const font = isEn ? "var(--font-english)" : "var(--font-hindi)";
    const { selectedLanguage, setLanguage, userMode, myCrops, farmProfile } = useStore();
    const [apiKey, setApiKey] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("farmiq_gemini_key");
        if (stored) setApiKey(stored);
    }, []);

    const handleSave = () => {
        if (apiKey.trim()) {
            localStorage.setItem("farmiq_gemini_key", apiKey.trim());
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem("farmiq_lang", lang);
    };

    // Profile completeness
    const profileData = useMemo(() => {
        let score = 0;
        const total = 5;
        const missing = [];

        if (selectedLanguage) score++;
        else missing.push(t("selectLang"));

        if (myCrops?.length > 0) score++;
        else missing.push(t("addCrops"));

        if (apiKey || localStorage.getItem("farmiq_gemini_key")) score++;
        else missing.push(t("addApiKey"));

        if (farmProfile?.state) score++;
        else missing.push(t("fillState"));

        if (farmProfile?.soilType) score++;
        else missing.push(t("soilType"));

        return { score, total, percent: Math.round((score / total) * 100), missing };
    }, [selectedLanguage, myCrops, apiKey, farmProfile, t]);

    const languages = [
        { code: "hi", label: "हिंदी", flag: "🇮🇳" },
        { code: "en", label: "English", flag: "🇬🇧" },
        { code: "pa", label: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
        { code: "bn", label: "বাংলা", flag: "🇮🇳" },
        { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
        { code: "te", label: "తెలుగు", flag: "🇮🇳" },
        { code: "mr", label: "मराठी", flag: "🇮🇳" },
        { code: "gu", label: "ગુજરાતી", flag: "🇮🇳" },
        { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
    ];

    return (
        <div className="pb-24">
            <div className="px-4 pt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 border-0 bg-transparent cursor-pointer mb-4"
                    style={{ color: "#666", fontFamily: font }}
                >
                    <ArrowLeft size={20} />
                    <span className="text-base">{t("back")}</span>
                </button>

                <h1
                    className="text-2xl font-bold mb-6"
                    style={{ fontFamily: font, color: "#1A1A2E" }}
                >
                    ⚙️ {t("settings")}
                </h1>

                {/* Profile Completeness */}
                <div
                    className="rounded-xl p-5 mb-6"
                    style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-[48px] h-[48px] rounded-full bg-[#E8F5E9] flex items-center justify-center">
                            <User size={24} color="#1B5E3B" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-[16px] font-bold text-[#1A1A1A]" style={{ fontFamily: font }}>
                                {t("profileComplete", { percent: profileData.percent })}
                            </h2>
                            <p className="text-[12px] text-[#666]" style={{ fontFamily: font }}>
                                {profileData.missing.length > 0 ? t("nextStep", { step: profileData.missing[0] }) : t("profileDone")}
                            </p>
                        </div>
                    </div>
                    <div className="h-[8px] bg-[#F0F0F0] rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${profileData.percent}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                                background: profileData.percent === 100
                                    ? "linear-gradient(90deg, #2E7D32, #4CAF50)"
                                    : "linear-gradient(90deg, #FF9933, #FF6200)",
                            }}
                        />
                    </div>
                </div>

                {/* API Key Section */}
                <div
                    className="rounded-xl p-5 mb-6"
                    style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}
                >
                    <h2 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-english)", color: "#1A1A2E" }}>
                        🔑 {t("apiKeyLabel")}
                    </h2>
                    <p className="text-sm mb-4" style={{ color: "#666", fontFamily: font }}>
                        {t("apiKeyDesc")}
                    </p>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder={t("apiKeyPlaceholder")}
                        className="w-full rounded-xl px-4 py-3 text-base border-0 outline-none mb-3"
                        style={{
                            backgroundColor: "#F5F5F5",
                            color: "#1A1A2E",
                            fontFamily: "var(--font-english)",
                            height: "52px",
                        }}
                    />
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="w-full py-3 rounded-xl text-base font-bold cursor-pointer border-0 flex items-center justify-center gap-2"
                        style={{
                            backgroundColor: saved ? "#046A38" : "#FF6200",
                            color: "#FFF",
                            fontFamily: font,
                            minHeight: "52px",
                        }}
                    >
                        {saved ? (
                            <>
                                <Check size={18} /> {t("keySaved")}
                            </>
                        ) : (
                            t("saveKey")
                        )}
                    </motion.button>
                </div>

                {/* Language Section */}
                <div
                    className="rounded-xl p-5 mb-6"
                    style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}
                >
                    <h2 className="text-lg font-bold mb-3" style={{ fontFamily: font, color: "#1A1A2E" }}>
                        🌐 {t("language")}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className="px-4 py-2.5 rounded-full border-0 cursor-pointer active:scale-95 transition-all text-[14px] font-medium"
                                style={{
                                    backgroundColor: selectedLanguage === lang.code ? "#E8F5E9" : "#F5F5F5",
                                    border: selectedLanguage === lang.code ? "2px solid #1B5E3B" : "2px solid transparent",
                                    fontFamily: lang.code === "en" ? "var(--font-english)" : "var(--font-hindi)",
                                    color: selectedLanguage === lang.code ? "#1B5E3B" : "#1A1A1A",
                                }}
                            >
                                {lang.flag} {lang.label}
                                {selectedLanguage === lang.code && " ✓"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* About */}
                <div
                    className="rounded-xl p-5"
                    style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}
                >
                    <h2 className="text-lg font-bold mb-2" style={{ fontFamily: font, color: "#1A1A2E" }}>
                        ℹ️ {t("aboutFarmIQ")}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: font, color: "#666" }}>
                        {t("aboutDesc")}
                    </p>
                    <p className="text-xs mt-3" style={{ color: "#999" }}>
                        Version 2.0 • Team: Hack Homies • Elite Hack 1.0
                    </p>
                </div>
            </div>
        </div>
    );
}
