import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./AdminShopRegistration.css";
import adminShopRegisterAPI from "../../api/adminShopRegisterApi"
import isEmpty from "validator/lib/isEmpty";
import axios from "axios";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { circularLoading } from "../../helpers/loading";
import { API_URL } from "../../config";

const AdminShopRegistration = () => {
  const history = useHistory();

  const [adminInfo, setAdminInfo] = useState({});

  //create state for shopINfo
  const [shop, setShop] = useState({
    // shopname: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    phone: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  const [ShopImage, setShopImage] = useState(null);

  const [checkImage, setCheckImage] = useState("/images/profile.png")

  // const [shopCategory, setShopCategory] = useState([]);

  //Object destructure
  const { address, landmark, city, pincode, phone, successMsg, errorMsg, loading } = shop;

  const getAdminFromLS = JSON.parse(localStorage.getItem("admin"));
  const { _id } = getAdminFromLS;

  //Object which will pass through post request
  const shopInfo = new FormData();
  shopInfo.append("adminId", _id);
  // shopInfo.append("shopname", shopname);
  shopInfo.append("address", address);
  shopInfo.append("landmark", landmark);
  shopInfo.append("city", city);
  shopInfo.append("pincode", pincode);
  shopInfo.append("phone", phone);
  // shopInfo.append("category", shopCategory);
  shopInfo.append("adminShopImage", ShopImage);

  // Shop info form handler
  const shopInfoHandler = (e) => {
    setShop({
      ...shop,
      [e.target.name]: e.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };
console.log(adminInfo);
  // Shop category handler
  // const shopCategoryHandler = (e) => {
    // check if the check box is checked or unchecked
    // if (e.target.checked) {
    //   shopCategory.push(e.target.value);
    // } else {
    //   const index = shopCategory.indexOf(e.target.value);
    //   shopCategory.splice(index, 1);
    // }

    // update the state with the new array
    // setShopCategory([...shopCategory]);

    // setShop({
    //   ...shop,
    //   successMsg: "",
    //   errorMsg: "",
    // });
  // };

  useEffect(async() => {
    const response = await axios.get(`${API_URL}/api/adminShop/${_id}`);
    setAdminInfo(response.data[0]);
  }, [])
  

  // Shop image handler
  const ShopImageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setCheckImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);

      const file = e.target.files[0];

    setShopImage(file);
    setShop({
      ...shop,
      successMsg: "",
      errorMsg: "",
    });
    }

    
  };

  // shop submit handler
  const submithandler = async (e) => {
    e.preventDefault();

    // if (isEmpty(shopname)) {
    //   setShop({
    //     ...shop,
    //     errorMsg: "please enter your shop name",
    //   });
    // }
    const re = /^[0-9\b]+$/;

     if (isEmpty(address)) {
      setShop({
        ...shop,
        errorMsg: "please enter your shop address",
      });
    } else if (isEmpty(landmark)) {
      setShop({
        ...shop,
        errorMsg: "please enter your address landmark",
      });
    } else if (isEmpty(city)) {
      setShop({
        ...shop,
        errorMsg: "please enter your city name",
      });
    }else if (pincode.length>6) {
      window.alert("pincode should have maximum 6 digits");
      // setShop({
      //   ...shop,
      //   errorMsg: "please enter pincode",
      // });
    }else if (phone.length>10) {
      window.alert("phone number should have maximum 10 digits");
      // setShop({
      //   ...shop,
      //   errorMsg: "please enter your phone number",
      // });
    }
    // else if (!re.test(phone)){
    //   setShop({
    //     ...shop,
    //     errorMsg: "please enter not c",
    //   });
    // }
    //  else if (shopCategory.length === 0) {
    //   setShop({
    //     ...shop,
    //     errorMsg: "please mark your shop category",
    //   });
    // }
     else {
      await axios
        // .post(`${API_URL}/api/adminShop`, shopInfo)
        adminShopRegisterAPI(shopInfo)
        .then((response) => {
          response.data.successMessage && history.push("/dashboard");

          response.data.errorMessage &&
            setShop({
              ...shop,
              errorMsg: response.data.errorMessage,
            });
        });
    }
  };

  return (
    <>
      <div className="shop-registration-body" id="myForm">
        <form onSubmit={submithandler} className="shop-registration-form">

          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}

          <h3>Profile</h3>
          <br />
          <div className="admin-registration-form-control">
          <label>
              <b>Upload profile photo</b>
            </label>
            <input
              className="choose-file"
              type="file"
              name="adminShopImage"
              onChange={ShopImageHandler}
            />
            <br />
            <br />
            <img src={checkImage} style={{width: "100px", height: "100px", borderRadius: "50%"}} alt="saalim"/>
            <span className="hello-username" style={{marginLeft: "15px", fontSize: "20px"}}>Hello {adminInfo?.firstName} {adminInfo?.lastName}</span>


          <input
              type="text"
              placeholder="address"
              name="address"
              maxLength="100"
              onChange={shopInfoHandler}
              value={address || ""}
            />
            <br />
            <br />

            <input
              type="text"
              placeholder="landmark"
              name="landmark"
              maxLength="100"
              onChange={shopInfoHandler}
              value={landmark || ""}
            />
            <br />
            <br />

            <input
              type="text"
              placeholder="city"
              name="city"
              maxLength="100"
              onChange={shopInfoHandler}
              value={city || ""}
            />
            <br />
            <br />

            <input
              type="number"
              placeholder="pincode"
              name="pincode"
              maxLength="10"
              onChange={shopInfoHandler}
              value={pincode || ""}
            />
            <br />
            <br />


            {/* <input
              type="text"
              placeholder="shop name"
              name="shopname"
              maxLength="35"
              onChange={shopInfoHandler}
              value={shopname || ""}
            />
            <br />
            <br /> */}

            

            <input
              type="number"
              placeholder="phone no."
              name="phone"
              maxLength="10"
              onChange={shopInfoHandler}
              value={phone || ""}
            />
            <br />
            <br />

            {/* <label>
              <b>Category:</b>
            </label>
            <br />
            <br />
            <div>
              <label>Men</label>
              <input
                type="checkbox"
                name="men"
                onChange={shopCategoryHandler}
                value={"Men"}
              />
              <br />
              <label>Women</label>
              <input
                type="checkbox"
                name="women"
                onChange={shopCategoryHandler}
                value={"Women"}
              />
              <br />
              <label>Kids</label>
              <input
                type="checkbox"
                name="kids"
                onChange={shopCategoryHandler}
                value={"Kids"}
              />
              <br />
            </div> */}
            

            <button
              type="submit"
              className="shop-info-save-btn admin-registration-btn"
            >
              save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminShopRegistration;
