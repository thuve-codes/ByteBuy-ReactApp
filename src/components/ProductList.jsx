import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const renderStars = (rate) => {
    const filledStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const totalStars = 5;

    return (
      <span className="stars">
        {Array.from({ length: filledStars }).map((_, i) => (
          <span key={`filled-${i}`} className="star filled">
            ★
          </span>
        ))}
        {halfStar && <span className="star half">★</span>}
        {Array.from({
          length: totalStars - filledStars - (halfStar ? 1 : 0),
        }).map((_, i) => (
          <span key={`empty-${i}`} className="star">
            ☆
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">RS {product.price}</p>
          {renderStars(product.rating?.rate || 0)}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
