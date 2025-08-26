import React from 'react'

const Loader = (props) => {
    const classes = [...props.className].join(' ');
  return (
   <span className={`${classes} loading loading-ring loading-xl`}></span>
  )
}

export default Loader;
