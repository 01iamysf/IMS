import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API from "../api/api";

export default function Products() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await API.get("/products");

      // 🔐 Defensive check
      if (Array.isArray(res.data)) {
        setProductData(res.data);
      } else if (Array.isArray(res.data.products)) {
        setProductData(res.data.products);
      } else {
        setProductData([]);
        console.error("Unexpected API response:", res.data);
      }
    } catch (err) {
      console.error("Error fetching products", err);
      setProductData([]);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/deleteproduct/${id}`);
      getProducts();
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
            {productData.length > 0 ? (
              productData.map((element, index) => (
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
                      ✏
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
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
