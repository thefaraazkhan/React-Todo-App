import "./Product.css";

import React from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../config";

const Product = ({ product, productId, shopName, shopId, productCategory, expectedItem, stock }) => {
  const history = useHistory();

  const viewProductForUser = async () => {
    history.push({
      pathname: "/viewproduct",
      search: `?shopId=${shopId}&productId=${productId}`,
    });
  };

  const ls = JSON.parse(localStorage.getItem("admin"));


  const deleteProduct = async (pId) => {
    console.log("ye hai id", pId)
    var confirmed = window.confirm("Are you sure to delete?");
    if (confirmed) {
      const resp = await axios
        .delete(`${API_URL}/api/products/${product.adminId}`, {
          data: { productId: pId },
        })
        .then(window.alert("Product deleted successfully"));
      window.location.reload(false)
    }
  };

  return (
    <div className="product-container">
      {ls?.isSuperAdmin && <button className="delete-superadmin-product" style={{ position: "absolute", top: "209px", right: "0px" }}><div onClick={() => {
        deleteProduct(product._id);
      }}>

        <i className="fas fa-trash-alt"></i>
      </div></button>}

      <div className="con" onClick={viewProductForUser}>
        <div className="product-img">
          <img alt="product image" src={`${product.productImages[0]}`} />
        </div>

        <div className="name-price">
          <div className="product-name">
            <span>{product.productname} </span>
          </div>

        </div>
        <div className="p-category">Categoty: {productCategory}</div>
        <div className="p-expected-item">Expected Item: {expectedItem}</div>
        {/* <div className="p-stock">{stock}</div> */}
        {product.stock === "In stock" ? (
          <div className="p-stock" style={{ color: "green" }}>{product.stock}</div>
        ) : (
          <div className="p-stock" style={{ color: "red" }}>{product.stock}</div>
        )}

        <div className="p-city"><span style={{ fontWeight: "500" }}>City:</span> <i>{product.city}</i></div>

      </div>
    </div>
  );
};

export default Product;
