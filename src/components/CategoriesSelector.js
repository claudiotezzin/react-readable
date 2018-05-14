import React from "react";
import PropTypes from "prop-types";
import ImageOne from "assets/images/1.jpg";
import ImageTwo from "assets/images/2.jpg";
import ImageThree from "assets/images/3.jpg";
import ImageFour from "assets/images/4.jpg";

const CategoriesSelector = ({ onCategorySelected }) => {
  return (
    <section className="section-categories-overlay">
      <ul className="categories-showcase">
        <li onClick={onCategorySelected}>
          <figure className="category-photo">
            <img src={ImageOne} alt="One" />
            <p className="category-photo-title">Centered</p>
          </figure>
        </li>
        <li onClick={onCategorySelected}>
          <figure className="category-photo">
            <img src={ImageTwo} alt="Two" />
            <p className="category-photo-title">Centered</p>
          </figure>
        </li>
        <li onClick={onCategorySelected}>
          <figure className="category-photo">
            <img src={ImageThree} alt="Three" />
            <p className="category-photo-title">Centered</p>
          </figure>
        </li>
        <li onClick={onCategorySelected}>
          <figure className="category-photo">
            <img src={ImageFour} alt="Four" />
            <p className="category-photo-title">Centered</p>
          </figure>
        </li>
      </ul>
    </section>
  );
};

CategoriesSelector.propTypes = {
  onCategorySelected: PropTypes.func.isRequired
};
export default CategoriesSelector;
