
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import { COURSES } from "../data/courses";
import { TRACKS, lessonCountText } from "../lib/helpers";
import useTitle from "../lib/useTitle";

const TRACK_ICONS = {
  web: "code",
  python: "terminal",
  mobile: "smartphone",
  data: "database",
};

export default function Tracks() {
  useTitle("Tracks | AayuAcademy");

  return (
    <Layout>
      <div className="tracks-page">
        <div className="page-heading">
          <h1>Tracks</h1>
          <p className="muted-text">
            Choose a learning path and build your skills step by step.
          </p>
        </div>

        <div className="tracks-grid">
          {TRACKS.map((track) => {
            const courses = COURSES.filter(
              (course) => course.track.toLowerCase() === track.key
            );

            const totalLessons = courses.reduce(
              (sum, course) => sum + course.lessons.length,
              0
            );

            return (
              <article className="track-card" key={track.key}>
                <div className="track-card-icon">
                  <Icon name={TRACK_ICONS[track.key]} />
                </div>

                <h2>{track.label}</h2>

                <p className="muted-text">
                  {track.description}
                </p>

                <div className="track-card-stats">
                  <span>
                    {courses.length} {courses.length === 1 ? "course" : "courses"}
                  </span>
                  <span>·</span>
                  <span>{lessonCountText(totalLessons)}</span>
                </div>

                <Link
                  className="track-card-link"
                  to={`/courses?track=${track.key}`}
                >
                  Explore Track
                  <Icon name="arrow-right" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
