import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi } from "lucide-react";

/**
 * Offline Status Banner — Sprint 1, Fix #1
 * Shows amber strip at top when offline, green '✅ वापस जुड़ गए!' when reconnected.
 * Auto-hides the reconnected message after 3 seconds.
 */
export default function OfflineBanner() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showReconnected, setShowReconnected] = useState(false);
    const [wasOffline, setWasOffline] = useState(false);

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
                    <span style={{ fontFamily: "var(--font-hindi)" }}>
                        इंटरनेट कनेक्शन नहीं है
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
                    <span style={{ fontFamily: "var(--font-hindi)" }}>
                        ✅ वापस जुड़ गए!
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
