import React, { useState } from "react";
import "./Navbar.scss";
import { CiSearch } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";

const Navbar = ({ openModal, setSearchQuery }) => {
  return (
    <div className="container1">
      <div className="image">
        <img src="D.png" alt="" />
      </div>

      <div className="search">
        <div className="input">
          <CiSearch className="icon"></CiSearch>
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="btn">
        <button onClick={openModal}>
          <BsPlusLg className="icon"></BsPlusLg>
          <p>Create New Board</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
