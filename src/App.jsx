import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import CategoryFilter from "./components/CategoryFilter";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import "./App.css";
import logo from "./assets/logo_bytebuy.png";

const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products.", err));
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
    <Router>
      <div className="container">
        <h1>
          <img src={logo} className="banner" alt="ByteBuy Logo" />
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CategoryFilter
                  categories={categories}
                  selected={category}
                  onSelect={setCategory}
                />
                <ProductList products={filteredProducts} />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail products={products} />}
          />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <footer className="footer">
          <p>
            Made with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            by{" "}
            <a
              href="https://www.linkedin.com/in/thuverakan10/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0077b5", textDecoration: "underline" }}
            >
              thuve-codes (LinkedIn)
            </a>
          </p>
        </footer>
        <div className="footer">
          <p>© 2025 ByteBuy. All rights reserved.</p>
        </div>
      </div>
    </Router>
  );
};

export default App;
