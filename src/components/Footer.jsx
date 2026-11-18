
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link to="/" className="logo" onClick={handleHomeClick}>
          AayuAcademy
        </Link>

        <nav className="footer-links">
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </nav>

        <p>© {new Date().getFullYear()} AayuAcademy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
