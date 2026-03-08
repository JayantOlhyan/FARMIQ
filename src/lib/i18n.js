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
            greeting: "🙏 नमस्ते, किसान भाई!",
            searchCropPlaceholder: "फसल खोजें...",
            quickActionsTitle: "जल्दी जानें",
            myCrops: "मेरी फसलें",
            viewAll: "सभी देखें",
            sowing: "बुवाई",
            fertilizer: "खाद",
            pests: "कीड़े",
            mandiLabel: "मंडी",
            aiTip: "AI tip: आज गेहूँ में पानी देना अच्छा रहेगा। 💧",
            cloudy: "बादल छाए हैं",
            sunrise: "सूर्योदय",
            sunset: "सूर्यास्त",
            humidity: "नमी",
            rain: "बारिश",
            pressure: "दबाव",
            wind: "हवा",
            location: "उन्नाव, उत्तर प्रदेश",
            addToCrops: "🌾 मेरी फसल में जोड़ें",

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
            cropDetailTitle: "फसल की जानकारी",
            available: "उपलब्ध है ✓",
            pestDiagnosis: "🔍 कीड़ा/बीमारी पहचानें",
            diagnosing: "जांच हो रही है...",
            shareWhatsApp: "WhatsApp पर भेजें",
            info: "जानकारी",
            readMore: "...और पढ़ें",
            alsoSee: "यह भी देखें",

            // Voice Q&A
            voiceListening: "बोलिए, मैं सुन रहा हूँ...",
            voiceProcessing: "🌿 जवाब ढूंढ रहे हैं...",
            voiceShare: "📤 WhatsApp पर भेजें",
            voiceSuggestion1: "गेहूँ में पीली पत्ती क्यों?",
            voiceSuggestion2: "आज कितना पानी दें?",
            voiceSuggestion3: "कौन सी खाद डालें?",

            // Mandi
            allMandiRates: "सभी मंडी भाव",
            todayRates: "आज के भाव",
            todayPrice: "आज का भाव",
            seePrice: "भाव देखें",
            pullToRefresh: "नीचे खींचकर अपडेट करें",
            refreshing: "अपडेट हो रहा है...",
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
            profileComplete: "प्रोफ़ाइल {{percent}}% पूरा",
            nextStep: "अगला कदम: {{step}}",
            profileDone: "🎉 प्रोफ़ाइल पूरा है!",
            back: "वापस",
            aboutFarmIQ: "FarmIQ के बारे में",
            aboutDesc: "FarmIQ भारतीय किसानों के लिए बनाया गया एक AI-powered कृषि मंच है। यह Google Gemini AI की शक्ति से चलता है।",
            selectLang: "भाषा चुनें",
            addCrops: "फसल जोड़ें",
            addApiKey: "API Key डालें",
            fillState: "राज्य भरें",
            soilType: "मिट्टी का प्रकार",
            apiKeyDesc: "AI सुविधाओं के लिए Google Gemini API key ज़रूरी है",

            // Loading & Status
            loading: "जानकारी ला रहे हैं...",
            noData: "अभी जानकारी उपलब्ध नहीं",

            // Offline Banner
            offline: "इंटरनेट कनेक्शन नहीं है",
            backOnline: "✅ वापस जुड़ गए!",

            // Statistics
            statsTitle: "आँकड़े",
            cropGrowth: "फसल की बढ़त",
            weekly: "साप्ताहिक",
            communityTitle: "किसान समुदाय",
            joinBtn: "जुड़ें",
            cm: "सेमी",

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

            // Crop Search
            searchFarmPlaceholder: "फसल या किसान खोजें...",
            farming: "खेती",
            nursery: "नर्सरी",

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
            askCommunity: "सवाल पूछें",
            trending: "चर्चा में",
            answered: "जवाब मिला",
            unanswered: "जवाब दें",

            // Language Selection
            chooseLanguage: "अपनी भाषा चुनें",
            chooseLanguageSub: "Choose your language",
            continueBtn: "आगे बढ़ें →",
            changeLater: "बाद में Settings से भाषा बदल सकते हैं",

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
            greeting: "🙏 Hello, Farmer!",
            searchCropPlaceholder: "Search crops...",
            quickActionsTitle: "Quick Actions",
            myCrops: "My Crops",
            viewAll: "View All",
            sowing: "Sowing",
            fertilizer: "Fertilizer",
            pests: "Pests",
            mandiLabel: "Mandi",
            aiTip: "AI tip: Today is a good day to water wheat. 💧",
            cloudy: "Cloudy",
            sunrise: "Sunrise",
            sunset: "Sunset",
            humidity: "Humidity",
            rain: "Rain",
            pressure: "Pressure",
            wind: "Wind",
            location: "Unnao, Uttar Pradesh",
            addToCrops: "🌾 Add to My Crops",

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
            cropDetailTitle: "Crop Details",
            available: "Available ✓",
            pestDiagnosis: "🔍 Identify Pest / Disease",
            diagnosing: "Diagnosing...",
            shareWhatsApp: "Share on WhatsApp",
            info: "Information",
            readMore: "...Read more",
            alsoSee: "Also See",

            voiceListening: "Speak, I'm listening...",
            voiceProcessing: "🌿 Finding your answer...",
            voiceShare: "📤 Share on WhatsApp",
            voiceSuggestion1: "Why are wheat leaves yellow?",
            voiceSuggestion2: "How much water today?",
            voiceSuggestion3: "Which fertilizer to use?",

            allMandiRates: "All Mandi Rates",
            todayRates: "Today's Rates",
            todayPrice: "Today's Price",
            seePrice: "See Price",
            pullToRefresh: "Pull down to refresh",
            refreshing: "Refreshing...",
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
            profileComplete: "Profile {{percent}}% complete",
            nextStep: "Next step: {{step}}",
            profileDone: "🎉 Profile complete!",
            back: "Back",
            aboutFarmIQ: "About FarmIQ",
            aboutDesc: "FarmIQ is an AI-powered agriculture platform built for Indian farmers. It is powered by Google Gemini AI.",
            selectLang: "Select language",
            addCrops: "Add crops",
            addApiKey: "Add API Key",
            fillState: "Fill your state",
            soilType: "Soil type",
            apiKeyDesc: "Google Gemini API key is required for AI features",

            loading: "Loading information...",
            noData: "Information not available right now",

            offline: "No internet connection",
            backOnline: "✅ Back online!",

            statsTitle: "Statistics",
            cropGrowth: "Crop Growth",
            weekly: "Weekly",
            communityTitle: "Farmer Community",
            joinBtn: "Join",
            cm: "cm",

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

            searchFarmPlaceholder: "Search crops or farmers...",
            farming: "Farming",
            nursery: "Nursery",

            communityTitle: "Farmer Community",
            askCommunity: "Ask Question",
            trending: "Trending",
            answered: "Answered",
            unanswered: "Unanswered",

            chooseLanguage: "Choose your language",
            chooseLanguageSub: "Choose your language",
            continueBtn: "Continue →",
            changeLater: "You can change the language later from Settings",

            madeInIndia: "🇮🇳 Made in India",
        },
    },
};

// Read saved language from localStorage so it persists across reloads
const savedLang = typeof window !== "undefined" ? localStorage.getItem("farmiq_lang") : null;

i18n.use(initReactI18next).init({
    resources,
    lng: savedLang || "hi",
    fallbackLng: "hi",
    interpolation: { escapeValue: false },
});

export default i18n;
