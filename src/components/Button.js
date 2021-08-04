import React from "react";
import classNames from 'classnames/bind';

import "components/Button.scss";

/* --------- props:
Object { danger: true, children: "Cancel" }
children: "Cancel"
danger: true
*/

export default function Button(props) {
   // console.log('props:', props);

   const classNameRefactor = classNames('button', {
      'button--confirm': props.confirm,
      'button--danger': props.danger
   });

   return (
      <button
        className={classNameRefactor}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
}
