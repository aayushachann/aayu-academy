import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

/* Wrap a page in this to force login. After login the person returns to the same page. */
export default function RequireAuth({ children }) {
  const { signedIn } = useApp();
  const location = useLocation();
  if (!signedIn) {
    const here = location.pathname + location.search;
    return <Navigate to={"/login?next=" + encodeURIComponent(here)} replace />;
  }
  return children;
}
