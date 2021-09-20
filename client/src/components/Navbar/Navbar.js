import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";

import * as actionType from "../../constants/ActionTypes";
import Badge from "@material-ui/core/Badge";
import { styled } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import logo from "./logo.png";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import decode from "jwt-decode";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar, Link } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import "./navbar.css";
import { userCart } from "./../../Redux/Actions/cartActions";
import SideBar from "./Sidebar";
import { useHistory, useLocation } from "react-router";
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [sideBar, setSideBar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");
    setAnchorEl(null);
    setUser(null);
    setUser(null);
  };
  const toggle = () => {
    setSideBar(!sideBar);
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 18,
      fontSize: "10px",
      color: "white",
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 2px",
    },
  }));
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
  const handleSingIn = () => {
    history.push("/auth");
    setAnchorEl(null);
  };
  const myorder = () => {
    history.push("/myOrder");
    setAnchorEl(null);
  };
  const myProfile = () => {
    history.push("/myProfile");
    setAnchorEl(null);
  };

  const home = () => {
    history.push("/");
    setAnchorEl(null);
  };
  const cart = () => {
    history.push("/mycart");
    setAnchorEl(null);
  };
  const token = user?.token;
  useEffect(() => {
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
      {sideBar ? <SideBar toggle={toggle} /> : ""}
      <div className="menutoggle" onClick={toggle}>
        <MenuIcon />
      </div>

      <img
        className="navbar__logo"
        onClick={home}
        src={logo}
        alt=""
        height="50"
      />

      <div className="navbar__search">
        <input className="navbar__searchInput" type="text" />
        <SearchIcon className="navbar__searchIcon" />
      </div>

      <div className={"navbar__nav"}>
        <div className="navbar__hidden">
          <div className="navbar__option">
            <span className="navbar__optionLineOne">Hello </span>

            <span className="navbar__optionLineTwo">
              {!user ? "Guest" : user?.user.name}
            </span>
          </div>
        </div>
      </div>

      <div className="navbar__optionBasket1" onClick={cart}>
        <IconButton aria-label="cart">
          <StyledBadge
            badgeContent={carts ? carts?.cartItems?.length : 0}
            style={{ color: "white" }}
          >
            <ShoppingCartOutlinedIcon style={{ fontSize: 30 }} />
          </StyledBadge>
        </IconButton>
        {/* <ShoppingCartOutlinedIcon  />
          <span className="navbar__optionLineTwo navbar__basketCount1">
            {carts ? carts?.cartItems?.length : 0}
          </span> */}
      </div>

      <div className="navbar__hidden">
        <Button
          className="avtar1"
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
          {user?.user ? (
            <div>
              <MenuItem onClick={myProfile}>Profile</MenuItem>

              <MenuItem onClick={myorder}>orders</MenuItem>

              <MenuItem onClick={logout}>Logout</MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem onClick={handleSingIn}>Sign In</MenuItem>

              <MenuItem onClick={myProfile}>Profile</MenuItem>

              <MenuItem onClick={handleClose}>Orders</MenuItem>
            </div>
          )}
        </Menu>
      </div>
      <div className="mibileview">
        <Link to="/mycart">
          <div className="navbar__optionBasket" aria-label="cart">
            <StyledBadge
              badgeContent={carts ? carts?.cartItems?.length : 0}
              style={{ color: "white" }}
            >
              <ShoppingCartOutlinedIcon style={{ fontSize: 30 }} />
            </StyledBadge>
          </div>
        </Link>
        {/* <div className="navbar__avatar">
          <Avatar
            alt={user?.user.name}
            className="avatar"
            src={user?.user.imageUrl}
          >
            {user?.user.name.charAt(0)}
          </Avatar>
        </div> */}
      </div>

      <div className="navbar2__search">
        <input className="navbar2__searchInput" type="text" />
        <SearchIcon className="navbar2__searchIcon" />
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
