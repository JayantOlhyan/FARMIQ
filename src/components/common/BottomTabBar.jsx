import { NavLink } from "react-router-dom";
import { Home, Sprout, BarChart3, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BottomTabBar() {
    const { t, i18n } = useTranslation();
    const isEn = i18n.language === "en";
    const font = isEn ? "var(--font-english)" : "var(--font-hindi)";

    const tabs = [
        { to: "/home", icon: Home, label: t("navHome") },
        { to: "/crops", icon: Sprout, label: t("navCrops") },
        { to: "/mandi", icon: BarChart3, label: t("navMandi") },
        { to: "/profile", icon: User, label: isEn ? "Me" : "मैं" },
    ];

    return (
        <nav className="bottom-nav" style={{ height: 68 }}>
            <div className="flex items-center justify-around h-full px-2">
                {tabs.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[64px] no-underline transition-colors active:scale-95 ${isActive ? "text-[#1B5E3B]" : "text-[#999]"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon size={26} strokeWidth={isActive ? 2.5 : 1.8} />
                                <span
                                    className="text-[13px]"
                                    style={{
                                        fontFamily: font,
                                        fontWeight: isActive ? 700 : 400,
                                    }}
                                >
                                    {label}
                                </span>
                                {isActive && (
                                    <span className="block w-1 h-1 rounded-full bg-[#1B5E3B] mt-[-2px]" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
