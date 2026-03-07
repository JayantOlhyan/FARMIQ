import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import FarmIQLogo from "./FarmIQLogo";

export default function PageHeader({ title, showBack = true, showLogo = true }) {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-[#F0F0F0]">
            <div className="flex items-center gap-3">
                {showBack && (
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={20} color="#1A1A1A" />
                    </button>
                )}
                {showLogo && (
                    <img
                        src="/logos/farmiq-appicon.png"
                        alt="FarmIQ"
                        className="w-[32px] h-[32px] rounded-[8px]"
                        draggable={false}
                    />
                )}
                <h1
                    className="text-[17px] font-bold text-[#1A1A1A]"
                    style={{ fontFamily: "var(--font-hindi)" }}
                >
                    {title}
                </h1>
            </div>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                <Bell size={18} color="#1B5E3B" />
            </button>
        </div>
    );
}
