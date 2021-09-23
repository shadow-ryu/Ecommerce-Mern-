//
import React, { useState } from "react";

import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Select,
  MenuItem,
} from "@material-ui/core";
import { signin, signup } from "../../Redux/Actions/AuthActions";

import { useDispatch } from "react-redux";
import useStyles from "./styles";
import Input from "../../components/Input/Input";
import { useHistory } from "react-router";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

const SignupOrSigninScreen = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [err, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (form.password.length > 6) {
        if (form.password === form.confirmPassword) {
          dispatch(signup(form, history));
          setError("");
        } else {
          setError("plz check both pass");
        }
      } else {
        setError("password is small minimum 6 letter ");
      }
      //
    } else {
      dispatch(signin(form, history));
    }
  };

  const [role, setRole] = React.useState("user");

  const handlerole = (event) => {
    setRole(event.target.value);
    form.role = role;
    console.log(form.role);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Login in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />

                <div style={{ margin: "5px 15px" }}>
                  <h6 style={{ margin: "5px" }}>Select a Role</h6>
                  <input
                    onChange={handleChange}
                    type="radio"
                    value="user"
                    name="role"
                  />{" "}
                  Customer
                  <input
                    onChange={handleChange}
                    type="radio"
                    value="seller"
                    name="role"
                  />{" "}
                  Seller
                </div>
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {err ? (
              <p style={{ color: " red", fontSize: "10px", margin: "0 15px" }}>
                {err}
              </p>
            ) : (
              ""
            )}
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Login In"}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupOrSigninScreen;
