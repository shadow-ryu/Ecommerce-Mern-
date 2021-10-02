import React from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto 10%",
    padding: "5%",
    fontSize: "25px",
    fontWeight: "bold",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
});

function Welcome(props) {
  const { classes } = props;
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  if (user?.user.role === "user" || user === null) {
    history.push("/");
  }
  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        <Grid container alignItems="stretch" spacing={3}>
          {user?.user.role === "admin"
            ? "Welcome to Admin Dashboard"
            : user?.user.role === "seller"
            ? " Welcome to Seller Dashboard"
            : ""}
        </Grid>
      </div>
    </Paper>
  );
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);
