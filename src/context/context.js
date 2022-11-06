import React, { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const herokuURL = "http://localhost:7000/api";
  const navigate = useNavigate();
//   const [userAuth, setUserAuth] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

  //post user
  const signUpUser = (userData) => {
    console.log(userData);
    try {
      axios
        .post(`${herokuURL}/register`, userData)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          window.alert(`Registeration Failed`);
        });
    } catch (error) {
      window.alert(error.message);
    }
  };

  //Login USER
  const loginUser = (loginData) => {
    axios
      .post(`${herokuURL}/login`, loginData)
      .then((res) => {
        console.log(res);
        const myToken = res.data.token;
        console.log(myToken);
        localStorage.setItem("token", myToken);
        navigate("/blogs");
        document.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const firebaseConfig = {
    apiKey: "AIzaSyDwQgybD0-khzuU6hn5snKM6Dhw9NrDacI",
    authDomain: "news-blog-app-4f4d1.firebaseapp.com",
    projectId: "news-blog-app-4f4d1",
    storageBucket: "news-blog-app-4f4d1.appspot.com",
    messagingSenderId: "341649365439",
    appId: "1:341649365439:web:60c8e803379ebb7c14290a",
    measurementId: "G-7BNJMKCNY0",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const gitprovider = new GithubAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((value) => {
        console.log(value);
        const obj={
          username:value.user.displayName,
          email:value.user.email,
          isGoogleLoggedIn:true
        }
        loginUser(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInWithGitHub = () => {
    signInWithPopup(auth, gitprovider)
      .then((value) => {
        console.log(value);
        if(value.user.email===null){
          value.user.email=value.user.displayName+"@gmail.com"
        }
        const obj={
          username:value.user.displayName,
          email:value.user.email,
          isGoogleLoggedIn:true
        }
        loginUser(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (<APIContext.Provider value={{ signUpUser, loginUser ,signInWithGoogle ,signInWithGitHub}}> {children} </APIContext.Provider>);
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
