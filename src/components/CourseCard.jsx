import { Link } from "react-router-dom";
import Icon from "./Icon";
import SafeImage from "./SafeImage";
import { levelLabel, lessonCountText } from "../lib/helpers";

export default function CourseCard({ course }) {
  const n = course.lessons.length;
  const levelClass = course.level === "BEGINNER" ? "beginner" : course.level === "INTERMEDIATE" ? "intermediate" : "";
  return (
    <Link className="course-card" to={"/courses/" + encodeURIComponent(course.slug)}>
      <div className="course-card-image">
        <SafeImage src={course.image} alt={course.title + " course"} />
        <span className="pill-free">Free</span>
      </div>
      <div className="course-card-meta">
        <span className={"badge-level " + levelClass}>{levelLabel(course.level)}</span>
        <span className="meta-lessons"><Icon name="clock" className="icon-sm" />{lessonCountText(n)}</span>
      </div>
      <h3 className="course-card-title">{course.title}</h3>
    </Link>
  );
}
