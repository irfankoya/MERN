import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-300 px-10" >
      <div className="flex justify-between items-center h-11">
        <Link to="/">
          <h1 className="font-bold">MERN</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            {" "}
            <li className="font-semibold ml-4">Home</li>
          </Link>
          <Link to="/about">
            <li className="font-semibold ml-4">About</li>
          </Link>
          <Link to="/signin">
            <li className="font-semibold ml-4">Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
