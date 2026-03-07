import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Plus } from "lucide-react";
import PageHeader from "../../components/common/Header";

const diaryEntries = [
    { img: "/images/wheat.png", time: "24 मई • शाम 5:43", text: "गेहूँ में दूसरी बार यूरिया डाला, 30 किलो प्रति एकड़" },
    { img: "/images/rice.png", time: "22 मई • सुबह 8:12", text: "धान की बुवाई के लिए खेत में पानी भरा, रोपाई कल करेंगे" },
    { img: "/images/vegetables.png", time: "20 मई • दोपहर 1:30", text: "सब्जियों में कीड़ा लगा है, नीम का तेल छिड़काव किया" },
    { img: "/images/mustard.png", time: "18 मई • शाम 6:00", text: "सरसों की कटाई पूरी हुई, 8 क्विंटल प्रति एकड़ उपज" },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

export default function WeatherDiary() {
    return (
        <div className="pb-[88px] min-h-screen">
            <PageHeader title="आज का मौसम" />

            <div className="px-5 mt-2">
                {/* Weather Card (dark green) */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-[16px] p-4 mb-5" style={{ background: "#1B5E3B" }}>
                    <div className="flex justify-between items-start">
                        <span className="text-[13px] text-white/80" style={{ fontFamily: "var(--font-hindi)" }}>
                            उन्नाव, उत्तर प्रदेश — 27 नव 2024
                        </span>
                        <span className="text-[24px]">☀️</span>
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

                {/* Diary Section */}
                <motion.div variants={stagger} initial="hidden" animate="visible">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[17px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-hindi)" }}>
                            मेरी डायरी 📒
                        </h2>
                        <button className="w-8 h-8 flex items-center justify-center">
                            <ChevronRight size={20} color="#1A1A1A" />
                        </button>
                    </div>

                    <div className="flex flex-col">
                        {diaryEntries.map((entry, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <div className="flex gap-3 py-3">
                                    <div className="w-[52px] h-[52px] rounded-[10px] overflow-hidden flex-shrink-0">
                                        <img src={entry.img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[12px] text-[#999]" style={{ fontFamily: "var(--font-hindi)" }}>{entry.time}</div>
                                        <p className="text-[14px] text-[#1A1A1A] mt-0.5 line-clamp-2" style={{ fontFamily: "var(--font-hindi)" }}>
                                            {entry.text}
                                        </p>
                                    </div>
                                </div>
                                {i < diaryEntries.length - 1 && <div className="border-b border-[#F0F0F0]" />}
                            </motion.div>
                        ))}
                    </div>

                    {/* Add entry button */}
                    <button className="w-full h-[56px] rounded-[16px] bg-[#1B5E3B] text-white font-bold text-[16px] mt-5 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform" style={{ fontFamily: "var(--font-hindi)" }}>
                        <Plus size={20} /> नई बात लिखें
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
