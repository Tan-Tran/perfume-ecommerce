import React from "react";
import { Toast } from "react-bootstrap";

import "./ToastShow.css";

const ToastShow = (props) => {
  const { showToast, message } = props;
  return (
    <Toast
      className={"border border-success bg-success text white mt-3"}
      show={showToast}
    >
      <Toast.Header className={"bg-success text-white"} closeButton={false}>
        <strong className="mr-auto">Success</strong>
      </Toast.Header>
      <Toast.Body className={"text-white"}>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastShow;
