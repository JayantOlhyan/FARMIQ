import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";

const crops = [
    { id: "wheat", name: "गेहूँ", emoji: "🌾" },
    { id: "rice", name: "धान", emoji: "🌿" },
    { id: "mustard", name: "सरसों", emoji: "💛" },
    { id: "sugarcane", name: "गन्ना", emoji: "🎋" },
    { id: "tomato", name: "टमाटर", emoji: "🍅" },
    { id: "potato", name: "आलू", emoji: "🥔" },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function OnboardingScreen() {
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();
    const { completeOnboarding } = useStore();

    const toggleCrop = (id) => {
        setSelected((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
    };

    const finish = () => {
        completeOnboarding();
        navigate("/home");
    };

    return (
        <div className="app-container min-h-screen flex flex-col bg-[#1B5E3B]">
            {step === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }} className="text-[80px] mb-6">
                        👨‍🌾
                    </motion.div>
                    <h1 className="text-[26px] font-bold text-white mb-3" style={{ fontFamily: "var(--font-hindi)" }}>
                        नमस्ते! मैं FarmIQ हूँ 🙏
                    </h1>
                    <p className="text-[16px] text-white/80 mb-8" style={{ fontFamily: "var(--font-hindi)" }}>
                        आपकी खेती का AI साथी
                    </p>
                    <button onClick={() => setStep(1)} className="w-full h-[56px] rounded-[16px] bg-white text-[#1B5E3B] font-bold text-[16px] active:scale-[0.98] transition-transform" style={{ fontFamily: "var(--font-hindi)" }}>
                        मेरी फसल चुनें 🌾
                    </button>
                    <button onClick={finish} className="mt-4 text-white/60 text-[14px]" style={{ fontFamily: "var(--font-hindi)" }}>
                        अभी देखते हैं →
                    </button>
                </motion.div>
            )}

            {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col px-6 pt-16">
                    <h2 className="text-[22px] font-bold text-white mb-2" style={{ fontFamily: "var(--font-hindi)" }}>अपनी फसल चुनें</h2>
                    <p className="text-[14px] text-white/70 mb-6" style={{ fontFamily: "var(--font-hindi)" }}>एक या अधिक फसल चुनें</p>

                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {crops.map((crop) => (
                            <button
                                key={crop.id}
                                onClick={() => toggleCrop(crop.id)}
                                className={`h-[90px] rounded-[16px] flex flex-col items-center justify-center gap-1 text-center transition-all active:scale-95 ${selected.includes(crop.id) ? "bg-white text-[#1B5E3B] shadow-lg" : "bg-white/15 text-white"
                                    }`}
                            >
                                <span className="text-[28px]">{crop.emoji}</span>
                                <span className="text-[13px] font-semibold" style={{ fontFamily: "var(--font-hindi)" }}>{crop.name}</span>
                            </button>
                        ))}
                    </div>

                    <button onClick={finish} className="w-full h-[56px] rounded-[16px] bg-white text-[#1B5E3B] font-bold text-[16px] mt-auto mb-10 active:scale-[0.98] transition-transform" style={{ fontFamily: "var(--font-hindi)" }}>
                        शुरू करें →
                    </button>
                </motion.div>
            )}

            {/* Tricolor at bottom */}
            <div className="mt-auto">
                <div style={{ height: 4, background: "#FF9933" }} />
                <div style={{ height: 4, background: "#FFFFFF" }} />
                <div style={{ height: 4, background: "#138808" }} />
            </div>
        </div>
    );
}
