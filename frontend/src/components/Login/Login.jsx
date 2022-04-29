import React from "react";
import "./Login.css";

const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    .join("");
});

const Login = () => {
  return (
    <div className="body">
      <div className="conatainer">
        <h1>Please Login</h1>
        <form action="">
          <div className="form-control">
            <input type="text" required />
            <label htmlFor="">Email</label>
          </div>
          <div className="form-control">
            <input type="password" name="" id="" required />
            <label htmlFor="">Password</label>
          </div>
          <button className="login-btn">Login</button>
          <p className="text">
            Don't have an account?{" "}
            <a className="a" href="#">
              Register
            </a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
