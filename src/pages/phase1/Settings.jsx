import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check } from "lucide-react";
import useStore from "../../store/useStore";

export default function Settings() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { selectedLanguage, setLanguage, userMode } = useStore();
    const [apiKey, setApiKey] = useState("");
    const [saved, setSaved] = useState(false);
    const isP1 = userMode === "phase1";

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
    };

    const languages = [
        { code: "hi", label: "हिंदी", flag: "🇮🇳" },
        { code: "en", label: "English", flag: "🇬🇧" },
    ];

    return (
        <div className="pb-24">
            <div className="px-4 pt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 border-0 bg-transparent cursor-pointer mb-4"
                    style={{ color: "#666", fontFamily: "var(--font-hindi)" }}
                >
                    <ArrowLeft size={20} />
                    <span className="text-base">वापस</span>
                </button>

                <h1
                    className="text-2xl font-bold mb-6"
                    style={{
                        fontFamily: isP1 ? "var(--font-hindi)" : "var(--font-english)",
                        color: "#1A1A2E",
                    }}
                >
                    ⚙️ {t("settings")}
                </h1>

                {/* API Key Section */}
                <div
                    className="rounded-xl p-5 mb-6"
                    style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}
                >
                    <h2 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-english)", color: "#1A1A2E" }}>
                        🔑 {t("apiKeyLabel")}
                    </h2>
                    <p className="text-sm mb-4" style={{ color: "#666", fontFamily: "var(--font-hindi)" }}>
                        AI सुविधाओं के लिए Google Gemini API key ज़रूरी है
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
                            fontFamily: "var(--font-hindi)",
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
                    <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}>
                        🌐 {t("language")}
                    </h2>
                    <div className="flex flex-col gap-2">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl border-0 cursor-pointer w-full text-left"
                                style={{
                                    backgroundColor: selectedLanguage === lang.code ? "#E8F5E9" : "#F5F5F5",
                                    border: selectedLanguage === lang.code ? "2px solid #046A38" : "none",
                                    minHeight: "52px",
                                }}
                            >
                                <span className="text-xl">{lang.flag}</span>
                                <span
                                    className="text-base font-medium"
                                    style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                                >
                                    {lang.label}
                                </span>
                                {selectedLanguage === lang.code && (
                                    <Check size={18} className="ml-auto" style={{ color: "#046A38" }} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* About */}
                <div
                    className="rounded-xl p-5"
                    style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}
                >
                    <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}>
                        ℹ️ FarmIQ के बारे में
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-hindi)", color: "#666" }}>
                        FarmIQ भारतीय किसानों के लिए बनाया गया एक AI-powered कृषि मंच है।
                        यह Google Gemini AI की शक्ति से चलता है।
                    </p>
                    <p className="text-xs mt-3" style={{ color: "#999" }}>
                        Version 1.0 • Team: Hack Homies • Elite Hack 1.0
                    </p>
                </div>
            </div>
        </div>
    );
}
