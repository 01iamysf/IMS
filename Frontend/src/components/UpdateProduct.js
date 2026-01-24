import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function UpdateProduct() {

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productBarcode, setProductBarcode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    // GET single product
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await API.get(`/products/${id}`);
                setProductName(res.data.ProductName);
                setProductPrice(res.data.ProductPrice);
                setProductBarcode(res.data.ProductBarcode);
            } catch (err) {
                setError("Failed to load product details.");
                console.error(err);
            }
        };

        getProduct();
    }, [id]);

    // UPDATE product
    const updateProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await API.put(`/updateproduct/${id}`, {
                ProductName: productName,
                ProductPrice: productPrice,
                ProductBarcode: productBarcode,
            });

            alert("Product updated successfully");
            navigate("/products");

        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-5">
            <h1>Update Product Information</h1>

            <div className="mt-5 col-lg-6">
                <label className="form-label fs-4 fw-bold">Product Name</label>
                <input
                    type="text"
                    className="form-control fs-5"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>

            <div className="mt-3 col-lg-6">
                <label className="form-label fs-4 fw-bold">Product Price</label>
                <input
                    type="number"
                    className="form-control fs-5"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
            </div>

            <div className="mt-3 mb-5 col-lg-6">
                <label className="form-label fs-4 fw-bold">Product Barcode</label>
                <input
                    type="number"
                    className="form-control fs-5"
                    value={productBarcode}
                    onChange={(e) => setProductBarcode(e.target.value)}
                />
            </div>

            <div className="d-flex justify-content-center col-lg-6">
                <NavLink to="/products" className="btn btn-primary me-5 fs-4">
                    Cancel
                </NavLink>
                <button
                    onClick={updateProduct}
                    className="btn btn-primary fs-4"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update"}
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
