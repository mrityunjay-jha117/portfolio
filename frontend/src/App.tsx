import { useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Game from "./pages/Game";
import Individual_Blog from "./pages/individual_blogs";
import AllBlogsPage from "./pages/portfolio_pages/AllBlogsPage";
import Authorised_Creator from "./creator_page/authorised";
import CreateBlog from "./creator_page/crud_pages/create";
import DeleteBlog from "./creator_page/crud_pages/delete";
import Overlay from "./pages/overlay";

function AppRouter() {
  const location = useLocation();
  // Overlay only on first mount — never again
  const hasShownOverlay = useRef(false);
  const [showOverlay, setShowOverlay] = useState(!hasShownOverlay.current);

  const handleOverlayFinish = () => {
    hasShownOverlay.current = true;
    setShowOverlay(false);
  };

  return (
    <>
      {showOverlay && <Overlay onFinish={handleOverlayFinish} />}

      <Routes location={location}>
        <Route path="/" element={<Portfolio />} />
        <Route path="/game" element={<Game />} />
        <Route path="/blogs/all" element={<AllBlogsPage />} />
        <Route path="/blogs/:id" element={<Individual_Blog />} />
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
