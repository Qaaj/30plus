import React from "react";
import ReactDOM from "react-dom";

const HelloMessage = (props) => {
  return <div>Hello {props.name}</div>;
}

ReactDOM.render(<HelloMessage name="30+" />, document.getElementById("app"));