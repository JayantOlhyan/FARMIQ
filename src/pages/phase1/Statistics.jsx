import React from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import PageHeader from "../../components/common/Header";

const growthData = [
    { week: "सप्ताह 1", cm: 3.2 },
    { week: "सप्ताह 2", cm: 5.8 },
    { week: "सप्ताह 3", cm: 9.5 },
    { week: "सप्ताह 4", cm: 12.3 },
];

const communities = [
    { name: "गेहूँ किसान संघ", person: "राम सिंह", loc: "उन्नाव, उ.प्र.", img: "/images/wheat.png" },
    { name: "धान उगाने वाले", person: "सुरेश कुमार", loc: "पटना, बिहार", img: "/images/rice.png" },
    { name: "सरसों किसान ग्रुप", person: "हरजीत सिंह", loc: "अमृतसर, पंजाब", img: "/images/mustard.png" },
    { name: "गन्ना उत्पादक दल", person: "विजय पाटिल", loc: "नासिक, महाराष्ट्र", img: "/images/sugarcane.png" },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

function CustomDot({ cx, cy, index }) {
    return <text x={cx} y={cy - 12} textAnchor="middle" fontSize={16}>🌱</text>;
}

export default function Statistics() {
    return (
        <div className="pb-[88px] min-h-screen">
            <PageHeader title="आँकड़े" />

            <div className="px-5 mt-2">
                {/* Growth Chart */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" className="farmiq-card p-4 mb-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-hindi)" }}>फसल की बढ़त</h2>
                        <span className="text-[12px] text-[#666] border border-[#E0E0E0] rounded-full px-3 py-1" style={{ fontFamily: "var(--font-hindi)" }}>
                            साप्ताहिक ▾
                        </span>
                    </div>

                    <div className="relative">
                        <ResponsiveContainer width="100%" height={160}>
                            <AreaChart data={growthData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1B5E3B" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#1B5E3B" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="week"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#999", fontFamily: "var(--font-hindi)" }}
                                />
                                <Tooltip
                                    content={({ active, payload }) =>
                                        active && payload?.length ? (
                                            <div className="bg-white px-3 py-1.5 rounded-lg shadow text-[13px] font-semibold" style={{ fontFamily: "var(--font-hindi)" }}>
                                                🌾 {payload[0].value} सेमी
                                            </div>
                                        ) : null
                                    }
                                />
                                <Area
                                    type="monotone"
                                    dataKey="cm"
                                    stroke="#1B5E3B"
                                    strokeWidth={2.5}
                                    fill="url(#greenFill)"
                                    dot={<CustomDot />}
                                />
                            </AreaChart>
                        </ResponsiveContainer>

                        {/* Floating label */}
                        <div className="absolute top-[12px] right-[20%] bg-white border border-[#E8F5E9] rounded-lg px-2 py-0.5 shadow-sm">
                            <span className="text-[12px] font-bold text-[#1B5E3B]" style={{ fontFamily: "var(--font-hindi)" }}>🌾 12.3 सेमी</span>
                        </div>
                    </div>
                </motion.div>

                {/* Community */}
                <motion.div variants={stagger} initial="hidden" animate="visible">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-hindi)" }}>किसान समुदाय</h2>
                        <button className="text-[13px] text-[#1B5E3B] font-semibold" style={{ fontFamily: "var(--font-hindi)" }}>सभी देखें</button>
                    </div>

                    <div className="farmiq-card divide-y divide-[#F5F5F5]">
                        {communities.map((c, i) => (
                            <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 px-4 py-3">
                                <div className="w-[44px] h-[44px] rounded-[10px] overflow-hidden flex-shrink-0">
                                    <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate" style={{ fontFamily: "var(--font-hindi)" }}>{c.name}</div>
                                    <div className="text-[12px] text-[#999]" style={{ fontFamily: "var(--font-hindi)" }}>{c.person} • {c.loc}</div>
                                </div>
                                <button className="px-4 py-1.5 border-[1.5px] border-[#1B5E3B] rounded-full text-[13px] text-[#1B5E3B] font-semibold whitespace-nowrap active:scale-95 transition-transform" style={{ fontFamily: "var(--font-hindi)" }}>
                                    जुड़ें
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
