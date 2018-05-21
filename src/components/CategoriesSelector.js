import React from "react";
import PropTypes from "prop-types";

const CategoriesSelector = ({ show, categories, onCategorySelected }) => {
  return (
    <section
      className={`section-categories-overlay ${
        show
          ? "section-categories-overlay-show"
          : "section-categories-overlay-hide"
      }`}
    >
      <ul className="categories-showcase">
        {categories.map(category => {
          return (
            <li
              key={category.name}
              onClick={() => onCategorySelected(category)}
            >
              <figure
                className="category-photo"
                style={{ backgroundColor: category.color }}
              >
                <img src={category.logo} alt="Two" />
                <p className="category-photo-title">{category.name}</p>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

CategoriesSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  onCategorySelected: PropTypes.func.isRequired
};
export default CategoriesSelector;
