import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function NotFoundCard() {
  return (
    <div className="card empty-state">
      <div className="empty-icon"><Icon name="search-x" /></div>
      <h1 className="card-title">Page not found</h1>
      <p></p>
      <Link className="btn btn-primary" to="/">Home</Link>
    </div>
  );
}
