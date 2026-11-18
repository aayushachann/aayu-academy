import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import ProgressBar from "../components/ProgressBar";
import SafeImage from "../components/SafeImage";
import NotFoundCard from "../components/NotFoundCard";
import { useApp } from "../context/AppContext";
import {
  getCourse, lessonsOf, lessonPath, courseStats, continueLesson, isCompleted,
  formatDuration, levelLabel, lessonCountText
} from "../lib/helpers";
import useTitle from "../lib/useTitle";

export default function Course() {
  const { slug } = useParams();
  const { signedIn, progress, enroll } = useApp();
  const course = getCourse(slug);
  useTitle(course ? course.title + " | AayuAcademy" : "Page not found | AayuAcademy");

  if (!course) return <Layout><NotFoundCard /></Layout>;

  const lessons = lessonsOf(course);
  const p = signedIn ? progress : { enrolled: {}, completed: {} };
  const stats = courseStats(course, p);
  const enrolled = signedIn && !!p.enrolled[course.slug];
  const cont = signedIn ? continueLesson(course, p) : lessons[0];
  const durationText = formatDuration(stats.minutes * 60);

  let action;
  if (enrolled) {
    action = (
      <>
        <div className="enroll-progress"><span>{stats.done} of {stats.total}</span><span className="pct">{stats.percent}%</span></div>
        <ProgressBar pct={stats.percent} complete={stats.complete} label="Course progress" />
        <Link className="btn btn-primary btn-lg btn-block" to={lessonPath(course, cont)}>Continue</Link>
        {stats.complete && <div className="completed-line"><Icon name="check" /><span>Completed</span></div>}
      </>
    );
  } else if (signedIn) {
    action = (
      <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => enroll(course.slug)}>
        Enroll free
      </button>
    );
  } else {
    const next = "/courses/" + course.slug;
    action = (
      <Link className="btn btn-primary btn-lg btn-block" to={"/login?next=" + encodeURIComponent(next)}>Enroll free</Link>
    );
  }

  return (
    <Layout>
      <div className="course-layout">
        <div className="course-main">
          <h1>{course.title}</h1>
          <Link className="preview" to={lessonPath(course, cont)} aria-label="Play first lesson">
            <SafeImage src={course.image} alt={course.title + " preview"} />
            <span className="play-circle"><Icon name="play" /></span>
          </Link>

          <section className="card card-pad">
            <h2 className="card-title">What you’ll learn</h2>
            <div className="outcome-grid">
              {course.outcomes.map((o) => (
                <div className="outcome" key={o}>
                  <span className="outcome-check"><Icon name="check" /></span>
                  <span>{o}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="card card-pad">
            <div className="card-head">
              <h2>Lessons</h2>
              <span className="meta">{lessonCountText(stats.total)} · {durationText}</span>
            </div>
            <div className="lesson-list">
              {lessons.map((l) => {
                const done = isCompleted(p, l.id);
                return (
                  <Link className="lesson-row" key={l.id} to={lessonPath(course, l)}>
                    {done
                      ? <span className="lesson-num is-done"><Icon name="check" /></span>
                      : <span className="lesson-num">{l.number}</span>}
                    <span className="lesson-title truncate">{l.title}</span>
                    <span className="lesson-time">{l.minutes} min</span>
                    <Icon name="chevron-right" className="icon-sm muted-text" />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="course-side">
          <div className="card side-card">
            <div className="price">Free</div>
            <div className="facts">
              <div className="fact"><span className="label">Level</span><span className="value">{levelLabel(course.level)}</span></div>
              <div className="fact"><span className="label">Lessons</span><span className="value">{stats.total}</span></div>
              <div className="fact"><span className="label">Duration</span><span className="value">{durationText}</span></div>
            </div>
            {action}
          </div>
        </aside>
      </div>
    </Layout>
  );
}
