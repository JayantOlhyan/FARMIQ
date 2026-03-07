/**
 * Sprint 2, Fix #7 — WhatsApp Share Utility
 * Uses wa.me universal link for sharing
 */

export function shareOnWhatsApp(text) {
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
}

export function shareMandiPrice(cropName, price, mandi) {
    const text = `🌾 मंडी भाव — ${cropName}\n💰 ${price}/क्विंटल\n📍 ${mandi}\n\n— FarmIQ ऐप से\nfarm-iq.netlify.app`;
    shareOnWhatsApp(text);
}

export function shareAIAdvice(question, answer) {
    const text = `🌾 FarmIQ सवाल:\n${question}\n\n🤖 जवाब:\n${answer}\n\n— FarmIQ ऐप\nfarm-iq.netlify.app`;
    shareOnWhatsApp(text);
}

export function sharePestDiagnosis(cropName, diagnosis) {
    const text = `🔍 कीड़ा/बीमारी पहचान — ${cropName}\n\n${diagnosis}\n\n— FarmIQ ऐप\nfarm-iq.netlify.app`;
    shareOnWhatsApp(text);
}
