/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Product from "../Product/Product";
import "./Products.css";
import Search from "../../components/Search/Search";
import Select from 'react-select';
import { setAuthentication, isAuthenticated } from "../../helpers/auth";
import { backendUrl } from "../../config"

const Products = ({ adminsData, shopName, shopId }) => {
  const [LS, setLS] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [allProducts, setAllProducts] = useState();

  const [productCategoriesJson, setProductCategoriesJson] = useState();
  const [cityJson, setCityJson] = useState();

  const [productCategory, setProductCategory] = useState(false);
  const [city, setCity] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const ary = [];
    adminsData?.map((admin, idx) => {
      admin?.products.map(product => {
        ary.push(product);
      })
    });
    setAllProducts(ary)
  }, [adminsData])

  useEffect(() => {
    console.log(allProducts)
    const ls = JSON.parse(localStorage.getItem('admin'));
    setLS(ls);
    if (ls) {
      if (ls && ls.isAdmin === true && ls.isSuperAdmin === false) {
        history.push('/');
      }
    }

    if (ls) {
      if (ls && ls.isAdmin === true && ls.isSuperAdmin === true) {
        history.push('/superadmin');
      }
    }

  }, []);

  // adminsData.filter(admin=>{
  //   const filterShop = admin.products.filter(product=> {
  //     product.productname.toLowerCase().includes(searchText.toLowerCase());
  //     // console.log("...", product.productname)
  //   })
  //   setFi(filterShop);
  // });
  // console.log("filter", filterShop)
  // const ary = [];
  // const ab = adminsData?.map((admin, idx) =>{
  //   admin?.products.map(product => {
  //     ary.push(product);
  //   })
  // });
  // console.log(ary,"ary")
  // console.log(ab, "444")

  let flp = false;
  let withoutCategoryFilter = false;

  if (productCategory) {
    const filterProductByCategory = allProducts?.filter(ele => {
      return ele.productCategory == productCategory;
    });

    const filterShop = filterProductByCategory?.filter((singleProduct, idx) =>
      singleProduct?.productname?.toLowerCase().includes(searchText.toLowerCase())
    );

    flp = filterShop;
  }

  if (!productCategory) {
    const filterShop = allProducts?.filter((singleProduct, idx) =>
      singleProduct?.productname?.toLowerCase().includes(searchText.toLowerCase())
    );
    withoutCategoryFilter = filterShop;
  }


  useEffect(() => {
    fetch(`${backendUrl}/city.json`)
      .then((r) => r.json())
      .then((data) => {
        setCityJson(data.city)
      });
  }, []);

  useEffect(() => {
    fetch(`${backendUrl}/productCategories.json`)
      .then((r) => r.json())
      .then((data) => {
        setProductCategoriesJson(data.productCategoriesJson)
      });
  }, []);

  const cityHandler = (e) => {
    setCity(e.label);
  };

  const categoryHandler = (e) => {
    setProductCategory(e.label);
  };

  return (
    <div className="products-grid">
      <div className="admin-dashboard-search-box">
        <Search onChange={(title) => setSearchText(title.target.value)} />
      </div>

      <div className="category-city-flex-box" style={{ display: "flex", flexDirection: "row", position: "absolute", top: "94px", left: "160px", width: "311px", gap: "10px" }}>

        {/* <div className="flex-filter" style={{display: "flex", flexDirection: "row"}}> */}
        {/* <div className="city-filter" style={{display:"inline-block", width:"1300px"}}><Select options={cityJson} onChange={cityHandler} placeholder="City"/></div> */}
        <div className="category-filter" style={{ display: "inline-block", width: "1300px" }}><Select options={productCategoriesJson} onChange={categoryHandler} placeholder="Category" /></div>
        {/* </div> */}

      </div>

      {
        !localStorage.getItem('admin') && <div style={{ fontSize: "38px", display: "flex", width: "80vw", justifyContent: "center" }}>
          <h1 >Log in to see products</h1>
        </div>
      }

      {
        flp && flp?.map(product => {
          if (LS?.isAdmin === true && product.stock === "In stock") {
            return <Product key={product._id} productId={product._id} stock={product.stock} productCategory={product.productCategory} product={product} expectedItem={product.expectedItem} shopId={product.adminId} />
          }
        })
      }

      {
        flp && flp?.map(product => {
          if (LS?.isSuperAdmin === true) {
            return <Product key={product._id} productId={product._id} stock={product.stock} productCategory={product.productCategory} product={product} expectedItem={product.expectedItem} shopId={product.adminId} />
          }
        })
      }


      {
        withoutCategoryFilter && withoutCategoryFilter?.map(product => {
          if (LS?.isAdmin === true && product.stock === "In stock") {
            return <Product key={product._id} productId={product._id} stock={product.stock} productCategory={product.productCategory} product={product} expectedItem={product.expectedItem} shopId={product.adminId} />

          }

          if (LS?.isSuperAdmin === true) {
            return <Product key={product._id} productId={product._id} stock={product.stock} productCategory={product.productCategory} product={product} expectedItem={product.expectedItem} shopId={product.adminId} />

          }
        })
      }
    </div >
  );
};

export default Products;


