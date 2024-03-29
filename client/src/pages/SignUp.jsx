import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Message } from "rsuite";
import OAuth from "../components/OAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormdata] = React.useState({});
  const [response, setResponse] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleShowPasswordToggle = () => {
    setShowPassword(state => !state);
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const handlePasswordCheck = () => {
    let reqPassword = document.getElementById("required_password");
    let password = document.getElementById("password");
    if (reqPassword.value === password.value) {
      reqPassword.style.border = '5px solid green'
    }else{
      reqPassword.style.border = '5px solid red'
    }
  };

  const handleOnChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setResponse(data.message);
      }
      setLoading(false);
      setResponse(data.message);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="signinsignupform">
      <div className="p-3 max-w-lg mx-auto mt-10 sm:mt-20 bg-[#2BAE66] border rounded-lg">
        <h1 className="text-2xl text-[#FCF6F5] text-center font-semibold my-7">
          Sign Up
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border p-3 rounded-lg outline-none"
            id="username"
            type="text"
            placeholder="username"
            onChange={handleOnChange}
          />
          <input
            className="border p-3 rounded-lg outline-none"
            id="email"
            type="email"
            placeholder="email"
            onChange={handleOnChange}
          />
          <input
            className="border p-3 rounded-lg outline-none"
            id="password"
            type="password"
            placeholder="password"
            onChange={handleOnChange}
          />
          <input
            className="border p-3 rounded-lg outline-none"
            id="required_password"
            type="password"
            placeholder="verify password"
            onKeyUp={handlePasswordCheck}
          />
          {formData.password ? (
            <div className="relative">
              <span
                className="absolute -top-28 sm:-top-28 left-72 sm:left-auto sm:right-1 text-[#2BAE66] text-2xl"
                onClick={handleShowPasswordToggle}
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          ) : null}
          {response.includes("Sucess") ? (
            <Message
              className="bg-[#FCF6F5] text-[#2BAE66] font-semibold"
              type="success"
              closable
            >
              User Created Sucessfully
            </Message>
          ) : response.includes("duplicate") ? (
            <Message
              className="bg-[#FCF6F5] text-red-600 font-semibold"
              type="error"
              closable
            >
              User exists with entered username or email
            </Message>
          ) : null}
          <button
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
            disabled={loading}
            type="submit"
          >
            {loading ? "Loading.." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-2">
          <p className="text-[#FCF6F5]">Already have an account?</p>
          <span className="text-[#FCF6F5] hover:underline">
            <Link to="/signin">login</Link>
          </span>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
