import "./Categories.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import {
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  Wrench,
  Building2,
  BrushCleaning,
  Trees,
} from "lucide-react";

function Categories() {

  const categories = [
    {
      icon: Zap,
      title: "Electrician",
      workers: 128,
      description: "Certified electricians for homes and offices.",
    },
    {
      icon: Droplets,
      title: "Plumber",
      workers: 96,
      description: "Professional plumbing and pipe repair services.",
    },
    {
      icon: Hammer,
      title: "Carpenter",
      workers: 82,
      description: "Furniture, woodwork and custom carpentry.",
    },
    {
      icon: Paintbrush,
      title: "Painter",
      workers: 74,
      description: "Interior and exterior painting experts.",
    },
    {
      icon: Wrench,
      title: "Mechanic",
      workers: 54,
      description: "Bike and automobile repair specialists.",
    },
    {
      icon: Building2,
      title: "Mason",
      workers: 43,
      description: "Construction and brickwork professionals.",
    },
    {
      icon: BrushCleaning,
      title: "Cleaner",
      workers: 67,
      description: "Residential and commercial cleaning services.",
    },
    {
      icon: Trees,
      title: "Gardener",
      workers: 31,
      description: "Garden maintenance and landscaping experts.",
    },
  ];

  return (
    <section className="categories">

      <div className="categories-container">

        <div className="section-heading">

          <h2>Explore Categories</h2>

          <p>
            Find trusted professionals for every service you need.
          </p>

        </div>

        <div className="categories-grid">

          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              workers={category.workers}
              description={category.description}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;