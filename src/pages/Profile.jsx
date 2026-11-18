import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Icon from "../components/Icon";
import ProgressBar from "../components/ProgressBar";
import SafeImage from "../components/SafeImage";
import { useApp } from "../context/AppContext";
import { enrolledCourses, courseStats, firstIncompleteLesson, lessonPath, initials } from "../lib/helpers";
import useTitle from "../lib/useTitle";

function StatCard({ icon, number, label }) {
  return (
    <div className="card stat-card">
      <span className="stat-icon"><Icon name={icon} className="icon-lg" /></span>
      <div><div className="stat-num">{number}</div><div className="stat-label">{label}</div></div>
    </div>
  );
}

export default function Profile() {
  const { user, progress, signOut } = useApp();
  const navigate = useNavigate();
  useTitle("Profile | AayuAcademy");

  const enrolled = enrolledCourses(progress); // newest activity first
  let inProgress = 0, completed = 0, lessonsDone = 0;
  const stats = {};
  enrolled.forEach((c) => {
    const s = courseStats(c, progress);
    stats[c.slug] = s;
    lessonsDone += s.done;
    if (s.complete) completed++; else inProgress++;
  });

  // Continue learning: first unfinished course in the sorted list
  const current = enrolled.find((c) => !stats[c.slug].complete) || null;
  const nextL = current ? firstIncompleteLesson(current, progress) : null;

  function handleLogout() {
    signOut();
    navigate("/");
  }

  return (
    <Layout>
      <section className="card profile-head">
        <div className="profile-id">
          <span className="avatar avatar-lg" aria-hidden="true">{initials(user.name)}</span>
          <div style={{ minWidth: 0 }}>
            <h1 className="truncate">{user.name}</h1>
            <p className="muted-text">{user.email}</p>
          </div>
        </div>
        <div className="profile-actions">
          <Link className="btn btn-outline" to="/profile/edit"><Icon name="pencil" /><span>Edit profile</span></Link>
          <button type="button" className="btn btn-ghost" onClick={handleLogout}>
            <Icon name="log-out" /><span>Log out</span>
          </button>
        </div>
      </section>

      <div className="stat-grid">
        <StatCard icon="library" number={inProgress} label="In progress" />
        <StatCard icon="check-circle" number={completed} label="Completed" />
        <StatCard icon="book-open" number={lessonsDone} label="Lessons done" />
      </div>

      {enrolled.length === 0 ? (
        <div className="card empty-state" style={{ marginTop: 32 }}>
          <div className="empty-icon"><Icon name="library" /></div>
          <h2>No courses yet</h2>
          <p></p>
          <Link className="btn btn-primary" to="/courses">Browse courses</Link>
        </div>
      ) : (
        <>
          {current && nextL && (
            <>
              <div className="section-head"><h2>Continue learning</h2></div>
              <section className="card continue-card" style={{ marginTop: 0 }}>
                <div className="continue-image"><SafeImage src={current.image} alt={current.title + " course"} /></div>
                <div className="continue-body">
                  <h3>{current.title}</h3>
                  <p className="next-title">{nextL.title}</p>
                  <div className="pct-row">{stats[current.slug].percent}%</div>
                  <ProgressBar pct={stats[current.slug].percent} complete={false} label={current.title + " progress"} />
                </div>
                <Link className="btn btn-primary btn-lg" to={lessonPath(current, nextL)}>Resume</Link>
              </section>
            </>
          )}

          <div className="section-head"><h2>My courses</h2></div>
          <div className="my-courses-grid">
            {enrolled.map((c) => {
              const s = stats[c.slug];
              return (
                <Link key={c.slug} className={"card my-course" + (s.complete ? " is-complete" : "")}
                      to={"/courses/" + encodeURIComponent(c.slug)}>
                  <div className="my-course-top">
                    <h3>{c.title}</h3>
                    {s.complete && <span className="chip chip-done">Completed</span>}
                  </div>
                  <div className="pct-row">{s.percent}%</div>
                  <ProgressBar pct={s.percent} complete={s.complete} label={c.title + " progress"} />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </Layout>
  );
}
