
import Layout from "../components/Layout";
import useTitle from "../lib/useTitle";

export default function Privacy() {
  useTitle("Privacy Policy | AayuAcademy");

  return (
    <Layout>
      <article className="legal">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: 18 November 2026</p>

        <p>
          AayuAcademy respects your privacy. This policy explains what
          information may be stored when you use our learning platform
          and how it is used.
        </p>

        <h2>What We Collect</h2>
        <p>We may store your name, email address, and learning progress,
          including enrolled courses and completed lessons.</p>

        <h2>How We Store Information</h2>
        <p>
          We use your browser's local storage to remember your sign-in
          status, profile name, and learning progress.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use this information to display your profile, track your
          enrolled courses, save completed lessons, and provide learning
          features.
        </p>

        <h2>Sharing of Information</h2>
        <p>
          We do not sell your personal information or share it with
          advertisers.
        </p>

        <h2>Your Choices</h2>
        <p>
          You can update your name through your profile settings.
          You can also clear saved information through your browser
          settings. For data deletion requests, contact us.
        </p>

        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:hello@aayuacademy.com">
            hello@aayuacademy.com
          </a>
        </p>
      </article>
    </Layout>
  );
}
