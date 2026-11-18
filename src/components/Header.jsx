
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Icon from "./Icon";
import { useApp } from "../context/AppContext";
import { initials } from "../lib/helpers";

export function Logo() {
  return (
    <Link className="logo" to="/">
      <span className="logo-mark">
        <Icon name="terminal" />
      </span>
      <span>AayuAcademy</span>
    </Link>
  );
}

export function Avatar({ name }) {
  const ini = initials(name);
  return (
    <Link className="avatar" to="/profile" aria-label={"Profile, " + ini}>
      {ini}
    </Link>
  );
}

export function SimpleHeader() {
  return (
    <header className="site-header header-simple">
      <div className="container header-inner">
        <Logo />
      </div>
    </header>
  );
}

export function LessonHeader({ course }) {
  const { user } = useApp();

  return (
    <header className="site-header lesson-header">
      <div className="container header-inner">
        <Link className="back-link" to={"/courses/" + encodeURIComponent(course.slug)}>
          <Icon name="arrow-left" />
          <span>Back</span>
        </Link>

        <span className="divider-v" aria-hidden="true" />
        <span className="course-pill">{course.title}</span>

        <div className="header-actions">
          <Avatar name={user ? user.name : "Demo User"} />
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  const { user } = useApp();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onCourses = pathname.startsWith("/courses");
  const onTracks = pathname === "/tracks";
  const onRoadmap = pathname === "/roadmap";

  const q = pathname === "/courses" ? searchParams.get("q") || "" : "";

  function handleSearch(e) {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("q");
    const text = String(value || "").trim().slice(0, 100);

    navigate("/courses" + (text ? "?q=" + encodeURIComponent(text) : ""));
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />

        <form className="header-search" role="search" onSubmit={handleSearch}>
          <label className="sr-only" htmlFor="header-q">
            Search courses and tracks
          </label>
          <Icon name="search" />
          <input
            id="header-q"
            name="q"
            type="search"
            maxLength={100}
            placeholder="Search courses, tracks..."
            defaultValue={q}
            key={q}
          />
        </form>

        <nav className="header-nav" aria-label="Main">
          <Link
            className="nav-link"
            to="/courses"
            aria-current={onCourses ? "page" : undefined}
          >
            Courses
          </Link>

          <Link
            className="nav-link"
            to="/tracks"
            aria-current={onTracks ? "page" : undefined}
          >
            Tracks
          </Link>

          <Link
            className="nav-link"
            to="/roadmap"
            aria-current={onRoadmap ? "page" : undefined}
          >
            Roadmap
          </Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <Avatar name={user.name} />
          ) : (
            <>
              <Link className="btn btn-ghost btn-sm" to="/login">
                Log in
              </Link>
              <Link className="btn btn-primary btn-sm" to="/login?mode=signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
