import { useEffect, useState } from "react";
import "./WhyChoose.css";

import {
  ShieldCheck,
  MapPin,
  Zap,
  Star,
  Wallet,
  Lock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function WhyChoose() {
  const features = [
    {
      icon: <ShieldCheck size={30} />,
      title: "Verified Workers",
      description:
        "Every worker profile is reviewed to help you connect with trusted professionals.",
    },
    {
      icon: <MapPin size={30} />,
      title: "Nearby Services",
      description:
        "Find skilled workers near your location for faster and more convenient service.",
    },
    {
      icon: <Zap size={30} />,
      title: "Instant Contact",
      description:
        "Connect with workers immediately through call or message without unnecessary delays.",
    },
    {
      icon: <Star size={30} />,
      title: "Ratings & Reviews",
      description:
        "Read genuine customer feedback and make informed hiring decisions.",
    },
    {
      icon: <Wallet size={30} />,
      title: "Affordable Pricing",
      description:
        "Compare services and choose workers that fit your budget and requirements.",
    },
    {
      icon: <Lock size={30} />,
      title: "Safe & Secure",
      description:
        "A transparent platform designed to provide a reliable and secure hiring experience.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive number of cards
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth <= 600) {
        setCardsPerView(1);
      } else if (window.innerWidth <= 992) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();

    window.addEventListener("resize", updateCardsPerView);

    return () => {
      window.removeEventListener("resize", updateCardsPerView);
    };
  }, []);

  const maxIndex = Math.max(features.length - cardsPerView, 0);

  // Next
  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }

      return prev + 1;
    });
  };

  // Previous
  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }

      return prev - 1;
    });
  };

  // Automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className="why-section">
      <div className="why-container">

        {/* Heading */}
        <div className="why-heading">

          <span className="why-badge">
            Why Choose Worker Spot
          </span>

          <h2>
            Your Trusted Partner for
            <span> Local Services</span>
          </h2>

          <p>
            Worker Spot makes hiring local professionals simple, secure,
            and reliable. We help customers find skilled workers while
            creating better opportunities for local professionals.
          </p>

        </div>

        {/* Slider */}
        <div className="why-slider-wrapper">

          <button
            className="slider-btn slider-prev"
            onClick={prevSlide}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="why-slider">

            <div
              className="why-track"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsPerView)
                }%)`,
              }}
            >

              {features.map((feature, index) => (

                <div
                  className="why-slide"
                  key={index}
                >

                  <div className="why-card">

                    <div className="why-icon">
                      {feature.icon}
                    </div>

                    <h3>{feature.title}</h3>

                    <p>{feature.description}</p>

                  </div>

                </div>

              ))}

            </div>

          </div>

          <button
            className="slider-btn slider-next"
            onClick={nextSlide}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

        </div>

        {/* Slider Dots */}
        <div className="slider-dots">

          {Array.from({ length: maxIndex + 1 }).map(
            (_, index) => (

              <button
                key={index}
                className={`slider-dot ${
                  currentIndex === index ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />

            )
          )}

        </div>

        {/* Bottom CTA */}
        <div className="why-cta">

          <h2>
            Ready to Hire Trusted Workers?
          </h2>

          <p>
            Join customers who trust Worker Spot
            to connect with reliable local professionals.
          </p>

          <button className="why-btn">

            Find Workers

            <ArrowRight size={20} />

          </button>

        </div>

      </div>
    </section>
  );
}

export default WhyChoose;