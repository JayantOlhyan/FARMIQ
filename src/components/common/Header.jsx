import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";

export default function PageHeader({ title, showBack = true }) {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between px-5 py-4 bg-white">
            <div className="flex items-center gap-3">
                {showBack && (
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={22} color="#1A1A1A" />
                    </button>
                )}
                <h1
                    className="text-[18px] font-bold text-[#1A1A1A]"
                    style={{ fontFamily: "var(--font-hindi)" }}
                >
                    {title}
                </h1>
            </div>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                <Bell size={20} color="#1B5E3B" />
            </button>
        </div>
    );
}
