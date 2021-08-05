import React from "react";

/* --------- props:
    message:String eg. "Could not delete appointment."
    onClose:Function to be called when the user clicks the Close button
*/

export default function Error(props) {
  const { message, onClose } = props;

  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={onClose}
      />
    </main>
  );
}
