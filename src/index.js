import React from "react";
import ReactDOM from "react-dom/client";
import { APIContextProvider } from "./context/context";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./style.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Blogs from "./components/Blogs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <APIContextProvider>
        <Routes>
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/" />
          <Route element={localStorage.getItem("token") ? (<Blogs />) : (<Navigate replace to={"/"} />)} path="/blogs"/>
        </Routes>
      </APIContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
