import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import useStore from "../../store/useStore";
import cropsData from "../../data/crops.json";
import TriColorFooter from "../../components/common/TriColorFooter";

const onboardingCards = [
    { emoji: "🌾", key: "onboardingCard1" },
    { emoji: "📊", key: "onboardingCard2" },
    { emoji: "👨‍🌾", key: "onboardingCard3" },
];

export default function OnboardingScreen() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { completeOnboarding, addCrop } = useStore();
    const [step, setStep] = useState(0); // 0 = welcome, 1 = crop selection
    const [selectedCrops, setSelectedCrops] = useState([]);

    const toggleCrop = (crop) => {
        setSelectedCrops((prev) =>
            prev.find((c) => c.id === crop.id)
                ? prev.filter((c) => c.id !== crop.id)
                : [...prev, crop]
        );
    };

    const handleFinish = () => {
        selectedCrops.forEach((crop) =>
            addCrop({
                cropId: crop.id,
                cropName: crop.nameHindi,
                sowingDate: null,
                areaAcres: 1,
                status: "active",
            })
        );
        completeOnboarding();
        navigate("/home");
    };

    const handleSkip = () => {
        completeOnboarding();
        navigate("/home");
    };

    return (
        <div
            className="min-h-screen flex flex-col relative overflow-hidden"
            style={{ backgroundColor: "#FFF8F0" }}
        >
            {/* Wheat growing animation at bottom */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bottom-0"
                        style={{
                            left: `${8 + i * 8}%`,
                            fontSize: `${28 + Math.random() * 20}px`,
                            opacity: 0.15,
                        }}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.15 }}
                        transition={{ delay: i * 0.1, duration: 1.2, ease: "easeOut" }}
                    >
                        🌾
                    </motion.div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 0 ? (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="flex-1 flex flex-col items-center justify-center px-6 pb-20"
                    >
                        {/* Farmer illustration */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="text-8xl mb-6"
                        >
                            👨‍🌾
                        </motion.div>

                        {/* Greeting */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl font-bold text-center mb-2"
                            style={{ color: "#FF6200", fontFamily: "var(--font-hindi)" }}
                        >
                            {t("onboardingGreeting")}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl text-center mb-10"
                            style={{ color: "#046A38", fontFamily: "var(--font-hindi)" }}
                        >
                            {t("onboardingSubtitle")}
                        </motion.p>

                        {/* Swipe Cards */}
                        <div className="flex flex-col gap-3 w-full max-w-sm mb-8">
                            {onboardingCards.map((card, i) => (
                                <motion.div
                                    key={card.key}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.15 }}
                                    className="flex items-center gap-4 px-5 py-4 rounded-xl"
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                        border: "1px solid #E8E8E8",
                                    }}
                                >
                                    <span className="text-3xl">{card.emoji}</span>
                                    <span
                                        className="text-base font-medium"
                                        style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                                    >
                                        {t(card.key)}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full max-w-sm flex flex-col gap-3">
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setStep(1)}
                                className="w-full py-4 rounded-xl text-lg font-bold text-white cursor-pointer border-0"
                                style={{
                                    backgroundColor: "#FF6200",
                                    minHeight: "64px",
                                    fontFamily: "var(--font-hindi)",
                                    boxShadow: "0 4px 12px rgba(255,98,0,0.3)",
                                }}
                            >
                                {t("chooseCrop")}
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleSkip}
                                className="w-full py-4 rounded-xl text-lg font-bold cursor-pointer"
                                style={{
                                    backgroundColor: "transparent",
                                    minHeight: "64px",
                                    fontFamily: "var(--font-hindi)",
                                    border: "2px solid #046A38",
                                    color: "#046A38",
                                }}
                            >
                                {t("browseNow")}
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="cropSelect"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="flex-1 flex flex-col px-4 py-6 pb-24"
                    >
                        <h2
                            className="text-2xl font-bold text-center mb-6"
                            style={{ color: "#1A1A2E", fontFamily: "var(--font-hindi)" }}
                        >
                            अपनी फसल चुनें 🌾
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                            {cropsData.map((crop) => {
                                const isSelected = selectedCrops.find((c) => c.id === crop.id);
                                return (
                                    <motion.div
                                        key={crop.id}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => toggleCrop(crop)}
                                        className="flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer relative"
                                        style={{
                                            minHeight: "140px",
                                            backgroundColor: isSelected ? "#E8F5E9" : "#FFFFFF",
                                            border: isSelected
                                                ? "3px solid #046A38"
                                                : "2px solid #E8E8E8",
                                            boxShadow: isSelected
                                                ? "0 4px 12px rgba(4,106,56,0.15)"
                                                : "0 2px 6px rgba(0,0,0,0.04)",
                                        }}
                                    >
                                        {isSelected && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-2 right-2 text-lg"
                                            >
                                                ✅
                                            </motion.span>
                                        )}
                                        <span className="text-5xl mb-2">{crop.emoji}</span>
                                        <span
                                            className="text-base font-bold text-center"
                                            style={{
                                                fontFamily: "var(--font-hindi)",
                                                color: "#1A1A2E",
                                            }}
                                        >
                                            {crop.nameHindi}
                                        </span>
                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full mt-1"
                                            style={{
                                                backgroundColor:
                                                    crop.category === "rabi"
                                                        ? "#E3F2FD"
                                                        : crop.category === "kharif"
                                                            ? "#FFF3E0"
                                                            : "#E8F5E9",
                                                color: "#666",
                                                fontFamily: "var(--font-hindi)",
                                            }}
                                        >
                                            {crop.category === "rabi"
                                                ? "रबी"
                                                : crop.category === "kharif"
                                                    ? "खरीफ"
                                                    : "सब्जी"}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-auto flex flex-col gap-3 max-w-sm mx-auto w-full">
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleFinish}
                                disabled={selectedCrops.length === 0}
                                className="w-full py-4 rounded-xl text-lg font-bold text-white cursor-pointer border-0"
                                style={{
                                    backgroundColor:
                                        selectedCrops.length > 0 ? "#FF6200" : "#CCC",
                                    minHeight: "64px",
                                    fontFamily: "var(--font-hindi)",
                                    boxShadow:
                                        selectedCrops.length > 0
                                            ? "0 4px 12px rgba(255,98,0,0.3)"
                                            : "none",
                                }}
                            >
                                {selectedCrops.length > 0
                                    ? `${selectedCrops.length} फसल चुनी — आगे बढ़ें`
                                    : "फसल चुनें"}
                            </motion.button>
                            <button
                                onClick={handleSkip}
                                className="text-center py-3 bg-transparent border-0 cursor-pointer"
                                style={{
                                    color: "#666",
                                    fontFamily: "var(--font-hindi)",
                                    fontSize: "16px",
                                }}
                            >
                                बाद में चुनेंगे →
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <TriColorFooter />
        </div>
    );
}
