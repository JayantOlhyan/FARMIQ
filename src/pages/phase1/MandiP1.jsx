import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useStore from "../../store/useStore";
import cropsData from "../../data/crops.json";

// Mock mandi data (fallback when API unavailable)
function generateMockPrices(cropId) {
    const basePrices = {
        gehun: 2150, dhan: 2100, kapas: 7000, ganna: 350, tamatar: 2500,
        aalu: 1200, haldi: 8500, mirch: 6000, sarson: 5500, moong: 7800,
    };
    const base = basePrices[cropId] || 2000;
    const prices = [];
    const days = ["सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "रवि"];
    for (let i = 6; i >= 0; i--) {
        const variance = Math.floor(Math.random() * 200) - 100;
        prices.push({
            day: days[6 - i],
            price: base + variance,
            date: new Date(Date.now() - i * 86400000).toLocaleDateString("hi-IN"),
        });
    }
    return prices;
}

export default function MandiP1() {
    const { t } = useTranslation();
    const { myCrops, userMode } = useStore();
    const isP1 = userMode === "phase1";

    const availableCrops = myCrops.length > 0
        ? myCrops.map((mc) => cropsData.find((c) => c.id === mc.cropId)).filter(Boolean)
        : cropsData.slice(0, 4);

    const [selectedCrop, setSelectedCrop] = useState(availableCrops[0]?.id || "gehun");
    const [selectedMandi, setSelectedMandi] = useState("उन्नाव मंडी");

    const mandis = ["उन्नाव मंडी", "लखनऊ मंडी", "कानपुर मंडी", "आगरा मंडी", "वाराणसी मंडी"];

    const prices = useMemo(() => generateMockPrices(selectedCrop), [selectedCrop]);
    const todayPrice = prices[prices.length - 1]?.price || 0;
    const yesterdayPrice = prices[prices.length - 2]?.price || 0;
    const priceDiff = todayPrice - yesterdayPrice;
    const maxPrice = Math.max(...prices.map((p) => p.price));
    const minPrice = Math.min(...prices.map((p) => p.price));
    const maxDay = prices.find((p) => p.price === maxPrice)?.day;

    const crop = cropsData.find((c) => c.id === selectedCrop);

    const shareWhatsApp = () => {
        const text = `FarmIQ: ${crop?.nameHindi} का भाव ${selectedMandi} में आज ₹${todayPrice}/क्विंटल है। — farmiq.app`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <div className="pb-24">
            <div className="px-4 pt-4">
                <h1
                    className="text-2xl font-bold mb-4"
                    style={{
                        fontFamily: isP1 ? "var(--font-hindi)" : "var(--font-english)",
                        color: "#1A1A2E",
                    }}
                >
                    {isP1 ? "📊 मंडी भाव" : "Mandi Rates"}
                </h1>

                {/* Crop Selector */}
                <div className="flex gap-2 overflow-x-auto mb-4" style={{ scrollbarWidth: "none" }}>
                    {availableCrops.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setSelectedCrop(c.id)}
                            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border-0 cursor-pointer"
                            style={{
                                backgroundColor: selectedCrop === c.id ? "#FF6200" : "#F5F5F5",
                                color: selectedCrop === c.id ? "#FFF" : "#666",
                                fontFamily: "var(--font-hindi)",
                                fontSize: "14px",
                                fontWeight: "600",
                                minHeight: "44px",
                            }}
                        >
                            <span>{c.emoji}</span>
                            {c.nameHindi}
                        </button>
                    ))}
                </div>

                {/* Mandi Selector */}
                <div className="flex gap-2 overflow-x-auto mb-6" style={{ scrollbarWidth: "none" }}>
                    {mandis.map((m) => (
                        <button
                            key={m}
                            onClick={() => setSelectedMandi(m)}
                            className="flex-shrink-0 px-3 py-2 rounded-lg border-0 cursor-pointer text-xs font-medium"
                            style={{
                                backgroundColor: selectedMandi === m ? "#046A38" : "#E8F5E9",
                                color: selectedMandi === m ? "#FFF" : "#046A38",
                                fontFamily: "var(--font-hindi)",
                                minHeight: "36px",
                            }}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                {/* HUGE Price Display */}
                <motion.div
                    key={`${selectedCrop}-${selectedMandi}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl p-6 text-center mb-4"
                    style={{
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #E8E8E8",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    }}
                >
                    <p className="text-sm mb-1" style={{ fontFamily: "var(--font-hindi)", color: "#666" }}>
                        {crop?.emoji} {crop?.nameHindi} — {selectedMandi}
                    </p>
                    <p
                        className="font-bold mb-2"
                        style={{
                            fontSize: isP1 ? "48px" : "36px",
                            color: "#FF6200",
                            fontFamily: isP1 ? "var(--font-hindi)" : "var(--font-english)",
                        }}
                    >
                        ₹{todayPrice}
                    </p>
                    <p className="text-sm" style={{ fontFamily: "var(--font-hindi)", color: "#666" }}>
                        {t("perQuintal")}
                    </p>
                    <div className="mt-2">
                        <span
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold"
                            style={{
                                backgroundColor: priceDiff >= 0 ? "#E8F5E9" : "#FFEBEE",
                                color: priceDiff >= 0 ? "#046A38" : "#C0392B",
                            }}
                        >
                            {priceDiff >= 0 ? "↑" : "↓"} ₹{Math.abs(priceDiff)} {priceDiff >= 0 ? t("priceUp") : t("priceDown")}
                        </span>
                    </div>
                    <p className="text-xs mt-2" style={{ color: "#999" }}>
                        10 मिनट {t("lastUpdated")}
                    </p>
                </motion.div>

                {/* Week View — Bar Chart */}
                <div
                    className="rounded-xl p-4 mb-4"
                    style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}
                >
                    <h3 className="text-base font-bold mb-3" style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}>
                        इस हफ्ते का भाव 📈
                    </h3>
                    <div className="flex items-end justify-between gap-2" style={{ height: "120px" }}>
                        {prices.map((p, i) => {
                            const height = ((p.price - minPrice) / (maxPrice - minPrice || 1)) * 80 + 20;
                            const isToday = i === prices.length - 1;
                            return (
                                <div key={i} className="flex flex-col items-center flex-1">
                                    <span className="text-xs mb-1" style={{ color: "#666", fontSize: "10px" }}>
                                        ₹{p.price}
                                    </span>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}px` }}
                                        transition={{ delay: i * 0.05, duration: 0.4 }}
                                        className="w-full rounded-t-md"
                                        style={{
                                            backgroundColor: isToday ? "#FF6200" : "#C8E6C9",
                                            minWidth: "24px",
                                        }}
                                    />
                                    <span
                                        className="text-xs mt-1 font-medium"
                                        style={{
                                            color: isToday ? "#FF6200" : "#666",
                                            fontFamily: "var(--font-hindi)",
                                            fontSize: "11px",
                                        }}
                                    >
                                        {p.day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-xs text-center mt-3" style={{ fontFamily: "var(--font-hindi)", color: "#666" }}>
                        {t("weekHighest")}: {maxDay}
                    </p>
                </div>

                {/* WhatsApp Share */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={shareWhatsApp}
                    className="w-full py-4 rounded-xl text-base font-bold cursor-pointer border-0"
                    style={{
                        backgroundColor: "#25D366",
                        color: "#FFF",
                        fontFamily: "var(--font-hindi)",
                        minHeight: "64px",
                    }}
                >
                    {t("shareMandi")}
                </motion.button>
            </div>
        </div>
    );
}
