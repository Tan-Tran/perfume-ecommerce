import React, { useEffect } from "react";
import PropTypes from "prop-types";

import AccountNavbar from "../../components/AccountNavbar/AccountNavbar";
import { useDispatch, useSelector } from "react-redux";
import { formReset } from "../../actions/admin-actions";
import ToastShow from "../../components/ToastShow/ToastShow";

const Account = () => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(formReset());
  }, []);

  return (
    <div className="container">
      <AccountNavbar />
      <div
        className="container"
        style={{ display: success ? "block" : "none" }}
      >
        <ToastShow
          showToast={success}
          message={"Perfume successfully edited!"}
        />
      </div>
    </div>
  );
};

Account.propTypes = {
  formReset: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};

export default Account;
