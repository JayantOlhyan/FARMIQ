import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "./store/useStore";
import "./lib/i18n";

// Common
import Header from "./components/common/Header";
import BottomTabBar from "./components/common/BottomTabBar";
import TriColorFooter from "./components/common/TriColorFooter";

// Phase 1
import OnboardingScreen from "./pages/phase1/OnboardingScreen";
import HomeP1 from "./pages/phase1/HomeP1";
import CropLibrary from "./pages/phase1/CropLibrary";
import CropDetail from "./pages/phase1/CropDetail";
import VoiceQA from "./pages/phase1/VoiceQA";
import MandiP1 from "./pages/phase1/MandiP1";
import TransportP1 from "./pages/phase1/TransportP1";
import Settings from "./pages/phase1/Settings";

// Phase 2
import DashboardP2 from "./pages/phase2/DashboardP2";
import AIChat from "./pages/phase2/AIChat";
import CommunityForum from "./pages/phase2/CommunityForum";

function AppLayout({ children, showFooter = true }) {
  const { userMode } = useStore();
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: userMode === "phase1" ? "#FFF8F0" : "#FAFBFC" }}>
      <Header />
      <main className="flex-1">{children}</main>
      {showFooter && <TriColorFooter />}
      {userMode === "phase1" && <BottomTabBar />}
    </div>
  );
}

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const { onboardingComplete, userMode } = useStore();

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
        {/* Home — mode aware */}
        <Route
          path="/home"
          element={
            <AppLayout>
              <PageTransition>
                {userMode === "phase1" ? <HomeP1 /> : <DashboardP2 />}
              </PageTransition>
            </AppLayout>
          }
        />

        {/* Crops */}
        <Route
          path="/crops"
          element={
            <AppLayout>
              <PageTransition>
                <CropLibrary />
              </PageTransition>
            </AppLayout>
          }
        />
        <Route
          path="/crops/:id"
          element={
            <AppLayout>
              <PageTransition>
                <CropDetail />
              </PageTransition>
            </AppLayout>
          }
        />

        {/* Voice Q&A (Phase 1) */}
        <Route
          path="/voice"
          element={
            userMode === "phase1" ? (
              <VoiceQA />
            ) : (
              <Navigate to="/chat" replace />
            )
          }
        />

        {/* AI Chat (Phase 2) */}
        <Route
          path="/chat"
          element={
            userMode === "phase2" ? (
              <AppLayout showFooter={false}>
                <AIChat />
              </AppLayout>
            ) : (
              <Navigate to="/voice" replace />
            )
          }
        />

        {/* Mandi */}
        <Route
          path="/mandi"
          element={
            <AppLayout>
              <PageTransition>
                <MandiP1 />
              </PageTransition>
            </AppLayout>
          }
        />

        {/* Community */}
        <Route
          path="/community"
          element={
            <AppLayout>
              <PageTransition>
                <CommunityForum />
              </PageTransition>
            </AppLayout>
          }
        />

        {/* Transport */}
        <Route
          path="/transport"
          element={
            <AppLayout>
              <PageTransition>
                <TransportP1 />
              </PageTransition>
            </AppLayout>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <AppLayout>
              <PageTransition>
                <Settings />
              </PageTransition>
            </AppLayout>
          }
        />

        {/* Default redirect */}
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
