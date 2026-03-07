import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
    persist(
        (set, get) => ({
            // ---- User Preferences ----
            userMode: "phase1", // "phase1" | "phase2"
            selectedLanguage: "hi",
            onboardingComplete: false,

            // ---- Farm Profile (Phase 2) ----
            farmProfile: {
                name: "",
                state: "उत्तर प्रदेश",
                district: "उन्नाव",
                totalAcres: 3,
                farmingType: "conventional",
            },

            // ---- Crop Selection ----
            myCrops: [],

            // ---- Location ----
            location: { state: "उत्तर प्रदेश", district: "उन्नाव", mandiId: "" },

            // ---- AI Chat History (Phase 2, last 30 days) ----
            chatHistory: [],

            // ---- Cached Mandi Data ----
            mandiCache: {},

            // ---- Community (Phase 2) ----
            savedPosts: [],
            myPosts: [],
            expertMode: false,

            // ---- Daily Tip Cache ----
            dailyTip: null,
            dailyTipDate: null,

            // ==== Actions ====
            setUserMode: (mode) => {
                set({ userMode: mode });
                if (mode === "phase2") {
                    document.body.classList.add("phase2");
                } else {
                    document.body.classList.remove("phase2");
                }
            },

            setLanguage: (lang) => set({ selectedLanguage: lang }),

            completeOnboarding: () => set({ onboardingComplete: true }),

            addCrop: (crop) =>
                set((state) => ({
                    myCrops: state.myCrops.some((c) => c.cropId === crop.cropId)
                        ? state.myCrops
                        : [...state.myCrops, crop],
                })),

            removeCrop: (cropId) =>
                set((state) => ({
                    myCrops: state.myCrops.filter((c) => c.cropId !== cropId),
                })),

            setLocation: (loc) => set({ location: { ...get().location, ...loc } }),

            setFarmProfile: (profile) =>
                set({ farmProfile: { ...get().farmProfile, ...profile } }),

            addChatMessage: (msg) =>
                set((state) => ({
                    chatHistory: [
                        ...state.chatHistory,
                        { ...msg, id: Date.now(), timestamp: new Date().toISOString() },
                    ],
                })),

            clearChatHistory: () => set({ chatHistory: [] }),

            bookmarkMessage: (msgId) =>
                set((state) => ({
                    chatHistory: state.chatHistory.map((m) =>
                        m.id === msgId ? { ...m, bookmarked: !m.bookmarked } : m
                    ),
                })),

            setDailyTip: (tip) =>
                set({ dailyTip: tip, dailyTipDate: new Date().toDateString() }),

            updateMandiCache: (cropId, data) =>
                set((state) => ({
                    mandiCache: {
                        ...state.mandiCache,
                        [cropId]: { prices: data, lastFetched: Date.now() },
                    },
                })),
        }),
        {
            name: "farmiq-store",
            partialize: (state) => ({
                userMode: state.userMode,
                selectedLanguage: state.selectedLanguage,
                onboardingComplete: state.onboardingComplete,
                farmProfile: state.farmProfile,
                myCrops: state.myCrops,
                location: state.location,
                chatHistory: state.chatHistory,
                mandiCache: state.mandiCache,
                dailyTip: state.dailyTip,
                dailyTipDate: state.dailyTipDate,
            }),
        }
    )
);

export default useStore;
