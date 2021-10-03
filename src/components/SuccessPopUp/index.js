import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import "../../styles/components/__components-dir.scss";
import { BiHappy } from "react-icons/bi";
import { removeSuccess } from "../../actions/SignIn";

const SuccessPopUp = ({ inputs, stateLocation, company }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const success = useSelector((state) => ({ ...state.auth.success }));
  const successCompany = useSelector((state) => ({ ...state.company.success }));

  useEffect(() => {
    if (company === null || company === undefined || company === false) {
      if (Object.keys(success).length > 0 && open === false) {
        setOpen(true);
        setSuccessMessage(success[Object.keys(success)[0]]);
      }
    }
  }, [success]);

  useEffect(() => {
    if (company) {
      if (Object.keys(successCompany).length > 0 && open === false) {
        setOpen(true);
        setSuccessMessage(successCompany[Object.keys(successCompany)[0]]);
      }
    }
  }, [successCompany]);
  return (
    <div
      className={open ? "pop-up" : "pop-up not-visible"}
      onClick={() => {
        setOpen(false);
        setSuccessMessage("");
        dispatch(removeSuccess());
      }}
    >
      <div
        className={
          company
            ? "pop-up-container-error company"
            : "pop-up-container-error pink"
        }
      >
        <BiHappy className="message-icon" />
        <h4>{successMessage}</h4>
      </div>
    </div>
  );
};

export default SuccessPopUp;
