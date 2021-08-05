import React from "react";

/* --------- props:
  onAdd:Function to be called when the user clicks the Add button
*/

export default function Header(props) {
  const { onAdd } = props;

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
}
