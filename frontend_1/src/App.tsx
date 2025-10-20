import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Game from "./pages/Game";
import BlogPage from "./pages/portfolio_pages/BlogPage";
import AllBlogsPage from "./pages/portfolio_pages/AllBlogsPage";
import BlogDetailPage from "./pages/portfolio_pages/BlogDetailPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/game" element={<Game />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/all" element={<AllBlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
      </Routes>
    </Router>
  );
}
