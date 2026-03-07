import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import useStore from "./store/useStore";
import "./lib/i18n";

// Common (always loaded)
import BottomTabBar from "./components/common/BottomTabBar";
import TriColorFooter from "./components/common/TriColorFooter";
import OfflineBanner from "./components/common/OfflineBanner";

// Route-based code splitting (Fix #6)
const OnboardingScreen = lazy(() => import("./pages/phase1/OnboardingScreen"));
const HomeScreen = lazy(() => import("./pages/phase1/HomeP1"));
const CropDetail = lazy(() => import("./pages/phase1/CropDetail"));
const CropSelect = lazy(() => import("./pages/phase1/CropSelect"));
const MandiRates = lazy(() => import("./pages/phase1/MandiP1"));
const WeatherDiary = lazy(() => import("./pages/phase1/WeatherDiary"));
const Statistics = lazy(() => import("./pages/phase1/Statistics"));
const Settings = lazy(() => import("./pages/phase1/Settings"));
const VoiceQA = lazy(() => import("./pages/phase1/VoiceQA"));

// Loading spinner for Suspense fallback
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "var(--color-light-green-bg)" }}>
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-4xl mb-3"
        >
          🌾
        </motion.div>
        <p className="text-[14px] text-[#666]" style={{ fontFamily: "var(--font-hindi)" }}>
          लोड हो रहा है...
        </p>
      </div>
    </div>
  );
}

function AppLayout({ children }) {
  return (
    <div className="app-container">
      {children}
      <TriColorFooter />
      <BottomTabBar />
    </div>
  );
}

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const LanguageSelection = lazy(() => import("./pages/phase1/LanguageSelection"));

function AppRoutes() {
  const { onboardingComplete, languageSelected, selectLanguage } = useStore();

  // Step 1: Language selection (first launch only)
  if (!languageSelected) {
    return (
      <Routes>
        <Route path="*" element={<LanguageSelection onSelect={selectLanguage} />} />
      </Routes>
    );
  }

  // Step 2: Onboarding
  if (!onboardingComplete) {
    return (
      <Routes>
        <Route path="*" element={<OnboardingScreen />} />
      </Routes>
    );
  }

  // Step 3: Main app
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/home" element={<AppLayout><PageWrap><HomeScreen /></PageWrap></AppLayout>} />
        <Route path="/crops" element={<AppLayout><PageWrap><CropSelect /></PageWrap></AppLayout>} />
        <Route path="/crops/:id" element={<AppLayout><PageWrap><CropDetail /></PageWrap></AppLayout>} />
        <Route path="/mandi" element={<AppLayout><PageWrap><MandiRates /></PageWrap></AppLayout>} />
        <Route path="/weather" element={<AppLayout><PageWrap><WeatherDiary /></PageWrap></AppLayout>} />
        <Route path="/statistics" element={<AppLayout><PageWrap><Statistics /></PageWrap></AppLayout>} />
        <Route path="/voice" element={<VoiceQA />} />
        <Route path="/settings" element={<AppLayout><PageWrap><Settings /></PageWrap></AppLayout>} />
        <Route path="/profile" element={<AppLayout><PageWrap><Settings /></PageWrap></AppLayout>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <OfflineBanner />
      <Suspense fallback={<LoadingFallback />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}
