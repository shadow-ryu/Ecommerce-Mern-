import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import decode from "jwt-decode";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";

import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import * as actionTypes from "../../constants/ActionTypes";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Avatar, Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: "#131921",
  },
  categoryHeaderPrimary: {
    backgroundColor: "#131921",
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    backgroundColor: "#131921",
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
  },
  linkItem: {
    paddingTop: 1,
    backgroundColor: "#131921",
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#131921",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
    backgroundColor: "#131921",
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemLink: {
    textDecoration: "none",
  },
  itemIcon: {
    minWidth: "auto",
    color: "white",
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  crossIcon: {
    marginLeft: "15px",
    alignItems: "center",
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#131921",
    justifyContent: "center",
  },
  space: {
    backgroundColor: "#131921",
    height: "90%",
  },
});

function SideBar(props) {
  const { classes, ...other } = props;
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });

    history.push("/auth");

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
  return (
    <div style={{ backgroundColor: "#131921" }}>
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem
            className={clsx(
              classes.firebase,
              classes.item,
              classes.itemCategory
            )}
          >
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Dragon Shop
            </ListItemText>

            <ListItemIcon className={classes.crossIcon} onClick={props.toggle}>
              <CloseIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem className={clsx(classes.item, classes.itemCategory)}>
            <ListItemIcon className={classes.itemIcon}>
              <Avatar alt={user?.user.name} src={user?.user.imageUrl}>
                {user?.user.name.charAt(0)}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              {!user ? "Guest" : user?.user.name}
            </ListItemText>
          </ListItem>

          <ListItem className={clsx(classes.item, classes.itemCategory)}>
            <Link to="/" className={classes.link} onClick={props.toggle}>
              <ListItemIcon className={classes.itemIcon}></ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
                Home
              </ListItemText>
            </Link>
          </ListItem>

          <React.Fragment>
            <Link
              to="/myProfile"
              className={classes.link}
              onClick={props.toggle}
            >
              <ListItem button className={classes.linkItem}>
                <ListItemIcon className={classes.itemIcon}></ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  My Profile
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/myBills" className={classes.link} onClick={props.toggle}>
              <ListItem button className={classes.linkItem}>
                <ListItemIcon className={classes.itemIcon}></ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  My Bills
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/myOrder" className={classes.link} onClick={props.toggle}>
              <ListItem button className={classes.linkItem}>
                <ListItemIcon className={classes.itemIcon}></ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  My Orders
                </ListItemText>
              </ListItem>
            </Link>

            <ListItem
              className={clsx(
                classes.item,

                classes.itemCategory
              )}
            >
              {user?.user ? (
                <>
                  <ListItem button onClick={logout} className={classes.item}>
                    <ListItemIcon className={classes.itemIcon}></ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.itemPrimary,
                      }}
                    >
                      LogOut
                    </ListItemText>
                  </ListItem>
                </>
              ) : (
                <Link
                  to="/auth"
                  className={classes.link}
                  onClick={props.toggle}
                >
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    Sign In
                  </ListItemText>
                </Link>
              )}
            </ListItem>
            {/* <Divider className={classes.divider} /> */}
          </React.Fragment>
          <div className={classes.space}></div>
        </List>
      </Drawer>
    </div>
  );
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);
