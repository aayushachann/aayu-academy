import Header from "./Header";
import Footer from "./Footer";

/* Wraps every page: skip link + header + <main> + footer.
   Pass `header` to replace the default header (login / lesson pages). */
export default function Layout({ header, mainClassName = "container page", children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {header || <Header />}
      <main id="main-content" className={mainClassName}>{children}</main>
      <Footer />
    </>
  );
}
