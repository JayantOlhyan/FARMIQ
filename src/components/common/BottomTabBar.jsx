import { NavLink } from "react-router-dom";
import { Home, Sprout, BarChart3, User } from "lucide-react";

const tabs = [
    { to: "/home", icon: Home, label: "घर" },
    { to: "/crops", icon: Sprout, label: "फसल" },
    { to: "/mandi", icon: BarChart3, label: "भाव" },
    { to: "/profile", icon: User, label: "मैं" },
];

export default function BottomTabBar() {
    return (
        <nav className="bottom-nav" style={{ height: 68 }}>
            <div className="flex items-center justify-around h-full px-2">
                {tabs.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[64px] no-underline transition-colors ${isActive ? "text-[#1B5E3B]" : "text-[#999]"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.8} />
                                <span
                                    className="text-[11px]"
                                    style={{
                                        fontFamily: "var(--font-hindi)",
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
