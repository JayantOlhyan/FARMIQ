import { motion } from "framer-motion";

export default function TriColorFooter() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full mt-auto"
        >
            <div className="flex h-2">
                <div className="flex-1" style={{ backgroundColor: "#FF9933" }} />
                <div className="flex-1" style={{ backgroundColor: "#FFFFFF" }} />
                <div className="flex-1" style={{ backgroundColor: "#138808" }} />
            </div>
            <div
                className="text-center py-3 text-xs"
                style={{ backgroundColor: "#1A1A2E", color: "#999" }}
            >
                🌾 FarmIQ — किसान की आवाज़, Technology की ताकत 🇮🇳
            </div>
        </motion.footer>
    );
}
