import React from "react";

const MODAL_STYLES = {
	position: "fixed",
	top: "39%",
	left: "42%",
	transform: "translare(-50% -50%)",
	backgroundColor: "#FFF",
	padding: "50px",
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

const PopupModal = ({ open, children, onClose }) => {
	const handleClick = () => {
		console.log("clicked");
	};

	if (!open) return null;
	return (
		<>
			<div style={OVERLAY_STYLES} />
			<div style={MODAL_STYLES}>
				<button onClick={onClose}>Close Modal</button>
				{children}
				<button></button>
			</div>
		</>
	);
};

export default PopupModal;
