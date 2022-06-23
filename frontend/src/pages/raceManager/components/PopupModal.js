import React from "react";
import ReactDOM from "react-dom";
import AddBoat from "./AddBoat";
import { Button } from "@mui/material";

const MODAL_STYLES = {
  position: "fixed",
  height: "50%",
  width: "50%",
  top: "23%",
  left: "26%",
  backgroundColor: "#FFF",
  padding: "0px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const INPUT_CONTAINER_STYLE = {
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
};

const CLOSE_MODAL_BUTTON_STYLE = {
  marginLeft: "2%",
  marginTop: "2%",
};

const PopupModal = ({ open, onClose, raceId }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div style={CLOSE_MODAL_BUTTON_STYLE}>
          <Button onClick={onClose} variant="contained">
            Close Modal
          </Button>
        </div>
        <div style={INPUT_CONTAINER_STYLE}>
          <AddBoat raceId={raceId} onClose={onClose} />
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default PopupModal;
