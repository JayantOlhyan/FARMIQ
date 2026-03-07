import { motion } from "framer-motion";

export default function Spinner({ text = "जानकारी ला रहे हैं..." }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
            <motion.div
                className="relative w-16 h-16"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <span className="text-5xl">🌾</span>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-base font-medium"
                style={{ color: "#046A38", fontFamily: "var(--font-hindi)" }}
            >
                {text}
            </motion.p>
        </div>
    );
}
