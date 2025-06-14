import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <div className="not-found">Product not found</div>;

  // Helper function to render stars
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
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img
          src={product.image}
          alt={product.title}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <h2>{product.title}</h2>
          <p className="product-detail-description">{product.description}</p>
          <p>
            <strong>Price:</strong> RS {product.price}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Rating:</strong> {renderStars(product.rating?.rate)} (
            {product.rating?.count} reviews)
          </p>

          {/* Buy Now Button */}
          <button
            className="buy-now-button"
            onClick={() => navigate("/checkout")}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
