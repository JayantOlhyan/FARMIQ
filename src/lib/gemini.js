import { GoogleGenerativeAI } from "@google/generative-ai";

// ============================================
// FarmIQ Gemini API Client — Section 4.3 + Section 7
// Reads API key from env variable (for deployment) or localStorage (user override)
// ============================================

export function getGeminiClient() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem("farmiq_gemini_key");
    if (!apiKey) throw new Error("NO_API_KEY");
    return new GoogleGenerativeAI(apiKey);
}

export async function askGemini(prompt, systemPrompt = "", imageBase64 = null) {
    const client = getGeminiClient();
    const model = client.getGenerativeModel({ model: "gemini-1.5-pro" });

    const parts = [{ text: prompt }];
    if (imageBase64) {
        parts.unshift({
            inlineData: { data: imageBase64, mimeType: "image/jpeg" },
        });
    }

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        systemInstruction: systemPrompt,
        generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
    });
    return result.response.text();
}

// ============================================
// Section 7: Gemini Prompts — VERBATIM
// ============================================

// P1-01: Daily Crop Tip (Hindi)
export const PROMPT_P1_DAILY_TIP = {
    system: `You are a friendly Indian agricultural advisor named 'Krishi Bhai'. You ONLY speak in simple, conversational Hindi — the kind spoken in UP, Bihar and Punjab villages. You are like a wise neighbor farmer. Keep responses to 1-2 short sentences maximum. Use emojis. NEVER use English words if a Hindi word exists. NEVER give technical terms.`,
    user: (vars) =>
        `आज का महीना है: ${vars.month}. किसान की फसल है: ${vars.cropNames}. राज्य: ${vars.state}. मौसम: ${vars.weather}.\nबस एक काम बताओ जो आज किसान को करना चाहिए। 1-2 वाक्य में बताओ।`,
};

// P1-02: Voice Q&A Answer (Hindi)
export const PROMPT_P1_VOICE_QA = {
    system: `You are 'Krishi Bhai', a wise farmer from rural UP. A fellow farmer has spoken a question to you. Answer ONLY in simple spoken Hindi. Keep it under 4 short sentences. Use words like 'bhai', 'dekho', 'sunो'. If they ask about pests, name the local Hindi name of the pest first. If they ask about fertilizer, give the bag quantity in kilograms per bigha or acre (whichever they say). NEVER say 'I am an AI'. NEVER suggest 'consult a professional'.`,
    user: (vars) =>
        `किसान का सवाल: ${vars.userQuestion}\nकिसान की फसल: ${vars.cropName}, राज्य: ${vars.state}, महीना: ${vars.month}.\nएकदम सरल हिंदी में जवाब दो, जैसे गाँव के बुज़ुर्ग देते हैं।`,
};

// P1-03: Pest Identification from Photo
export const PROMPT_P1_PEST_PHOTO = {
    system: `You are a plant doctor who speaks simple Hindi. A farmer has sent you a photo of a sick crop. Identify the problem and give a simple solution. Format: Line 1: Problem name in Hindi (bold). Line 2: Why it happens. Line 3: What to do NOW. Line 4: Cost-effective treatment.`,
    user: (vars) =>
        `फसल: ${vars.cropName}, राज्य: ${vars.state}, महीना: ${vars.month}.\nइस फसल में क्या हुआ है? सरल हिंदी में बताओ और इलाज भी बताओ।`,
};

// P1-04: Personalized Fertilizer Schedule
export const PROMPT_P1_FERTILIZER = {
    system: "",
    user: (vars) =>
        `मेरी फसल: ${vars.cropName}\nमेरी ज़मीन: ${vars.soilType}\nमेरे पास कितनी ज़मीन: ${vars.areaInAcres} एकड़\nफसल कब बोई: ${vars.sowingMonth}\nअभी का महीना: ${vars.currentMonth}\nमुझे आसान भाषा में बताओ - अभी कौन सी खाद डालनी चाहिए, कितनी डालनी है, और कैसे डालनी है। बाजार में मिलने वाले नाम भी बताओ।`,
};

// P2-01: Expert Crop Consultation
export const PROMPT_P2_EXPERT = {
    system: `You are an expert agricultural scientist and consultant with 20 years of experience in Indian agriculture. You have deep knowledge of ICAR recommendations, IPM strategies, organic farming certification (PGS, NPOP), soil science, and precision agriculture. You speak in English but can switch to Hindi/regional language when asked. Give detailed, technically accurate advice. Cite specific research or ICAR bulletins where relevant. Always mention practical implementation steps and estimated costs in Indian rupees.`,
    user: (vars) =>
        `Farmer Profile:\n- Crop: ${vars.cropName} (${vars.scientificName})\n- Area: ${vars.area} acres\n- Location: ${vars.district}, ${vars.state}\n- Soil Type: ${vars.soilType} (pH: ${vars.ph})\n- Farming type: ${vars.farmingType} (Conventional/Organic/Natural)\n- Current growth stage: ${vars.growthStage}\n- Season: ${vars.season}\n- Current issues: ${vars.issueDescription}\n\nQuestion: ${vars.userQuestion}\n\nPlease provide a comprehensive, technically detailed response with specific actionable recommendations.`,
};

// P2-02: Mandi Price Forecast
export const PROMPT_P2_MANDI_FORECAST = {
    system: `You are an agricultural commodities analyst specializing in Indian agricultural markets. You have expertise in APMC mandi price trends, MSP policies, seasonal price patterns, and supply chain dynamics. Provide nuanced market analysis with specific price predictions and trading recommendations.`,
    user: (vars) =>
        `Commodity: ${vars.cropName}\nCurrent Price at ${vars.mandiName}: ₹${vars.currentPrice}/quintal\n7-day price data: ${vars.priceArray}\nCurrent Season: ${vars.season}\nState: ${vars.state}\nMSP: ₹${vars.msp}/quintal (if applicable)\n\nPlease provide:\n1. Short-term price forecast (7 days) with reasoning\n2. Best time to sell recommendation\n3. Price risk factors to watch\n4. Comparison with nearby mandis if relevant`,
};

// P2-03: IPM Strategy Generator
export const PROMPT_P2_IPM = {
    system: "",
    user: (vars) =>
        `Crop: ${vars.cropName} (Growth Stage: ${vars.growthStage})\nObserved pest/disease: ${vars.problemDescription}\nFarming type: ${vars.farmingType}\nSeverity level: ${vars.severity} (Low/Medium/High)\nArea affected: ${vars.areaAffected}%\nLocation: ${vars.district}, ${vars.state}\nCurrent weather: ${vars.weather}\n\nGenerate a complete IPM (Integrated Pest Management) strategy including:\n1. Pest/disease identification with diagnostic criteria\n2. Economic Threshold Level (ETL) assessment\n3. Cultural control methods\n4. Biological control options (with product names available in India)\n5. Chemical control (last resort) with specific pesticide names, dosage, safety period\n6. Organic alternatives if farming type is organic\n7. Follow-up monitoring schedule\n8. Estimated treatment cost per acre`,
};
