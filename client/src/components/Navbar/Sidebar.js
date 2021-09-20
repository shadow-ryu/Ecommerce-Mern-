import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import CloseIcon from "@material-ui/icons/Close";

import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import { AccountCircleIcon } from "@material-ui/icons";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";

import { Link, useHistory, useLocation } from "react-router-dom";
import { Avatar } from "@material-ui/core";

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
    height: "160%",
  },
});

function SideBar(props) {
  const { classes, ...other } = props;
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

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
              <ListItemIcon className={classes.itemIcon}>
                <HomeIcon />
              </ListItemIcon>
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
              <ListItem button className={classes.item}>
                <ListItemIcon className={classes.itemIcon}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  My Profile
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/myOrder" className={classes.link} onClick={props.toggle}>
              <ListItem button className={classes.item}>
                <ListItemIcon className={classes.itemIcon}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  My Orders
                </ListItemText>
              </ListItem>
            </Link>

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
