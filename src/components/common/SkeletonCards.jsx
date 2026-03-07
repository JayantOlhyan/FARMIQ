import { motion } from "framer-motion";

/**
 * Sprint 2, Fix #5 — Skeleton Loading Screens
 * Shimmer animation skeletons for each card type
 */

const shimmer = {
    animate: { backgroundPosition: ["200% 0", "-200% 0"] },
    transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
};

const shimmerStyle = {
    background: "linear-gradient(90deg, #F0F0F0 25%, #E0E0E0 50%, #F0F0F0 75%)",
    backgroundSize: "200% 100%",
    borderRadius: 8,
};

export function SkeletonCropCard() {
    return (
        <div className="farmiq-card overflow-hidden" style={{ borderRadius: 16 }}>
            <motion.div {...shimmer} style={{ ...shimmerStyle, height: 180, borderRadius: "16px 16px 0 0" }} />
            <div className="p-4 flex flex-col gap-2">
                <motion.div {...shimmer} style={{ ...shimmerStyle, height: 18, width: "70%" }} />
                <motion.div {...shimmer} style={{ ...shimmerStyle, height: 14, width: "50%" }} />
                <motion.div {...shimmer} style={{ ...shimmerStyle, height: 16, width: "40%" }} />
            </div>
        </div>
    );
}

export function SkeletonMandiCard() {
    return (
        <div className="farmiq-card flex overflow-hidden" style={{ borderRadius: 14, height: 90 }}>
            <motion.div {...shimmer} style={{ ...shimmerStyle, width: 4, borderRadius: 0 }} />
            <motion.div {...shimmer} style={{ ...shimmerStyle, width: 72, height: "100%", borderRadius: 0 }} />
            <div className="flex-1 px-3 py-2 flex flex-col justify-center gap-2">
                <motion.div {...shimmer} style={{ ...shimmerStyle, height: 16, width: "60%" }} />
                <motion.div {...shimmer} style={{ ...shimmerStyle, height: 12, width: "40%" }} />
                <motion.div {...shimmer} style={{ ...shimmerStyle, height: 14, width: "55%" }} />
            </div>
            <div className="flex items-center pr-3">
                <motion.div {...shimmer} style={{ ...shimmerStyle, width: 70, height: 36 }} />
            </div>
        </div>
    );
}

export function SkeletonWeatherCard() {
    return (
        <div className="farmiq-card p-4">
            <div className="flex justify-between items-start">
                <motion.div {...shimmer} style={{ ...shimmerStyle, height: 14, width: "45%" }} />
                <motion.div {...shimmer} style={{ ...shimmerStyle, height: 28, width: 28, borderRadius: "50%" }} />
            </div>
            <motion.div {...shimmer} style={{ ...shimmerStyle, height: 48, width: "40%", marginTop: 8 }} />
            <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-[#F0F0F0]">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <motion.div {...shimmer} style={{ ...shimmerStyle, height: 16, width: 40 }} />
                        <motion.div {...shimmer} style={{ ...shimmerStyle, height: 12, width: 30 }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function SkeletonQuickActions() {
    return (
        <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="farmiq-card flex flex-col items-center justify-center py-4 min-h-[72px]">
                    <motion.div {...shimmer} style={{ ...shimmerStyle, width: 40, height: 40, borderRadius: 12 }} />
                    <motion.div {...shimmer} style={{ ...shimmerStyle, width: 30, height: 12, marginTop: 8 }} />
                </div>
            ))}
        </div>
    );
}
