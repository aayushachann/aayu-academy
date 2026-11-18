import { createContext, useContext, useState, useCallback, useMemo } from "react";

/* Same localStorage keys as the old site, so existing progress keeps working. */
const KEY_SIGNED_IN = "aa_signed_in";
const KEY_PROGRESS = "aa_progress";
const DEMO_NAME = "Demo User";
const DEMO_EMAIL = "demo@aayuacademy.dev";

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const emptyProgress = () => ({ enrolled: {}, completed: {} });
const nowSeconds = () => Math.floor(Date.now() / 1000);

function readItem(key) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function writeItem(key, value) {
  try { window.localStorage.setItem(key, value); } catch { /* storage blocked: ignore */ }
}
function removeItem(key) {
  try { window.localStorage.removeItem(key); } catch { /* ignore */ }
}

function loadProgress() {
  const raw = readItem(KEY_PROGRESS);
  if (!raw) return emptyProgress();
  try {
    const data = JSON.parse(raw);
    if (!isObject(data)) return emptyProgress();
    const out = {
      enrolled: isObject(data.enrolled) ? data.enrolled : {},
      completed: isObject(data.completed) ? data.completed : {}
    };
    if (typeof data.name === "string") out.name = data.name;
    return out;
  } catch {
    return emptyProgress();
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [signedIn, setSignedIn] = useState(() => readItem(KEY_SIGNED_IN) === "1");
  const [progress, setProgress] = useState(loadProgress);

  const update = useCallback((fn) => {
    setProgress((prev) => {
      const next = fn(prev);
      if (next !== prev) writeItem(KEY_PROGRESS, JSON.stringify(next));
      return next;
    });
  }, []);

  const signIn = useCallback(() => { writeItem(KEY_SIGNED_IN, "1"); setSignedIn(true); }, []);
  const signOut = useCallback(() => { removeItem(KEY_SIGNED_IN); setSignedIn(false); }, []); // progress stays

  const setName = useCallback((name) => update((p) => ({ ...p, name })), [update]);

  const enroll = useCallback((slug) => update((p) => (
    p.enrolled[slug] ? p : { ...p, enrolled: { ...p.enrolled, [slug]: nowSeconds() } }
  )), [update]);

  const markComplete = useCallback((slug, lessonId) => update((p) => {
    const t = nowSeconds();
    return {
      ...p,
      completed: { ...p.completed, [lessonId]: t },
      enrolled: p.enrolled[slug] ? p.enrolled : { ...p.enrolled, [slug]: t }
    };
  }), [update]);

  const user = useMemo(() => {
    if (!signedIn) return null;
    const name = progress.name && progress.name.trim() ? progress.name : DEMO_NAME;
    return { name, email: DEMO_EMAIL };
  }, [signedIn, progress.name]);

  const value = { signedIn, user, progress, signIn, signOut, setName, enroll, markComplete };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
