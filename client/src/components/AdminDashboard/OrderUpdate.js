import { Controller, useFieldArray, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getproduct,
  updateProductById,
} from "../../Redux/Actions/productActions";
import { makeStyles } from "@material-ui/core/styles";

import {
  fetchsellerOrderById,
  updatellerOrderById,
} from "../../Redux/Actions/orderAction";

const useStyles = makeStyles({
  input: {
    width: 250,
    height: 35,
    outline: "none",

    borderBlockEndColor: "1px  solid grey",
    textDecoration: "none",
  },
});

export default function ProductForm(props) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      specs: [{ specName: "", specValue: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specs",
  });
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(updatellerOrderById(id, data, history));
  };

  const { id, update } = props;

  useEffect(() => {
    dispatch(fetchsellerOrderById(id));
  }, [id, reset, dispatch]);
  const { Order, isLoading } = useSelector((state) => state.OrderReducers);
  useEffect(() => {
    id && Order && reset(Order);
  }, [id, reset, Order]);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="5em" />
      </Paper>
    );
  }

  return (
    <Container>
      <div className={classes.contentWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" gutterBottom>
            Update Order
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    disabled
                    label="Order Id "
                    fullWidth
                    {...field}
                  />
                )}
                name={`_id`}
                control={control}
                defaultValue={""} // make sure to set up defaultValue
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Costumer Id "
                    disabled
                    fullWidth
                    {...field}
                  />
                )}
                name={`costumer`}
                control={control}
                defaultValue={""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Product Id "
                    disabled
                    fullWidth
                    {...field}
                  />
                )}
                name={`productID`}
                control={control}
                defaultValue={""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    disabled
                    label="Product Name "
                    {...field}
                  />
                )}
                name={`name`}
                control={control}
                defaultValue={""} // make sure to set up defaultValue
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Order Placed At "
                    disabled
                    fullWidth
                    {...field}
                  />
                )}
                name={`createdAt`}
                control={control}
                defaultValue={""}
              />
            </Grid>
            <Grid item>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Qty"
                    fullWidth
                    disabled
                    {...field}
                  />
                )}
                name={`qty`}
                control={control}
                defaultValue={""}
              />
            </Grid>
            <Grid item>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Cancelled"
                    required
                    disabled
                    fullWidth
                    {...field}
                  />
                )}
                name={`cancelled`}
                control={control}
                defaultValue={""}
              />
            </Grid>

            <Grid item>
              <Controller
                render={({ field }) => (
                  <>
                    <InputLabel id="demo-simple-select-label">
                      Delivered
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Delivered"
                      defaultValue={field.isDelivered}
                      {...field}
                    >
                      <MenuItem value={true}>yes</MenuItem>
                      <MenuItem value={false}>no</MenuItem>
                    </Select>
                  </>
                )}
                name={`isDelivered`}
                control={control}
                defaultValue={""}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="OrderTotal Price"
                    type="number"
                    disabled
                    fullWidth
                    {...field}
                  />
                )}
                name={`price`}
                control={control}
                defaultValue={""}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "25px" }}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}
