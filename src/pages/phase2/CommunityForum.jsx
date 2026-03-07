import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, Search } from "lucide-react";

const mockPosts = [
    {
        id: 1,
        author: "किशन सिंह",
        avatar: "👨‍🌾",
        tag: "pest",
        tagLabel: "कीड़े",
        title: "गेहूँ में माहू (Aphid) की समस्या — क्या करें?",
        body: "मेरे गेहूँ के खेत में माहू लग रही है। पत्तियाँ चिपचिपी हो रही हैं। कोई सरल इलाज बताएँ।",
        answers: 3,
        likes: 12,
        time: "2 घंटे पहले",
        verified: true,
    },
    {
        id: 2,
        author: "प्रमिला देवी",
        avatar: "👩‍🌾",
        tag: "market",
        tagLabel: "मंडी",
        title: "टमाटर का भाव कब बढ़ेगा?",
        body: "पिछले 2 हफ्ते से टमाटर का भाव बहुत कम है। क्या इंतज़ार करें या बेच दें?",
        answers: 5,
        likes: 8,
        time: "5 घंटे पहले",
        verified: false,
    },
    {
        id: 3,
        author: "Arjun Mehta",
        avatar: "🧑‍💻",
        tag: "technique",
        tagLabel: "Technique",
        title: "Drip irrigation setup cost for 2 acres?",
        body: "Planning to set up drip irrigation for my tomato farm. What's the approximate cost and best brands available in Maharashtra?",
        answers: 7,
        likes: 23,
        time: "1 day ago",
        verified: true,
    },
    {
        id: 4,
        author: "सुरेश पटेल",
        avatar: "👨‍🌾",
        tag: "disease",
        tagLabel: "रोग",
        title: "आलू में पछेती झुलसा (Late Blight) — अनुभव साझा करें",
        body: "इस साल मेरे आलू में पछेती झुलसा आ गया है। किसी ने मैंकोज़ेब छिड़का है? कितना असर हुआ?",
        answers: 2,
        likes: 6,
        time: "1 दिन पहले",
        verified: false,
    },
];

const tagColors = {
    pest: "#FF6200",
    market: "#D4A017",
    technique: "#000080",
    disease: "#C0392B",
};

export default function CommunityForum() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    const filters = [
        { key: "all", label: "सभी / All" },
        { key: "pest", label: "🐛 Pest" },
        { key: "market", label: "📊 Market" },
        { key: "technique", label: "🔧 Technique" },
        { key: "disease", label: "🦠 Disease" },
    ];

    const filteredPosts = mockPosts.filter((post) => {
        const matchesFilter = activeFilter === "all" || post.tag === activeFilter;
        const matchesSearch =
            !searchQuery ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="pb-24 max-w-3xl mx-auto">
            <div className="px-4 pt-4">
                <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}>
                    👨‍🌾 किसान समुदाय
                </h1>
                <p className="text-sm mb-4" style={{ color: "#666" }}>
                    Ask questions, share experiences, learn from fellow farmers
                </p>

                {/* Search */}
                <div className="flex items-center gap-2 rounded-xl px-4 mb-4" style={{ backgroundColor: "#FFF", border: "1px solid #E8E8E8", height: "48px" }}>
                    <Search size={18} color="#999" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search questions..."
                        className="flex-1 border-0 outline-none bg-transparent text-sm"
                        style={{ color: "#1A1A2E" }}
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto mb-4" style={{ scrollbarWidth: "none" }}>
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setActiveFilter(f.key)}
                            className="flex-shrink-0 px-3 py-2 rounded-full border-0 cursor-pointer text-sm font-medium"
                            style={{
                                backgroundColor: activeFilter === f.key ? "#046A38" : "#F5F5F5",
                                color: activeFilter === f.key ? "#FFF" : "#666",
                                minHeight: "36px",
                            }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Ask Question Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 rounded-xl text-base font-bold cursor-pointer border-0 mb-4 flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#FF6200", color: "#FFF", fontFamily: "var(--font-hindi)", minHeight: "52px" }}
                >
                    ✍️ सवाल पूछें / Ask Question
                </motion.button>

                {/* Posts */}
                <div className="space-y-3">
                    {filteredPosts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="rounded-xl p-4 cursor-pointer"
                            style={{
                                backgroundColor: "#FFF",
                                border: "1px solid #E8E8E8",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{post.avatar}</span>
                                <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{post.author}</span>
                                {post.verified && <span className="text-xs px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: "#D4A017" }}>✓ Expert</span>}
                                <span className="text-xs ml-auto" style={{ color: "#999" }}>{post.time}</span>
                            </div>
                            <div className="flex items-start gap-2 mb-2">
                                <span className="text-xs px-2 py-0.5 rounded-full text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: tagColors[post.tag] || "#666" }}>
                                    {post.tagLabel}
                                </span>
                                <h3 className="text-sm font-bold" style={{ color: "#1A1A2E" }}>{post.title}</h3>
                            </div>
                            <p className="text-xs mb-3 line-clamp-2" style={{ color: "#666" }}>{post.body}</p>
                            <div className="flex items-center gap-4 text-xs" style={{ color: "#999" }}>
                                <span className="flex items-center gap-1"><MessageCircle size={14} /> {post.answers} जवाब</span>
                                <span className="flex items-center gap-1"><ThumbsUp size={14} /> {post.likes}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
