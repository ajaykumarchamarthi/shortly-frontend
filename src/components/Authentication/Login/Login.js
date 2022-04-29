import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./Login.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../../../store/auth-context";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8, "Password must be atleast 8 Characters long!"),
});

function Login() {
  const authCtx = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const submitHandler = (data, event) => {
    event.preventDefault();

    const email = data.email;
    const password = data.password;

    fetch(
      "https://shortly-urlshortner-backend.herokuapp.com/api/v1/users/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = `${data.message}`;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        alert(data.status);
        alert(data.status);
        authCtx.login(data.token);
        localStorage.setItem("userId", data.data.user._id);
        history.replace("/dashboard");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.container}>
      <p className={classes.credentials}>
        User Credentials - ajayaj0302@gmail.com & ajayaj0302
      </p>
      <div className={classes.title}>
        <h3 className={classes.title}>Login</h3>
      </div>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <div>
          <TextField
            id="outlined-basic"
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            style={{ width: 300 }}
            {...register("email", { required: true })}
          />
          <p className={classes.error}>{errors.email?.message}</p>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Password"
            name="password"
            variant="outlined"
            margin="normal"
            style={{ width: 300 }}
            type="password"
            {...register("password", { required: true })}
          />
          <p className={classes.error}>{errors.password?.message}</p>
        </div>
        <div className={classes.btn}>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </div>
        <hr className={classes.line} />
        <div className={classes.options}>
          <p className={classes.optionsHeading}>Forgot Password?</p>
          <p className={classes.optionsText}>
            <span onClick={() => history.replace("/forgotPassword")}>
              Click here
            </span>{" "}
            to reset your password
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
