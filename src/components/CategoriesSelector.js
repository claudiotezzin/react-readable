import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchAllCategories, selectCategory } from "../actions";

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
            <Link
              className="categories-showcase-item"
              key={category.name}
              to={category.name === "all" ? "/" : `/${category.name}`}
              onClick={() => onCategorySelected(category)}
            >
              <figure
                className="category-photo"
                style={{ backgroundColor: category.color }}
              >
                <img src={category.logo} alt="Two" />
                <p className="category-photo-title">{category.name}</p>
              </figure>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

CategoriesSelector.propTypes = {
  show: PropTypes.bool.isRequired
};

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories).map(key => categories[key])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchAllCategories()),
    onCategorySelected: category => dispatch(selectCategory(category))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSelector);
