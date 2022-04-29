/* eslint-disable */
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import isEmpty from "validator/lib/isEmpty";
import "./AddProduct.css";

import axios from "axios";
import { showErrorMsg } from "../../helpers/message";
import { setAuthentication, isAuthenticated } from "../../helpers/auth";
import { API_URL } from "../../config";

const AddProduct = (props) => {

  // const productCategoriesJson = [
  //   { label: "Appliances (Microwave, Refrigerator, dishwasher, etc.)", value: 1 },
  //   { label: "Furniture (Bed, Sofa, etc.)", value: 2 },
  //   { label: "Electronic Equipment (Computer, Television, etc.)", value: 3  },
  //   { label: "Carpets", value: 4  },
  //   { label: "Dishes", value: 5  }
  // ];

  const [productCategoriesJson, setProductCategoriesJson] = useState();
  const [cityJson, setCityJson] = useState();

  const [shopInfo, setShopInfo] = useState({
    productname: "",
    productDescription: "",
    expectedItem: "",
    successMsg: false,
    errorMsg: false,
  });

  const [productCategory, setProductCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [productImages, setProductImages] = useState([]);

  const [stock, setStock] = useState("");

  const [pf, setPf] = useState({ isActive: props.st.yes });

  const ls = JSON.parse(localStorage.getItem("admin"));
  const adminId = ls?._id;

  const {
    productname,
    productDescription,
    expectedItem,
    errorMsg,
  } = shopInfo;

  console.log("ProductImages", productImages);

  const productInfo = new FormData();
  productInfo.append("productname", productname);

  for (let i = 0; i < productImages.length; i++) {
    productInfo.append("productImagesFiles", productImages[i]);
  }

  productInfo.append("stock", stock);
  productInfo.append("productCategory", productCategory);
  productInfo.append("productDescription", productDescription);
  productInfo.append("city", selectedCity);
  productInfo.append("expectedItem", expectedItem);
  productInfo.append("adminId", adminId);


  const producthandler = (e) => {
    setShopInfo({
      ...shopInfo,
      [e.target.name]: e.target.value,
      errorMsg: "",
    });
  };


  const productImagesHandler = (e) => {
    const files = e.target.files;

    setProductImages(files);
    setShopInfo({
      ...shopInfo,
      errorMsg: "",
    });
  };

  const categoryHandler = (e) => {
    setProductCategory(e.label);
  };

  const cityHandler = (e) => {
    setSelectedCity(e.label);
  };

  const stockhandler = (e) => {
    if (e.target.checked) {
      setStock(e.target.value);
      setShopInfo({
        ...shopInfo,
        errorMsg: "",
      });
    }
  };

  const submithandler = async (e) => {
    e.preventDefault();


    if (isEmpty(productname)) {
      setShopInfo({
        ...shopInfo,
        errorMsg: "enter product name",
      });
    } else if (productImages.length === 0) {
      setShopInfo({
        ...shopInfo,
        errorMsg: "product must have atleast one image",
      });
    } else if (isEmpty(stock)) {
      setShopInfo({
        ...shopInfo,
        errorMsg: "is product in stock or out of stock?",
      });
    } else if (isEmpty(productCategory)) {
      setShopInfo({
        ...shopInfo,
        errorMsg: "enter product category",
      });
    }
    else if (isEmpty(productDescription)) {
      setShopInfo({
        ...shopInfo,
        errorMsg: "enter product description",
      });
    }
    else if (isEmpty(selectedCity)) {
      setShopInfo({
        ...shopInfo,
        errorMsg: "enter city",
      });
    }
    else if (isEmpty(expectedItem)) {
      setShopInfo({
        ...shopInfo,
        errorMsg: "enter expected item",
      });
    } else {
      console.log("what", ...productInfo);
      const response = await axios.put(
        `${API_URL}/api/products/${props.st.aId}`,
        productInfo
      );
      if (response.data.successMessage) {
        window.alert(response.data.successMessage);

        const z = () => props.st.ch(props.st.yes);
        z();

        window.location.reload(false)

      }
      if (response.data.errorMessage) {
        setShopInfo({
          ...shopInfo,
          errorMsg: response.data.errorMessage,
        });
      }
    }


  };


  useEffect(() => {
    fetch(`http://localhost:3000/productCategories.json`)
      .then((r) => r.json())
      .then((data) => {
        setProductCategoriesJson(data.productCategoriesJson)
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/city.json`)
      .then((r) => r.json())
      .then((data) => {
        setCityJson(data.city)
      });
  }, []);


  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      {pf.isActive && (
        <div className="add-product-container" id="myForm">
          <form
            onSubmit={submithandler}
            className="add-product-form"
            encType="multipart/form-data"
          >
            <div className="product-main-info-box admin-registration-form-control">
              {errorMsg && showErrorMsg(errorMsg)}

              <span style={{ fontSize: "25px" }}>New product</span>

              <input
                type="text"
                placeholder="Enter product name"
                name="productname"
                maxLength="50"
                onChange={producthandler}
                value={productname || ""}
              />

              <div className="product-img">
                <label>
                  <b> Add Product Images</b>
                </label>
                <input
                  type="file"
                  name="productImagesFiles"
                  onChange={productImagesHandler}
                  multiple
                />
              </div>
              <div className="stock-container">
                <label>
                  <b>Stock</b>
                </label>
                <div className="select-stock">
                  <div>
                    <label> In stock </label>
                    <input
                      type="radio"
                      name="stock"
                      onChange={stockhandler}
                      value={"In stock"}
                    />
                  </div>
                  <div>
                    <label> Out of stock </label>
                    <input
                      type="radio"
                      name="stock"
                      onChange={stockhandler}
                      value={"Out of stock"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-description-box admin-registration-form-control">
              <div className="product-description-box">
                <div className="c">
                  <label>
                    <b>productDescription</b>
                  </label>
                  <br />
                  <textarea
                    type="text"
                    placeholder=""
                    name="productDescription"
                    maxLength="170"
                    onChange={producthandler}
                    value={productDescription || ""}
                  />
                </div>

                <Select options={productCategoriesJson} onChange={categoryHandler} placeholder="Category" />

                <div className="c">
                  <label>
                    <b>Expected Item</b>
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder=""
                    name="expectedItem"
                    maxLength="15"
                    onChange={producthandler}
                    value={expectedItem || ""}
                  />
                </div>

                {/* <div className="c">
                  <label>
                    <b>City</b>
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder=""
                    name="city"
                    maxLength="15"
                    onChange={producthandler}
                    value={city || ""}
                  />
                </div> */}

                <Select styles={{ color: 'black' }} options={cityJson} onChange={cityHandler} placeholder="City" />






                <div className="add-close-container">
                  <button
                    type="submit"
                    className="add-products-btn admin-registration-btn"
                  >
                    save
                  </button>

                  <button
                    type="button"
                    className="add-product-close-button admin-registration-btn"
                    onClick={() => props.st.ch(props.st.yes)}
                  >
                    Cancel{" "}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
