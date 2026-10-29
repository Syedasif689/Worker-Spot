
import "./CategoryCard.css";
import { ArrowRight, Users, Sparkles } from "lucide-react";

function CategoryCard({
  icon: Icon,
  title,
  workers,
  description,
}) {
  return (
    <article className="category-card">
      <div className="category-card-flipper">

        {/* FRONT FACE */}
        <div className="category-card-face category-card-front">
          <div className="category-card-top">
            <span className="category-card-label">
              WORKER SPOT
            </span>

            <span className="category-card-number">
              {String(title).slice(0, 1).toUpperCase()}
            </span>
          </div>

          <div className="category-icon">
            <Icon size={40} strokeWidth={1.8} />
          </div>

          <h3>{title}</h3>

          <p className="workers-count">
            <Users size={16} />
            {workers}+ Workers
          </p>

          <p className="category-description">
            {description}
          </p>

          <div className="category-card-footer">
            <span>Discover professionals</span>
            <ArrowRight size={19} />
          </div>
        </div>

        {/* BACK FACE */}
        <div className="category-card-face category-card-back">
          <div className="category-back-icon">
            <Icon size={36} strokeWidth={1.8} />
          </div>

          <span className="category-back-eyebrow">
            FIND YOUR PROFESSIONAL
          </span>

          <h3>{title}</h3>

          <p>
            Connect with local {title.toLowerCase()} professionals
            for reliable service when you need it.
          </p>

          <div className="category-back-workers">
            <Users size={17} />
            <span>{workers}+ Workers listed</span>
          </div>

          <button
            type="button"
            className="category-btn"
            onClick={() => {
              document
                .getElementById("categories")
                ?.dispatchEvent(
                  new CustomEvent("category:explore", {
                    bubbles: true,
                    detail: { title },
                  })
                );
            }}
          >
            Explore <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </article>
  );
}

export default CategoryCard;
