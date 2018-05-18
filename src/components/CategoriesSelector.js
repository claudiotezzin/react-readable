import React from "react";
import PropTypes from "prop-types";
import UdacityLogo from "assets/images/udacity.png";
import ReactLogo from "assets/images/react.png";
import ReduxLogo from "assets/images/redux.png";
import AllLogo from "assets/images/all.png";

const CategoriesSelector = ({ onCategorySelected }) => {
  return (
    <section className="section-categories-overlay">
      <ul className="categories-showcase">
        <li onClick={onCategorySelected}>
          <figure className="category-photo purple-bkg">
            <img src={AllLogo} alt="One" />
            <p className="category-photo-title">All</p>
          </figure>
        </li>
        <li onClick={onCategorySelected}>
          <figure className="category-photo green-bkg">
            <img src={UdacityLogo} alt="Two" />
            <p className="category-photo-title">Udacity</p>
          </figure>
        </li>
        <li onClick={onCategorySelected}>
          <figure className="category-photo orange-bkg">
            <img src={ReactLogo} alt="Three" />
            <p className="category-photo-title">React</p>
          </figure>
        </li>
        <li onClick={onCategorySelected}>
          <figure className="category-photo pink-bkg">
            <img src={ReduxLogo} alt="Four" />
            <p className="category-photo-title">Redux</p>
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
