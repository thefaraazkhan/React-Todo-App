/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./AdminLogin.css";
import axios from "axios";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { Link, useHistory } from "react-router-dom";
import { linearLoading } from "../../helpers/loading";
import { showErrorMsg } from "../../helpers/message";
import { signin } from "../../api/auth";
import { setAuthentication, isAuthenticated } from "../../helpers/auth";
import { API_URL } from "../../config";
import { getAdminShopAPI } from "../../api/adminShopRegisterApi";
import { createBrowserHistory } from 'history';

const AdminLogin = () => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().isAdmin === true) {
      const fetchAdminShop = async () => {
        const getAdminFromLS = JSON.parse(localStorage.getItem("admin"));
        const { _id } = getAdminFromLS;

        const response = await axios.get(`${API_URL}/api/adminShop/${_id}`);
      };

      fetchAdminShop();
    }
  }, []);

  //useState
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });

  //destructure
  const { email, password, errorMsg, loading } = formData;

  const fn = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: "",
    });
  };

  const submit = async (e) => {
    try {
      e.preventDefault();

      if (isEmpty(email) || isEmpty(password)) {
        setFormData({
          ...formData,
          errorMsg: "All fields are required",
        });
      } else if (!isEmail(email)) {
        setFormData({
          ...formData,
          errorMsg: "invalid email",
        });
      } else {
        const { email, password } = formData;
        const adminLoginInfo = { email, password };

        setFormData({
          ...formData,
          loading: true,
        });

        signin(adminLoginInfo).then((response) => {
          if (response.data.token && response.data.admin) {
            setAuthentication(response.data.token, response.data.admin);
          }

          if (isAuthenticated() && isAuthenticated().isAdmin === true && isAuthenticated().isSuperAdmin === false) {
            const fetchAdminShop = async () => {
              const getAdminFromLS = JSON.parse(localStorage.getItem("admin"));
              const { _id } = getAdminFromLS;
              getAdminShopAPI(_id).then(res => {
                console.log("fee", res.data)
                const shopIsRegistered = res.data;
                shopIsRegistered
                  ? history.push("/dashboard")
                  : history.push({ pathname: "/adminshopregistration" });
                window.location.reload(false);
              });
            };

            fetchAdminShop();
          } else if (isAuthenticated() && isAuthenticated().isAdmin === true && isAuthenticated().isSuperAdmin === true) {
            const fetchAdminShop = async () => {
              const getAdminFromLS = JSON.parse(localStorage.getItem("admin"));
              const { _id } = getAdminFromLS;
              getAdminShopAPI(_id).then(res => {
                console.log("fee", res.data)
                const shopIsRegistered = res.data;
                shopIsRegistered
                  ? history.push("/superadmin")
                  : history.push("/adminshopregistration");
              });
            };

            fetchAdminShop();
          } else {
            setFormData({
              ...formData,
              loading: true,
              errorMsg: response.data.errorMessage,

            });
          }
        });
      }
    } catch (error) {
      console.log("axios error", error);
      setFormData({
        ...formData,
        loading: false,
        errorMsg: "Internal server error",
      });
    }
  };

  return (
    <div className="admin-login-body">
      <div className="admin-login-form">
        {loading && linearLoading()}
        {errorMsg && showErrorMsg(errorMsg)}

        <h1>Login</h1>

        <form onSubmit={submit} noValidate>
          <div className="form-control-login">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={fn}
              value={email}
            />
            <br />
          </div>

          <div className="form-control-login">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={fn}
              value={password || ""}
            />
            <br />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>

          <p className="register-here">
            Do not have an account?{" "}
            <Link
              className="admin-registration-link link"
              to="/register"
            >
              Register here
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
