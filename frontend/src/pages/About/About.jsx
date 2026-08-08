import "./About.css";
import {
  Users,
  Briefcase,
  Target,
  Rocket,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

function About() {
  return (
    <section className="about">

      {/* ================= HERO ================= */}

      <div className="about-hero">

        <span className="about-badge">
          About Worker Spot
        </span>

        <h1>
          Connecting Skilled Workers
          <span> With Local Communities</span>
        </h1>

        <p>
          Worker Spot is a smart platform that connects customers with trusted
          local professionals while creating better opportunities for skilled
          workers to grow their careers.
        </p>

      </div>

      {/* ================= WHAT WE DO ================= */}

      <div className="about-container">

        <div className="section-title">
          <h2>What Worker Spot Does</h2>
          <p>
            A single platform designed for both customers and skilled workers.
          </p>
        </div>

        <div className="about-grid">

          {/* Users */}

          <div className="about-card">

            <Users className="card-icon" />

            <h3>For Customers</h3>

            <ul>

              <li>Find nearby skilled workers instantly</li>

              <li>Browse verified worker profiles</li>

              <li>Compare experience and ratings</li>

              <li>Hire trusted professionals easily</li>

              <li>Save time searching offline</li>

            </ul>

          </div>

          {/* Workers */}

          <div className="about-card">

            <Briefcase className="card-icon" />

            <h3>For Workers</h3>

            <ul>

              <li>Create a professional profile</li>

              <li>Receive more local job opportunities</li>

              <li>Showcase skills and experience</li>

              <li>Build trust through customer reviews</li>

              <li>Increase visibility and income</li>

            </ul>

          </div>

        </div>

      </div>

      {/* ================= WHY ================= */}

      <div className="about-container">

        <div className="section-title">
          <h2>Why We Built Worker Spot</h2>
        </div>

        <div className="story-card">

          <p>
            Every day, people spend valuable time searching for reliable local
            workers, while many skilled professionals struggle to find regular
            job opportunities. Worker Spot was created to bridge this gap by
            providing a trusted digital platform where customers and workers
            can connect easily, safely, and efficiently.
          </p>

        </div>

      </div>

      {/* ================= MISSION & VISION ================= */}

      <div className="about-container">

        <div className="mission-grid">

          <div className="mission-card">

            <Target className="card-icon" />

            <h3>Our Mission</h3>

            <p>
              To empower local communities by connecting skilled workers with
              customers through a reliable, transparent, and technology-driven
              platform.
            </p>

          </div>

          <div className="mission-card">

            <Rocket className="card-icon" />

            <h3>Our Vision</h3>

            <p>
              To become India's most trusted local workforce platform where
              every skilled worker finds opportunities and every customer
              finds reliable professionals.
            </p>

          </div>

        </div>

      </div>

      {/* ================= COMMITMENT ================= */}

      <div className="about-container">

        <div className="section-title">

          <h2>Our Commitment</h2>

        </div>

        <div className="values-grid">

          <div className="value-card">
            <ShieldCheck />
            <h4>Trust</h4>
          </div>

          <div className="value-card">
            <HeartHandshake />
            <h4>Community</h4>
          </div>

          <div className="value-card">
            <TrendingUp />
            <h4>Growth</h4>
          </div>

          <div className="value-card">
            <Lightbulb />
            <h4>Innovation</h4>
          </div>

        </div>

      </div>

      {/* ================= FUTURE ================= */}

      <div className="about-container">

        <div className="section-title">

          <h2>Our Future Roadmap</h2>

          <p>
            We continue improving Worker Spot with new features that create
            better experiences for both customers and workers.
          </p>

        </div>

        <div className="roadmap">

          <div className="roadmap-item">
            <span>✓</span>
            Platform Launch
          </div>

          <div className="roadmap-item">
            <span>→</span>
            Worker Verification
          </div>

          <div className="roadmap-item">
            <span>→</span>
            Online Booking
          </div>

          <div className="roadmap-item">
            <span>→</span>
            Live Worker Tracking
          </div>

          <div className="roadmap-item">
            <span>→</span>
            Secure Payments
          </div>

          <div className="roadmap-item">
            <span>→</span>
            AI Worker Recommendations
          </div>

        </div>

      </div>

      {/* ================= CTA ================= */}

      <div className="about-container">

        <div className="cta-box">

          <h2>
            Join the Future of Local Services
          </h2>

          <p>
            Whether you're looking for trusted professionals or you're a skilled
            worker seeking more opportunities, Worker Spot is here to connect
            you with the right people.
          </p>

          <button>

            Explore Worker Spot

            <ArrowRight size={20} />

          </button>

        </div>

      </div>

    </section>
  );
}

export default About;