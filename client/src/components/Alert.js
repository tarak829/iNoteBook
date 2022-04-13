import React, { useContext } from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import NoteContext from "../context/notes/noteContext";

const Alertbox = () => {
  const { alert } = useContext(NoteContext);
  return (
    <div style={{ height: "3rem" }}>{alert && <Alert variant={alert.type}>{alert.msg}</Alert>}</div>
  );
};

export default Alertbox;

Alertbox.propTypes = {
  alert: PropTypes.object,
};

Alertbox.defaultProps = {
  alert: null,
};
