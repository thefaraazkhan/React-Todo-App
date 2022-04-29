import React, { useState } from "react";
import Search from "../Search/Search";
import { Shop } from "../Shop/Shop";
import "./Shops.css";

const Shops = (props) => {
  const [shopSearchText, setShopSearchText] = useState("");

  const filterShop = props?.shops?.filter((shop, idx) =>
    shop?.shopname?.toLowerCase().includes(shopSearchText.toLowerCase())
  );

  return (
    <>
      <div className="shops-header">

        <div className="website-name-and-search">
          <div className="shops-search-box">
            <Search onChange={(title) => setShopSearchText(title.target.value)} />
          </div>
        </div>

      </div>

      <div className="shops-grid">
        {filterShop.map((shop) => {
          return (
            <Shop
              key={shop._id}
              shopId={shop._id}
              shopName={shop.shopname}
              category={shop.category}
              phone={shop.phone}
              address={shop.address}
              mainImage={shop.mainImage}
            />
          );

        })}
      </div>
    </>
  );
};

export default Shops;
