import {
  Wrench,
  MapPin,
  Users,
  PhoneCall,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import "./HowItWorks.css";

function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Choose Category",
      description:
        "Browse from various categories like Electrician, Plumber, Carpenter, Mechanic and more.",
      icon: <Wrench size={34} />,
    },
    {
      id: "02",
      title: "Share Your Location",
      description:
        "Enable location access or choose your city manually to find nearby professionals.",
      icon: <MapPin size={34} />,
    },
    {
      id: "03",
      title: "Browse Workers",
      description:
        "Compare ratings, experience, pricing, reviews and availability before hiring.",
      icon: <Users size={34} />,
    },
    {
      id: "04",
      title: "Hire & Get Work Done",
      description:
        "Contact your preferred worker and get your work completed quickly and safely.",
      icon: <PhoneCall size={34} />,
    },
  ];

  return (
    <section className="how">
      <div className="how-container">

        <div className="section-heading">
          <span className="section-badge">How It Works</span>

          <h2>
            Hire Skilled Workers in
            <span> Four Simple Steps</span>
          </h2>

          <p>
            Worker Spot helps you connect with trusted local professionals
            quickly, safely, and effortlessly.
          </p>
        </div>

        <div className="timeline">

          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`timeline-row ${
                index % 2 === 0 ? "left" : "right"
              }`}
            >
              {/* Card */}
              <div className="timeline-card">

                <div className="timeline-icon">
                  {step.icon}
                </div>

                <span className="step-number">
                  {step.id}
                </span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

              </div>

              {/* Arrow */}
              <div className="timeline-arrow">

                {index % 2 === 0 ? (
                  <ArrowRight size={38} />
                ) : (
                  <ArrowLeft size={38} />
                )}

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;