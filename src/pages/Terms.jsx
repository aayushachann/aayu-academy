
import Layout from "../components/Layout";
import useTitle from "../lib/useTitle";

export default function Terms() {
  useTitle("Terms of Service | AayuAcademy");

  return (
    <Layout>
      <article className="legal">
        <h1>Terms of Service</h1>
        <p className="updated">Last updated: 18 November 2026</p>

        <p>
          Welcome to AayuAcademy! By using our learning platform,
          you agree to the following terms.
        </p>

        <h2>Using AayuAcademy</h2>
        <p>
          AayuAcademy provides free coding courses and learning
          resources for personal educational use.
        </p>

        <h2>Your Account</h2>
        <p>
          You are responsible for keeping your account information
          private and for activities carried out through your account.
        </p>

        <h2>Course Content</h2>
        <p>
          Course materials belong to AayuAcademy or their respective
          authors. You may use them for personal learning but must not
          copy, resell, or republish them without permission.
        </p>

        <h2>Fair Use</h2>
        <p>
          Do not misuse the platform, disrupt its services, or attempt
          to access restricted areas.
        </p>

        <h2>Changes</h2>
        <p>
          We may update or remove courses and platform features at any
          time. We cannot guarantee uninterrupted or error-free service.
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
