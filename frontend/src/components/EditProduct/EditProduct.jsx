import React, { useEffect, useState, useRef } from "react";
import "./EditProduct.css";
import isEmpty from "validator/lib/isEmpty";
import axios from "axios";
import Select from 'react-select';
import { showErrorMsg } from "../../helpers/message";
import { API_URL } from "../../config";

const EditProduct = (props) => {

  const inele = useRef();
  const outele = useRef();

  const [productCategoriesJson, setProductCategoriesJson] = useState();
  const [cityJson, setCityJson] = useState();

  const [selectedCategory, setSelectedCategory] = useState(props.edit.productForEdit.productCategory);
  const [selectedCity, setSelectedCity] = useState(props.edit.productForEdit.city);

  const [product, setProduct] = useState({
    productID: props.edit.productForEdit._id,
    productname: props.edit.productForEdit.productname,
    stock: props.edit.productForEdit.stock,
    productDescription: props.edit.productForEdit.productDescription,
    productCategory: props.edit.productForEdit.productCategory,
    city: props.edit.productForEdit.city,
    expectedItem: props.edit.productForEdit.expectedItem,
    errorMsg: false,
  });

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

  useEffect(() => {
    if (props.edit.productForEdit.stock == "In stock") {
      inele.current.checked = "checked"
    }
    if (props.edit.productForEdit.stock == "Out of stock") {
      outele.current.checked = "checked"
    }
  }, []);

  const [editStock, setEditStock] = useState(props.edit.productForEdit.stock);


  const {
    productID,
    productname,
    productDescription,
    expectedItem,
    errorMsg,
  } = product;
  console.log(selectedCategory, "categoryHandler")

  const editInfo = {
    productID,
    productname,
    editStock,
    productDescription,
    productCategory: selectedCategory,
    city: selectedCity,
    expectedItem,
    errorMsg,
  };

  const producthandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const submithandler = async (e) => {
    e.preventDefault();

    if (isEmpty(productname)) {
      setProduct({
        ...product,
        errorMsg: "enter product name",
      });
    } else {
      await axios
        .patch(`/api/products/${props.edit.aId}`, editInfo)
        .then((response) => {
          if (response.data.successMessage) {
            window.alert(response.data.successMessage);

            const z = () => props.edit.changeUnitEdit(props.edit.status);
            z();

            window.location.reload(false);
          }
        });
    }
  };

  // console.log(inele.current,"out")
  // console.log(outele.current, "in")
  // if(inele.current){
  // if(stock=="In stock"){
  //   // inele.current.value="saalim";
  //   console.log("saalim")
  // }
  // }
  // if(inele.current.value=="In stock"){
  //   inele.current.value="saalim"
  // }
  // if(inele.current.value=="Out of stock"){
  //   outele.current.value="saalim";
  // }

  // var ins = document.getElementById("instock");
  // console.log("loo",ins);

  const changeStockHandler = (e) => {
    setEditStock(e.target.value);
    // if(inele.current.checked="checked"){
    //   setEditStock("In stock")
    //   console.log("nowin");
    // }
    // else if(outele.current.checked){
    //   setEditStock("Out of stock")
    //   console.log("nowout");
    // }
  }

  const categoryHandler = (e) => {
    setSelectedCategory(e.label);
  };

  const cityHandler = (e) => {
    setSelectedCity(e.label);
  };



  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

      <div className="edit-product-container admin-registration-form-control">
        <form
          onSubmit={submithandler}
          className="edit-product-form"
          encType="multipart/form-data">
            {/* <span style={{fontSize: "18px", color: "black"}}>Edit product</span> */}
          <div className="side-a">
            <div className="f">
              <input
                type="text"
                placeholder="Enter product name"
                name="productname"
                onChange={producthandler}
                value={productname}
              />
            </div>

            <div className="select-stock">
              <div>
                <label> In stock </label>
                <input id="instock"
                  type="radio"
                  name="stock"
                  onChange={changeStockHandler}
                  value={"In stock"}
                  ref={inele}
                />
              </div>
              <div>
                <label> Out of stock </label>
                <input id="outofstock"
                  type="radio"
                  name="stock"
                  onChange={changeStockHandler}
                  value={"Out of stock"}
                  ref={outele}
                />
              </div>
            </div>

            <div className="f">
              <label>Description</label>
              <textarea
                type="text"
                placeholder=""
                name="productDescription"
                onChange={producthandler}
                value={productDescription}
              />
            </div>

            <div className="f">
              <label>Expecte Item</label>
              <textarea
                type="text"
                placeholder=""
                name="expectedItem"
                onChange={producthandler}
                value={expectedItem}
              />
            </div>

            {/* <div className="f">
            <label>City</label>
              <textarea
                type="text"
                placeholder=""
                name="city"
                onChange={producthandler}
                value={city}
              />
            </div> */}

            <Select className="select-color" styles={{ color: 'black' }} options={productCategoriesJson} onChange={categoryHandler} placeholder={props.edit.productForEdit.productCategory} />

            <Select className="select-color" styles={{ color: 'black' }} options={cityJson} onChange={cityHandler} placeholder={props.edit.productForEdit.city} />

            <div className="save-close">
              <button type="submit" className="add-products-btn admin-registration-btn">
                save
              </button>

              <button type="button" className="admin-registration-btn add-product-close-button" onClick={() => props.edit.changeUnitEdit(props.edit.status)}>
                Cancel{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
