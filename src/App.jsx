import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Tracks from "./pages/Tracks";
import Roadmap from "./pages/Roadmap";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

/* Scroll to the top whenever the page (not just the query) changes. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/courses/:slug" element={<Course />} />

        <Route path="/courses/:slug/lessons/:lessonId"
               element={<RequireAuth><Lesson /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/profile/edit" element={<RequireAuth><ProfileEdit /></RequireAuth>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
