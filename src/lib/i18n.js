import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    hi: {
        translation: {
            // App
            appName: "FarmIQ",
            appTagline: "किसान का साथी",
            appMission: "किसान की आवाज़, Technology की ताकत",

            // Navigation - Phase 1
            navHome: "घर",
            navCrops: "फसल",
            navCommunity: "सवाल",
            navMandi: "भाव",
            navTransport: "गाड़ी",

            // Navigation - Phase 2
            navDashboard: "Dashboard",
            navAIChat: "AI Chat",
            navAnalytics: "Analytics",
            navProfile: "Profile",

            // Mode Switcher
            saralMode: "🌱 सरल Mode",
            smartMode: "🔬 Smart Mode",

            // Onboarding
            onboardingGreeting: "नमस्ते! मैं FarmIQ हूँ 🙏",
            onboardingSubtitle: "आपकी खेती का सच्चा साथी",
            onboardingCard1: "अपनी फसल के बारे में जानें",
            onboardingCard2: "आज का मंडी भाव देखें",
            onboardingCard3: "दूसरे किसानों से सीखें",
            chooseCrop: "मेरी फसल चुनें",
            browseNow: "अभी देखते हैं",

            // Home
            todayAdvice: "आज की सलाह",
            quickActions: "जल्दी काम",
            cropInfo: "फसल की जानकारी",
            todayRate: "आज का भाव",
            askQuestion: "सवाल पूछें",
            bookTransport: "गाड़ी बुलाएँ",
            addMoreCrops: "+ और फसल",
            learnMore: "और जानें",

            // Crop Library
            searchCrop: "फसल का नाम लिखें...",
            all: "सभी",
            kharif: "खरीफ",
            rabi: "रबी",
            zaid: "जायद",
            vegetables: "सब्जियाँ",
            fruits: "फल",

            // Crop Detail Tabs
            tabSowing: "बुवाई",
            tabFertilizer: "खाद",
            tabWater: "पानी",
            tabPests: "कीड़े",
            tabHarvest: "कटाई",
            aiAdvice: "🤖 मेरे लिए खाद सलाह",
            photoIdentify: "📷 फोटो दिखाकर पहचानें",

            // Voice Q&A
            voiceListening: "बोलिए, मैं सुन रहा हूँ...",
            voiceProcessing: "🌿 जवाब ढूंढ रहे हैं...",
            voiceShare: "📤 WhatsApp पर भेजें",
            voiceSuggestion1: "गेहूँ में पीली पत्ती क्यों?",
            voiceSuggestion2: "आज कितना पानी दें?",
            voiceSuggestion3: "कौन सी खाद डालें?",

            // Mandi
            perQuintal: "/क्विंटल",
            priceUp: "से बढ़ा",
            priceDown: "से घटा",
            lastUpdated: "पहले अपडेट हुआ",
            shareMandi: "📤 भाव WhatsApp पर भेजें",
            weekHighest: "इस हफ्ते सबसे ज़्यादा",

            // Transport
            crop: "फसल",
            quantity: "मात्रा (क्विंटल)",
            when: "कब चाहिए",
            tomorrow: "कल",
            findVehicle: "🚛 गाड़ी ढूंढें",
            call: "कॉल करें",

            // Settings
            settings: "सेटिंग्स",
            apiKeyLabel: "Gemini API Key",
            apiKeyPlaceholder: "API key यहाँ डालें",
            saveKey: "सेव करें",
            keySaved: "✅ Key सेव हो गई!",
            language: "भाषा",

            // Loading & Status
            loading: "जानकारी ला रहे हैं...",
            noData: "अभी जानकारी उपलब्ध नहीं",

            // Error Messages — Section 10.5
            errorNoInternet: "📴 नेटवर्क नहीं है। पुरानी जानकारी दिखा रहे हैं।",
            errorNoApiKey: "⚙️ कृपया Settings में API key डालें।",
            errorGeminiTimeout: "🌿 थोड़ी देर बाद फिर से कोशिश करें।",
            errorMandiUnavailable: "📊 भाव अभी उपलब्ध नहीं। कल देखें।",
            errorVoiceNotSupported: "🎤 यह फोन आवाज़ नहीं समझ सकता।",
            errorLocationDenied: "📍 अपना जिला खुद चुनें।",

            // Seasons
            seasonKharif: "खरीफ",
            seasonRabi: "रबी",
            seasonZaid: "जायद",

            // Crop Names
            cropGehun: "गेहूँ",
            cropDhan: "धान",
            cropKapas: "कपास",
            cropGanna: "गन्ना",
            cropTamatar: "टमाटर",
            cropAalu: "आलू",
            cropHaldi: "हल्दी",
            cropMirch: "मिर्च",
            cropSarson: "सरसों",
            cropMoong: "मूँग",

            // Days
            monday: "सोमवार",
            tuesday: "मंगलवार",
            wednesday: "बुधवार",
            thursday: "गुरुवार",
            friday: "शुक्रवार",
            saturday: "शनिवार",
            sunday: "रविवार",

            // Months
            month1: "जनवरी",
            month2: "फरवरी",
            month3: "मार्च",
            month4: "अप्रैल",
            month5: "मई",
            month6: "जून",
            month7: "जुलाई",
            month8: "अगस्त",
            month9: "सितंबर",
            month10: "अक्टूबर",
            month11: "नवंबर",
            month12: "दिसंबर",

            // Community
            communityTitle: "किसान समुदाय",
            askCommunity: "सवाल पूछें",
            trending: "चर्चा में",
            answered: "जवाब मिला",
            unanswered: "जवाब दें",

            // Footer
            madeInIndia: "🇮🇳 Made in India",
        },
    },
    en: {
        translation: {
            appName: "FarmIQ",
            appTagline: "Farmer's Companion",
            appMission: "Farmer's Voice, Technology's Power",

            navHome: "Home",
            navCrops: "Crops",
            navCommunity: "Community",
            navMandi: "Mandi",
            navTransport: "Transport",

            navDashboard: "Dashboard",
            navAIChat: "AI Chat",
            navAnalytics: "Analytics",
            navProfile: "Profile",

            saralMode: "🌱 Saral Mode",
            smartMode: "🔬 Smart Mode",

            onboardingGreeting: "Namaste! I'm FarmIQ 🙏",
            onboardingSubtitle: "Your true farming companion",
            onboardingCard1: "Learn about your crops",
            onboardingCard2: "Check today's Mandi price",
            onboardingCard3: "Learn from other farmers",
            chooseCrop: "Choose My Crop",
            browseNow: "Browse Now",

            todayAdvice: "Today's Advice",
            quickActions: "Quick Actions",
            cropInfo: "Crop Information",
            todayRate: "Today's Rate",
            askQuestion: "Ask Question",
            bookTransport: "Book Transport",
            addMoreCrops: "+ Add Crop",
            learnMore: "Learn More",

            searchCrop: "Search crop name...",
            all: "All",
            kharif: "Kharif",
            rabi: "Rabi",
            zaid: "Zaid",
            vegetables: "Vegetables",
            fruits: "Fruits",

            tabSowing: "Sowing",
            tabFertilizer: "Fertilizer",
            tabWater: "Irrigation",
            tabPests: "Pests",
            tabHarvest: "Harvest",
            aiAdvice: "🤖 Get AI Fertilizer Advice",
            photoIdentify: "📷 Identify by Photo",

            voiceListening: "Speak, I'm listening...",
            voiceProcessing: "🌿 Finding your answer...",
            voiceShare: "📤 Share on WhatsApp",
            voiceSuggestion1: "Why are wheat leaves yellow?",
            voiceSuggestion2: "How much water today?",
            voiceSuggestion3: "Which fertilizer to use?",

            perQuintal: "/quintal",
            priceUp: "increased",
            priceDown: "decreased",
            lastUpdated: "ago",
            shareMandi: "📤 Share price on WhatsApp",
            weekHighest: "Week's highest",

            crop: "Crop",
            quantity: "Quantity (quintals)",
            when: "When needed",
            tomorrow: "Tomorrow",
            findVehicle: "🚛 Find Vehicle",
            call: "Call",

            settings: "Settings",
            apiKeyLabel: "Gemini API Key",
            apiKeyPlaceholder: "Enter API key here",
            saveKey: "Save",
            keySaved: "✅ Key saved!",
            language: "Language",

            loading: "Loading information...",
            noData: "Information not available right now",

            errorNoInternet: "You're offline. Showing cached data.",
            errorNoApiKey: "Add your Gemini API key in Settings to use AI features.",
            errorGeminiTimeout: "AI is taking longer than usual. Retry?",
            errorMandiUnavailable: "Market data unavailable. Last known price shown.",
            errorVoiceNotSupported: "Voice input not supported on this browser.",
            errorLocationDenied: "Location access denied. Please select your district manually.",

            seasonKharif: "Kharif",
            seasonRabi: "Rabi",
            seasonZaid: "Zaid",

            cropGehun: "Wheat",
            cropDhan: "Rice",
            cropKapas: "Cotton",
            cropGanna: "Sugarcane",
            cropTamatar: "Tomato",
            cropAalu: "Potato",
            cropHaldi: "Turmeric",
            cropMirch: "Chilli",
            cropSarson: "Mustard",
            cropMoong: "Moong Dal",

            communityTitle: "Farmer Community",
            askCommunity: "Ask Question",
            trending: "Trending",
            answered: "Answered",
            unanswered: "Unanswered",

            madeInIndia: "🇮🇳 Made in India",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "hi",
    fallbackLng: "hi",
    interpolation: { escapeValue: false },
});

export default i18n;
