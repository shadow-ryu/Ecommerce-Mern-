import { Controller, useFieldArray, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getproduct,
  updateProductById,
} from "../../Redux/Actions/productActions";
import { makeStyles } from "@material-ui/core/styles";

import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  input: {
    width: 250,
    height: 35,
    outline: "none",

    borderBlockEndColor: "1px  solid grey",
    textDecoration: "none",
  },
});

export default function ProductForm(prop) {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      defaultValues: {
        specs: [{ specName: "", specValue: "" }],
      },
    }
  );
  const { fields, append, remove, swap, move, insert } = useFieldArray({
    control,
    name: "specs",
  });
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(updateProductById(id, data, history));
  };

  const { id, update } = prop;

  useEffect(() => {
    dispatch(getproduct(id));
  }, [id, reset, dispatch]);
  const { product, isLoading } = useSelector((state) => state.productReducers);
  useEffect(() => {
    id && product && reset(product);
  }, [id, reset, product]);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Container>
      <div className={classes.contentWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" gutterBottom>
            Product
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Product Name "
                    required
                    {...field}
                  />
                )}
                name={`name`}
                control={control}
                defaultValue={""} // make sure to set up defaultValue
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Product Brand "
                    required
                    {...field}
                  />
                )}
                name={`brand`}
                control={control}
                defaultValue={""}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Product image "
                    required
                    fullWidth
                    {...field}
                  />
                )}
                name={`image`}
                control={control}
                defaultValue={""}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Product Short Description "
                    required
                    fullWidth
                    {...field}
                  />
                )}
                name={`description`}
                control={control}
                defaultValue={""}
              />
            </Grid>

            <Grid item>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Category"
                    required
                    fullWidth
                    {...field}
                  />
                )}
                name={`category`}
                control={control}
                defaultValue={""}
              />
            </Grid>
            <Grid item>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="countInStock"
                    type="number"
                    required
                    fullWidth
                    {...field}
                  />
                )}
                name={`countInStock`}
                control={control}
                defaultValue={""}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Product Price"
                    type="number"
                    required
                    fullWidth
                    {...field}
                  />
                )}
                name={`price`}
                control={control}
                defaultValue={""}
              />
            </Grid>
            <Container>
              <Typography variant="h6" gutterBottom>
                {" "}
                Product specs{" "}
              </Typography>

              {fields.map((item, index) => (
                <>
                  <Grid container spacing={4} key={item.id}>
                    <Grid item xs={4}>
                      <Controller
                        render={({ field }) => (
                          <TextField variant="outlined" required {...field} />
                        )}
                        name={`specs.${index}.specName`}
                        control={control}
                        defaultValue={""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        render={({ field }) => (
                          <TextField variant="outlined" required {...field} />
                        )}
                        name={`specs.${index}.specValue`}
                        control={control}
                        defaultValue={""}
                      />
                    </Grid>
                    <Grid
                      xs={3}
                      style={{
                        margin: "5px",
                        padding: "15px",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        aria-label="Delete"
                        onClick={() => remove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </>
              ))}
              <Grid
                xs={3}
                style={{
                  margin: "5px",
                  padding: "15px",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  aria-label="Add"
                  onClick={() => append({ name: "", value: "" })}
                >
                  Add specs <AddBoxIcon />
                </IconButton>
              </Grid>
            </Container>
          </Grid>
          {update ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "25px" }}
            >
              Update
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "25px" }}
            >
              submit
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}
