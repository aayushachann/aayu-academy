import { useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { SimpleHeader } from "../components/Header";
import Icon, { GoogleLogo } from "../components/Icon";
import { useApp } from "../context/AppContext";
import { safeNext } from "../lib/helpers";
import useTitle from "../lib/useTitle";

export default function Login() {
  const { signedIn, signIn, setName } = useApp();
  const [searchParams] = useSearchParams();
  const nextRaw = searchParams.get("next") || "";
  const isSignup = searchParams.get("mode") === "signup";

  const [name, setNameValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useTitle((isSignup ? "Sign up" : "Log in") + " | AayuAcademy");

  // Already signed in (or just signed in): go to the target page
  if (signedIn) return <Navigate to={safeNext(nextRaw)} replace />;

  function modeUrl(mode) {
    const qs = [];
    if (mode === "signup") qs.push("mode=signup");
    if (nextRaw) qs.push("next=" + encodeURIComponent(nextRaw));
    return "/login" + (qs.length ? "?" + qs.join("&") : "");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isSignup && name.trim()) setName(name.trim());
    signIn();
  }

  return (
    <Layout header={<SimpleHeader />} mainClassName="auth-main">
      <div className="auth-card">
        <h1>{isSignup ? "Create account" : "Start coding"}</h1>
        <div className="toggle">
          <Link to={modeUrl("login")} className={!isSignup ? "is-active" : undefined}
                aria-current={!isSignup ? "page" : undefined}>Log in</Link>
          <Link to={modeUrl("signup")} className={isSignup ? "is-active" : undefined}
                aria-current={isSignup ? "page" : undefined}>Sign up</Link>
        </div>

        <form className="form" noValidate onSubmit={handleSubmit}>
          {isSignup && (
            <div className="field">
              <label htmlFor="name">Name</label>
              <div className="input-wrap">
                <Icon name="user" />
                <input className="input" id="name" name="name" type="text" autoComplete="name"
                       value={name} onChange={(e) => setNameValue(e.target.value)} />
              </div>
            </div>
          )}
          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="input-wrap">
              <Icon name="at-sign" />
              <input className="input" id="email" name="email" type="email" autoComplete="email"
                     value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <Icon name="lock" />
              <input className="input has-toggle" id="password" name="password"
                     type={showPassword ? "text" : "password"}
                     autoComplete={isSignup ? "new-password" : "current-password"}
                     value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="eye-btn" aria-pressed={showPassword}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((s) => !s)}>
                <Icon name={showPassword ? "eye-off" : "eye"} />
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">{isSignup ? "Sign up" : "Log in"}</button>
        </form>

        <div className="or-divider">or</div>
        <button type="button" className="btn btn-outline btn-block" onClick={signIn}>
          <GoogleLogo /><span>Continue with Google</span>
        </button>
        <p className="hint-box">Demo mode: any details work. You will be signed in as the demo learner.</p>
      </div>
    </Layout>
  );
}
