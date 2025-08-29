import React, { useEffect, useState } from "react";

const Toaster = ({ show = false, msg = "", isSuccess = true }) => {
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (show) {
      setToast(true);
      setToastMsg(msg);
      setTimeout(() => {
        setToast(false);
      }, 6000);
    }
  }, [show]);

  return (
    toast && (
      <div className="toast toast-top toast-center z-51">
        <div className={`alert alert-${isSuccess ? "success" : "info"}`}>
          <span>{toastMsg}</span>
        </div>
      </div>
    )
  );
};

export default Toaster;
