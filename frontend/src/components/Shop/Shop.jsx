import "./Shop.css";
import { Link, useHistory } from "react-router-dom";

const Shop = (props) => {
  const history = useHistory();

  const exploreShop = async () => {
    history.push({
      pathname: "/insideshop",
      search: `?shopId=${props.shopId}`,
    });
  };

  return (
    <div className="card" onClick={exploreShop}>
      <div className="shop-img">
        <img src={`${props.mainImage}`} />
      </div>
      <div className="content">
        <div className="heading-container">
          <div className="shop-name">{props.shopName}</div>
        </div>
        <div className="category">
          {props.category.split(",").map((elem, idx) => {
            if (elem != "") return <span key={idx}>{elem}</span>;
          })}
        </div>
        <div className="phoneNumber">Contact: {props.phone}</div>
        <div className="address">Address: {props.address}</div>
      </div>
    </div>
  );
};

export { Shop };
