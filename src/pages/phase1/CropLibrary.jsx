import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Search, Mic } from "lucide-react";
import cropsData from "../../data/crops.json";
import useStore from "../../store/useStore";

const filters = [
    { key: "all", label: "सभी" },
    { key: "kharif", label: "खरीफ" },
    { key: "rabi", label: "रबी" },
    { key: "vegetables", label: "सब्जियाँ" },
];

export default function CropLibrary() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userMode } = useStore();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredCrops = cropsData.filter((crop) => {
        const matchesSearch =
            crop.nameHindi.includes(search) ||
            crop.nameEnglish.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
            filter === "all" || crop.category === filter;
        return matchesSearch && matchesFilter;
    });

    const isP1 = userMode === "phase1";

    return (
        <div className="pb-24">
            {/* Search Bar */}
            <div className="px-4 pt-4 mb-4">
                <div
                    className="flex items-center gap-2 rounded-xl px-4"
                    style={{
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #E8E8E8",
                        height: isP1 ? "56px" : "48px",
                    }}
                >
                    <Search size={20} color="#999" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t("searchCrop")}
                        className="flex-1 border-0 outline-none bg-transparent text-base"
                        style={{
                            fontFamily: isP1 ? "var(--font-hindi)" : "var(--font-english)",
                            fontSize: isP1 ? "16px" : "14px",
                            color: "#1A1A2E",
                        }}
                    />
                    <button
                        className="p-2 rounded-full border-0 cursor-pointer"
                        style={{ backgroundColor: "#FF6200" }}
                        aria-label="Voice search"
                    >
                        <Mic size={18} color="white" />
                    </button>
                </div>
            </div>

            {/* Filter Chips */}
            <div className="px-4 mb-4">
                <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className="flex-shrink-0 px-4 py-2 rounded-full border-0 text-sm font-bold cursor-pointer"
                            style={{
                                backgroundColor: filter === f.key ? "#FF6200" : "#F5F5F5",
                                color: filter === f.key ? "#FFFFFF" : "#666",
                                fontFamily: "var(--font-hindi)",
                                minHeight: "40px",
                            }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Crop Grid */}
            <div className="px-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {filteredCrops.map((crop, i) => (
                        <motion.div
                            key={crop.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(`/crops/${crop.id}`)}
                            className="flex flex-col items-center justify-center cursor-pointer rounded-xl"
                            style={{
                                minHeight: isP1 ? "160px" : "140px",
                                backgroundColor: "#FFFFFF",
                                border: "2px solid #E8E8E8",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            }}
                        >
                            <span className="text-5xl mb-2">{crop.emoji}</span>
                            <span
                                className="text-base font-bold text-center"
                                style={{
                                    fontFamily: isP1 ? "var(--font-hindi)" : "var(--font-english)",
                                    color: "#1A1A2E",
                                }}
                            >
                                {isP1 ? crop.nameHindi : crop.nameEnglish}
                            </span>
                            {!isP1 && (
                                <span className="text-xs italic mt-1" style={{ color: "#999" }}>
                                    {crop.scientificName}
                                </span>
                            )}
                            <span
                                className="text-xs px-2 py-0.5 rounded-full mt-1"
                                style={{
                                    backgroundColor:
                                        crop.category === "rabi" ? "#E3F2FD" :
                                            crop.category === "kharif" ? "#FFF3E0" : "#E8F5E9",
                                    color: "#666",
                                    fontFamily: "var(--font-hindi)",
                                }}
                            >
                                {crop.category === "rabi" ? "रबी" : crop.category === "kharif" ? "खरीफ" : "सब्जी"}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
