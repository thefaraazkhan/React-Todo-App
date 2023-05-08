import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./EditAdminProfile.css";
// import adminShopRegisterAPI from "../../api/adminShopRegisterApi"
import isEmpty from "validator/lib/isEmpty";
import axios from "axios";
// import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
// import { circularLoading } from "../../helpers/loading";
import { API_URL } from "../../config";

const EditAdminProfile = () => {
  const history = useHistory();

  const [formEditBtn, setFormEditBtn] = useState(true);

  const [singleAdmin, setSingleAdmin] = useState({});
  const [userData, setUserData] = useState({});
  const [checkImage, setCheckImage] = useState();
  const [adminShopImage, setAdminShopImage] = useState();
  // const [shop, setShop] = useState({
  //     // shopname: "",
  //     address: "",
  //     landmark: "",
  //     city: "",
  //     pincode: "",
  //     phone: "",
  //     successMsg: false,
  //     errorMsg: false,
  //     loading: false,
  //   });

  useEffect(() => {
    const getAdminShop = async () => {
      const tasksFromServer = await fetchAdminProducts();
      setSingleAdmin(tasksFromServer);
      setCheckImage(tasksFromServer.adminShopImage)
    };

    getAdminShop();
  }, []);


  const fetchAdminProducts = async () => {
    const response = await axios.get(`${API_URL}/api/products/${_id}`);
    const admin = response.data;
    // const adminProducts = products;
    return admin;
  };

  const fetchUser = async () => {
    const response = await axios.get(`${API_URL}/api/products/user/${_id}`);
    const userData = response.data;
    console.log("User Datraaaa inside fn", userData)
    setUserData(userData)
    // const adminProducts = products;
    return userData;
  };

  useEffect(() => {
    const userDa = fetchUser()
    console.log("User Datraaaa inside useEffect", userDa)
  }, [])




  console.log(singleAdmin)

  const { address, landmark, city, pincode, phone } = singleAdmin;

  // const [editAdmin, setEditAdmin] = useState(singleAdmin);

  // console.log(editAdmin, "sssssss")


  const editFormhandler = (e) => {
    setSingleAdmin({
      ...singleAdmin,
      [e.target.name]: e.target.value,
      successMsg: false,
      errorMsg: false,
      loading: false,
    });
  }


  //create state for shopINfo
  // const [shop, setShop] = useState({
  //   // shopname: "",
  //   address: "",
  //   landmark: "",
  //   city: "",
  //   pincode: "",
  //   phone: "",
  //   successMsg: false,
  //   errorMsg: false,
  //   loading: false,
  // });


  // console.log('asdfasdf', adminShopImage)




  //Object destructure
  // const { address, landmark, city, pincode, phone, successMsg, errorMsg, loading } = singleAdmin;

  const getAdminFromLS = JSON.parse(localStorage.getItem("admin"));
  const { _id } = getAdminFromLS;
  console.log(adminShopImage, "ShopImage???")
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
  shopInfo.append("adminShopImage", adminShopImage);



  // Shop info form handler
  // const shopInfoHandler = (e) => {
  //   setShop({
  //     ...shop,
  //     [e.target.name]: e.target.value,
  //     successMsg: "",
  //     errorMsg: "",
  //   });
  // };

  // Shop image handler
  const ShopImageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setCheckImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);

      const file = e.target.files[0];
      setAdminShopImage(file);
    }


    // setShop({
    //   ...shop,
    //   successMsg: "",
    //   errorMsg: "",
    // });
  };

  // shop submit handler
  const submithandler = async (e) => {
    e.preventDefault();

    if (isEmpty(address)) {
      window.alert("please enter your shop address");
      // setSingleAdmin({
      //   ...singleAdmin,
      //   errorMsg: "please enter your shop address",
      // });
    } else if (isEmpty(landmark)) {
      window.alert("please enter landmark");
      // setSingleAdmin({
      //   ...singleAdmin,
      //   errorMsg: "please enter your address landmark",
      // });
    } else if (isEmpty(city)) {
      window.alert("please enter your city");
      // setSingleAdmin({
      //   ...singleAdmin,
      //   errorMsg: "please enter your city name",
      // });
    }
    else if (pincode.length > 6) {
      window.alert("pincode should have maximum 6 digits");
      // setSingleAdmin({
      //   ...singleAdmin,
      //   errorMsg: "please enter pincode",
      // });
    }
    else if (phone.length > 10) {
      window.alert("phone number should have maximum 10 digits");
      // setSingleAdmin({
      //   ...singleAdmin,
      //   errorMsg: "please enter pincode",
      // });
    }
    else {
      await axios
        .patch(`/api/adminShop/`, shopInfo)
        .then((response) => {
          response.data.successMessage && history.push("/dashboard");

          response.data.errorMessage &&
            setSingleAdmin({
              ...singleAdmin,
              errorMsg: response.data.errorMessage,
            });
        });
    }
  };

  useEffect(() => {
    const inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = formEditBtn;
    }

  }, [formEditBtn]);

  const editBtnLogic = () => {
    setFormEditBtn(false);
    const inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = false;
      inputs[1].focus();
    }
  }

  return (
    <>
      <div className="shop-registration-body" id="myForm">
        <form onSubmit={submithandler} className="shop-registration-form">

          {/* {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)} */}

          <h3>Edit Profile</h3>

          <br />

          <div className='user-data-fname'>
            <h4> Hi {userData.firstName}</h4>
          </div>

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
            <img src={checkImage} style={{ width: "100px", height: "100px", borderRadius: "50%" }} alt="" />


            <input
              type="text"
              placeholder="address"
              name="address"
              maxLength="100"
              onChange={editFormhandler}
              value={address || ""}
            />
            <br />
            <br />

            <input
              type="text"
              placeholder="landmark"
              name="landmark"
              maxLength="100"
              onChange={editFormhandler}
              value={landmark || ""}
            />
            <br />
            <br />

            <input
              type="text"
              placeholder="city"
              name="city"
              maxLength="100"
              onChange={editFormhandler}
              value={city || ""}
            />
            <br />
            <br />

            <input
              type="number"
              placeholder="pincode"
              name="pincode"
              maxLength="100"
              onChange={editFormhandler}
              value={pincode || ""}
            />
            <br />
            <br />


            <input
              type="number"
              placeholder="phone no."
              name="phone"
              onChange={editFormhandler}
              value={phone || ""}
            />
            <br />
            <br />

            {formEditBtn && <button
              type="submit"
              className="shop-info-save-btn admin-registration-btn"
              onClick={editBtnLogic}
            >
              click for edit
            </button>}

            {!formEditBtn && <button
              type="submit"
              className="shop-info-save-btn admin-registration-btn"
            >
              save
            </button>}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAdminProfile;
