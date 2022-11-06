import React, { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const herokuURL = "http://localhost:7000/api";
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  const register = (userData) => {
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

  const getNews = async (name) => {
    let url;
    if (name === "Apple") {
      url =
        "https://newsapi.org/v2/everything?q=apple&from=2022-11-05&to=2022-11-05&sortBy=popularity&apiKey=6f5d1be9083649d18dfcddf7acc37da0";
    } else if ((name === "Tesla")) {
      url =
        "https://newsapi.org/v2/everything?q=tesla&from=2022-10-06&sortBy=publishedAt&apiKey=6f5d1be9083649d18dfcddf7acc37da0";
    } else if ((name === "Us")) {
      url =
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6f5d1be9083649d18dfcddf7acc37da0";
    } else if ((name === "Top Headlines")) {
      url =
        "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=6f5d1be9083649d18dfcddf7acc37da0";
    } else {
      url =
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=6f5d1be9083649d18dfcddf7acc37da0";
    }
    console.log(url);
   await axios.get(url).then(res=>{
      setNews(res.data.articles);
    });
  };
  useEffect(()=>{
    // getNews();
  })

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
        const obj = {
          username: value.user.displayName,
          email: value.user.email,
          isGoogleLoggedIn: true,
        };
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
        if (value.user.email === null) {
          value.user.email = value.user.displayName + "@gmail.com";
        }
        const obj = {
          username: value.user.displayName,
          email: value.user.email,
          isGoogleLoggedIn: true,
        };
        loginUser(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <APIContext.Provider
      value={{ register, loginUser, signInWithGoogle, signInWithGitHub, news , getNews}}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
