import { motion } from "framer-motion";
import { Search, Mic, ChevronDown, Clock, FlaskConical, Bug, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FarmIQLogo from "../../components/common/FarmIQLogo";

const quickActions = [
    { icon: Clock, label: "बुवाई", color: "#FF9933", bg: "#FFF3E0" },
    { icon: FlaskConical, label: "खाद", color: "#1B5E3B", bg: "#E8F5E9" },
    { icon: Bug, label: "कीड़े", color: "#C62828", bg: "#FFEBEE" },
    { icon: BarChart3, label: "मंडी", color: "#1B5E3B", bg: "#E8F5E9" },
];

const myCrops = [
    { name: "गेहूँ", img: "/images/wheat.png" },
    { name: "धान", img: "/images/rice.png" },
    { name: "सरसों", img: "/images/mustard.png" },
    { name: "गन्ना", img: "/images/sugarcane.png" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function HomeScreen() {
    const navigate = useNavigate();
    const today = new Date();
    const dateStr = today.toLocaleDateString("hi-IN", { day: "numeric", month: "long", year: "numeric", weekday: "long" });

    return (
        <div className="pb-[88px]">
            {/* Green Header */}
            <div className="green-header rounded-b-[24px]">
                <div className="flex items-center justify-between mb-3">
                    <FarmIQLogo variant="green" size="md" />
                    <div className="w-[44px] h-[44px] rounded-full overflow-hidden border-2 border-white/30">
                        <img src="/images/farmer.png" alt="farmer" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                    <span className="text-[13px] text-white/80" style={{ fontFamily: "var(--font-hindi)" }}>
                        🙏 नमस्ते, किसान भाई! • {dateStr}
                    </span>
                </div>

                {/* Search Bar */}
                <div className="relative mt-2">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="फसल खोजें..."
                        className="w-full h-[48px] rounded-[16px] bg-white pl-11 pr-12 text-[14px] text-[#1A1A1A] outline-none"
                        style={{ fontFamily: "var(--font-hindi)" }}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#F0F7F2]">
                        <Mic size={18} className="text-[#1B5E3B]" />
                    </button>
                </div>
            </div>

            <div className="px-5 mt-5">
                {/* Weather Card */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="farmiq-card p-4 mb-5"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1 text-[13px] text-[#666]" style={{ fontFamily: "var(--font-hindi)" }}>
                            <span>📍</span> उन्नाव, उत्तर प्रदेश
                        </div>
                        <span className="text-[28px]">🌙☁️</span>
                    </div>
                    <div className="flex items-end justify-between mt-1">
                        <div>
                            <span className="text-[48px] font-bold text-[#1A1A1A] leading-none" style={{ fontFamily: "var(--font-english)" }}>
                                +33°C
                            </span>
                        </div>
                        <span className="text-[13px] text-[#666] mb-2" style={{ fontFamily: "var(--font-english)" }}>
                            H: 36°C / L: 28°C
                        </span>
                    </div>

                    {/* 4 stats */}
                    <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-[#F0F0F0]">
                        {[
                            { val: "76%", label: "नमी" },
                            { val: "12%", label: "बारिश" },
                            { val: "1013", label: "दबाव" },
                            { val: "8km/h", label: "हवा" },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-[15px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-english)" }}>{s.val}</div>
                                <div className="text-[12px] text-[#666]" style={{ fontFamily: "var(--font-hindi)" }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Sunrise/Sunset */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F0F0F0]">
                        <span className="text-[12px] text-[#666]" style={{ fontFamily: "var(--font-hindi)" }}>🌅 5:42 am सूर्योदय</span>
                        <div className="flex-1 mx-3 h-[2px] border-t-2 border-dashed border-[#F9A825] relative">
                            <span className="absolute top-[-10px] left-1/2 -translate-x-1/2 text-[14px]">☀️</span>
                        </div>
                        <span className="text-[12px] text-[#666]" style={{ fontFamily: "var(--font-hindi)" }}>🌇 7:18 pm सूर्यास्त</span>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={stagger} initial="hidden" animate="visible">
                    <h2 className="text-[17px] font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-hindi)" }}>
                        जल्दी जानें
                    </h2>
                    <div className="grid grid-cols-4 gap-3 mb-5">
                        {quickActions.map((a, i) => (
                            <motion.button
                                key={i}
                                variants={fadeUp}
                                onClick={() => {
                                    if (a.label === "मंडी") navigate("/mandi");
                                    else if (a.label === "बुवाई") navigate("/crops");
                                }}
                                className="farmiq-card flex flex-col items-center justify-center py-4 min-h-[72px] active:scale-95 transition-transform"
                            >
                                <div className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center mb-2" style={{ backgroundColor: a.bg }}>
                                    <a.icon size={22} color={a.color} />
                                </div>
                                <span className="text-[12px] text-[#1A1A1A] font-medium" style={{ fontFamily: "var(--font-hindi)" }}>
                                    {a.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* My Crops */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-[17px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-hindi)" }}>
                            मेरी फसलें
                        </h2>
                        <button
                            onClick={() => navigate("/crops")}
                            className="text-[13px] text-[#1B5E3B] font-semibold"
                            style={{ fontFamily: "var(--font-hindi)" }}
                        >
                            सभी देखें
                        </button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                        {myCrops.map((crop, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(`/crops/${crop.name === "गेहूँ" ? "wheat" : crop.name === "धान" ? "rice" : crop.name === "सरसों" ? "mustard" : "sugarcane"}`)}
                                className="flex-shrink-0 rounded-[12px] overflow-hidden shadow-sm active:scale-95 transition-transform"
                                style={{ width: 140, height: 100 }}
                            >
                                <img src={crop.img} alt={crop.name} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Dark Green AI Tip Card */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className="mt-5 rounded-[16px] p-4"
                    style={{ background: "#1B5E3B" }}
                >
                    <div className="flex justify-between items-start">
                        <span className="text-[13px] text-white/80" style={{ fontFamily: "var(--font-hindi)" }}>
                            उन्नाव, उत्तर प्रदेश — {today.toLocaleDateString("hi-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span className="text-[18px]">☀️</span>
                    </div>
                    <div className="flex items-end gap-3 mt-2">
                        <span className="text-[40px] font-bold text-white leading-none" style={{ fontFamily: "var(--font-english)" }}>33°C</span>
                        <span className="text-[15px] text-white/80 mb-1" style={{ fontFamily: "var(--font-hindi)" }}>बादल छाए हैं</span>
                    </div>
                    <div className="text-[14px] text-white/70 mt-1" style={{ fontFamily: "var(--font-english)" }}>Humidity 76%</div>
                    <div className="border-t border-white/20 mt-3 pt-3">
                        <p className="text-[14px] text-white italic" style={{ fontFamily: "var(--font-hindi)" }}>
                            AI tip: आज गेहूँ में पानी देना अच्छा रहेगा। 💧
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
