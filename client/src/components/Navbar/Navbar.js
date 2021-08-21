import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";

import * as actionType from "../../constants/ActionTypes";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import logo from "./logo.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import decode from "jwt-decode";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar } from "@material-ui/core";

import { useDispatch } from "react-redux";

import "./navbar.css";

const Navbar = () => {
  const userdata = JSON.parse(localStorage.getItem("profile"));
  const [user, setUser] = useState(userdata);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");
    setAnchorEl(null);
    setUser(null);
  };
  const token = user?.token;
  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    // <img classNamr="navbar__logo" src={logo} alt="" />
    <div className="navbar">
      <Link to="/">
        <img className="navbar__logo" src={logo} alt="" height="50" />
      </Link>

      <div className="navbar__search">
        <input className="navbar__searchInput" type="text" />
        <SearchIcon className="navbar__searchIcon" />
      </div>

      <div className={"navbar__nav"}>
        <div className="navbar__hidden">
          <div onClick className="navbar__option">
            <span className="navbar__optionLineOne">Hello </span>

            <span className="navbar__optionLineTwo">
              {!user ? "Guest" : user?.user.name}
            </span>
          </div>
        </div>
      </div>
      <Link to="/checkout">
        <div className="navbar__optionBasket">
          <ShoppingBasketIcon />
          <span className="navbar__optionLineTwo navbar__basketCount">1</span>
        </div>
      </Link>

      {user ? (
        <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar alt={user?.user.name} src={user?.user.imageUrl}>
              {user?.user.name.charAt(0)}
            </Avatar>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>

            <MenuItem onClick={handleClose}>orders</MenuItem>

            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Link to="/auth">
          <Button variant="contained" color="primary">
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
