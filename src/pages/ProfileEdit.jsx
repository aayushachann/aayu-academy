import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";
import useTitle from "../lib/useTitle";

export default function ProfileEdit() {
  const { user, setName } = useApp();
  const navigate = useNavigate();
  const [value, setValue] = useState(user.name);
  const [error, setError] = useState(false);
  useTitle("Edit profile | AayuAcademy");

  function handleSubmit(e) {
    e.preventDefault();
    const name = value.trim();
    if (!name) { setError(true); return; }
    setName(name);
    navigate("/profile");
  }

  return (
    <Layout>
      <h1>Edit profile</h1>
      <form className="card edit-card form" noValidate onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input className={"input" + (error ? " is-error" : "")} id="name" name="name" type="text"
                 maxLength={60} autoComplete="name" value={value}
                 aria-invalid={error ? "true" : undefined}
                 aria-describedby={error ? "name-error" : undefined}
                 onChange={(e) => { setValue(e.target.value); setError(false); }}
                 autoFocus={false} />
          <p className={"field-error" + (error ? "" : " hidden")} id="name-error" role="alert">Enter a name</p>
        </div>
        <div className="edit-actions">
          <button type="submit" className="btn btn-primary">Save</button>
          <Link className="btn btn-ghost" to="/profile">Cancel</Link>
        </div>
      </form>
    </Layout>
  );
}
