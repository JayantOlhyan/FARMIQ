import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "./store/useStore";
import "./lib/i18n";

// Common
import BottomTabBar from "./components/common/BottomTabBar";
import TriColorFooter from "./components/common/TriColorFooter";

// Pages
import OnboardingScreen from "./pages/phase1/OnboardingScreen";
import HomeScreen from "./pages/phase1/HomeP1";
import CropDetail from "./pages/phase1/CropDetail";
import CropSelect from "./pages/phase1/CropSelect";
import MandiRates from "./pages/phase1/MandiP1";
import WeatherDiary from "./pages/phase1/WeatherDiary";
import Statistics from "./pages/phase1/Statistics";
import Settings from "./pages/phase1/Settings";
import VoiceQA from "./pages/phase1/VoiceQA";

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

function AppRoutes() {
  const { onboardingComplete } = useStore();

  if (!onboardingComplete) {
    return (
      <Routes>
        <Route path="*" element={<OnboardingScreen />} />
      </Routes>
    );
  }

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
      <AppRoutes />
    </Router>
  );
}
