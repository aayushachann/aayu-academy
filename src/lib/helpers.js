import { COURSES } from "../data/courses";

export const TRACKS = [
  { key: "web", label: "Web", icon: "code" },
  { key: "python", label: "Python", icon: "terminal" },
  { key: "mobile", label: "Mobile", icon: "smartphone" },
  { key: "data", label: "Data", icon: "database" }
];

const LEVEL_LABELS = { BEGINNER: "Beginner", INTERMEDIATE: "Intermediate" };
export const levelLabel = (v) => LEVEL_LABELS[v] || v;

export const PLACEHOLDER_IMG = "/images/placeholder/course.svg";

export function getCourse(slug) {
  return COURSES.find((c) => c.slug === slug) || null;
}

export function lessonsOf(course) {
  return course.lessons.map((l, i) => ({
    number: i + 1,
    id: course.slug + "-" + (i + 1),
    title: l[0],
    minutes: l[1]
  }));
}

export function lessonPath(course, lesson) {
  return "/courses/" + encodeURIComponent(course.slug) + "/lessons/" + encodeURIComponent(lesson.id);
}

export function isCompleted(progress, lessonId) {
  return !!(progress && progress.completed && progress.completed[lessonId]);
}

export function percent(done, total) {
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

export function firstIncompleteLesson(course, progress) {
  return lessonsOf(course).find((l) => !isCompleted(progress, l.id)) || null;
}

/* First incomplete lesson, or lesson 1 when everything is done. */
export function continueLesson(course, progress) {
  return firstIncompleteLesson(course, progress) || lessonsOf(course)[0];
}

export function nextLesson(course, lessonId) {
  const list = lessonsOf(course);
  const i = list.findIndex((l) => l.id === lessonId);
  return i === -1 ? null : list[i + 1] || null;
}

export function courseStats(course, progress) {
  const list = lessonsOf(course);
  let done = 0;
  let minutes = 0;
  list.forEach((l) => {
    minutes += l.minutes;
    if (isCompleted(progress, l.id)) done++;
  });
  return {
    total: list.length,
    done,
    minutes,
    percent: percent(done, list.length),
    complete: list.length > 0 && done === list.length
  };
}

function lastActivity(course, progress) {
  let latest = Number(progress.enrolled[course.slug]) || 0;
  lessonsOf(course).forEach((l) => {
    const t = Number(progress.completed[l.id]) || 0;
    if (t > latest) latest = t;
  });
  return latest;
}

/* Enrolled courses, most recent activity first. */
export function enrolledCourses(progress) {
  return COURSES.filter((c) => !!progress.enrolled[c.slug])
    .map((c, i) => ({ course: c, activity: lastActivity(c, progress), index: i }))
    .sort((a, b) => b.activity - a.activity || a.index - b.index)
    .map((x) => x.course);
}

export function formatDuration(seconds) {
  const mins = Math.round(Math.max(0, seconds) / 60);
  if (mins < 60) return mins + "m";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? h + "h" : h + "h " + m + "m";
}

export function formatClock(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const sec = s % 60;
  return Math.floor(s / 60) + ":" + (sec < 10 ? "0" + sec : sec);
}

export function initials(name) {
  const words = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0].charAt(0);
  if (words.length === 1) return first.toUpperCase();
  return (first + words[words.length - 1].charAt(0)).toUpperCase();
}

export function lessonCountText(n) {
  return n + (n === 1 ? " lesson" : " lessons");
}

/* Only allow a path on this site, like /courses/abc or /courses?track=web. Anything else -> "/". */
export function safeNext(value) {
  if (typeof value !== "string") return "/";
  if (!/^\/(?!\/)[A-Za-z0-9\-_/]*(\?[^#\s\\]*)?$/.test(value)) return "/";
  return value;
}
