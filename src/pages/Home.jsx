import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import CourseCard from "../components/CourseCard";
import SafeImage from "../components/SafeImage";
import { useApp } from "../context/AppContext";
import { COURSES } from "../data/courses";
import { TRACKS } from "../lib/helpers";
import useTitle from "../lib/useTitle";

export default function Home() {
  const { signedIn } = useApp();
  useTitle("AayuAcademy");

  return (
    <Layout>
      <section className="card hero" aria-labelledby="hero-title">
        <div className="hero-text">
          <h1 id="hero-title">Learn to code.</h1>
          <Link className="btn btn-primary btn-lg" to={signedIn ? "/courses" : "/login?mode=signup"}>
            Start learning
          </Link>
        </div>
        <div className="hero-image">
          <SafeImage src="/images/home/hero.jpg" alt="A student with headphones coding on a laptop" lazy={false} />
        </div>
      </section>

      <nav className="track-grid" aria-label="Course tracks">
        {TRACKS.map((t) => (
          <Link key={t.key} className="track-card" to={"/courses?track=" + t.key}>
            <span className="track-icon"><Icon name={t.icon} /></span>
            <span>{t.label}</span>
          </Link>
        ))}
      </nav>

      <div className="section-head">
        <h2>Popular courses</h2>
        <Link className="link-arrow" to="/courses">View all<Icon name="arrow-right" className="icon-sm" /></Link>
      </div>
      <div className="course-grid">
        {COURSES.slice(0, 4).map((c) => <CourseCard key={c.slug} course={c} />)}
      </div>
    </Layout>
  );
}
