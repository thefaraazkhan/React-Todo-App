/* eslint-disable */
import "./App.css";
import { API_URL } from "./config";
import { useEffect, useState } from "react";
import { backendUrl } from "./config";
// import Shops from "./components/Shops/Shops";
import Products from "./components/Products/Products";
import Viewproduct from "./components/Viewproduct/Viewproduct";
import AdminRegistration from "./components/AdminRegistration/AdminRegistration";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import axios from "axios";
import AdminShopRegistration from "./components/AdminShopRegistration/AdminShopRegistration";
import EditAdminProfile from "./components/EditAdminProfile/EditAdminProfile";
import InsideShop from "./components/InsideShop/InsideShop";
import { Route, BrowserRouter, Switch, Link, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

import Check from "./components/Check/Check.jsx";
import Chat from "./pages/Chat";
import ProductRequests from "./components/ProductRequests/ProductRequests";

function App() {
  const [adminsData, setAdminsData] = useState([]);

  useEffect(() => {
    const getAdminsData = async () => {
      const dataFromServer = await fetAdminsData();
      setAdminsData(dataFromServer);
    };

    getAdminsData();
  }, []);

  const fetAdminsData = async () => {
    const response = await axios.get(`${API_URL}/api/shops`);
    const allshops = response.data;
    return allshops;
  };

  // const categoryHandler = (e) => {
  //   setProductCategory(e.label);
  // };



  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <div className="main-container">
          <Switch>
            {/* Home page */}
            <Route exact path="/">
              {/* <Products shops={shops} /> */}
              <Products adminsData={adminsData} />
            </Route>

            {/* Admin registration and login */}
            <Route exact path="/register">
              <AdminRegistration />
            </Route>
            <Route exact path="/login">
              <AdminLogin />
            </Route>

            {/* Admin shop registration */}
            <Route
              exact
              path="/adminshopregistration"
              component={AdminShopRegistration}
            />

            <Route exact path="/saalim">
              <AdminShopRegistration />
            </Route>
            <Route exact path="/editprofile">
              <EditAdminProfile />
            </Route>
            <Route exact path="/check">
              <Check />
            </Route>

            <Route
              path="/insideshop"
              render={(props) => <InsideShop {...props} />}
            />

            <Route exact path="/insideshop/">
              <InsideShop props={adminsData} />
            </Route>

            <Route exact path="/viewproduct" component={Viewproduct} />

            <Route exact path="/dashboard" component={AdminDashboard} />

            <Route exact path="/chats" component={Chat} />

            <Route exact path="/product-requests" component={ProductRequests} />

            <Route exact path="/superadmin">
              <Products adminsData={adminsData} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
