import React, { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { SlidersHorizontal, Share2, ArrowUp, ArrowDown, Minus } from "lucide-react";
import PageHeader from "../../components/common/Header";
import { SkeletonMandiCard } from "../../components/common/SkeletonCards";
import { shareMandiPrice } from "../../lib/share";

const mandiCrops = [
    { name: "गेहूँ (Wheat)", img: "/images/wheat.png", price: "₹2,150", dir: "up", msp: "₹2,015", mandi: "उन्नाव मंडी", accent: "#F9A825", season: "rabi" },
    { name: "धान (Rice)", img: "/images/rice.png", price: "₹1,890", dir: "down", msp: "₹2,183", mandi: "पटना मंडी", accent: "#1565C0", season: "kharif" },
    { name: "सरसों (Mustard)", img: "/images/mustard.png", price: "₹5,400", dir: "up", msp: "₹5,650", mandi: "जयपुर मंडी", accent: "#F57F17", season: "rabi" },
    { name: "गन्ना (Sugarcane)", img: "/images/sugarcane.png", price: "₹350", dir: "up", msp: "₹315", mandi: "लखनऊ मंडी", accent: "#2E7D32", season: "kharif" },
];

const seasonBadge = {
    kharif: { label: "खरीफ", bg: "#FF6200", color: "#FFF" },
    rabi: { label: "रबी", bg: "#1565C0", color: "#FFF" },
    zaid: { label: "ज़ायद", bg: "#F57F17", color: "#FFF" },
};

const priceStyle = {
    up: { color: "#2E7D32", icon: ArrowUp, label: "↑" },
    down: { color: "#C62828", icon: ArrowDown, label: "↓" },
    same: { color: "#666666", icon: Minus, label: "→" },
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };

export default function MandiRates() {
    const [activeTab, setActiveTab] = useState("kharif");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Pull-to-refresh (Sprint 2, Fix #2)
    const y = useMotionValue(0);
    const refreshOpacity = useTransform(y, [0, 80], [0, 1]);
    const refreshScale = useTransform(y, [0, 80], [0.5, 1]);

    const handleDragEnd = useCallback((_, info) => {
        if (info.offset.y > 80 && !isRefreshing) {
            setIsRefreshing(true);
            // Simulate refresh
            setTimeout(() => {
                setIsRefreshing(false);
                animate(y, 0);
            }, 1500);
        } else {
            animate(y, 0);
        }
    }, [isRefreshing, y]);

    const filteredCrops = mandiCrops.filter(c =>
        activeTab === "all" ? true : c.season === activeTab
    );

    return (
        <div className="pb-[88px] min-h-screen">
            <PageHeader title="सभी मंडी भाव" />

            {/* Pull-to-refresh indicator */}
            <motion.div
                style={{ opacity: refreshOpacity, scale: refreshScale }}
                className="flex items-center justify-center py-3 text-[#1B5E3B]"
            >
                <motion.span
                    animate={isRefreshing ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-xl mr-2"
                >
                    🌾
                </motion.span>
                <span className="text-[13px]" style={{ fontFamily: "var(--font-hindi)" }}>
                    {isRefreshing ? "अपडेट हो रहा है..." : "नीचे खींचकर अपडेट करें"}
                </span>
            </motion.div>

            <motion.div
                style={{ y }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 100 }}
                dragElastic={0.5}
                onDragEnd={handleDragEnd}
                className="px-5 mt-2"
            >
                {/* Segmented Toggle + Filter */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="segmented-toggle flex-1">
                        <button className={`toggle-pill ${activeTab === "kharif" ? "active" : ""}`} onClick={() => setActiveTab("kharif")}>खरीफ</button>
                        <button className={`toggle-pill ${activeTab === "rabi" ? "active" : ""}`} onClick={() => setActiveTab("rabi")}>रबी</button>
                    </div>
                    <button className="w-[44px] h-[44px] rounded-[14px] bg-white shadow flex items-center justify-center">
                        <SlidersHorizontal size={20} color="#1B5E3B" />
                    </button>
                </div>

                {/* Title row */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[17px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-hindi)" }}>आज के भाव</h2>
                    <button className="text-[13px] text-[#1B5E3B] font-semibold" style={{ fontFamily: "var(--font-hindi)" }}>सभी देखें</button>
                </div>

                {/* Loading state */}
                {loading ? (
                    <div className="flex flex-col gap-3">
                        {[1, 2, 3, 4].map(i => <SkeletonMandiCard key={i} />)}
                    </div>
                ) : (
                    /* Crop list */
                    <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
                        {filteredCrops.map((crop, i) => {
                            const ps = priceStyle[crop.dir] || priceStyle.same;
                            const badge = seasonBadge[crop.season];
                            const PriceIcon = ps.icon;

                            return (
                                <motion.div key={i} variants={fadeUp} className="farmiq-card flex overflow-hidden relative" style={{ borderRadius: 14 }}>
                                    {/* Seasonal badge (Sprint 2, Fix #6) */}
                                    {badge && (
                                        <div
                                            className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold z-10"
                                            style={{ backgroundColor: badge.bg, color: badge.color, fontFamily: "var(--font-hindi)" }}
                                        >
                                            {badge.label}
                                        </div>
                                    )}

                                    {/* Left accent bar */}
                                    <div className="w-[4px] flex-shrink-0" style={{ backgroundColor: crop.accent }} />

                                    {/* Crop image */}
                                    <div className="w-[72px] h-[90px] flex-shrink-0 overflow-hidden">
                                        <img src={crop.img} alt={crop.name} className="w-full h-full object-cover" loading="lazy" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 px-3 py-2 flex flex-col justify-center">
                                        <h3 className="text-[15px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-hindi)" }}>{crop.name}</h3>
                                        <span className="text-[12px] text-[#666] mt-0.5" style={{ fontFamily: "var(--font-hindi)" }}>आज का भाव</span>
                                        {/* Fix #8: Price colors with arrows */}
                                        <span className="text-[14px] font-bold mt-0.5 flex items-center gap-1" style={{ color: ps.color, fontFamily: "var(--font-english)" }}>
                                            <PriceIcon size={14} strokeWidth={3} />
                                            {crop.price}/क्विंटल
                                        </span>
                                        <span className="text-[11px] text-[#999] mt-0.5" style={{ fontFamily: "var(--font-hindi)" }}>
                                            MSP: {crop.msp} • {crop.mandi}
                                        </span>
                                    </div>

                                    {/* CTA + WhatsApp */}
                                    <div className="flex flex-col items-center justify-center gap-1.5 pr-3">
                                        <button
                                            className="px-3 py-2 bg-[#1B5E3B] text-white rounded-[10px] text-[13px] font-semibold whitespace-nowrap active:scale-95 transition-transform"
                                            style={{ fontFamily: "var(--font-hindi)" }}
                                        >
                                            भाव देखें
                                        </button>
                                        {/* WhatsApp share (Sprint 2, Fix #7) */}
                                        <button
                                            onClick={() => shareMandiPrice(crop.name, crop.price, crop.mandi)}
                                            className="w-[32px] h-[32px] rounded-full bg-[#25D366] flex items-center justify-center active:scale-95 transition-transform"
                                        >
                                            <Share2 size={14} color="#FFF" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
