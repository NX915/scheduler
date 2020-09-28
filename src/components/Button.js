import React from "react";

import "components/Button.scss";

const classnames = require('classnames');


export default function Button(props) {

   return <button 
   className={
      classnames('button', {
         'button--confirm':props.confirm,
         'button--danger':props.danger,
      })
   }
   disabled={props.disabled}
   onClick={props.onClick}>
      {props.children}
   </button>;
}
