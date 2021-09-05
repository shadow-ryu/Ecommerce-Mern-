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

import { useDispatch, useSelector } from "react-redux";

import "./navbar.css";
import { userCart } from "./../../Redux/Actions/cartActions";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");
    setAnchorEl(null);
    setUser(null);
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = user?.token;
  useEffect(() => {
    dispatch(userCart());
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);
  const { carts } = useSelector((state) => state.cartReducer);

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
      <Link to="/mycart">
        <div className="navbar__optionBasket">
          <ShoppingBasketIcon />
          <span className="navbar__optionLineTwo navbar__basketCount">
            {carts ? carts?.cartItems?.length : 0}
          </span>
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
