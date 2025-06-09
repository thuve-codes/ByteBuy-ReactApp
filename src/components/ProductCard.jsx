import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>💵 Rs{product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
