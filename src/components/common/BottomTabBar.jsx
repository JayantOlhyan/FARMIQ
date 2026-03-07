import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const tabs = [
    { path: "/home", icon: "🌾", labelKey: "navHome" },
    { path: "/crops", icon: "🌿", labelKey: "navCrops" },
    { path: "/mandi", icon: "📊", labelKey: "navMandi" },
    { path: "/voice", icon: "💬", labelKey: "navCommunity" },
];

export default function BottomTabBar() {
    const { t } = useTranslation();
    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 border-t"
            style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E5E5",
                boxShadow: "0 -2px 10px rgba(0,0,0,0.08)",
            }}
        >
            <div className="flex justify-around items-center max-w-lg mx-auto">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className="flex-1"
                        style={{ textDecoration: "none" }}
                    >
                        {({ isActive }) => (
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col items-center py-2 px-1"
                                style={{ minHeight: "64px", justifyContent: "center" }}
                            >
                                <span className="text-2xl mb-1">{tab.icon}</span>
                                <span
                                    className="text-xs font-bold"
                                    style={{
                                        fontFamily: "var(--font-hindi)",
                                        color: isActive ? "#FF6200" : "#666",
                                        fontSize: "13px",
                                    }}
                                >
                                    {t(tab.labelKey)}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 h-1 rounded-t-full"
                                        style={{
                                            backgroundColor: "#FF6200",
                                            width: "40px",
                                        }}
                                    />
                                )}
                            </motion.div>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
