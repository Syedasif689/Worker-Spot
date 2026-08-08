import "./WhyChoose.css";
import {
  ShieldCheck,
  MapPin,
  Zap,
  Star,
  Wallet,
  Lock,
  ArrowRight,
} from "lucide-react";

function WhyChoose() {
  const features = [
    {
      icon: <ShieldCheck size={38} />,
      title: "Verified Workers",
      description:
        "Every worker profile is reviewed to help you connect with trusted professionals.",
    },
    {
      icon: <MapPin size={38} />,
      title: "Nearby Services",
      description:
        "Find skilled workers near your location for faster and more convenient service.",
    },
    {
      icon: <Zap size={38} />,
      title: "Instant Contact",
      description:
        "Connect with workers immediately through call or message without unnecessary delays.",
    },
    {
      icon: <Star size={38} />,
      title: "Ratings & Reviews",
      description:
        "Read genuine customer feedback and make informed hiring decisions.",
    },
    {
      icon: <Wallet size={38} />,
      title: "Affordable Pricing",
      description:
        "Compare services and choose workers that fit your budget and requirements.",
    },
    {
      icon: <Lock size={38} />,
      title: "Safe & Secure",
      description:
        "A transparent platform designed to provide a reliable and secure hiring experience.",
    },
  ];

  return (
    <section className="why">

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

        {/* Features */}

        <div className="why-grid">

          {features.map((feature, index) => (

            <div className="why-card" key={index}>

              <div className="why-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>

          ))}

        </div>

        {/* Bottom CTA */}

        <div className="why-cta">

          <h2>
            Ready to Hire Trusted Workers?
          </h2>

          <p>
            Join thousands of customers who trust Worker Spot
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