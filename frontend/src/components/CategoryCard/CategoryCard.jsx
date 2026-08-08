import "./CategoryCard.css";
import { ArrowRight } from "lucide-react";

function CategoryCard({
  icon: Icon,
  title,
  workers,
  description,
}) {
  return (
    <div className="category-card">

      <div className="category-icon">
        <Icon size={40} />
      </div>

      <h3>{title}</h3>

      <p className="workers-count">
        {workers}+ Workers
      </p>

      <p className="category-description">
        {description}
      </p>

      <button className="category-btn">
        Explore
        <ArrowRight size={18} />
      </button>

    </div>
  );
}

export default CategoryCard;