import HeroWorker from "../../assets/images/Hero/hero-worker.png";
import "./Hero.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  UserPlus,
  ShieldCheck,
  MapPin,
  Zap,
  Wrench,
} from "lucide-react";

function Hero() {

  const messages = [
    {
      icon: <ShieldCheck size={20} className="text-green-500" />,
      text: "Verified Workers",
    },
    {
      icon: <MapPin size={20} className="text-orange-500" />,
      text: "Nearby Services",
    },
    {
      icon: <Zap size={20} className="text-yellow-500" />,
      text: "Fast Response",
    },
    {
      icon: <Wrench size={20} className="text-blue-500" />,
      text: "Skilled Professionals",
    },
  ];

  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let charIndex = 0;

    const typing = setInterval(() => {
      setCurrentText(
        messages[textIndex].text.slice(0, charIndex + 1)
      );

      charIndex++;

      if (charIndex === messages[textIndex].text.length) {
        clearInterval(typing);

        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % messages.length);
        }, 1800);
      }
    }, 80);

    return () => clearInterval(typing);
  }, [textIndex]);

  return (
    <section className="hero">
  <div className="hero-container">
    <div className="hero-grid">

      <div>
        <span className="hero-badge">
          <ShieldCheck size={18} />
          Trusted Local Workers
        </span>

        <h1 className="hero-title">
          Find Skilled <span>Workers</span> Near You.
        </h1>

        <p className="hero-description">
          Worker Spot helps you discover trusted electricians,
          plumbers, mechanics, carpenters, painters and daily wage
          workers nearby.
        </p>

        <div className="hero-buttons">
          <Link to="/Userrig" className="btn-primary">
           Find a Worker
           <ArrowRight size={20} />
          </Link>

          <Link to="/register" className="btn-secondary">
            Become a Worker <UserPlus size={20} />
          </Link>
        </div>

        <div className="hero-features">
          <div className="hero-feature">
            <ShieldCheck />
            Verified Workers
          </div>

          <div className="hero-feature">
            <MapPin />
            Nearby Services
          </div>
        </div>
      </div>

      <div className="hero-image">
        <div className="hero-image-wrapper">
          <div className="hero-glow"></div>

          <img src={HeroWorker} alt="Professional Worker" />

         <div className="floating-card typing-card">
    {messages[textIndex].icon}

    <span>{currentText}</span>

    <span className="typing-cursor"></span>
</div>
        </div>
      </div>

    </div>
  </div>
</section>
  );
}

export default Hero;