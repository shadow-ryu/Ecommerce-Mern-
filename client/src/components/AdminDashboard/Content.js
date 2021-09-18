import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Product from "../../components/Product/Product";

import ProductForm from "../Product Form/ProductForm";
import AssignmentIcon from "@material-ui/icons/Assignment";

import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
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

function Content(props) {
  const { classes } = props;
  const [newForm, setNewForm] = useState(false);

  const newporduct = () => {
    setNewForm(!newForm);
  };

  const { products, isLoading } = useSelector((state) => state.productReducers);

  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            {!newForm ? (
              <>
                <Grid item>
                  <SearchIcon className={classes.block} color="inherit" />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      className: classes.searchInput,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={newporduct}
                    className={classes.addUser}
                  >
                    {!newForm ? " Add Product " : "Back"}
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <AssignmentIcon className={classes.block} color="inherit" />
                </Grid>

                <Grid item xs>
                  <Typography variant="h5" component="h5">
                    Add Product Details
                  </Typography>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={newporduct}
                  className={classes.addUser}
                >
                  {!newForm ? " Add Product " : "Back"}
                </Button>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {newForm ? (
          <ProductForm />
        ) : (
          <>
            <Grid className container alignItems="stretch" spacing={3}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <Grid container alignItems="stretch" spacing={3}>
                    {products?.map((product) => (
                      <Grid key={product._id}>
                        <Product
                          id={product._id}
                          title={product.name}
                          price={product.price}
                          rating={product.rating}
                          image={product.image}
                          edit
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
          </>
        )}
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
