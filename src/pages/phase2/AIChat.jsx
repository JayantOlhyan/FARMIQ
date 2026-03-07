import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Image, Star } from "lucide-react";
import useStore from "../../store/useStore";
import cropsData from "../../data/crops.json";
import { askGemini, PROMPT_P2_EXPERT } from "../../lib/gemini";

export default function AIChat() {
    const { myCrops, chatHistory, addChatMessage, bookmarkMessage, farmProfile } = useStore();
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const userCrops = myCrops.map((mc) => cropsData.find((c) => c.id === mc.cropId)).filter(Boolean);
    const activeCrop = userCrops[0] || cropsData[0];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setInput("");

        addChatMessage({ role: "user", content: userMsg, bookmarked: false });
        setLoading(true);

        try {
            const prompt = PROMPT_P2_EXPERT.user({
                cropName: activeCrop.nameEnglish,
                scientificName: activeCrop.scientificName,
                area: farmProfile.totalAcres,
                district: farmProfile.district,
                state: farmProfile.state,
                soilType: activeCrop.soilTypes[0],
                ph: "6.5",
                farmingType: farmProfile.farmingType,
                growthStage: activeCrop.stages[2]?.name || "vegetative",
                season: activeCrop.category,
                issueDescription: "General query",
                userQuestion: userMsg,
            });

            const response = await askGemini(prompt, PROMPT_P2_EXPERT.system);
            addChatMessage({ role: "assistant", content: response, bookmarked: false });
        } catch (err) {
            const errorMsg = err.message === "NO_API_KEY"
                ? "Add your Gemini API key in Settings to use AI features."
                : "AI is taking longer than usual. Retry?";
            addChatMessage({ role: "assistant", content: errorMsg, bookmarked: false });
        }
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickPrompts = [
        "What's the best IPM strategy for my crop?",
        "When should I apply the next fertilizer?",
        "How to improve soil health organically?",
        "Current market outlook for my crop",
    ];

    return (
        <div className="flex h-[calc(100vh-64px)] max-w-6xl mx-auto">
            {/* Sidebar - Context */}
            <div
                className="hidden lg:block w-72 border-r p-4 overflow-y-auto"
                style={{ backgroundColor: "#FAFBFC", borderColor: "#E8E8E8" }}
            >
                <h3 className="text-sm font-bold mb-3" style={{ color: "#1A1A2E" }}>📋 Context</h3>
                <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                        <p className="text-xs font-medium mb-1" style={{ color: "#999" }}>Active Crop</p>
                        <p className="font-medium">{activeCrop.emoji} {activeCrop.nameEnglish}</p>
                        <p className="text-xs italic" style={{ color: "#666" }}>{activeCrop.scientificName}</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                        <p className="text-xs font-medium mb-1" style={{ color: "#999" }}>Location</p>
                        <p className="font-medium">{farmProfile.district}, {farmProfile.state}</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                        <p className="text-xs font-medium mb-1" style={{ color: "#999" }}>Season</p>
                        <p className="font-medium">{activeCrop.category === "rabi" ? "Rabi" : "Kharif"}</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                        <p className="text-xs font-medium mb-1" style={{ color: "#999" }}>Farm Size</p>
                        <p className="font-medium">{farmProfile.totalAcres} acres</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                        <p className="text-xs font-medium mb-1" style={{ color: "#999" }}>Weather</p>
                        <p className="font-medium">☀️ 34°C — Clear</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col" style={{ backgroundColor: "#F9FAFB" }}>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {chatHistory.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <span className="text-6xl mb-4">🤖</span>
                            <h2 className="text-xl font-bold mb-2" style={{ color: "#1A1A2E" }}>
                                FarmIQ AI Consultant
                            </h2>
                            <p className="text-sm mb-6 max-w-md" style={{ color: "#666" }}>
                                Ask anything about your crops, soil health, pest management, market trends, or farming best practices.
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                                {quickPrompts.map((prompt) => (
                                    <motion.button
                                        key={prompt}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => { setInput(prompt); }}
                                        className="px-3 py-2 rounded-lg border-0 cursor-pointer text-sm"
                                        style={{ backgroundColor: "#E8F5E9", color: "#046A38" }}
                                    >
                                        {prompt}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}

                    {chatHistory.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className="max-w-lg rounded-xl px-4 py-3 relative group"
                                style={{
                                    backgroundColor: msg.role === "user" ? "#FF6200" : "#FFFFFF",
                                    color: msg.role === "user" ? "#FFF" : "#1A1A2E",
                                    border: msg.role === "assistant" ? "1px solid #C8E6C9" : "none",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                }}
                            >
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                {msg.role === "assistant" && (
                                    <button
                                        onClick={() => bookmarkMessage(msg.id)}
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer"
                                    >
                                        <Star size={14} fill={msg.bookmarked ? "#D4A017" : "none"} color={msg.bookmarked ? "#D4A017" : "#999"} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="rounded-xl px-4 py-3 flex items-center gap-2" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8" }}>
                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>●</motion.span>
                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>●</motion.span>
                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>●</motion.span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <div className="border-t px-4 py-3" style={{ backgroundColor: "#FFF", borderColor: "#E8E8E8" }}>
                    <div className="flex items-end gap-2 max-w-3xl mx-auto">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask anything about your farm..."
                            className="flex-1 rounded-xl px-4 py-3 text-sm border-0 outline-none resize-none"
                            style={{
                                backgroundColor: "#F5F5F5",
                                color: "#1A1A2E",
                                fontFamily: "var(--font-english)",
                                minHeight: "44px",
                                maxHeight: "120px",
                            }}
                            rows={1}
                        />
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            className="w-11 h-11 rounded-full flex items-center justify-center border-0 cursor-pointer"
                            style={{
                                backgroundColor: input.trim() ? "#FF6200" : "#E0E0E0",
                                color: "#FFF",
                            }}
                        >
                            <Send size={18} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}
