import React from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

import { useState } from "react";

import "./SignUp.css"

import LandingBase from "../../components/Base/LBase/LandingBase";

const signUpValidation = yup.object({
  firstname: yup.string().required("Enter Your First Name"),
  lastname: yup.string().required("Enter Your Last Name"),
  email: yup.string().required("Enter a Email"),
  password: yup.string().required("Enter Password"),
});

const SignUpPage = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const[logInButton,setLogInButton] = useState(false);
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
      validationSchema: signUpValidation,
      onSubmit: (user) => {
        addUser(user);
      },
    });

  const addUser = async (user) => {
    
    try {
      const response = await fetch("https://capstone-back-end-flame.vercel.app/signUp", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "SignedUp Successfully") {
        setLogInButton(true)
        history.push("/login")
       
      } else if (data.message === "Email already exist") {
        setShow(true);
      } else {
      }
    } catch (error) {
      console.log("Admin LogIn Error : ", error);
    }
  };

  return (

    <LandingBase>
    <div className="signUpPage">
 
        <div className="name-title-signUp">
          <h3 className="title-signUp-user">
          Indian Gold Vault
           
          </h3>
        </div>

      <div className="Sign_up">
      
        <h1 className="signup-title-2-user" >Register Here as User</h1>

        <form onSubmit={handleSubmit} className="form-signup-user">

        <div className="input-div input1">
                <label class="textlabel" for="firstname">First Name</label>
                <input
              className="input-signUp-user"
              placeholder="First Name"
              type="text"
              id="firstName"
              name="firstname"
              onChange={handleChange}
              value={values.firstname}
              onBlur={handleBlur}
            ></input>
            </div>
         
          


           <div className="input-div input2">
                <label class="textlabel" htmlFor="lastname">Last Name</label>
                <input
              className="input-signUp-user"
              placeholder="Last Name"
              type="text"
              id="lastName"
              name="lastname"
              onChange={handleChange}
              value={values.lastname}
              onBlur={handleBlur}
            ></input>
            </div>
          <div>
            
          </div>
         { errors.firstname && touched.firstname ||errors.lastname && touched.lastname ?
         <div className="row">
            <div className="col">
            {errors.firstname && touched.firstname ? (
            <h6 style={{ color: "red" }}>{errors.firstname}</h6>
          ) : (
            ""
          )}
            </div>
            <div className="col">
            {errors.lastname && touched.lastname ? (
            <h6 style={{ color: "red" }}>{errors.lastname}</h6>
          ) : (
            ""
          )}
            </div>
       

          
          </div>:""  }
         


<div className="input-div input3">
                <label class="textlabel" for="email">E.mail</label>
                <input
              className="input-signUp-user"
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            ></input>
            </div>
          {errors.email && touched.email ? (
            <h6 style={{ color: "red" }}>{errors.email}</h6>
          ) : (
            ""
          )}

           <div className="input-div input4">
                <label class="textlabel" for="password">Password</label>
            <input
              className="input-signUp-user"
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            ></input>
          </div>
          {errors.password && touched.password ? (
            <h6 style={{ color: "red" }}>{errors.password}</h6>
          ) : (
            ""
          )}

          {show ? (
            <h6 style={{ color: "red" }}>
              You have Already Signedup, login to enter
            </h6>
          ) : (
            ""
          )}
         
          <div className="remember">
            <input type="checkbox" name="" id=" remember"></input>
            <label htmlFor="remember" className="remember_label">
              I accept the terms & conditions
            </label>
            <button type="submit" className="login-btn">
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="foot">
        <p>
          This site is protected by reCAPTCHA and the Google
          <span>
            <a
              href="https://policies.google.com/privacy"
              target={"_blank"}
              rel={"noreferrer"}
            >
              Privacy Policy{" "}
            </a>
          </span>
          and{" "}
          <span>
            <a
              href="https://policies.google.com/terms"
              target={"_blank"}
              rel={"noreferrer"}
            >
              Terms of Condition{" "}
            </a>
          </span>{" "}
          apply.
        </p>
        <hr></hr>
        <div className="footer_Newuser">
          <p>
            Already have an account?{" "}
            <p
              onClick={() => {
                history.push("/logIn");
              }}
              className="sup-login"
            >
              Sign in !
            </p>
          </p>
        </div>
      </div>
    </div>
    </LandingBase>
  );
};

export default SignUpPage;
