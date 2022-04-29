import { useState } from "react";
import "./AdminRegistration.css";
import { useHistory, Link } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import signup from "../../api/auth";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { linearLoading } from "../../helpers/loading";

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  const history = useHistory();

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    }
    else if (!firstName.match(/^[A-Za-z]+$/)) {
      setFormData({
        ...formData,
        errorMsg: "name should contain only alphabets",
      });
    }
    else if (!lastName.match(/^[A-Za-z]+$/)) {
      setFormData({
        ...formData,
        errorMsg: "name should contain only alphabets",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "invalid email",
      });
    } else if (!equals(password, confirmPassword)) {
      setFormData({
        ...formData,
        errorMsg: "password and confirm password do not match",
      });
    } else {
      const { firstName, lastName, email, password } = formData;
      const adminRegistrationInfo = { firstName, lastName, email, password };

      setFormData({
        ...formData,
        loading: true,
      });

      try {
        signup(adminRegistrationInfo).then((response) => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",

            loading: false,

            successMsg: response.data.successMessage,
            errorMsg: response.data.errorMessage,
          });

          setTimeout(() => {
            history.push("/login");
          }, 2000)
          
        });
      } catch (error) {
        console.log("axios error", error);
        setFormData({
          ...formData,
          loading: false,
          errorMsg: "Internal server error",
        });
      }
    }
  };

  return (
    <div className="admin-registration-body">
      <div className="admin-registration-form">
        {loading && linearLoading()}
        {successMsg && showSuccessMsg(successMsg)}
        {errorMsg && showErrorMsg(errorMsg)}

        <form onSubmit={submitHandler} noValidate>
          <div className="admin-registration-single-line-form-control-parent">
            <div className="admin-registration-single-line-form-control">
              <input
                className="margin-left-0"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={formHandler}
                value={firstName || ""}
              />
            </div>

            <div className="admin-registration-single-line-form-control">
              <input
                className="margin-left-10-per"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={formHandler}
                value={lastName || ""}
              />
            </div>
          </div>

          <div className="admin-registration-form-control">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formHandler}
              value={email}
            />
            <br />
          </div>

          <div className="admin-registration-form-control">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formHandler}
              value={password || ""}
            />
            <br />
          </div>

          <div className="admin-registration-form-control">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={formHandler}
              value={confirmPassword || ""}
            />
            <br />
          </div>

          <button className="admin-registration-btn" type="submit">
            Login
          </button>

          <p className="text">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login here
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminRegistration;
