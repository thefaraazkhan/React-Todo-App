/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import "./Viewproduct.css";
import axios from "axios";
import { API_URL } from "../../config";
import { io } from "socket.io-client";
// import { sendMessageRoute, recieveMessageRoute } from "../../utils/APIRoutes";
// import { allUsersRoute, host } from "../../utils/APIRoutes";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Viewproduct = () => {
  const [singleShop, setSingleShop] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [loggedUser, setLoggedUser] = useState(false);
  const [contacts, setContacts] = useState();
  const [isRequested, setIsRequested] = useState(false);


  const location = useLocation();
  const history = useHistory();

  const socket = useRef();

  // useEffect(async () => {
  //   if((localStorage.getItem("admin")==null)) {
  //     setCurrentUser(
  //       await JSON.parse(
  //         localStorage.getItem("admin")
  //       )
  //     );
  //   }
  // }, []);


  useEffect(() => {
    const getShop = async () => {
      const tasksFromServer = await fetchShop();
      setSingleShop(tasksFromServer);
    };

    getShop();
  }, []);

  useEffect(() => {
    setMainImage(singleProduct?.productImages?.[0]);
  }, [singleShop]);

  useEffect(() => {
    const fd = async () => {
      const data = await JSON.parse(
        localStorage.getItem('admin')
      );
      setLoggedUser(data);
    }

    fd();

  }, [])

  useEffect(() => {
    console.log("useEffect")
  })


  // fetch shop on the basis of shop id
  const fetchShop = async () => {
    const response = await axios.get(`${API_URL}/api/shops/${ShopId}`, {
      productID: productID,
    });
    const singleShop = response.data;
    console.log("view", singleShop)
    return singleShop;
  };



  //product id and shop id which are passed by product component using useHistory hook in search which can be accessed by useLocation hook

  const pr = location.search;
  const result = queryString.parse(pr);
  const ShopId = result.shopId;
  const productID = result.productId;

  var singleProduct = {};
  singleShop?.products?.map((product) => {
    if (product._id === productID) {
      singleProduct = product;
    }
  });

  const ls = JSON.parse(
    localStorage.getItem('admin')
  );

  const sendMessageRoute = `${API_URL}/api/messages/addmsg`;


  const chatBtnHandler = async () => {


    if (loggedUser) {
      console.log("xo", loggedUser)

      // const allContacts = await axios.get(`${allUsersRoute}/${loggedUser._id}`);
      // setContacts(allContacts?.data);    
      console.log("loooooooooooooo", ShopId)
      const didText = await axios.post(`${API_URL}/api/messages/getmsg`, {
        from: loggedUser._id,
        to: ShopId,
      });
      // setMessages(didText.data);

      if (!didText.data.length) {
        console.log("not text")
        const r = await axios.post(sendMessageRoute, {
          from: loggedUser._id,
          to: ShopId,
          fromSelf: true
          // message: "me",
        });
        const d = await axios.post(sendMessageRoute, {
          from: ShopId,
          to: loggedUser._id,
          fromSelf: false
          // message: "me",
        });
        console.log("re", r)
      }
      else {
        (console.log("did text"))
      }

    }

    if (!contacts) {
      console.log(contacts, "no,,,,,,,,,,,,,,")
    }



    // socket.current.emit("send-msg", {
    //   to: currentChat._id,
    //   from: data._id,
    //   msg,
    // });
    // await axios.post(sendMessageRoute, {
    //   from: data._id,
    //   to: currentChat._id,
    //   message: msg,
    // });

    // const msgs = [...messages];
    // msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);




    history.push({
      pathname: "/chats",
      search: `?shopId=${ShopId}&productId=${productID}`,
    });
    window.location.reload();

  }

  const LS = JSON.parse(
    localStorage.getItem('admin')
  );



  const obj = {
    to: ShopId,
    from: LS?._id,
    productID: productID,
  }

  useEffect(() => {
    const gt = async () => {
      const getResult = await axios.get(`${API_URL}/api/approve-request?to=${ShopId}&from=${LS?._id}&productID=${productID}`);
      const user = getResult.data[0];
      console.log("THis is whatx i want", user)
      // console.log(getResult.data[0], "getResult.data[0]")
      // getResult ? setIsRequested()
      if (getResult.data) {
        setIsRequested(user)
      }
      // getResult  setIsRequested(user)

      // console.log(JSON.stringify(user,null,2), "us");

    }
    // console.log('isRequested',JSON.stringify(isRequested,null,2));
    gt();
    console.log("this is user", LS)
  }, []);




  //approve request handle
  const approveRequestHandler = async () => {


    const data = await JSON.parse(
      localStorage.getItem('admin')
    );
    const obj = {
      to: ShopId,
      from: data?._id,
      productID: productID,
    }

    const s = async () => {
      const response = await axios.post('/api/approveRequest', obj);
      if (response.data) {
        window.location.reload(false)
      }
    }

    // socket.current = io(host);
    // socket.current.emit("approve-request", {
    //   to: ShopId,
    //   from: data._id,
    //   productID: productID,
    //   request: true,
    // });



    s();



    console.log('isRequested', JSON.stringify(isRequested, null, 2));
    // socket.current.emit("add-user", data._id);

    // await axios.post(sendMessageRoute, {
    //   from: data._id,
    //   to: ShopId,
    //   message: msg,
    // });

    // const msgs = [...messages];
    // msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);

  }


  //cancel request handle
  const cancelRequestHandler = async () => {


    const data = await JSON.parse(
      localStorage.getItem('admin')
    );
    const obj = {
      to: ShopId,
      from: data._id,
      productID: productID,
    }

    const s = async () => {
      const response = await axios.delete(`/api/approve-request?to=${ShopId}&from=${LS?._id}&productID=${productID}`, obj);
      if (response.data) {
        window.location.reload(false)
      }
    }

    // socket.current = io(host);
    // socket.current.emit("approve-request", {
    //   to: ShopId,
    //   from: data._id,
    //   productID: productID,
    //   request: true,
    // });



    s();



    console.log('isRequested', JSON.stringify(isRequested, null, 2));
    // socket.current.emit("add-user", data._id);

    // await axios.post(sendMessageRoute, {
    //   from: data._id,
    //   to: ShopId,
    //   message: msg,
    // });

    // const msgs = [...messages];
    // msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);

  }


  const handleSendMsg = async (msg) => {
    // const data = await JSON.parse(
    //   localStorage.getItem('admin')
    // );
    // socket.current.emit("send-msg", {
    //   to: currentChat._id,
    //   from: data._id,
    //   msg,
    // });
    // await axios.post(sendMessageRoute, {
    //   from: data._id,
    //   to: currentChat._id,
    //   message: msg,
    // });

    // const msgs = [...messages];
    // msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);
  };

  return (
    <>

      <div className="viewproduct-main-container">
        <div style={{ height: 600, width: 600 }}>
          <Carousel autoPlay useKeyboardArrows='true' showStatus='false' dynamicHeight='false'  >
            {singleProduct?.productImages?.map((productImage) => (
              <div key={productImage}>
                <img
                  style={{ height: 350, width: 350, }}
                  alt="product"
                  src={`${productImage}`}
                />
              </div>
            ))}
          </Carousel>
        </div>
        {/* <div className="view-product-side-images">
          {singleProduct?.productImages?.map((productImage) => (
            <img
            alt="product image"
            src={`${productImage}`}
            onClick={() => {
              setMainImage(productImage);
            }}
            />
            ))}
        </div> */}

        {/* <div className="viewproduct-main-img">
          <img src={`${mainImage}`} alt="product image" />
        </div> */}

        <div className="viewproduct-info-container">
          <div className="view-product-name">
            <span> {singleProduct.productname}</span>
          </div>
          <br />


          <div className="view-product-size">
            {singleProduct.size?.map((s) => (
              <span key={s._id}>{s}</span>
            ))}
          </div>
          <br />

          <div className="view-product-stock">
            {singleProduct?.stock === "In stock" ? (
              <span style={{ color: "green" }}>{singleProduct?.stock}</span>
            ) : (
              <span style={{ color: "red" }}>{singleProduct?.stock}</span>
            )}
          </div>
          <br />
          <br />

          <div className="h6">
            {singleProduct.productDescription && <h4>Description : {singleProduct.productDescription}</h4>}

            {singleProduct.productCategory && <h4>Category : {singleProduct.productCategory}</h4>}

            {singleProduct.expectedItem && <h4>Expected Item : {singleProduct.expectedItem}</h4>}

            {singleProduct.city && <h4>City : {singleProduct.city}</h4>}


            {/* {LS.firstName && <h4>Posted By : {LS.firstName}</h4>} */}

            {singleProduct.pattern && (
              <h4>Pattern : {singleProduct.pattern}</h4>
            )}
            {singleProduct.idealfor && (
              <h4>Ideal For : {singleProduct.idealfor}</h4>
            )}
            {singleProduct.fit && <h4>Fit : {singleProduct.fit}</h4>}
          </div>
          {ls?.isSuperAdmin === false && <button className="chats" onClick={chatBtnHandler} style={{ backgroundColor: '#285fa0', height: '40px', padding: '3px', borderRadius: '5px', color: 'white', width: 200, fontWeight: '500', marginTop: 7, border: 'none' }}>Chat</button>}
        </div>
        {/* {ls?.isSuperAdmin===false && <div className="request-show-hide">{isRequested?<div className="cancel-request-btn" onClick={cancelRequestHandler} style={{backgroundColor: '#ddd', width: '185px', height: '55px' }}>Cancel request</div>:
<div className="approve-request-btn" onClick={approveRequestHandler} style={{backgroundColor: 'blue', width: '185px', height: '55px' }}>Request for approve</div>}</div>} */}

      </div>
    </>
  );
};

export default Viewproduct;
