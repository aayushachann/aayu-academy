import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import CourseCard from "../components/CourseCard";
import { COURSES } from "../data/courses";
import { TRACKS } from "../lib/helpers";
import useTitle from "../lib/useTitle";

const TRACK_KEYS = ["web", "python", "mobile", "data"];
const LEVEL_KEYS = ["beginner", "intermediate"];

export default function Courses() {
  useTitle("Courses | AayuAcademy");
  const [searchParams, setSearchParams] = useSearchParams();

  // Read filters from the URL (so links like /courses?track=web work)
  const q = (searchParams.get("q") || "").trim().slice(0, 100);
  const t = (searchParams.get("track") || "").toLowerCase();
  const l = (searchParams.get("level") || "").toLowerCase();
  const state = {
    q,
    track: TRACK_KEYS.includes(t) ? t : "",
    level: LEVEL_KEYS.includes(l) ? l : ""
  };

  // The search box keeps its own text until the form is submitted
  const [text, setText] = useState(state.q);
  useEffect(() => { setText(state.q); }, [state.q]);

  function update(next) {
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.track) params.set("track", next.track);
    if (next.level) params.set("level", next.level);
    setSearchParams(params);
  }

  const cleanText = () => text.trim().slice(0, 100);

  function matches(course) {
    if (state.q && !course.title.toLowerCase().includes(state.q.toLowerCase())) return false;
    if (state.track && course.track.toLowerCase() !== state.track) return false;
    if (state.level && course.level.toLowerCase() !== state.level) return false;
    return true;
  }

  const list = COURSES.filter(matches);
  const pills = [{ key: "", label: "All" }, ...TRACKS];

  return (
    <Layout>
      <h1>Courses</h1>

      <form className="card filter-card" role="search" noValidate
            onSubmit={(e) => { e.preventDefault(); update({ ...state, q: cleanText() }); }}>
        <label className="search-field">
          <span className="sr-only">Search courses</span>
          <Icon name="search" />
          <input type="search" maxLength={100} placeholder="Search courses..." autoComplete="off"
                 value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <div className="filter-row">
          <div className="pill-row" role="group" aria-label="Track">
            {pills.map((p) => {
              const active = p.key === state.track;
              return (
                <button key={p.key || "all"} type="button" className={"chip" + (active ? " is-active" : "")}
                        aria-pressed={active}
                        onClick={() => update({ ...state, q: cleanText(), track: p.key })}>
                  {p.label}
                </button>
              );
            })}
          </div>
          <div className="select-wrap">
            <label className="sr-only" htmlFor="level-select">Level</label>
            <select id="level-select" value={state.level}
                    onChange={(e) => update({ ...state, q: cleanText(), level: e.target.value })}>
              <option value="">All levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
            <Icon name="chevron-down" />
          </div>
        </div>
      </form>

      <div className="results" aria-live="polite">
        {list.length === 0 ? (
          <div className="card empty-state">
            <div className="empty-icon"><Icon name="search-x" /></div>
            <h2>No courses found</h2>
            <p>Try other words or clear filters.</p>
            <Link className="btn btn-primary" to="/courses">Clear filters</Link>
          </div>
        ) : (
          <div className="course-grid">
            {list.map((c) => <CourseCard key={c.slug} course={c} />)}
          </div>
        )}
      </div>
    </Layout>
  );
}
