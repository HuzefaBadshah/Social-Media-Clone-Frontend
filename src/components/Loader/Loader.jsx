import React, { useEffect, useState } from "react";

const Loader = (props) => {
  const [shouldLoad, setShouldLoad] = useState(true);
  const classes = [...props.className].join(" ");

  useEffect(() => {
    setTimeout(() => {
      setShouldLoad(false);
    }, 5000);
  }, []);

  return (
    <>
      {shouldLoad ? (
        <span className={`${classes} loading loading-ring loading-xl`}></span>
      ) : (
        <>
        <div className="flex gap-2 items-center justify-center">
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-error animate-ping"></div>
            <div className="status status-error"></div>
          </div>
          <p className="text-2xl">{props.failureMsg || " Something went wrong!"}</p>
        </div>
        </>
      )}
    </>
  );
};

export default Loader;
