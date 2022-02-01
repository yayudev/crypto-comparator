import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./modules/shared/user.context";
import { Navbar } from "./modules/navbar";
import { Login } from "./modules/login";
import { Comparator } from "./modules/comparator";

export const Router = () => {
  const { user } = useContext(UserContext);
  const showNavbar = user !== null;

  return (
    <BrowserRouter>
      {showNavbar && <Navbar />}

      <div className={`App-content ${!showNavbar ? "no-nav" : ""}`}>
        <Routes>
          <Route path="/compare/:coin" element={<Comparator />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
