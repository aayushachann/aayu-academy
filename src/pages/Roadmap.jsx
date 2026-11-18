
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { COURSES } from "../data/courses";
import Icon from "../components/Icon";
import ProgressBar from "../components/ProgressBar";
import { useApp } from "../context/AppContext";
import { lessonsOf, courseStats } from "../lib/helpers";

const roadmapInfo = [
  {
    key: "WEB",
    title: "Web Development",
    icon: "code",
    description: "Learn to build websites and modern web applications."
  },
  {
    key: "PYTHON",
    title: "Python",
    icon: "terminal",
    description: "Develop programming and problem-solving skills."
  },
  {
    key: "MOBILE",
    title: "Mobile Development",
    icon: "smartphone",
    description: "Learn to create applications for mobile devices."
  },
  {
    key: "DATA",
    title: "Data & AI",
    icon: "database",
    description: "Explore databases, data analysis and machine learning."
  }
];

export default function Roadmap() {
  const { progress } = useApp();

  const allLessons = COURSES.flatMap((course) =>
    lessonsOf(course).map((lesson) => lesson.id)
  );

  const completedLessons = allLessons.filter((id) =>
    Boolean(progress.completed?.[id])
  ).length;

  const overallPercent = allLessons.length
    ? Math.round((completedLessons / allLessons.length) * 100)
    : 0;

  return (
    <Layout>
      <div className="roadmap-page">

        <section className="roadmap-hero">
          <p className="eyebrow">YOUR LEARNING JOURNEY</p>
          <h1>Your Learning Roadmap</h1>
          <p>
            Follow your learning journey, complete lessons and track
            your progress as you develop new skills.
          </p>
        </section>

        <section className="roadmap-overview">
          <div className="roadmap-overview-top">
            <div>
              <h2>Overall Progress</h2>
              <p>
                {completedLessons} of {allLessons.length} lessons completed
              </p>
            </div>
            <strong>{overallPercent}%</strong>
          </div>

          <ProgressBar
            pct={overallPercent}
            complete={overallPercent === 100}
          />
        </section>

        <section className="roadmap-intro">
          <div>
            <h2>Your Learning Paths</h2>
            <p>
              Choose a subject and continue learning at your own pace.
            </p>
          </div>
        </section>

        <section className="roadmap-list">
          {roadmapInfo.map((track) => {
            const trackCourses = COURSES.filter(
              (course) => course.track === track.key
            );

            const trackTotal = trackCourses.reduce(
              (sum, course) => sum + lessonsOf(course).length,
              0
            );

            const trackDone = trackCourses.reduce(
              (sum, course) => sum + courseStats(course, progress).done,
              0
            );

            const trackPercent = trackTotal
              ? Math.round((trackDone / trackTotal) * 100)
              : 0;

            return (
              <article className="roadmap-track" key={track.key}>

                <div className="roadmap-track-heading">
                  <div className="roadmap-track-icon">
                    <Icon name={track.icon} />
                  </div>

                  <div>
                    <h2>{track.title}</h2>
                    <p>{track.description}</p>
                  </div>
                </div>

                <div className="roadmap-track-progress">
                  <div className="roadmap-overview-top">
                    <span>
                      {trackDone} of {trackTotal} lessons completed
                    </span>
                    <strong>{trackPercent}%</strong>
                  </div>

                  <ProgressBar
                    pct={trackPercent}
                    complete={trackPercent === 100}
                  />
                </div>

                <div className="roadmap-course-list">
                  {trackCourses.map((course) => {
                    const stats = courseStats(course, progress);

                    return (
                      <div
                        className="roadmap-course-card"
                        key={course.slug}
                      >
                        <div className="roadmap-course-info">

                          <div className="roadmap-course-heading">
                            <h4>{course.title}</h4>

                            {stats.complete && (
                              <span className="roadmap-completed">
                                <Icon name="check-circle" />
                                Completed
                              </span>
                            )}
                          </div>

                          <p>
                            {course.level.charAt(0) +
                              course.level.slice(1).toLowerCase()}
                            {" · "}
                            {stats.done} of {stats.total} lessons completed
                          </p>

                          <ProgressBar
                            pct={stats.percent}
                            complete={stats.complete}
                          />

                          <Link
                            to={`/courses/${course.slug}`}
                            className="roadmap-course-link"
                          >
                            {stats.complete
                              ? "Review course"
                              : stats.done > 0
                                ? "Continue learning"
                                : "Start course"}
                            <span> →</span>
                          </Link>

                        </div>
                      </div>
                    );
                  })}
                </div>

              </article>
            );
          })}
        </section>

      </div>
    </Layout>
  );
}
