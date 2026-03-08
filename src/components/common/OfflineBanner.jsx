import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Offline Status Banner — Sprint 1, Fix #1 (now with i18n)
 */
export default function OfflineBanner() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showReconnected, setShowReconnected] = useState(false);
    const [wasOffline, setWasOffline] = useState(false);
    const { t, i18n } = useTranslation();
    const font = i18n.language === "en" ? "var(--font-english)" : "var(--font-hindi)";

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            if (wasOffline) {
                setShowReconnected(true);
                setTimeout(() => setShowReconnected(false), 3000);
            }
        };

        const handleOffline = () => {
            setIsOnline(false);
            setWasOffline(true);
            setShowReconnected(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [wasOffline]);

    return (
        <AnimatePresence>
            {!isOnline && (
                <motion.div
                    key="offline"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="offline-banner offline-banner--offline"
                >
                    <WifiOff size={16} />
                    <span style={{ fontFamily: font }}>
                        {t("offline")}
                    </span>
                </motion.div>
            )}

            {isOnline && showReconnected && (
                <motion.div
                    key="reconnected"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="offline-banner offline-banner--online"
                >
                    <Wifi size={16} />
                    <span style={{ fontFamily: font }}>
                        {t("backOnline")}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
