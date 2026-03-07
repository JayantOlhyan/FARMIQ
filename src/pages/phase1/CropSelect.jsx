import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mic, Star, Heart, MapPin, User, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/Header";

const farms = [
    {
        name: "हरी भरी खेती — उन्नाव", owner: "राम सिंह यादव", loc: "उन्नाव, उत्तर प्रदेश",
        img: "/images/farmer.png", rating: 4.8, price: "₹1,800 – ₹2,400 / क्विंटल",
    },
    {
        name: "जैविक बाग — नासिक", owner: "विजय पाटिल", loc: "नासिक, महाराष्ट्र",
        img: "/images/vegetables.png", rating: 4.8, price: "₹2,200 – ₹3,100 / क्विंटल",
    },
    {
        name: "सोनार खेत — जयपुर", owner: "हरजीत सिंह", loc: "जयपुर, राजस्थान",
        img: "/images/mustard.png", rating: 4.6, price: "₹4,800 – ₹5,400 / क्विंटल",
    },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function CropSelect() {
    const [activeTab, setActiveTab] = useState("farming");
    const navigate = useNavigate();

    return (
        <div className="pb-[88px] min-h-screen">
            <PageHeader title="फसल चुनें" />

            <div className="px-5 mt-2">
                {/* Toggle */}
                <div className="segmented-toggle mb-4">
                    <button className={`toggle-pill ${activeTab === "farming" ? "active" : ""}`} onClick={() => setActiveTab("farming")}>खेती</button>
                    <button className={`toggle-pill ${activeTab === "nursery" ? "active" : ""}`} onClick={() => setActiveTab("nursery")}>नर्सरी</button>
                </div>

                {/* Search */}
                <div className="relative mb-5">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="फसल या किसान खोजें..."
                        className="w-full h-[48px] rounded-[16px] bg-white pl-11 pr-12 text-[14px] text-[#1A1A1A] outline-none shadow-sm"
                        style={{ fontFamily: "var(--font-hindi)" }}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#F0F7F2]">
                        <Mic size={18} className="text-[#1B5E3B]" />
                    </button>
                </div>

                {/* Farm Cards */}
                <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-4">
                    {farms.map((farm, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            className="farmiq-card overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                            onClick={() => navigate("/crops/wheat")}
                        >
                            {/* Image */}
                            <div className="relative h-[180px]">
                                <img src={farm.img} alt={farm.name} className="w-full h-full object-cover" />
                                {/* Rating badge */}
                                <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                                    <Star size={13} fill="#F9A825" color="#F9A825" />
                                    <span className="text-[12px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-english)" }}>{farm.rating}</span>
                                </div>
                                {/* Heart */}
                                <button className="absolute top-3 right-3 w-[32px] h-[32px] bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                                    <Heart size={16} color="#C62828" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="text-[17px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-hindi)" }}>{farm.name}</h3>
                                <div className="flex items-center gap-4 mt-1.5">
                                    <div className="flex items-center gap-1 text-[13px] text-[#666]">
                                        <User size={14} /> <span style={{ fontFamily: "var(--font-hindi)" }}>{farm.owner}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[13px] text-[#666]">
                                        <MapPin size={14} /> <span style={{ fontFamily: "var(--font-hindi)" }}>{farm.loc}</span>
                                    </div>
                                </div>
                                <p className="text-[15px] font-bold text-[#1B5E3B] mt-2" style={{ fontFamily: "var(--font-english)" }}>{farm.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
