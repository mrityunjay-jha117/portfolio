import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Game from "./pages/Game";
import Individual_Blog from "./pages/individual_blogs";
import AllBlogsPage from "./pages/portfolio_pages/AllBlogsPage";
import Authorised_Creator from "./creator_page/authorised";
import CreateBlog from "./creator_page/crud_pages/create";
import DeleteBlog from "./creator_page/crud_pages/delete";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/game" element={<Game />} />
        <Route path="/blogs/all" element={<AllBlogsPage />} />
        <Route path="/blogs/:id" element={<Individual_Blog />} />
        <Route path="/real_admin" element={<Authorised_Creator />} />
        <Route path="/real_admin/create" element={<CreateBlog />} />
        <Route path="/real_admin/delete" element={<DeleteBlog />} />
      </Routes>
    </Router>
  );
}
