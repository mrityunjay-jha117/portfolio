import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignatureDemo from "./components/Signature";
import Portfolio from "./pages/Portfolio";
import Game from "./pages/Game";
import BlogPage from "./pages/portfolio_pages/BlogPage";
import AllBlogsPage from "./pages/portfolio_pages/AllBlogsPage";
import BlogDetailPage from "./pages/portfolio_pages/BlogDetailPage";

function AppRouter() {
  const location = useLocation();
  // overlay shown initially, and whenever location.key changes
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // show overlay on every route change
    setShowOverlay(true);
  }, [location.key]);

  return (
    <>
      {showOverlay && (
        // key by location.key so it remounts on each navigation
        <SignatureDemo
          key={location.key}
          onFinish={() => setShowOverlay(false)}
        />
      )}

      {/* When overlay is visible, it sits above routes and will hide itself when finished */}
      <Routes location={location}>
        <Route path="/" element={<Portfolio />} />
        <Route path="/game" element={<Game />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/all" element={<AllBlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}
