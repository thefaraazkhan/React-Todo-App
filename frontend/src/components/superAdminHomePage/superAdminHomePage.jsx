import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Search from "../../components/Search/Search";
import { Shop } from "../Shop/Shop";
import "./superAdminHomePage.css";
import Products from "../Products/Products";
import axios from "axios";
import { API_URL } from "../../config";

const InsideShop = () => {
  const [shop, setShop] = useState({});
  const [userSearchProductText, setUserSearchProductText] = useState("");

  const location = useLocation();

  useEffect(() => {
    const getShop = async () => {
      const tasksFromServer = await fetchShop();
      setShop(tasksFromServer);
    };

    getShop();
  }, []);

  const fetchShop = async () => {
    const response = await axios.get(`${API_URL}/api/shops/${shopID}`);
    const singleShop = response.data;
    return singleShop;
  };

  //shop id which is passed by shop component using useHistory hook in search which can be accessed by useLocation hook
  const s = location.search;
  const result = queryString.parse(location.search);
  const shopID = result.shopId;

  const filterProductsForUser = shop?.products?.filter((product, idx) =>
    product?.productname
      ?.toLowerCase()
      .includes(userSearchProductText.toLowerCase())
  );

  return (
    <>
      <div className="inside-shop-header">
        <div className="inside-shop-search-box">
          <Search
            onChange={(title) => setUserSearchProductText(title.target.value)}
          />
        </div>
      </div>

      <div className="insideshop-shopname">
        <h1>{shop?.shopname}</h1>
      </div>
      <div className="insideshop-address">
        <h3>Address : {shop?.address}</h3>
      </div>
      <Products
        products={filterProductsForUser}
        shopName={shop?.shopname}
        shopId={shop?._id}
      />
    </>
  );
};

export default InsideShop;
