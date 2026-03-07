import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useStore from "../../store/useStore";
import cropsData from "../../data/crops.json";
import { askGemini, PROMPT_P1_DAILY_TIP } from "../../lib/gemini";

// Generate mock price history
function genPriceHistory(cropId, days = 30) {
    const base = { gehun: 2200, dhan: 2100, kapas: 7000, ganna: 350, tamatar: 2500, aalu: 1200, haldi: 8500, mirch: 6000, sarson: 5500, moong: 7800 };
    const b = base[cropId] || 2000;
    return Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        price: b + Math.floor(Math.sin(i / 5) * 150 + Math.random() * 100 - 50),
        date: new Date(Date.now() - (days - i) * 86400000).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    }));
}

export default function DashboardP2() {
    const navigate = useNavigate();
    const { myCrops, farmProfile, dailyTip, setDailyTip, dailyTipDate } = useStore();
    const [aiBrief, setAiBrief] = useState("");
    const [briefLoading, setBriefLoading] = useState(false);

    const userCrops = myCrops.length > 0
        ? myCrops.map((mc) => cropsData.find((c) => c.id === mc.cropId)).filter(Boolean)
        : cropsData.slice(0, 3);

    const topCrops = userCrops.slice(0, 3);
    const priceData = useMemo(() => genPriceHistory(topCrops[0]?.id || "gehun"), [topCrops]);

    useEffect(() => {
        const today = new Date().toDateString();
        if (dailyTipDate === today && dailyTip) {
            setAiBrief(dailyTip);
            return;
        }
        const fetchBrief = async () => {
            setBriefLoading(true);
            try {
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const cropNames = topCrops.map(c => c.nameEnglish).join(", ");
                const prompt = PROMPT_P1_DAILY_TIP.user({ month: months[new Date().getMonth()], cropNames: cropNames, state: farmProfile.state, weather: "Normal" });
                const res = await askGemini(prompt, PROMPT_P1_DAILY_TIP.system);
                setAiBrief(res);
                setDailyTip(res);
            } catch {
                setAiBrief("Check soil moisture and plan irrigation for the week.");
            }
            setBriefLoading(false);
        };
        fetchBrief();
    }, []);

    return (
        <div className="pb-8 max-w-6xl mx-auto">
            <div className="px-4 pt-4">
                <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-english)", color: "#1A1A2E" }}>
                    Dashboard
                </h1>
                <p className="text-sm mb-6" style={{ color: "#666" }}>
                    Welcome back! Here's your farm overview.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Column 1: Farm Overview */}
                    <div className="space-y-4">
                        <div className="rounded-xl p-5" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <h2 className="text-base font-bold mb-3" style={{ color: "#1A1A2E" }}>🌾 My Farm</h2>
                            <div className="space-y-2 text-sm" style={{ color: "#666" }}>
                                <p><strong>Location:</strong> {farmProfile.district}, {farmProfile.state}</p>
                                <p><strong>Total Area:</strong> {farmProfile.totalAcres} acres</p>
                                <p><strong>Crops:</strong> {userCrops.length} active</p>
                                <p><strong>Type:</strong> {farmProfile.farmingType}</p>
                            </div>
                        </div>

                        {/* Crop Health */}
                        <div className="rounded-xl p-5" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <h2 className="text-base font-bold mb-3" style={{ color: "#1A1A2E" }}>🌿 Crop Health</h2>
                            <div className="space-y-2">
                                {userCrops.map((crop) => (
                                    <motion.div
                                        key={crop.id}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate(`/crops/${crop.id}`)}
                                        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50"
                                    >
                                        <span className="text-2xl">{crop.emoji}</span>
                                        <span className="text-sm font-medium flex-1">{crop.nameEnglish}</span>
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4CAF50" }} />
                                        <span className="text-xs" style={{ color: "#4CAF50" }}>Healthy</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Tasks */}
                        <div className="rounded-xl p-5" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <h2 className="text-base font-bold mb-3" style={{ color: "#1A1A2E" }}>📋 Upcoming Tasks</h2>
                            <div className="space-y-2">
                                {[
                                    { task: "Apply second dose of urea", crop: topCrops[0]?.nameEnglish, due: "Today", urgent: true },
                                    { task: "Check for aphid infestation", crop: topCrops[0]?.nameEnglish, due: "Tomorrow", urgent: false },
                                    { task: "Irrigation scheduled", crop: topCrops[1]?.nameEnglish || "Wheat", due: "In 3 days", urgent: false },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg" style={{ backgroundColor: item.urgent ? "#FFF3E0" : "#F9F9F9" }}>
                                        <span className="text-xs mt-0.5">{item.urgent ? "🔴" : "🟡"}</span>
                                        <div>
                                            <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{item.task}</p>
                                            <p className="text-xs" style={{ color: "#999" }}>{item.crop} • {item.due}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Analytics */}
                    <div className="space-y-4">
                        <div className="rounded-xl p-5" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <h2 className="text-base font-bold mb-3" style={{ color: "#1A1A2E" }}>
                                📊 Mandi Price Trend — {topCrops[0]?.nameEnglish}
                            </h2>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={priceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                    <YAxis tick={{ fontSize: 10 }} />
                                    <Tooltip
                                        formatter={(value) => [`₹${value}`, "Price"]}
                                        contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                                    />
                                    <Line type="monotone" dataKey="price" stroke="#FF6200" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Profit Estimator */}
                        <div className="rounded-xl p-5" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <h2 className="text-base font-bold mb-3" style={{ color: "#1A1A2E" }}>💰 Profit Estimator</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: "#E8F5E9" }}>
                                    <p className="text-xl font-bold" style={{ color: "#046A38" }}>₹{priceData[priceData.length - 1]?.price}</p>
                                    <p className="text-xs" style={{ color: "#666" }}>Current Price/q</p>
                                </div>
                                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: "#FFF3E0" }}>
                                    <p className="text-xl font-bold" style={{ color: "#FF6200" }}>₹{(priceData[priceData.length - 1]?.price * 20).toLocaleString()}</p>
                                    <p className="text-xs" style={{ color: "#666" }}>Est. Revenue (20q)</p>
                                </div>
                            </div>
                        </div>

                        {/* Weather */}
                        <div className="rounded-xl p-5" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <h2 className="text-base font-bold mb-3" style={{ color: "#1A1A2E" }}>🌤️ Weather Impact</h2>
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">☀️</span>
                                <div>
                                    <p className="text-lg font-bold" style={{ color: "#1A1A2E" }}>34°C</p>
                                    <p className="text-sm" style={{ color: "#666" }}>Clear sky • Humidity 45%</p>
                                    <p className="text-xs mt-1" style={{ color: "#FF6200" }}>⚠️ High temp — increase irrigation frequency</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: AI Insights */}
                    <div className="space-y-4">
                        <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, #046A38 0%, #000080 100%)", boxShadow: "0 4px 16px rgba(4,106,56,0.2)" }}>
                            <h2 className="text-base font-bold mb-3 text-white">🤖 Daily AI Brief</h2>
                            {briefLoading ? (
                                <div className="animate-pulse space-y-2">
                                    <div className="h-3 bg-white/20 rounded w-full" />
                                    <div className="h-3 bg-white/20 rounded w-3/4" />
                                    <div className="h-3 bg-white/20 rounded w-5/6" />
                                </div>
                            ) : (
                                <p className="text-sm leading-relaxed text-white/90">{aiBrief}</p>
                            )}
                            <button
                                onClick={() => navigate("/chat")}
                                className="mt-3 px-4 py-2 rounded-lg text-sm font-medium border-0 cursor-pointer"
                                style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#FFF" }}
                            >
                                Ask follow-up →
                            </button>
                        </div>

                        {/* Risk Alerts */}
                        <div className="rounded-xl p-5" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <h2 className="text-base font-bold mb-3" style={{ color: "#1A1A2E" }}>⚠️ Risk Alerts</h2>
                            <div className="space-y-2">
                                <div className="p-3 rounded-lg" style={{ backgroundColor: "#FFF3E0", borderLeft: "4px solid #FF6200" }}>
                                    <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>Aphid outbreak expected</p>
                                    <p className="text-xs" style={{ color: "#666" }}>Based on current temperature and humidity patterns</p>
                                </div>
                                <div className="p-3 rounded-lg" style={{ backgroundColor: "#E3F2FD", borderLeft: "4px solid #1976D2" }}>
                                    <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>Price spike forecast</p>
                                    <p className="text-xs" style={{ color: "#666" }}>{topCrops[0]?.nameEnglish} prices may rise 5-8% next week</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Nav */}
                        <div className="grid grid-cols-2 gap-3">
                            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate("/chat")} className="py-4 rounded-xl text-sm font-bold border-0 cursor-pointer" style={{ backgroundColor: "#FF6200", color: "#FFF" }}>
                                💬 AI Chat
                            </motion.button>
                            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate("/mandi")} className="py-4 rounded-xl text-sm font-bold border-0 cursor-pointer" style={{ backgroundColor: "#046A38", color: "#FFF" }}>
                                📊 Mandi
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
