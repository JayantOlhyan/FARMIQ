import { motion } from "framer-motion";

/**
 * Sprint 2, Fix #9 — Empty State Screens
 * Reusable empty state with illustration + Hindi message + CTA
 */

const emptyStates = {
    myCrops: {
        emoji: "🌱",
        title: "अभी कोई फसल नहीं है",
        description: "अपनी पहली फसल जोड़ें और मंडी भाव, मौसम अलर्ट पाएं",
        cta: "फसल जोड़ें",
    },
    community: {
        emoji: "👥",
        title: "कोई पोस्ट नहीं है",
        description: "किसान समुदाय से जुड़ें और अपना अनुभव साझा करें",
        cta: "समुदाय देखें",
    },
    mandi: {
        emoji: "📊",
        title: "मंडी भाव नहीं मिले",
        description: "Internet कनेक्शन जांचें या बाद में फिर कोशिश करें",
        cta: "फिर से लोड करें",
    },
    voiceHistory: {
        emoji: "🎤",
        title: "कोई सवाल-जवाब नहीं",
        description: "माइक बटन दबाकर अपना पहला सवाल पूछें",
        cta: "सवाल पूछें",
    },
    search: {
        emoji: "🔍",
        title: "कुछ नहीं मिला",
        description: "अलग शब्दों से खोजकर देखें",
        cta: null,
    },
};

export default function EmptyState({ type = "myCrops", onAction }) {
    const state = emptyStates[type] || emptyStates.myCrops;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 px-6"
        >
            <span className="text-[64px] mb-4">{state.emoji}</span>
            <h3
                className="text-[18px] font-bold text-[#1A1A1A] text-center mb-2"
                style={{ fontFamily: "var(--font-hindi)" }}
            >
                {state.title}
            </h3>
            <p
                className="text-[14px] text-[#666] text-center mb-6 max-w-[280px]"
                style={{ fontFamily: "var(--font-hindi)" }}
            >
                {state.description}
            </p>
            {state.cta && onAction && (
                <button
                    onClick={onAction}
                    className="px-6 py-3 bg-[#1B5E3B] text-white rounded-[14px] text-[15px] font-bold active:scale-95 transition-transform"
                    style={{ fontFamily: "var(--font-hindi)", minHeight: 52 }}
                >
                    {state.cta}
                </button>
            )}
        </motion.div>
    );
}
