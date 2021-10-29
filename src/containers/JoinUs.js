import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
import Drawer from "../components/Drawer/index";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "../components/Input/index";
import Button from "../components/Button/index";
import ButtonPopUp from "../components/ButtonPopUp/index";
import { FaPlus } from "react-icons/fa";
import validator from "validator";
import { signUpCompanyRequest } from "../actions/SignUp";
import ErrorPopUp from "../components/ErrorPopUp/index";
import SuccessPopUp from "../components/SuccessPopUp/index";
import { notLoading } from "../actions/Loader";
import "../styles/pages/__pages-dir.scss";
const JoinUs = (props) => {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const errors = useSelector((state) => ({ ...state.auth.error }));
  const loader = useSelector((state) => ({ ...state.signUp })).loader;
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const changeInput = (name, event) => {
    let fields = inputFields;
    var item = inputFields.find(function (input, index) {
      if (input.name == name) fields[index].value = event;
      setInputFields(fields);
    });
  };
  useEffect(() => {
    if (errors.emailError && errors.passwordError) {
      setError(true, 0, errors.emailError);
    }
  }, [errors]);

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setSubmitted(false);
        dispatch(notLoading());
      }, 1800);
    }
  }, [loader]);

  const [inputFields, setInputFields] = useState([
    {
<<<<<<< HEAD
      placeholder: "Enter company name",
      name: "company name",
=======
      placeholder: "Ingrese nombre",
      name: "nombre de la compañia",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      value: "",
      error: "",
      type: "text",
    },
    {
<<<<<<< HEAD
      placeholder: "Enter email",
=======
      placeholder: "Ingrese email",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      name: "email",
      value: "",
      error: "",
      type: "email",
    },
    {
<<<<<<< HEAD
      placeholder: "Enter password",
      name: "password",
=======
      placeholder: "Ingrese contraseña",
      name: "contraseña",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      value: "",
      error: "",
      type: "password",
    },
    {
<<<<<<< HEAD
      placeholder: "Confirm your password",
      name: "confirm password",
=======
      placeholder: "Confirme contraseña",
      name: "Confirme contraseña",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      value: "",
      error: "",
      type: "password",
    },
  ]);

  const setError = (input, index, error) => {
    if (input) {
      let fields = inputFields;
      fields[index].error = error;
      setInputFields(fields);
    }
  };

  const signUp = () => {
    setSubmitted(true);
    let emptyField = false;
    let error = false;
    if (inputFields[0].value === "") {
<<<<<<< HEAD
      setError(true, 0, "Required Field");

      emptyField = true;
    } else if (inputFields[1].value === "") {
      setError(true, 1, "Required Field");

      emptyField = true;
    } else if (inputFields[2].value === "") {
      setError(true, 2, "Required Field");
      emptyField = true;
    } else if (inputFields[3].value === "") {
      setError(true, 3, "Required Field");
=======
      setError(true, 0, "Campo requerido");

      emptyField = true;
    } else if (inputFields[1].value === "") {
      setError(true, 1, "Campo requerido");

      emptyField = true;
    } else if (inputFields[2].value === "") {
      setError(true, 2, "Campo requerido");
      emptyField = true;
    } else if (inputFields[3].value === "") {
      setError(true, 3, "Campo requerido");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      emptyField = true;
    }

    if (!validator.isEmail(inputFields[1].value)) {
<<<<<<< HEAD
      setError(true, 1, "Invalid Email");
      error = true;
    }
    if (!validator.isStrongPassword(inputFields[2].value)) {
      setError(true, 2, "Weak Password");
      error = true;
    }
    if (inputFields[2].value != inputFields[3].value) {
      setError(true, 2, "Passwords do not match");
      setError(true, 3, "Passwords do not match");
=======
      setError(true, 1, "Email invalido");
      error = true;
    }
    if (!validator.isStrongPassword(inputFields[2].value)) {
      setError(true, 2, "Contraseña Debil");
      error = true;
    }
    if (inputFields[2].value != inputFields[3].value) {
      setError(true, 2, "Contraseñas no concuerdan");
      setError(true, 3, "Contraseñas no concuerdan");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      error = true;
    }
    if (image == null) {
      error = true;
    }

    if (!error && !emptyField) {
      let payload = {
        email: inputFields[1].value,
        password: inputFields[3].value,
        mainImg: image,
        full_name: inputFields[0].value,
        active: false,
        accepted: false,
      };
      setImage(null);
      setOpen(false);
      dispatch(signUpCompanyRequest(payload));
    } else {
      setTimeout(() => {
        setSubmitted(false);
      }, 1200);
    }
  };

  const preSignUp = () => {
    let emptyField = false;
    let error = false;
    if (inputFields[0].value === "") {
<<<<<<< HEAD
      setError(true, 0, "Required Field");

      emptyField = true;
    } else if (inputFields[1].value === "") {
      setError(true, 1, "Required Field");

      emptyField = true;
    } else if (inputFields[2].value === "") {
      setError(true, 2, "Required Field");
      emptyField = true;
    } else if (inputFields[3].value === "") {
      setError(true, 3, "Required Field");
=======
      setError(true, 0, "Campo requerido");

      emptyField = true;
    } else if (inputFields[1].value === "") {
      setError(true, 1, "Campo requerido");

      emptyField = true;
    } else if (inputFields[2].value === "") {
      setError(true, 2, "Campo requerido");
      emptyField = true;
    } else if (inputFields[3].value === "") {
      setError(true, 3, "Campo requerido");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      emptyField = true;
    }

    if (!validator.isEmail(inputFields[1].value)) {
<<<<<<< HEAD
      setError(true, 1, "Invalid Email");
      error = true;
    }
    if (!validator.isStrongPassword(inputFields[2].value)) {
      setError(true, 2, "Weak Password");
      error = true;
    }
    if (inputFields[2].value != inputFields[3].value) {
      setError(true, 2, "Passwords do not match");
      setError(true, 3, "Passwords do not match");
=======
      setError(true, 1, "Email invalido");
      error = true;
    }
    if (!validator.isStrongPassword(inputFields[2].value)) {
      setError(true, 2, "Contraseña Debil");
      error = true;
    }
    if (inputFields[2].value != inputFields[3].value) {
      setError(true, 2, "Contraseñas no concuerdan");
      setError(true, 3, "Contraseñas no concuerdan");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      error = true;
    }

    if (!error && !emptyField) {
      setOpen(true);
    }
  };

  const uploadImage = (files) => {
    setImage(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  };
  return (
    <>
      {" "}
      <div className={open ? "add-company-image" : "add-company-image-hidden"}>
        <div className="add-company-image-container">
<<<<<<< HEAD
          <h4>Add Logo</h4>
=======
          <h4>Insertar Logo</h4>
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          <label
            style={{ marginBottom: "5px", marginTop: "70px" }}
            className="upload-button-2"
          >
            <input
              style={{ visibility: "hidden" }}
              onChange={(event) => {
                uploadImage(event.target.files);
              }}
              type="file"
              accept="image/*"
              multiple={false}
            />

            {image === null ? (
              <FaPlus className="upload-button-icon-2" />
            ) : (
              <img
                className="upload-button-image-2"
                src={URL.createObjectURL(image)}
              />
            )}
          </label>
          <ButtonPopUp
            color={"pink"}
<<<<<<< HEAD
            title={"Join Now."}
=======
            title={"Unirse."}
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
            position={"right"}
            event={signUp}
          />
        </div>
      </div>
      <div
        className={
          loader || submitted
            ? "full-page-loader"
            : "full-page-loader not-loading"
        }
      >
        <CircularProgress size={100} thickness={5} />
      </div>
      <ErrorPopUp inputs={inputFields} />
      <SuccessPopUp inputs={inputFields} />
      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
      <div className="app-join">
        <h1
          className="subtitle"
          style={{ marginTop: "0px", marginBottom: "60px" }}
        >
<<<<<<< HEAD
          Join Us.
=======
          Unete a Nosotros.
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
        </h1>
        <div className="input-container">
          {inputFields.map((input, index) => (
            <Input
              changeError={setError}
              setSubmitted={() => {
                setSubmitted(false);
              }}
              submitted={submitted}
              index={index}
              large={false}
              item={input}
              changeInput={changeInput}
            />
          ))}
        </div>
        <Button
          event={() => {
            preSignUp();
          }}
<<<<<<< HEAD
          title={"Join Now."}
=======
          title={"Unirse."}
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          position={"right"}
        />
      </div>
    </>
  );
};

<<<<<<< HEAD
export default JoinUs;
=======
export default JoinUs;
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
