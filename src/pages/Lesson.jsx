import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { LessonHeader } from "../components/Header";
import Icon from "../components/Icon";
import ProgressBar from "../components/ProgressBar";
import NotFoundCard from "../components/NotFoundCard";
import { useApp } from "../context/AppContext";
import {
  getCourse, lessonsOf, lessonPath, courseStats, isCompleted, nextLesson, formatClock
} from "../lib/helpers";
import useTitle from "../lib/useTitle";

export default function Lesson() {
  const { slug, lessonId } = useParams();
  const { progress, markComplete } = useApp();
  const course = getCourse(slug);
  const lessons = course ? lessonsOf(course) : [];
  const current = lessons.find((l) => l.id === lessonId) || null;
  useTitle(current ? current.title + " | AayuAcademy" : "Page not found | AayuAcademy");

  if (!course || !current) return <Layout><NotFoundCard /></Layout>;

  const stats = courseStats(course, progress);
  const done = isCompleted(progress, current.id);
  const next = nextLesson(course, current.id);
  const nextTo = next ? lessonPath(course, next) : "/courses/" + encodeURIComponent(course.slug);

  return (
    <Layout header={<LessonHeader course={course} />}>
      <div className="lesson-layout" style={{ paddingTop: 0 }}>
        <div className="lesson-main">
          <div className="video" role="img" aria-label="Placeholder video">
            <div className="video-play"><Icon name="play" /></div>
            <div className="video-label">Placeholder video</div>
          </div>
          <div className="card title-card">
            <h1>{current.title}</h1>
            <div className="title-actions">
              <button type="button" className="btn btn-outline" disabled={done}
                      onClick={() => markComplete(course.slug, current.id)}>
                <Icon name="check-circle" /><span>{done ? "Completed" : "Mark complete"}</span>
              </button>
              <Link className="btn btn-primary" to={nextTo}><span>Next</span><Icon name="arrow-right" /></Link>
            </div>
          </div>
        </div>

        <aside className="card sidebar-card">
          <div className="sidebar-head"><h2>Lessons</h2><span>{stats.done} of {stats.total}</span></div>
          <ProgressBar pct={stats.percent} complete={stats.complete} label="Course progress" />
          <div className="sidebar-list">
            {lessons.map((l) => {
              const isDone = isCompleted(progress, l.id);
              return (
                <Link className="sidebar-item" key={l.id} to={lessonPath(course, l)}
                      aria-current={l.id === current.id ? "page" : undefined}>
                  {isDone
                    ? <span className="si-mark is-done"><Icon name="check-circle" className="icon-sm" /></span>
                    : <span className="si-mark"><Icon name="play" className="icon-sm" /></span>}
                  <span className="si-title truncate">{l.number}. {l.title}</span>
                  <span className="si-time">{formatClock(l.minutes * 60)}</span>
                </Link>
              );
            })}
          </div>
        </aside>
      </div>
    </Layout>
  );
}
