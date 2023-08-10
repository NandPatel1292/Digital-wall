import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoChevronBackSharp } from "react-icons/io5";
import "./NavbarPost.scss";
import { Navigate, useNavigate } from "react-router-dom";

const NavbarPost = ({ title, setSearchQuery }) => {
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <div className="left">
        <div className="back">
          <IoChevronBackSharp size={25} onClick={() => navigate(-1)} />
        </div>
        <div className="img">
          <img src="\logo1.png" alt="" />
        </div>
        <div className="text">{title}</div>
      </div>

      <div className="search">
        <div className="ip">
          <CiSearch className="icon"></CiSearch>
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarPost;
