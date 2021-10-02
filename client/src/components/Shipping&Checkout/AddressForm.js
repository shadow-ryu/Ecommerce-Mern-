import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button, Select } from "@material-ui/core";
import { getmyaddress } from "../../Redux/Actions/UseraddressAction";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { savemyaddress } from "../../Redux/Actions/addressAction";

export default function AddressForm() {
  const [newAdress, setNewAdress] = useState(false);
  const [saveNewAdress, setSaveNewAdress] = useState(false);
  const [close, setClose] = useState(false);
  const { address } = useSelector((state) => state.addressReducers);
  const [selected, setSelected] = useState(false);
  // const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getmyaddress());
  }, [dispatch]);
  const { register, handleSubmit } = useForm();
  const newadress = () => {
    setNewAdress(!newAdress);
  };
  const newadresclose = () => {
    setNewAdress(false);
    setSelected(false);
  };
  const onSubmit = (data) => {
    dispatch(savemyaddress(data));
    setNewAdress(false);
    setClose(true);
    // console.log(data);
  };

  const onSubmitold = (data) => {
    let id = data;
    // console.log(data);
    dispatch(savemyaddress(id));
    setSaveNewAdress(false);
    setNewAdress(false);
    setClose(true);
    setSelected(true);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      {close ? (
        "click next to next form"
      ) : (
        <>
          {selected ? (
            ""
          ) : (
            <Button onClick={newadress} style={{ margin: "25px" }}>
              new adress
            </Button>
          )}

          {saveNewAdress && !newAdress ? (
            <p style={{ margin: "5px", color: "green" }}>
              new address save plz click next to procced
            </p>
          ) : (
            ""
          )}
          {!newAdress ? (
            <form onSubmit={handleSubmit(onSubmitold)}>
              <label>Choose a Address</label>
              <Select
                native
                {...register("addressId", { required: true })}
                fullWidth
              >
                <option aria-label="None" value="" />
                {address?.adress?.map((address) => (
                  <option value={address._id} key={address._id} aria-label="">
                    {address.address}, {address.address}, {address.address}
                  </option>
                ))}
              </Select>
              {selected ? (
                ""
              ) : (
                <Button type="submit" className="btn btn-">
                  select this address
                </Button>
              )}
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    {...register("firstName", { required: true })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    {...register("lastName", { required: true })}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    label="Address line"
                    fullWidth
                    {...register("address", { required: true })}
                    autoComplete="shipping address-line1"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    {...register("city", { required: true })}
                    autoComplete="shipping address-level2"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    {...register("zip", { required: true })}
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type="number"
                    label="contact_no"
                    fullWidth
                    {...register("contact_no", { required: true })}
                    autoComplete="shipping contact_no"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    {...register("country", { required: true })}
                    autoComplete="shipping country"
                  />
                </Grid>
                <Grid item xs={12}>
                  save this address for payment details and then click next
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "25px" }}
              >
                Save
              </Button>
              <Button
                onClick={newadresclose}
                variant="contained"
                color="primary"
                style={{ marginTop: "25px", marginLeft: "10px" }}
              >
                back
              </Button>
            </form>
          )}
        </>
      )}
    </React.Fragment>
  );
}
