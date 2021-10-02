import React from "react";
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

import { Link } from "react-router-dom";

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    fontSize: "inherit",
    FontWeight: "bold",
  },
  itemLink: {
    textDecoration: "none",
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          Admin dashboard
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Overview
          </ListItemText>
        </ListItem>

        <React.Fragment>
          <ListItem className={classes.categoryHeader}></ListItem>

          <Link
            to="/admin/myproduct"
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ListItem button className={classes.item}>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
                Product
              </ListItemText>
            </ListItem>
          </Link>
          <Link
            to="/admin/orders"
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ListItem button className={classes.item}>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
                Orders
              </ListItemText>
            </ListItem>
          </Link>

          {user?.user.role === "admin" ? (
            <>
              <Link
                to="/admin/allsellerD"
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ListItem button className={classes.item}>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    All Seller Details
                  </ListItemText>
                </ListItem>
              </Link>
              <Link
                to="/admin/alluserD"
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ListItem button className={classes.item}>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    All User Details
                  </ListItemText>
                </ListItem>
              </Link>
            </>
          ) : (
            ""
          )}
          <Divider className={classes.divider} />
        </React.Fragment>
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
