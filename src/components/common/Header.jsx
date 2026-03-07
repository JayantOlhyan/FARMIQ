import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import useStore from "../../store/useStore";

export default function Header() {
    const { t } = useTranslation();
    const { userMode, setUserMode } = useStore();
    const navigate = useNavigate();

    const toggleMode = () => {
        const newMode = userMode === "phase1" ? "phase2" : "phase1";
        setUserMode(newMode);
        navigate("/home");
    };

    const monthNames = [
        "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
        "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
    ];
    const dayNames = [
        "रविवार", "सोमवार", "मंगलवार", "बुधवार",
        "गुरुवार", "शुक्रवार", "शनिवार",
    ];
    const now = new Date();
    const dateHindi = `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}, ${dayNames[now.getDay()]}`;

    return (
        <header
            className="sticky top-0 z-50 border-b"
            style={{
                backgroundColor: userMode === "phase1" ? "#FFF8F0" : "#FFFFFF",
                borderColor: "#E8E8E8",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
            }}
        >
            <div className="flex items-center justify-between px-4 py-2 max-w-6xl mx-auto">
                {/* Left: Logo */}
                <Link to="/home" className="flex items-center gap-2 no-underline">
                    <span className="text-2xl">🌾</span>
                    <div>
                        <span
                            className="font-bold text-lg"
                            style={{ color: "#046A38", fontFamily: userMode === "phase1" ? "var(--font-hindi)" : "var(--font-english)" }}
                        >
                            FarmIQ
                        </span>
                        {userMode === "phase1" && (
                            <p
                                className="text-xs m-0 -mt-1"
                                style={{ color: "#666", fontFamily: "var(--font-hindi)" }}
                            >
                                {t("appTagline")}
                            </p>
                        )}
                    </div>
                </Link>

                {/* Center: Date (Phase 1 only) */}
                {userMode === "phase1" && (
                    <span
                        className="hidden sm:block text-xs"
                        style={{ color: "#666", fontFamily: "var(--font-hindi)" }}
                    >
                        {dateHindi}
                    </span>
                )}

                {/* Phase 2 nav links */}
                {userMode === "phase2" && (
                    <nav className="hidden md:flex items-center gap-6">
                        {[
                            { to: "/home", label: "Dashboard" },
                            { to: "/crops", label: "Crops" },
                            { to: "/chat", label: "AI Chat" },
                            { to: "/mandi", label: "Mandi" },
                            { to: "/community", label: "Community" },
                        ].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-sm font-medium no-underline hover:opacity-70"
                                style={{ color: "#1A1A2E", fontFamily: "var(--font-english)" }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                )}

                {/* Right: Mode toggle + Settings */}
                <div className="flex items-center gap-2">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMode}
                        className="px-3 py-2 rounded-full text-sm font-bold border-2 cursor-pointer"
                        style={{
                            minHeight: userMode === "phase1" ? "44px" : "36px",
                            backgroundColor: userMode === "phase1" ? "#046A38" : "#FFF8F0",
                            color: userMode === "phase1" ? "#FFF" : "#046A38",
                            borderColor: "#046A38",
                            fontFamily: "var(--font-hindi)",
                            fontSize: userMode === "phase1" ? "14px" : "13px",
                        }}
                    >
                        {userMode === "phase1" ? "🔬 Smart Mode" : "🌱 सरल Mode"}
                    </motion.button>

                    <Link
                        to="/settings"
                        className="p-2 rounded-full hover:bg-gray-100"
                        style={{ color: "#666" }}
                    >
                        <Settings size={22} />
                    </Link>
                </div>
            </div>
        </header>
    );
}
