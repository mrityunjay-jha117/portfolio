import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Game from "./pages/Game";
import AllBlogsPage from "./pages/portfolio_pages/AllBlogsPage";
import BlogDetailPage from "./pages/portfolio_pages/BlogDetailPage";
import SignatureDemo from "./components/Signature";
import Creator from "./creator_page/creator";
import Authorised_Creator from "./creator_page/authorised";
import CreateBlog from "./creator_page/crud_pages/create";
import DeleteBlog from "./creator_page/crud_pages/delete";
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
        <Route path="/blogs/all" element={<AllBlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/admin" element={<Creator />} />
        <Route path="/real_admin" element={<Authorised_Creator />} />
        <Route path="/real_admin/create" element={<CreateBlog />} />
        <Route path="/real_admin/delete" element={<DeleteBlog />} />
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
