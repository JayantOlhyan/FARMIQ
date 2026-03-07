import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Phone, MessageCircle } from "lucide-react";
import useStore from "../../store/useStore";
import cropsData from "../../data/crops.json";

const mockProviders = [
    { name: "राम ट्रांसपोर्ट", vehicle: "ट्रक (12 टन)", rate: "₹15/km", rating: 4.5, phone: "9876543210" },
    { name: "किसान लॉजिस्टिक्स", vehicle: "मिनी ट्रक (4 टन)", rate: "₹10/km", rating: 4.2, phone: "9876543211" },
    { name: "भारत ट्रांसपोर्ट", vehicle: "ट्रक (8 टन)", rate: "₹12/km", rating: 4.7, phone: "9876543212" },
    { name: "अंकित ट्रांसपोर्ट सेवा", vehicle: "ट्रैक्टर ट्रॉली", rate: "₹8/km", rating: 4.0, phone: "9876543213" },
];

export default function TransportP1() {
    const { t } = useTranslation();
    const { myCrops } = useStore();
    const [step, setStep] = useState("form"); // form | results
    const [selectedCrop, setSelectedCrop] = useState(myCrops[0]?.cropId || "gehun");
    const [quantity, setQuantity] = useState(10);
    const [date, setDate] = useState("tomorrow");

    const cropOptions = myCrops.length > 0
        ? myCrops.map((mc) => cropsData.find((c) => c.id === mc.cropId)).filter(Boolean)
        : cropsData.slice(0, 5);

    const handleSubmit = () => {
        setStep("results");
    };

    const crop = cropsData.find((c) => c.id === selectedCrop);

    return (
        <div className="pb-24">
            <div className="px-4 pt-4">
                <h1
                    className="text-2xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                >
                    🚛 गाड़ी बुलाएँ
                </h1>

                <AnimatePresence mode="wait">
                    {step === "form" ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-5"
                        >
                            {/* Field 1: Crop Selection */}
                            <div>
                                <label
                                    className="text-base font-bold mb-2 block"
                                    style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                                >
                                    {t("crop")} 🌾
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {cropOptions.map((c) => (
                                        <button
                                            key={c.id}
                                            onClick={() => setSelectedCrop(c.id)}
                                            className="flex items-center gap-2 px-4 py-3 rounded-xl border-0 cursor-pointer"
                                            style={{
                                                backgroundColor: selectedCrop === c.id ? "#FF6200" : "#FFFFFF",
                                                color: selectedCrop === c.id ? "#FFF" : "#1A1A2E",
                                                fontFamily: "var(--font-hindi)",
                                                border: selectedCrop === c.id ? "none" : "2px solid #E8E8E8",
                                                minHeight: "52px",
                                                fontWeight: "600",
                                            }}
                                        >
                                            <span className="text-xl">{c.emoji}</span>
                                            {c.nameHindi}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Field 2: Quantity */}
                            <div>
                                <label
                                    className="text-base font-bold mb-2 block"
                                    style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                                >
                                    {t("quantity")} ⚖️
                                </label>
                                <div className="flex items-center gap-4">
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-14 h-14 rounded-xl text-2xl font-bold border-0 cursor-pointer"
                                        style={{ backgroundColor: "#F5F5F5", color: "#1A1A2E" }}
                                    >
                                        −
                                    </motion.button>
                                    <div className="flex-1 text-center">
                                        <span
                                            className="text-3xl font-bold"
                                            style={{ color: "#FF6200", fontFamily: "var(--font-english)" }}
                                        >
                                            {quantity}
                                        </span>
                                        <span
                                            className="text-sm block mt-0.5"
                                            style={{ fontFamily: "var(--font-hindi)", color: "#666" }}
                                        >
                                            क्विंटल
                                        </span>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-14 h-14 rounded-xl text-2xl font-bold border-0 cursor-pointer"
                                        style={{ backgroundColor: "#F5F5F5", color: "#1A1A2E" }}
                                    >
                                        +
                                    </motion.button>
                                </div>
                            </div>

                            {/* Field 3: Date */}
                            <div>
                                <label
                                    className="text-base font-bold mb-2 block"
                                    style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                                >
                                    {t("when")} 📅
                                </label>
                                <div className="flex gap-2">
                                    {[
                                        { val: "tomorrow", label: "कल" },
                                        { val: "day_after", label: "परसों" },
                                        { val: "this_week", label: "इस हफ्ते" },
                                    ].map((d) => (
                                        <button
                                            key={d.val}
                                            onClick={() => setDate(d.val)}
                                            className="flex-1 px-4 py-3 rounded-xl border-0 cursor-pointer text-base font-bold"
                                            style={{
                                                backgroundColor: date === d.val ? "#046A38" : "#FFFFFF",
                                                color: date === d.val ? "#FFF" : "#1A1A2E",
                                                fontFamily: "var(--font-hindi)",
                                                border: date === d.val ? "none" : "2px solid #E8E8E8",
                                                minHeight: "52px",
                                            }}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleSubmit}
                                className="w-full py-4 rounded-xl text-lg font-bold cursor-pointer border-0"
                                style={{
                                    backgroundColor: "#FF6200",
                                    color: "#FFF",
                                    fontFamily: "var(--font-hindi)",
                                    minHeight: "64px",
                                    boxShadow: "0 4px 12px rgba(255,98,0,0.3)",
                                }}
                            >
                                {t("findVehicle")}
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <div className="rounded-xl p-3 mb-4" style={{ backgroundColor: "#E8F5E9", border: "1px solid #C8E6C9" }}>
                                <p className="text-sm" style={{ fontFamily: "var(--font-hindi)", color: "#046A38" }}>
                                    {crop?.emoji} {crop?.nameHindi} — {quantity} क्विंटल — {date === "tomorrow" ? "कल" : date === "day_after" ? "परसों" : "इस हफ्ते"}
                                </p>
                            </div>

                            {mockProviders.map((provider, i) => (
                                <motion.div
                                    key={provider.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="rounded-xl p-4"
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        border: "1px solid #E8E8E8",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3
                                                className="text-base font-bold"
                                                style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                                            >
                                                {provider.name}
                                            </h3>
                                            <p className="text-sm" style={{ color: "#666", fontFamily: "var(--font-hindi)" }}>
                                                {provider.vehicle}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold" style={{ color: "#FF6200" }}>
                                                {provider.rate}
                                            </p>
                                            <p className="text-xs" style={{ color: "#D4A017" }}>
                                                {"⭐".repeat(Math.floor(provider.rating))} {provider.rating}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <motion.a
                                            whileTap={{ scale: 0.95 }}
                                            href={`tel:${provider.phone}`}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold no-underline cursor-pointer"
                                            style={{
                                                backgroundColor: "#046A38",
                                                color: "#FFF",
                                                fontFamily: "var(--font-hindi)",
                                                minHeight: "52px",
                                            }}
                                        >
                                            <Phone size={18} />
                                            {t("call")}
                                        </motion.a>
                                        <motion.a
                                            whileTap={{ scale: 0.95 }}
                                            href={`https://wa.me/91${provider.phone}?text=${encodeURIComponent(`FarmIQ: ${crop?.nameHindi} ${quantity} क्विंटल, ${date === "tomorrow" ? "कल" : "इस हफ्ते"} चाहिए। कृपया भाव बताएँ।`)}`}
                                            target="_blank"
                                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold no-underline cursor-pointer"
                                            style={{
                                                backgroundColor: "#25D366",
                                                color: "#FFF",
                                                fontFamily: "var(--font-hindi)",
                                                minHeight: "52px",
                                            }}
                                        >
                                            <MessageCircle size={18} />
                                            WhatsApp
                                        </motion.a>
                                    </div>
                                </motion.div>
                            ))}

                            <button
                                onClick={() => setStep("form")}
                                className="w-full py-3 bg-transparent border-0 cursor-pointer text-base"
                                style={{ fontFamily: "var(--font-hindi)", color: "#FF6200" }}
                            >
                                ← वापस
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
