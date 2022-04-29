import React from "react";
import ReactDom from "react-dom";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";

import * as yup from "yup";
import classes from "./AddURLModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onconfirm} />;
};

const ModalOverlay = (props) => {
  const schema = yup.object().shape({
    fullUrl: yup.string().required("full url is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data, event) => {
    event.preventDefault();
    const fullUrl = data.fullUrl;

    const token = Cookies.get("jwt");
    const userId = localStorage.getItem("userId");

    fetch(
      "https://shortly-urlshortner-backend.herokuapp.com/api/v1/urlShortner/createUrl",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-Type": "application/json",
        },
        body: JSON.stringify({ fullUrl, userId }),
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
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className={classes.modal}>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={classes.textField}>
          <TextField
            name="fullUrl"
            id="outlined-basic"
            label="Full Url"
            variant="outlined"
            margin="normal"
            style={{ width: 250 }}
            {...register("fullUrl", { required: true })}
          />
          <p className={classes.error}>{errors.fullUrl?.message}</p>
        </div>
        <div className={classes.btn}>
          <button type="submit" onClick={props.onConfirm}>
            Post Url
          </button>
        </div>
      </form>
    </div>
  );
};

const AddURLModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onconfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <ModalOverlay onconfirm={props.onConfirm} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default AddURLModal;
