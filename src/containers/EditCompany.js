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
import DatePicker from "../components/DatePickerWhite";
import countryList from "../helpers/countries";
import Select from "../components/SelectEdit/index";
import { signUpCompanyRequest } from "../actions/SignUp";
import { changePasswordRequest, updateProfileRequest } from "../actions/SignIn";
import { updateImageRequest } from "../actions/Company";
import ErrorPopUp from "../components/ErrorPopUp/index";
import SuccessPopUp from "../components/SuccessPopUp/index";
import { notLoading } from "../actions/Loader";
import "../styles/pages/__pages-dir.scss";
import moment from "moment";
const EditCompany = (props) => {
  const dispatch = useDispatch();

  const [birthdateError, setBirthdateError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const errors = useSelector((state) => ({ ...state.auth.error }));
  const loader = useSelector((state) => ({ ...state.signUp })).loader;
  const state = useSelector((state) => ({ ...state.auth}));
  const [preview, setPreview] = useState(null);
  const { token, _id, role, full_name, email, gender, birthdate, country,mainImg } =
    useSelector((state) => ({
      ...state.auth,
    }));

    const [image, setImage] = useState(mainImg);
  const [birthdateDate, setBirthdate] = useState(new Date(birthdate));
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
      placeholder: "Enter your full name",
      name: "full_name",
=======
      placeholder: "Ingrese nombre",
      name: "nombre_completo",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      value: full_name,
      error: "",
      type: "text",
    },
    {
<<<<<<< HEAD
      placeholder: "Enter your email",
=======
      placeholder: "Ingrese su email",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      name: "email",
      value: email,
      error: "",
      type: "email",
    },
    {
<<<<<<< HEAD
      placeholder: "Enter your password",
      name: "password",
=======
      placeholder: "Ingrese su contraseña",
      name: "contraseña",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      value: "",
      error: "",
      type: "password",
    },
    {
<<<<<<< HEAD
      placeholder: "Enter your new password",
      name: "new password",
=======
      placeholder: "Ingrese nueva contraseña",
      name: "nueva contraseña",
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      value: "",
      error: "",
      type: "password",
    },
    {
<<<<<<< HEAD
      placeholder: "Confirm your new password",
      name: "confirm new password",
=======
      placeholder: "Confirme nueva contraseña",
      name: "Confirme nueva contraseña",
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
=======
      setError(true, 0, "Campo requerido");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      emptyField = true;
    }

    if (inputFields[1].value === "") {
<<<<<<< HEAD
      setError(true, 1, "Required Field");
=======
      setError(true, 1, "Campo requerido");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      emptyField = true;
    }

    if (
      moment(birthdateDate).format("LL") === moment(new Date()).format("LL") ||
      birthdateDate >= new Date()
    ) {
<<<<<<< HEAD
      setBirthdateError("Required Field");
=======
      setBirthdateError("Campo requerido");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      emptyField = true;
    }

    if (!validator.isEmail(inputFields[1].value)) {
<<<<<<< HEAD
      setError(true, 1, "Invalid Email");
=======
      setError(true, 1, "Email invalido");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      error = true;
    }

    if (!error && !emptyField) {
      let payload = {
        email: inputFields[1].value,
        full_name: inputFields[0].value,
        _id: _id,
      };
      setSubmitted(false);
      dispatch(updateProfileRequest(payload));
    } else {
      setTimeout(() => {
        setSubmitted(false);
      }, 1200);
    }
  };

  const defaultInputs = () => {
    let aux = inputFields;

    aux[0].value = "";
    aux[1].value = "";
    aux[2].value = "";
    aux[3].value = "";
  };

  const uploadImage = (files) => {
    setImage(files[0]);
    setPreview(URL.createObjectURL(files[0]));
    dispatch(updateImageRequest({_id:_id,mainImg:files[0]}))
  };
  const changePassword = () => {
    setSubmitted(true);
    let emptyField = false;

    let error = false;

    if (inputFields[2].value === "") {
<<<<<<< HEAD
      setError(true, 2, "Required Field");
      emptyField = true;
    }
    if (inputFields[3].value === "") {
      setError(true, 3, "Required Field");
      emptyField = true;
    }
    if (inputFields[4].value === "") {
      setError(true, 4, "Required Field");
=======
      setError(true, 2, "Campo requerido");
      emptyField = true;
    }
    if (inputFields[3].value === "") {
      setError(true, 3, "Campo requerido");
      emptyField = true;
    }
    if (inputFields[4].value === "") {
      setError(true, 4, "Campo requerido");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      emptyField = true;
    }

    if (!validator.isStrongPassword(inputFields[3].value)) {
<<<<<<< HEAD
      setError(true, 2, "Weak Password");
      error = true;
    }
    if (inputFields[3].value != inputFields[4].value) {
      setError(true, 3, "Passwords do not match");
      setError(true, 4, "Passwords do not match");
=======
      setError(true, 2, "Contraseña debil");
      error = true;
    }
    if (inputFields[3].value != inputFields[4].value) {
      setError(true, 3, "Contraseñas no concuerdan");
      setError(true, 4, "Contraseñas no concuerdan");
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
      error = true;
    }

    if (!error && !emptyField) {
      setSubmitted(false);
      dispatch(
        changePasswordRequest({
          company: true,
          _id: _id,
          old_password: inputFields[2].value,
          password: inputFields[3].value,
          setOpen: setOpen,
        })
      );
    } else {
      setTimeout(() => {
        setSubmitted(false);
      }, 1200);
    }
  };
  return (
    <>
      <ErrorPopUp inputs={inputFields} />
      {/* <SuccessPopUp defaultInputs={defaultInputs} inputs={inputFields} /> */}
      <div className={open ? "add-company-image" : "add-company-image-hidden"}>
        <div className="add-company-image-container big">
<<<<<<< HEAD
          <h4>Change Password</h4>
=======
          <h4>Cambio de Contraseña</h4>
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          <div className="input-container-column small">
            {inputFields.slice(2, 5).map((input, index) => (
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
          <ButtonPopUp
            color={"pink"}
<<<<<<< HEAD
            title={"Set Password."}
=======
            title={"Cambiar Contraseña."}
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
            position={"right"}
            event={changePassword}
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

      <Sidebar drawerToggleClickHandler={drawerToggleClickHandler} />
      <Drawer
        sideDrawerOpen={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
      <div className="app-join">
        <h1
          className="subtitle"
          style={{ marginTop: "0px", marginBottom: "30px" }}
        >
<<<<<<< HEAD
          Profile.
=======
          Perfil.
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
        </h1>
        <div className="input-container">
          {inputFields.slice(0, 2).map((input, index) => (
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
   
       
     
          <label className="image-circle">
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
              <div className="big-circle-image">
              <div className="small-circle"></div>
            </div>
            ) : (
              <>
              <img
              className="video-presentation"
              style={{objectFit: "scale-down",
                overflow: "hidden"}}
              src={preview===null ? image : URL.createObjectURL(image)}
            ></img>
            <div className="big-circle-image">
              <div className="small-circle"></div>
            </div>
            </>
            )}
          </label>
        
        </div>
        <h5
          className="change-password"
          onClick={() => {
            setOpen(true);
          }}
        >
<<<<<<< HEAD
          Change Password?
=======
          Cambiar Contraseña?
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
        </h5>
        <Button
          event={() => {
            signUp();
          }}
<<<<<<< HEAD
          title={"Update Profile."}
=======
          title={"Actualizar."}
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
          position={"right"}
        />
      </div>
    </>
  );
};

<<<<<<< HEAD
export default EditCompany;
=======
export default EditCompany;
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
