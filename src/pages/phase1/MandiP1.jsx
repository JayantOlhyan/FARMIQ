import React, { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import PageHeader from "../../components/common/Header";

const mandiCrops = [
    { name: "गेहूँ (Wheat)", img: "/images/wheat.png", price: "₹2,150", dir: "up", msp: "₹2,015", mandi: "उन्नाव मंडी", accent: "#F9A825" },
    { name: "धान (Rice)", img: "/images/rice.png", price: "₹1,890", dir: "down", msp: "₹2,183", mandi: "पटना मंडी", accent: "#1565C0" },
    { name: "सरसों (Mustard)", img: "/images/mustard.png", price: "₹5,400", dir: "up", msp: "₹5,650", mandi: "जयपुर मंडी", accent: "#F57F17" },
    { name: "गन्ना (Sugarcane)", img: "/images/sugarcane.png", price: "₹350", dir: "up", msp: "₹315", mandi: "लखनऊ मंडी", accent: "#2E7D32" },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };

export default function MandiRates() {
    const [activeTab, setActiveTab] = useState("kharif");

    return (
        <div className="pb-[88px] min-h-screen">
            <PageHeader title="सभी मंडी भाव" />

            <div className="px-5 mt-2">
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

                {/* Crop list */}
                <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-3">
                    {mandiCrops.map((crop, i) => (
                        <motion.div key={i} variants={fadeUp} className="farmiq-card flex overflow-hidden" style={{ borderRadius: 14 }}>
                            {/* Left accent bar */}
                            <div className="w-[4px] flex-shrink-0" style={{ backgroundColor: crop.accent }} />

                            {/* Crop image */}
                            <div className="w-[72px] h-[90px] flex-shrink-0 overflow-hidden">
                                <img src={crop.img} alt={crop.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 px-3 py-2 flex flex-col justify-center">
                                <h3 className="text-[15px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-hindi)" }}>{crop.name}</h3>
                                <span className="text-[12px] text-[#666] mt-0.5" style={{ fontFamily: "var(--font-hindi)" }}>आज का भाव</span>
                                <span className={`text-[14px] font-bold mt-0.5 ${crop.dir === "up" ? "price-up" : "price-down"}`} style={{ fontFamily: "var(--font-english)" }}>
                                    {crop.dir === "up" ? "↑" : "↓"} {crop.price}/क्विंटल
                                </span>
                                <span className="text-[11px] text-[#999] mt-0.5" style={{ fontFamily: "var(--font-hindi)" }}>
                                    MSP: {crop.msp} • {crop.mandi}
                                </span>
                            </div>

                            {/* CTA */}
                            <div className="flex items-center pr-3">
                                <button className="px-3 py-2 bg-[#1B5E3B] text-white rounded-[10px] text-[13px] font-semibold whitespace-nowrap active:scale-95 transition-transform" style={{ fontFamily: "var(--font-hindi)" }}>
                                    भाव देखें
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
