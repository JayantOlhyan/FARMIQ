import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Camera } from "lucide-react";
import cropsData from "../../data/crops.json";
import useStore from "../../store/useStore";
import { askGemini, PROMPT_P1_FERTILIZER, PROMPT_P1_PEST_PHOTO } from "../../lib/gemini";
import Spinner from "../../components/common/Spinner";

const tabs = [
    { key: "sowing", label: "बुवाई", labelEn: "Sowing" },
    { key: "fertilizer", label: "खाद", labelEn: "Fertilizer" },
    { key: "water", label: "पानी", labelEn: "Irrigation" },
    { key: "pests", label: "कीड़े", labelEn: "Pests" },
    { key: "harvest", label: "कटाई", labelEn: "Harvest" },
];

export default function CropDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { userMode, addCrop, myCrops } = useStore();
    const [activeTab, setActiveTab] = useState("sowing");
    const [aiResponse, setAiResponse] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const fileInputRef = useRef(null);

    const crop = cropsData.find((c) => c.id === id);
    if (!crop) return <div className="p-6 text-center">फसल नहीं मिली</div>;

    const isP1 = userMode === "phase1";
    const isAdded = myCrops.some((c) => c.cropId === crop.id);

    const monthNames = [
        "जन", "फर", "मार्च", "अप्रै", "मई", "जून",
        "जुल", "अग", "सित", "अक्टू", "नव", "दिस",
    ];

    const handleAddCrop = () => {
        addCrop({
            cropId: crop.id,
            cropName: crop.nameHindi,
            sowingDate: null,
            areaAcres: 1,
            status: "active",
        });
    };

    const handleAiFertilizer = async () => {
        setAiLoading(true);
        try {
            const prompt = PROMPT_P1_FERTILIZER.user({
                cropName: crop.nameHindi,
                soilType: crop.soilTypesHindi[0],
                areaInAcres: "2",
                sowingMonth: monthNames[crop.sowingMonths[0] - 1],
                currentMonth: monthNames[new Date().getMonth()],
            });
            const res = await askGemini(prompt, "");
            setAiResponse(res);
        } catch {
            setAiResponse(t("errorNoApiKey"));
        }
        setAiLoading(false);
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAiLoading(true);
        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result.split(",")[1];
                const prompt = PROMPT_P1_PEST_PHOTO.user({
                    cropName: crop.nameHindi,
                    state: "उत्तर प्रदेश",
                    month: monthNames[new Date().getMonth()],
                });
                const res = await askGemini(prompt, PROMPT_P1_PEST_PHOTO.system, base64);
                setAiResponse(res);
                setAiLoading(false);
            };
            reader.readAsDataURL(file);
        } catch {
            setAiResponse(t("errorGeminiTimeout"));
            setAiLoading(false);
        }
    };

    return (
        <div className="pb-24">
            {/* Hero */}
            <div
                className="relative px-4 pt-4 pb-6"
                style={{
                    background: "linear-gradient(180deg, #FF6200 0%, #FFF8F0 100%)",
                }}
            >
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 border-0 bg-transparent cursor-pointer mb-4"
                    style={{ color: "#FFF", fontFamily: "var(--font-hindi)" }}
                >
                    <ArrowLeft size={24} />
                    <span className="text-base font-medium">वापस</span>
                </button>
                <div className="flex items-center gap-4">
                    <span className="text-6xl">{crop.emoji}</span>
                    <div>
                        <h1
                            className="text-3xl font-bold text-white"
                            style={{ fontFamily: isP1 ? "var(--font-hindi)" : "var(--font-english)" }}
                        >
                            {isP1 ? crop.nameHindi : crop.nameEnglish}
                        </h1>
                        {!isP1 && (
                            <p className="text-sm italic text-white/70">{crop.scientificName}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white">
                                {crop.category === "rabi" ? "रबी" : crop.category === "kharif" ? "खरीफ" : "सब्जी"}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white">
                                {crop.yieldPotential.normal} {crop.yieldPotential.unit}
                            </span>
                        </div>
                    </div>
                </div>
                {!isAdded && (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddCrop}
                        className="mt-4 w-full py-3 rounded-xl text-base font-bold cursor-pointer border-0"
                        style={{
                            backgroundColor: "#046A38",
                            color: "#FFF",
                            fontFamily: "var(--font-hindi)",
                            minHeight: "52px",
                        }}
                    >
                        ➕ मेरी फसल में जोड़ें
                    </motion.button>
                )}
            </div>

            {/* Tabs */}
            <div className="px-4 mt-4 mb-2">
                <div
                    className="flex gap-1 overflow-x-auto rounded-xl p-1"
                    style={{ backgroundColor: "#F5F5F5", scrollbarWidth: "none" }}
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className="flex-1 px-3 py-2.5 rounded-lg border-0 text-sm font-bold cursor-pointer whitespace-nowrap"
                            style={{
                                backgroundColor: activeTab === tab.key ? "#FFFFFF" : "transparent",
                                color: activeTab === tab.key ? "#FF6200" : "#666",
                                fontFamily: "var(--font-hindi)",
                                boxShadow: activeTab === tab.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                                minHeight: "44px",
                            }}
                        >
                            {isP1 ? tab.label : tab.labelEn}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 py-4"
                >
                    {activeTab === "sowing" && (
                        <div className="space-y-4">
                            {/* Sowing Calendar */}
                            <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                <h3 className="text-base font-bold mb-3" style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}>
                                    बुवाई का समय 📅
                                </h3>
                                <div className="grid grid-cols-6 gap-1">
                                    {monthNames.map((m, i) => (
                                        <div
                                            key={i}
                                            className="text-center py-2 rounded-lg text-xs font-medium"
                                            style={{
                                                backgroundColor: crop.sowingMonths.includes(i + 1) ? "#046A38" : "#F5F5F5",
                                                color: crop.sowingMonths.includes(i + 1) ? "#FFF" : "#999",
                                                fontFamily: "var(--font-hindi)",
                                            }}
                                        >
                                            {m}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Soil Types */}
                            <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-hindi)" }}>
                                    मिट्टी का प्रकार 🌍
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {crop.soilTypesHindi.map((soil) => (
                                        <span key={soil} className="px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: "#E8F5E9", color: "#046A38", fontFamily: "var(--font-hindi)" }}>
                                            {soil}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* Growth Stages */}
                            <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                <h3 className="text-base font-bold mb-3" style={{ fontFamily: "var(--font-hindi)" }}>
                                    फसल की अवस्थाएँ 🌱
                                </h3>
                                <div className="space-y-3">
                                    {crop.stages.map((stage, i) => (
                                        <div key={i} className="flex gap-3 items-start">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: "#046A38" }}>
                                                {i + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold" style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}>
                                                    {stage.nameHindi} ({stage.daysAfterSowing} दिन)
                                                </p>
                                                <p className="text-xs mt-0.5" style={{ fontFamily: "var(--font-hindi)", color: "#666" }}>
                                                    {stage.care}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "fertilizer" && (
                        <div className="space-y-4">
                            <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                <h3 className="text-base font-bold mb-3" style={{ fontFamily: "var(--font-hindi)" }}>
                                    बुवाई के समय खाद (प्रति एकड़) 🧪
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { name: "यूरिया", qty: crop.fertilizer.basal.urea },
                                        { name: "DAP", qty: crop.fertilizer.basal.dap },
                                        { name: "MOP", qty: crop.fertilizer.basal.mop },
                                    ].map((f) => (
                                        <div key={f.name} className="text-center p-3 rounded-xl" style={{ backgroundColor: "#FFF3E0" }}>
                                            <p className="text-xl font-bold" style={{ color: "#FF6200" }}>{f.qty} kg</p>
                                            <p className="text-xs mt-1" style={{ fontFamily: "var(--font-hindi)", color: "#666" }}>{f.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {crop.fertilizer.topDressing.length > 0 && (
                                <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                    <h3 className="text-base font-bold mb-3" style={{ fontFamily: "var(--font-hindi)" }}>
                                        बाद में खाद (टॉप ड्रेसिंग) ⏰
                                    </h3>
                                    <div className="space-y-3">
                                        {crop.fertilizer.topDressing.map((td, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#F5F5F5" }}>
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#D4A017" }}>
                                                    {td.daysAfterSowing}d
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold" style={{ fontFamily: "var(--font-hindi)" }}>
                                                        यूरिया {td.urea} kg/एकड़
                                                    </p>
                                                    <p className="text-xs" style={{ fontFamily: "var(--font-hindi)", color: "#666" }}>
                                                        {td.noteHindi}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* AI Fertilizer Advice Button */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAiFertilizer}
                                disabled={aiLoading}
                                className="w-full py-4 rounded-xl text-base font-bold cursor-pointer border-0"
                                style={{
                                    backgroundColor: "#046A38",
                                    color: "#FFF",
                                    fontFamily: "var(--font-hindi)",
                                    minHeight: "64px",
                                }}
                            >
                                {t("aiAdvice")}
                            </motion.button>
                        </div>
                    )}

                    {activeTab === "water" && (
                        <div className="space-y-4">
                            <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                <h3 className="text-base font-bold mb-3" style={{ fontFamily: "var(--font-hindi)" }}>
                                    सिंचाई कब करें 💧
                                </h3>
                                <div className="space-y-2">
                                    {crop.irrigationHindi.map((note, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#E3F2FD" }}>
                                            <span className="text-xl">💧</span>
                                            <p className="text-sm" style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}>{note}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-hindi)" }}>
                                    पानी की ज़रूरत
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                        {["low", "moderate", "high"].map((level) => (
                                            <div
                                                key={level}
                                                className="w-8 h-8 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        ["low", "moderate", "high"].indexOf(crop.waterRequirement) >=
                                                            ["low", "moderate", "high"].indexOf(level)
                                                            ? "#1976D2"
                                                            : "#E0E0E0",
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold" style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}>
                                        {crop.waterRequirement === "low" ? "कम" : crop.waterRequirement === "moderate" ? "मध्यम" : "ज़्यादा"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "pests" && (
                        <div className="space-y-4">
                            {crop.commonPests.map((pest) => (
                                <div key={pest.id} className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8", borderTopWidth: "4px", borderTopColor: "#FF6200" }}>
                                    <h3 className="text-base font-bold mb-1" style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}>
                                        {pest.nameHindi}
                                    </h3>
                                    {!isP1 && <p className="text-xs italic mb-2" style={{ color: "#999" }}>{pest.nameEnglish}</p>}
                                    <p className="text-sm mb-2" style={{ fontFamily: "var(--font-hindi)", color: "#666" }}>
                                        <strong>लक्षण:</strong> {pest.symptom}
                                    </p>
                                    <p className="text-sm" style={{ fontFamily: "var(--font-hindi)", color: "#046A38" }}>
                                        <strong>इलाज:</strong> {pest.treatment}
                                    </p>
                                </div>
                            ))}
                            {/* Photo Diagnosis */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                capture="environment"
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => fileInputRef.current?.click()}
                                disabled={aiLoading}
                                className="w-full py-4 rounded-xl text-base font-bold cursor-pointer border-0 flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: "#FF6200",
                                    color: "#FFF",
                                    fontFamily: "var(--font-hindi)",
                                    minHeight: "64px",
                                }}
                            >
                                <Camera size={20} />
                                {t("photoIdentify")}
                            </motion.button>
                        </div>
                    )}

                    {activeTab === "harvest" && (
                        <div className="space-y-4">
                            <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                <h3 className="text-base font-bold mb-3" style={{ fontFamily: "var(--font-hindi)" }}>
                                    कटाई का समय 🌾
                                </h3>
                                <div className="grid grid-cols-6 gap-1">
                                    {monthNames.map((m, i) => (
                                        <div
                                            key={i}
                                            className="text-center py-2 rounded-lg text-xs font-medium"
                                            style={{
                                                backgroundColor: crop.harvestMonths.includes(i + 1) ? "#D4A017" : "#F5F5F5",
                                                color: crop.harvestMonths.includes(i + 1) ? "#FFF" : "#999",
                                                fontFamily: "var(--font-hindi)",
                                            }}
                                        >
                                            {m}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-hindi)" }}>
                                    पैदावार की संभावना 📊
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center p-3 rounded-xl" style={{ backgroundColor: "#E8F5E9" }}>
                                        <p className="text-xl font-bold" style={{ color: "#046A38" }}>{crop.yieldPotential.normal}</p>
                                        <p className="text-xs" style={{ fontFamily: "var(--font-hindi)", color: "#666" }}>सामान्य ({crop.yieldPotential.unit})</p>
                                    </div>
                                    <div className="text-center p-3 rounded-xl" style={{ backgroundColor: "#FFF3E0" }}>
                                        <p className="text-xl font-bold" style={{ color: "#FF6200" }}>{crop.yieldPotential.good}</p>
                                        <p className="text-xs" style={{ fontFamily: "var(--font-hindi)", color: "#666" }}>अच्छी ({crop.yieldPotential.unit})</p>
                                    </div>
                                </div>
                            </div>
                            {crop.msp > 0 && (
                                <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                    <h3 className="text-base font-bold mb-1" style={{ fontFamily: "var(--font-hindi)" }}>
                                        MSP (न्यूनतम समर्थन मूल्य) 💰
                                    </h3>
                                    <p className="text-2xl font-bold" style={{ color: "#FF6200" }}>
                                        ₹{crop.msp}/क्विंटल
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* AI Response */}
            {aiLoading && <Spinner />}
            {aiResponse && !aiLoading && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-4 mb-4 rounded-xl p-4"
                    style={{
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #046A38",
                        borderTopWidth: "4px",
                    }}
                >
                    <h3 className="text-base font-bold mb-2 flex items-center gap-2" style={{ fontFamily: "var(--font-hindi)", color: "#046A38" }}>
                        🤖 AI सलाह
                    </h3>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}>
                        {aiResponse}
                    </p>
                </motion.div>
            )}
        </div>
    );
}
