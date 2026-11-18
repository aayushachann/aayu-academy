
import { useState } from "react";
import Layout from "../components/Layout";
import useTitle from "../lib/useTitle";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <Layout>
      <section className="contact-page">
        <div className="contact-intro">
          <span className="contact-tag">GET IN TOUCH</span>
          <h1>Let's start a conversation.</h1>
          <p>
            Have a question about a course, need some help, or just
            want to share your feedback? We're here to listen.
          </p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <div className="contact-detail-icon">✉</div>
              <div>
                <strong>Email us</strong>
                <a href="mailto:hello@aayuacademy.com">
                  hello@aayuacademy.com
                </a>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-detail-icon">♡</div>
              <div>
                <strong>We're here to help</strong>
                <p>Questions, feedback, or course support.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card contact-form-card">
          <div className="contact-form-heading">
            <h2>Send us a message</h2>
            <p>Fill in the details below and say hello!</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                placeholder="What is this about?"
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                rows="5"
                placeholder="Write your message here..."
                required
              />
            </div>

            <button type="submit" className="btn btn-primary contact-submit">
              Send Message <span>→</span>
            </button>

            {submitted && (
              <p className="contact-success">
                Thank you! This is a demo form, so your message hasn't
                actually been sent.
              </p>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
}
