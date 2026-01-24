import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function InsertProduct() {

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productBarcode, setProductBarcode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const addProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await API.post("/insertproduct", {
                ProductName: productName,
                ProductPrice: productPrice,
                ProductBarcode: productBarcode,
            });

            alert("Product inserted successfully");

            setProductName("");
            setProductPrice("");
            setProductBarcode("");

            navigate("/products");

        } catch (err) {
            if (err.response?.status === 422) {
                setError("Product is already added with this barcode.");
            } else {
                setError("An error occurred. Please try again later.");
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-5">
            <h1>Enter Product Information</h1>

            <div className="mt-5 col-lg-6 fs-4">
                <label className="form-label fw-bold">Product Name</label>
                <input
                    type="text"
                    className="form-control fs-5"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Product Name"
                />
            </div>

            <div className="mt-3 col-lg-6 fs-4">
                <label className="form-label fw-bold">Product Price</label>
                <input
                    type="number"
                    className="form-control fs-5"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="Enter Product Price"
                />
            </div>

            <div className="mt-3 mb-5 col-lg-6 fs-4">
                <label className="form-label fw-bold">Product Barcode</label>
                <input
                    type="number"
                    className="form-control fs-5"
                    value={productBarcode}
                    onChange={(e) => setProductBarcode(e.target.value)}
                    placeholder="Enter Product Barcode"
                />
            </div>

            <div className="d-flex justify-content-center col-lg-6">
                <NavLink to="/products" className="btn btn-primary me-5 fs-4">
                    Cancel
                </NavLink>
                <button
                    onClick={addProduct}
                    className="btn btn-primary fs-4"
                    disabled={loading}
                >
                    {loading ? "Inserting..." : "Insert"}
                </button>
            </div>

            {error && (
                <div className="text-danger mt-3 fs-5 fw-bold text-center col-lg-6">
                    {error}
                </div>
            )}
        </div>
    );
}
