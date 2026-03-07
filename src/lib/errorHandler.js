/**
 * FarmIQ Error Handler — Hindi-first error messages per Section 10.5
 */

// Error code → Hindi message mapping from the WRD
const ERROR_MESSAGES = {
    NO_API_KEY: {
        hi: "⚙️ सेटिंग्स में जाकर API Key डालें",
        en: "Please add your API key in Settings",
    },
    GEMINI_TIMEOUT: {
        hi: "⏳ AI जवाब देने में देरी हो रही है, कृपया फिर कोशिश करें",
        en: "AI is taking longer than usual. Please try again.",
    },
    GEMINI_ERROR: {
        hi: "🤖 AI सेवा अभी उपलब्ध नहीं है। बाद में कोशिश करें",
        en: "AI service unavailable. Try again later.",
    },
    NETWORK_ERROR: {
        hi: "📶 इंटरनेट कनेक्ट नहीं है। ऑफलाइन डेटा दिखाया जा रहा है",
        en: "No internet. Showing offline data.",
    },
    VOICE_NOT_SUPPORTED: {
        hi: "🎤 आपके ब्राउज़र में आवाज़ सुविधा उपलब्ध नहीं है",
        en: "Voice feature not available in your browser.",
    },
    PHOTO_TOO_LARGE: {
        hi: "📸 फ़ोटो बहुत बड़ी है, कृपया छोटी फ़ोटो लें",
        en: "Photo is too large. Please take a smaller photo.",
    },
    LOCATION_DENIED: {
        hi: "📍 स्थान की अनुमति दें ताकि सही मंडी भाव दिख सके",
        en: "Allow location access for accurate mandi rates.",
    },
    CROP_NOT_FOUND: {
        hi: "🌾 यह फसल अभी हमारे डेटाबेस में नहीं है",
        en: "This crop is not yet in our database.",
    },
    GENERIC: {
        hi: "कुछ गड़बड़ हुई। कृपया दोबारा कोशिश करें 🙏",
        en: "Something went wrong. Please try again.",
    },
};

/**
 * Get error message in the user's language
 * @param {string} errorCode - One of the keys in ERROR_MESSAGES
 * @param {string} lang - "hi" or "en" (defaults to "hi")
 * @returns {string} The localized error message
 */
export function getErrorMessage(errorCode, lang = "hi") {
    const entry = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.GENERIC;
    return entry[lang] || entry.hi;
}

/**
 * Classify a caught error into a FarmIQ error code
 * @param {Error} error - The caught error
 * @returns {string} FarmIQ error code
 */
export function classifyError(error) {
    const message = error?.message || "";

    if (message === "NO_API_KEY" || message.includes("API key")) {
        return "NO_API_KEY";
    }
    if (message.includes("timeout") || message.includes("DEADLINE_EXCEEDED")) {
        return "GEMINI_TIMEOUT";
    }
    if (message.includes("network") || message.includes("fetch") || message.includes("ERR_INTERNET_DISCONNECTED")) {
        return "NETWORK_ERROR";
    }
    if (message.includes("voice") || message.includes("speech")) {
        return "VOICE_NOT_SUPPORTED";
    }
    if (message.includes("size") || message.includes("large") || message.includes("413")) {
        return "PHOTO_TOO_LARGE";
    }

    return "GEMINI_ERROR";
}

/**
 * Display a toast-style notification (appends to DOM briefly)
 * @param {string} message - The message to display
 * @param {"error"|"success"|"info"} type - Toast type
 */
export function showToast(message, type = "error") {
    const colors = {
        error: { bg: "#FFEBEE", border: "#C0392B", text: "#C0392B" },
        success: { bg: "#E8F5E9", border: "#046A38", text: "#046A38" },
        info: { bg: "#E3F2FD", border: "#1976D2", text: "#1976D2" },
    };
    const style = colors[type] || colors.error;

    const toast = document.createElement("div");
    toast.textContent = message;
    Object.assign(toast.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "9999",
        padding: "14px 24px",
        borderRadius: "12px",
        backgroundColor: style.bg,
        border: `2px solid ${style.border}`,
        color: style.text,
        fontFamily: "var(--font-hindi)",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        maxWidth: "90vw",
        textAlign: "center",
        animation: "fadeInDown 0.3s ease, fadeOutUp 0.3s ease 3.2s",
    });

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

export default ERROR_MESSAGES;
