import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Minus, Plus, Camera, Share2 } from "lucide-react";
import PageHeader from "../../components/common/Header";
import { askGemini, PROMPT_P1_PEST_PHOTO } from "../../lib/gemini";
import { sharePestDiagnosis } from "../../lib/share";

const cropData = {
    wheat: {
        name: "गेहूँ (Wheat)", price: "₹2,150", msp: "₹2,015",
        img: "/images/wheat.png", rating: 4.9, reviews: 192,
        desc: "गेहूँ भारत की सबसे महत्वपूर्ण रबी फसल है। इसकी बुवाई अक्टूबर-नवंबर में की जाती है और कटाई मार्च-अप्रैल में होती है। उत्तर प्रदेश, पंजाब, हरियाणा, मध्य प्रदेश और राजस्थान गेहूँ के प्रमुख उत्पादक राज्य हैं।",
        related: ["/images/rice.png", "/images/mustard.png", "/images/sugarcane.png", "/images/vegetables.png"],
    },
    rice: {
        name: "धान (Rice)", price: "₹1,890", msp: "₹2,183",
        img: "/images/rice.png", rating: 4.7, reviews: 156,
        desc: "धान भारत की प्रमुख खरीफ फसल है। इसकी रोपाई जून-जुलाई में की जाती है। पश्चिम बंगाल, उत्तर प्रदेश, पंजाब और तमिलनाडु प्रमुख उत्पादक राज्य हैं।",
        related: ["/images/wheat.png", "/images/mustard.png", "/images/sugarcane.png", "/images/vegetables.png"],
    },
    mustard: {
        name: "सरसों (Mustard)", price: "₹5,400", msp: "₹5,650",
        img: "/images/mustard.png", rating: 4.6, reviews: 88,
        desc: "सरसों रबी सीजन की प्रमुख तिलहन फसल है। राजस्थान, मध्य प्रदेश, उत्तर प्रदेश और हरियाणा प्रमुख उत्पादक राज्य हैं।",
        related: ["/images/wheat.png", "/images/rice.png", "/images/sugarcane.png", "/images/vegetables.png"],
    },
    sugarcane: {
        name: "गन्ना (Sugarcane)", price: "₹350", msp: "₹315",
        img: "/images/sugarcane.png", rating: 4.5, reviews: 74,
        desc: "गन्ना भारत की प्रमुख नकदी फसल है। उत्तर प्रदेश, महाराष्ट्र और कर्नाटक प्रमुख उत्पादक राज्य हैं।",
        related: ["/images/wheat.png", "/images/rice.png", "/images/mustard.png", "/images/vegetables.png"],
    },
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function CropDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const crop = cropData[id] || cropData.wheat;
    const [qty, setQty] = useState(1);
    const fileInputRef = useRef(null);
    const [pestPhoto, setPestPhoto] = useState(null);
    const [pestResult, setPestResult] = useState("");
    const [pestLoading, setPestLoading] = useState(false);
    const [pestError, setPestError] = useState("");

    // Sprint 2, Fix #3: Pest photo diagnosis
    const handlePestPhoto = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Convert to base64
        const reader = new FileReader();
        reader.onload = async () => {
            const base64 = reader.result.split(",")[1];
            setPestPhoto(reader.result);
            setPestLoading(true);
            setPestError("");
            setPestResult("");

            try {
                const monthNames = [
                    "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
                    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
                ];
                const prompt = PROMPT_P1_PEST_PHOTO.user({
                    cropName: crop.name,
                    state: "उत्तर प्रदेश",
                    month: monthNames[new Date().getMonth()],
                });
                const result = await askGemini(prompt, PROMPT_P1_PEST_PHOTO.system, base64, { maxRetries: 2 });
                setPestResult(result);
            } catch (err) {
                setPestError(err.message);
            }
            setPestLoading(false);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="pb-[100px] bg-white min-h-screen">
            <PageHeader title="फसल की जानकारी" />

            {/* Crop image */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="px-5 py-3">
                <div className="w-full h-[200px] rounded-[16px] overflow-hidden">
                    <img src={crop.img} alt={crop.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-2 px-5 mb-4 overflow-x-auto hide-scrollbar">
                {[crop.img, ...crop.related.slice(0, 4)].map((img, i) => (
                    <div key={i} className={`w-[52px] h-[52px] rounded-[10px] overflow-hidden flex-shrink-0 border-2 ${i === 0 ? "border-[#1B5E3B]" : "border-transparent"}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                ))}
            </div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="px-5">
                {/* Product info */}
                <div className="farmiq-card p-4 mb-4">
                    <h2 className="text-[20px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-hindi)" }}>{crop.name}</h2>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-[13px] text-[#2E7D32] font-medium" style={{ fontFamily: "var(--font-hindi)" }}>उपलब्ध है ✓</span>
                        <span className="text-[18px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-english)" }}>{crop.price}/क्विंटल</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                            <Star size={16} fill="#F9A825" color="#F9A825" />
                            <span className="text-[14px] font-semibold" style={{ fontFamily: "var(--font-english)" }}>{crop.rating}</span>
                            <span className="text-[13px] text-[#666]">({crop.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-[32px] h-[32px] rounded-full border-2 border-[#1B5E3B] flex items-center justify-center">
                                <Minus size={16} color="#1B5E3B" />
                            </button>
                            <span className="text-[16px] font-bold w-6 text-center" style={{ fontFamily: "var(--font-english)" }}>{qty}</span>
                            <button onClick={() => setQty(qty + 1)} className="w-[32px] h-[32px] rounded-full bg-[#1B5E3B] flex items-center justify-center">
                                <Plus size={16} color="white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sprint 2, Fix #3: Pest Photo Diagnosis */}
                <div className="farmiq-card p-4 mb-4">
                    <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-hindi)" }}>
                        🔍 कीड़ा/बीमारी पहचानें
                    </h3>
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        ref={fileInputRef}
                        onChange={handlePestPhoto}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-[52px] rounded-[14px] bg-[#FFF3E0] text-[#FF6200] font-bold text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-transform border-2 border-dashed border-[#FF6200]/30"
                        style={{ fontFamily: "var(--font-hindi)" }}
                    >
                        <Camera size={20} />
                        📷 फोटो दिखाकर पहचानें
                    </button>

                    {/* Photo preview */}
                    <AnimatePresence>
                        {pestPhoto && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-3"
                            >
                                <img src={pestPhoto} alt="pest" className="w-full h-[150px] object-cover rounded-[12px]" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Loading */}
                    {pestLoading && (
                        <div className="flex items-center justify-center gap-2 mt-3 py-3">
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="text-xl">🔍</motion.span>
                            <span className="text-[14px] text-[#666]" style={{ fontFamily: "var(--font-hindi)" }}>जांच हो रही है...</span>
                        </div>
                    )}

                    {/* Error */}
                    {pestError && (
                        <div className="mt-3 px-3 py-2 rounded-[10px] bg-red-50 text-red-700 text-[13px]" style={{ fontFamily: "var(--font-hindi)" }}>
                            {pestError}
                        </div>
                    )}

                    {/* Result */}
                    <AnimatePresence>
                        {pestResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-3 p-4 rounded-[12px] bg-[#F0F7F2]"
                            >
                                <p className="text-[14px] text-[#1A1A1A] leading-[1.8] whitespace-pre-wrap" style={{ fontFamily: "var(--font-hindi)" }}>
                                    {pestResult}
                                </p>
                                <button
                                    onClick={() => sharePestDiagnosis(crop.name, pestResult)}
                                    className="mt-3 w-full h-[44px] rounded-[10px] bg-[#25D366] text-white font-bold text-[14px] flex items-center justify-center gap-2 active:scale-95 transition-transform"
                                    style={{ fontFamily: "var(--font-hindi)" }}
                                >
                                    <Share2 size={16} /> WhatsApp पर भेजें
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* जानकारी */}
                <div className="mb-4">
                    <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "var(--font-hindi)" }}>जानकारी</h3>
                    <p className="text-[14px] text-[#666] leading-[1.7]" style={{ fontFamily: "var(--font-hindi)" }}>
                        {crop.desc}
                        <button className="text-[#1B5E3B] font-semibold ml-1">...और पढ़ें</button>
                    </p>
                </div>

                {/* यह भी देखें */}
                <div className="mb-4">
                    <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-hindi)" }}>यह भी देखें</h3>
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar">
                        {crop.related.map((img, i) => (
                            <div key={i} className="w-[70px] h-[70px] rounded-[12px] overflow-hidden flex-shrink-0">
                                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Bottom CTA */}
            <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 z-40">
                <button onClick={() => navigate("/home")} className="w-full h-[56px] rounded-[16px] bg-[#1B5E3B] text-white font-bold text-[16px] active:scale-[0.98] transition-transform shadow-lg" style={{ fontFamily: "var(--font-hindi)" }}>
                    🌾 मेरी फसल में जोड़ें
                </button>
            </div>
        </div>
    );
}
