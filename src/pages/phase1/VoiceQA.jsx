import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import useStore from "../../store/useStore";
import { askGemini, PROMPT_P1_VOICE_QA } from "../../lib/gemini";

const suggestions = [
    "गेहूँ में पीली पत्ती क्यों?",
    "आज कितना पानी दें?",
    "कौन सी खाद डालें?",
    "कपास में सुंडी का इलाज?",
    "धान की बुवाई कब करें?",
    "टमाटर में फूल क्यों गिरते?",
];

export default function VoiceQA() {
    const { t } = useTranslation();
    const { myCrops } = useStore();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Initialize speech recognition
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.lang = "hi-IN";
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                const result = event.results[event.results.length - 1];
                setTranscript(result[0].transcript);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onerror = () => {
                setIsListening(false);
                setError("आवाज़ पहचान उपलब्ध नहीं है — कृपया सवाल टाइप करें");
            };
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            if (transcript) handleAskGemini(transcript);
        } else {
            if (!recognitionRef.current) {
                setError("आवाज़ पहचान उपलब्ध नहीं है — कृपया सवाल टाइप करें");
                return;
            }
            setTranscript("");
            setAnswer("");
            setError("");
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    const handleAskGemini = async (question) => {
        setLoading(true);
        setError("");
        try {
            const cropName =
                myCrops.length > 0 ? myCrops[0].cropName : "गेहूँ";
            const monthNames = [
                "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
                "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
            ];
            const prompt = PROMPT_P1_VOICE_QA.user({
                userQuestion: question,
                cropName,
                state: "उत्तर प्रदेश",
                month: monthNames[new Date().getMonth()],
            });
            const res = await askGemini(prompt, PROMPT_P1_VOICE_QA.system, null, {
                maxRetries: 3,
                onRetry: (attempt, max) => {
                    setError(`फिर से कोशिश कर रहे हैं... (${attempt}/${max})`);
                },
            });
            setAnswer(res);
            setError("");

            // Text-to-speech
            if ("speechSynthesis" in window) {
                const utterance = new SpeechSynthesisUtterance(res);
                utterance.lang = "hi-IN";
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
            }
        } catch (err) {
            // Error message is already in Hindi from askGemini
            setError(err.message);
        }
        setLoading(false);
    };

    const handleSuggestion = (q) => {
        setTranscript(q);
        handleAskGemini(q);
    };

    const shareWhatsApp = () => {
        const text = `🌾 FarmIQ सवाल:\n${transcript}\n\n🤖 जवाब:\n${answer}\n\n— farmiq.app`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <div
            className="min-h-screen flex flex-col relative"
            style={{ backgroundColor: "#046A38" }}
        >
            {/* Header Text */}
            <div className="text-center pt-8 pb-4 px-4">
                <h1
                    className="text-xl font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-hindi)" }}
                >
                    आवाज़ सवाल 🎤
                </h1>
                <p className="text-sm text-white/70" style={{ fontFamily: "var(--font-hindi)" }}>
                    {isListening
                        ? t("voiceListening")
                        : loading
                            ? t("voiceProcessing")
                            : "नीचे बटन दबाकर बोलें"}
                </p>
            </div>

            {/* Transcript bubble */}
            <AnimatePresence>
                {transcript && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-6 mb-4 px-5 py-3 rounded-xl"
                        style={{
                            backgroundColor: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <p className="text-white text-base" style={{ fontFamily: "var(--font-hindi)" }}>
                            🗣️ {transcript}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mic Button */}
            <div className="flex-1 flex items-center justify-center">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleListening}
                    className="relative rounded-full border-0 cursor-pointer flex items-center justify-center"
                    style={{
                        width: "200px",
                        height: "200px",
                        backgroundColor: "#FF6200",
                        boxShadow: "0 8px 32px rgba(255,98,0,0.4)",
                    }}
                >
                    {/* Pulse rings when listening */}
                    {isListening && (
                        <>
                            <motion.div
                                className="absolute rounded-full"
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    border: "3px solid rgba(255,98,0,0.3)",
                                }}
                                animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute rounded-full"
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    border: "3px solid rgba(255,98,0,0.2)",
                                }}
                                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                            />
                        </>
                    )}
                    <span className="text-6xl">{isListening ? "⏹️" : "🎤"}</span>
                </motion.button>
            </div>

            {/* Loading animation */}
            {loading && (
                <div className="flex justify-center py-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="text-4xl"
                    >
                        🌿
                    </motion.div>
                </div>
            )}

            {/* Answer */}
            <AnimatePresence>
                {answer && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-4 mb-4 rounded-xl p-5"
                        style={{
                            backgroundColor: "#FFFFFF",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                        }}
                    >
                        <p
                            className="text-base leading-relaxed whitespace-pre-wrap"
                            style={{ fontFamily: "var(--font-hindi)", color: "#1A1A2E" }}
                        >
                            {answer}
                        </p>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={shareWhatsApp}
                            className="mt-4 w-full py-3 rounded-xl text-base font-bold cursor-pointer border-0"
                            style={{
                                backgroundColor: "#25D366",
                                color: "#FFF",
                                fontFamily: "var(--font-hindi)",
                                minHeight: "52px",
                            }}
                        >
                            {t("voiceShare")}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error */}
            {error && (
                <div className="mx-4 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "rgba(192,57,43,0.2)" }}>
                    <p className="text-white text-sm text-center" style={{ fontFamily: "var(--font-hindi)" }}>
                        {error}
                    </p>
                </div>
            )}

            {/* Suggested Questions */}
            {!answer && !loading && (
                <div className="px-4 pb-24">
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((q) => (
                            <motion.button
                                key={q}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSuggestion(q)}
                                className="px-4 py-2.5 rounded-full border-0 cursor-pointer"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.15)",
                                    color: "#FFF",
                                    fontFamily: "var(--font-hindi)",
                                    fontSize: "14px",
                                }}
                            >
                                {q}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
