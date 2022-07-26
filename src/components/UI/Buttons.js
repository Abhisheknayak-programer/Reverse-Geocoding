import React from "react";
import ButtonStyles from "./Buttons.module.css";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={ButtonStyles.button}>
      {props.children}
    </button>
  );
};

export default Button;
