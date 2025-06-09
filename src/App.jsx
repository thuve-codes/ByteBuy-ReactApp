import React, { useEffect, useState, useMemo } from "react";
import ProductList from "./components/ProductList";
import CategoryFilter from "./components/CategoryFilter";

const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(unique)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (category === "All") return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  return (
    <div className="container">
      <h1>🛍️ shopifiVerse</h1>
      <CategoryFilter
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default App;
