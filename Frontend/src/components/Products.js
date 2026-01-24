import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API from "../api/api";

export default function Products() {

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    // READ products
    const getProducts = async () => {
        try {
            const res = await API.get("/products");
            setProductData(res.data);
            console.log("Data Retrieved");
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };

    // DELETE product
    const deleteProduct = async (id) => {
        try {
            await API.delete(`/deleteproduct/${id}`);
            console.log("Product deleted");
            getProducts(); // refresh list
        } catch (err) {
            console.error("Error deleting product", err);
        }
    };

    return (
        <div className="container-fluid p-5">
            <h1>Products Inventory</h1>

            <div className="add_button">
                <NavLink to="/insertproduct" className="btn btn-primary fs-5">
                    + Add New Product
                </NavLink>
            </div>

            <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                <table className="table table-striped table-hover mt-3 fs-5">
                    <thead>
                        <tr className="tr_color">
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Barcode</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productData.map((element, index) => (
                            <tr key={element._id}>
                                <th>{index + 1}</th>
                                <td>{element.ProductName}</td>
                                <td>{element.ProductPrice}</td>
                                <td>{element.ProductBarcode}</td>
                                <td>
                                    <NavLink
                                        to={`/updateproduct/${element._id}`}
                                        className="btn btn-primary"
                                    >
                                        ✏️
                                    </NavLink>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteProduct(element._id)}
                                    >
                                        🗑
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
