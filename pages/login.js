import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import Error from "../components/Layout/Error";
import { login } from "../store/actions/authActions";
import Loader from "../components/Layout/Loader";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    width: "45%",
    height: "60vh",
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 2px 12px 0 rgba( 255, 255, 255, 0.2 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "999",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { userReducer, alert } = useSelector((state) => state);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values.email, values.password));
  };
  return (
    <Card className={classes.loginContainer}>
      <h1 style={{ marginLeft: "20px" }}>Login</h1>
      {alert.error && <Error errorMessage={error} />}
      <CardContent>
        <TextField
          id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          variant="outlined"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
          variant="outlined"
        />
        <CardActions style={{ padding: "8px 0px" }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={classes.submit}
          >
            {userReducer.loading ? <Loader /> : "Submit"}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = await parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default Login;
