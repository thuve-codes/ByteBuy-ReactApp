import React from "react";
import PropTypes from "prop-types";
import "./ProductCard.css"; // Assuming you have a CSS file for styles
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductCard = ({ product, id }) => {
  // Function to render star rating
  const renderRating = (rating) => {
    if (!rating) return null;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star full-star" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star half-star" />);
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty-star" />);
    }

    return stars;
  };

  // Return null if product is not provided
  if (!product) return null;

  return (
    <div className="product-card" key={id}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <div className="rating">
        {renderRating(product.rating.rate)}
        <span className="rating-count">({product.rating.count})</span>
      </div>
      <p>Rs {(product.price || 0).toFixed(2)}</p>
    </div>
  );
};

// ProductCard.propTypes = {
//   product: PropTypes.shape({
//     image: PropTypes.string,
//     title: PropTypes.string,
//     rating: PropTypes.number,
//     ratingCount: PropTypes.number,
//     price: PropTypes.number,
//   }),
//   id: PropTypes.string,
// };

// ProductCard.defaultProps = {
//   product: {
//     image: "/placeholder.jpg",
//     title: "Untitled Product",
//     rating: 0,
//     ratingCount: 0,
//     price: 0,
//   },
//   id: "",
// };

export default ProductCard;
