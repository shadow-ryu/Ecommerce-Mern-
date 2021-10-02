import { Controller, useFieldArray, useForm } from "react-hook-form";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button, Container, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createProduct } from "../../Redux/Actions/productActions";

import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";

export default function ProductForm(prop) {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      specs: [{ specName: "", specValue: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specs",
  });

  const dispatch = useDispatch();
  const router = useHistory();
  const onSubmit = (data) => {
    dispatch(createProduct(data, router));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Product
        </Typography>
        <Grid container spacing={3}>
          <Grid item={true} xs={12} sm={6}>
            <Controller
              render={({ field }) => (
                <TextField variant="outlined" required {...field} />
              )}
              name={`name`}
              control={control}
              defaultValue={""} // make sure to set up defaultValue
            />
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              name="brand"
              label="Product Brand "
              fullWidth
              {...register("brand", { required: true })}
            />
          </Grid>

          <Grid item={true} xs={12}>
            <TextField
              variant="outlined"
              name="image"
              label="Product Image"
              fullWidth
              {...register("image", { required: true })}
            />
          </Grid>
          <Grid item={true} xs={12}>
            <TextField
              variant="outlined"
              name="description"
              label="Product description"
              fullWidth
              {...register("description", { required: true })}
            />
          </Grid>
          <Grid item={true}>
            <TextField
              variant="outlined"
              required
              name="category"
              label="Category"
              fullWidth
              {...register("category", { required: true })}
            />
          </Grid>
          <Grid item={true}>
            <TextField
              label="Product In Stock"
              name="countInStock"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              {...register("countInStock", { required: true })}
            />
          </Grid>
          <Grid item={true} xs={12} sm={5}>
            <TextField
              label="Product Price"
              name="price"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              {...register("price", { required: true })}
            />
          </Grid>
          <Container>
            <Typography variant="h6" gutterBottom>
              {" "}
              Product specs{" "}
            </Typography>

            {fields.map((item, index) => (
              <Grid key={item.id}>
                <Grid container spacing={4} key={item.id}>
                  <Grid item={true} xs={4}>
                    <Controller
                      render={({ field }) => (
                        <TextField variant="outlined" required {...field} />
                      )}
                      name={`specs.${index}.specName`}
                      control={control}
                      defaultValue={""}
                    />
                  </Grid>
                  <Grid item={true} xs={4}>
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
              </Grid>
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "25px" }}
        >
          submit
        </Button>
      </form>
    </Container>
  );
}
