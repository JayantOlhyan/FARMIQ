import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useStore from "../../store/useStore";
import cropsData from "../../data/crops.json";
import { askGemini, PROMPT_P1_DAILY_TIP } from "../../lib/gemini";
import Spinner from "../../components/common/Spinner";

const quickActions = [
    { icon: "🌾", key: "cropInfo", path: "/crops" },
    { icon: "📊", key: "todayRate", path: "/mandi" },
    { icon: "💬", key: "askQuestion", path: "/voice" },
    { icon: "🚛", key: "bookTransport", path: "/transport" },
];

export default function HomeP1() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { myCrops, dailyTip, dailyTipDate, setDailyTip } = useStore();
    const [tipLoading, setTipLoading] = useState(false);

    // Get daily tip from Gemini
    useEffect(() => {
        const today = new Date().toDateString();
        if (dailyTipDate === today && dailyTip) return;

        const fetchTip = async () => {
            try {
                setTipLoading(true);
                const monthNames = [
                    "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
                    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
                ];
                const cropNames = myCrops.length > 0
                    ? myCrops.map((c) => c.cropName).join(", ")
                    : "गेहूँ, धान";

                const prompt = PROMPT_P1_DAILY_TIP.user({
                    month: monthNames[new Date().getMonth()],
                    cropNames,
                    state: "उत्तर प्रदेश",
                    weather: "सामान्य",
                });

                const response = await askGemini(prompt, PROMPT_P1_DAILY_TIP.system);
                setDailyTip(response);
            } catch {
                setDailyTip("आज अपनी फसल में नमी जाँचें और जरूरत हो तो हल्की सिंचाई करें। 💧");
            } finally {
                setTipLoading(false);
            }
        };

        fetchTip();
    }, []);

    const userCrops = myCrops
        .map((mc) => cropsData.find((c) => c.id === mc.cropId))
        .filter(Boolean);

    return (
        <div className="pb-24">
            {/* My Crops Strip */}
            <div className="px-4 pt-4 mb-4">
                <h2
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                >
                    मेरी फसलें 🌿
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                    {userCrops.length > 0 ? (
                        userCrops.map((crop) => (
                            <motion.div
                                key={crop.id}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate(`/crops/${crop.id}`)}
                                className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl cursor-pointer"
                                style={{
                                    width: "120px",
                                    height: "140px",
                                    backgroundColor: "#FFFFFF",
                                    border: "2px solid #E8E8E8",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                }}
                            >
                                <span className="text-4xl mb-2">{crop.emoji}</span>
                                <span
                                    className="text-sm font-bold"
                                    style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                                >
                                    {crop.nameHindi}
                                </span>
                                <span
                                    className="text-xs mt-1 px-2 py-0.5 rounded-full"
                                    style={{
                                        backgroundColor: "#E8F5E9",
                                        color: "#046A38",
                                        fontFamily: "var(--font-hindi)",
                                    }}
                                >
                                    {crop.category === "rabi" ? "रबी" : crop.category === "kharif" ? "खरीफ" : "सब्जी"}
                                </span>
                            </motion.div>
                        ))
                    ) : (
                        cropsData.slice(0, 4).map((crop) => (
                            <motion.div
                                key={crop.id}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate(`/crops/${crop.id}`)}
                                className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl cursor-pointer"
                                style={{
                                    width: "120px",
                                    height: "140px",
                                    backgroundColor: "#FFFFFF",
                                    border: "2px solid #E8E8E8",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                }}
                            >
                                <span className="text-4xl mb-2">{crop.emoji}</span>
                                <span
                                    className="text-sm font-bold"
                                    style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                                >
                                    {crop.nameHindi}
                                </span>
                            </motion.div>
                        ))
                    )}
                    <motion.div
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/crops")}
                        className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl cursor-pointer"
                        style={{
                            width: "120px",
                            height: "140px",
                            backgroundColor: "#FFF8F0",
                            border: "2px dashed #FF6200",
                        }}
                    >
                        <span className="text-3xl mb-1">➕</span>
                        <span
                            className="text-sm font-bold"
                            style={{ fontFamily: "var(--font-hindi)", color: "#FF6200" }}
                        >
                            {t("addMoreCrops")}
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Daily Tip Card */}
            <div className="px-4 mb-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl p-5 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, #FF6200 0%, #D4A017 100%)",
                        boxShadow: "0 4px 16px rgba(255,98,0,0.2)",
                    }}
                >
                    <h3
                        className="text-lg font-bold text-white mb-2 flex items-center gap-2"
                        style={{ fontFamily: "var(--font-hindi)" }}
                    >
                        🌤️ {t("todayAdvice")}
                    </h3>
                    {tipLoading ? (
                        <div className="py-2">
                            <div className="animate-pulse bg-white/20 h-4 rounded w-3/4 mb-2" />
                            <div className="animate-pulse bg-white/20 h-4 rounded w-1/2" />
                        </div>
                    ) : (
                        <p
                            className="text-white text-base leading-relaxed mb-3"
                            style={{ fontFamily: "var(--font-hindi)", opacity: 0.95 }}
                        >
                            {dailyTip || "आज अपनी फसल में नमी जाँचें और जरूरत हो तो हल्की सिंचाई करें। 💧"}
                        </p>
                    )}
                    <button
                        onClick={() => navigate("/voice")}
                        className="bg-white/20 text-white border-0 px-4 py-2 rounded-lg text-sm font-bold cursor-pointer"
                        style={{ fontFamily: "var(--font-hindi)" }}
                    >
                        {t("learnMore")} →
                    </button>
                </motion.div>
            </div>

            {/* Quick Actions Grid */}
            <div className="px-4 mb-4">
                <h2
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                >
                    {t("quickActions")} ⚡
                </h2>
                <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, i) => (
                        <motion.div
                            key={action.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(action.path)}
                            className="flex items-center gap-3 p-4 rounded-xl cursor-pointer"
                            style={{
                                minHeight: "100px",
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #E8E8E8",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            }}
                        >
                            <span className="text-4xl">{action.icon}</span>
                            <span
                                className="text-base font-bold"
                                style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                            >
                                {t(action.key)}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Weather Strip */}
            <div className="px-4 mb-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-xl p-4 flex items-center gap-3"
                    style={{
                        backgroundColor: "#E3F2FD",
                        border: "1px solid #BBDEFB",
                    }}
                >
                    <span className="text-3xl">☀️</span>
                    <div>
                        <p
                            className="text-sm font-bold"
                            style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                        >
                            आज का मौसम
                        </p>
                        <p
                            className="text-xs"
                            style={{ fontFamily: "var(--font-hindi)", color: "#666" }}
                        >
                            34°C — धूप है, सिंचाई ज़रूरी हो सकती है
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
