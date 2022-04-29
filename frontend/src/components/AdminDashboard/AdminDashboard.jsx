/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./AdminDashboard.css";
import Search from "../../components/Search/Search";
import AddProduct from "../AddProduct/AddProduct";
import EditProduct from "../EditProduct/EditProduct";
import axios from "axios";
import { adminLogOut, isAuthenticated } from "../../helpers/auth";
import { API_URL } from "../../config";

const AdminDashboard = () => {
  const history = useHistory();
  const [adminProducts, setAdminProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [addProductForm, setAddProductForm] = useState({ isActive: false });
  const [editProductForm, setEditProductForm] = useState({ isActive: false });

  const [productForEdit, setproductForEdit] = useState(false);

  useEffect(() => {
    const getAdminShop = async () => {
      const tasksFromServer = await fetchAdminProducts();
      setAdminProducts(tasksFromServer);
    };

    getAdminShop();
  }, []);

  const getAdminFromLS = JSON.parse(localStorage.getItem("admin"));
  const { _id } = getAdminFromLS;

  const fetchAdminProducts = async () => {
    const response = await axios.get(`${API_URL}/api/products/${_id}`);
    const { products } = response.data;
    const adminProducts = products;
    return adminProducts;
  };

  const editProduct = async (pId) => {
    adminProducts?.map((product) => {
      if (product._id === pId) {
        setproductForEdit(product);
      }
    });

    setEditProductForm({ isActive: true });
  };

  const deleteProduct = async (pId) => {
    var confirmed = window.confirm("Are you sure to delete?");
    if (confirmed) {
      const resp = await axios
        .delete(`${API_URL}/api/products/${_id}`, {
          data: { productId: pId },
        })
        .then(window.alert("Product deleted successfully"));
      window.location.reload(false)
    }
  };

  const changeUnit = (item) => {
    setAddProductForm({ isActive: !item });
    console.log("item is ", item);
  };

  const changeUnitEdit = (item) => {
    setEditProductForm({ isActive: !item });
    console.log("item is ", item);
  };

  const filterShop = adminProducts?.filter((product, idx) =>
    product?.productname?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdminLogOut = () => {
    const confirmed = window.confirm("Are you sure to logout");

    if (confirmed) {
      adminLogOut(() => {
        history.push("/login");
      });
    }
  };

  const productRequestsHandler = (productid) => {
    history.push({
      pathname: "/product-requests",
      search: `?productId=${productid}`,
    });
    // history.push('/product-requests');
  }

  // history.push({
  //   pathname: "/product-requests",
  //   search: `?shopId=${shopId}&productId=${productId}`,
  // });

  return (
    <>
      {editProductForm.isActive && (
        <div style={{ height: '100vh', width: '100vw', marginTop: -30, position: 'fixed', zIndex: 10 }}>
          <EditProduct
            edit={{
              status: editProductForm.isActive,
              productForEdit: productForEdit,
              changeUnitEdit: changeUnitEdit,
              aId: _id,
            }}
          />
        </div>
      )}
      {addProductForm.isActive && (
        <div style={{ height: '100vh', width: '100vw', marginTop: -30, position: 'fixed', zIndex: 10 }}>
          <AddProduct
            st={{ yes: addProductForm.isActive, ch: changeUnit, aId: _id }}
          />
        </div>
      )}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-search-box">
          <Search onChange={(title) => setSearchText(title.target.value)} />
        </div>

        <div className="new-product-add-button">
          <button
            className="new-product-btn"
            onClick={(e) => setAddProductForm({ isActive: true })}
          >
            <i className="fas fa-plus"></i> New Product
          </button>
          <br />
        </div>

        {/* <div className="admin-log-out-btn">
          <button className="new-product-btn" onClick={handleAdminLogOut}>
            <i className="fas fa-sign-out-alt"></i>
            Sign out
          </button>
        </div> */}
      </div>

      <div className="table-admin-dashboard">
        <table>
          <tbody>
            <tr className="table-headings">
              <th>Product Name</th>
              <th>Photos</th>
              {/* <th>Size</th> */}
              <th>Stock</th>

              <th>Category</th>
              <th>Expected Item</th>
              <th>City</th>

              <th>Edit</th>
              <th>Delete</th>
            </tr>

            {filterShop.map((product) => {
              return (
                <tr className="table-content" key={product._id}>
                  <td>{product.productname}</td>
                  <td className="productImage-col">
                    {product.productImages.map((productImage) => (
                      <img
                        key={productImage}
                        alt="product img"
                        src={productImage}
                        style={{ width: "50px", height: "50px" }}
                      />
                    ))}
                  </td>

                  {product.stock === "In stock" ? (
                    <td style={{ color: "green" }}>{product.stock}</td>
                  ) : (
                    <td style={{ color: "red" }}>{product.stock}</td>
                  )}

                  <td className="product-category-col">
                    {product.productCategory}
                  </td>

                  <td className="product-expected-item-col">
                    {product.expectedItem}
                  </td>

                  <td className="product-city-col">
                    {product.city}
                  </td>



                  <td className="product-edit-col">
                    <div
                      onClick={() => {
                        editProduct(product._id);
                      }}
                    >
                      {" "}
                      <i className="fas fa-edit"></i>{" "}
                    </div>
                  </td>
                  <td className="product-delete-col">
                    <div
                      onClick={() => {
                        deleteProduct(product._id);
                      }}
                    >
                      {" "}
                      <i className="fas fa-trash-alt"></i>{" "}
                    </div>
                  </td>

                  {/* <td className="see-requests-btn">
                  <button className="product-requests" onClick={()=>productRequestsHandler(product._id)}>Product Requests</button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>



    </>
  );
};

export default AdminDashboard;
