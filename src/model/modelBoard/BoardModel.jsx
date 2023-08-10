import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import "./BoardModel.scss";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.80)",
    backdropFilter: "blur(1px)",
    zIndex: 9999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "458px",
    height: "530px",
    borderRadius: "8px",
    background: "#FFF",
    border: "1px solid #EBEBEB",
    boxShadow: "0px 5px 10px 0px rgba(0, 46, 57, 0.15)",
  },
};

const BoardModel = ({
  isOpen,
  closeModal,
  onCreateBoard,
  onUpdateBoard,
  onDeleteBoard,
  editingBoard,
  initialTitle = "",
  initialBackgroundColor = "#A7F0F9",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [backgroundColor, setBackgroundColor] = useState(
    initialBackgroundColor
  );

  useEffect(() => {
    if (!isOpen) {
      setTitle(initialTitle);
      setBackgroundColor(initialBackgroundColor);
    }
  }, [isOpen, initialTitle, initialBackgroundColor]);

  const handleCreateBoard = () => {
    const boardData = {
      title,
      backgroundColor,
    };
    // const existingData = JSON.parse(sessionStorage.getItem("Boards")) || [];
    // const data = [...existingData, boardData];
    // sessionStorage.setItem("Boards", JSON.stringify(data));
    onCreateBoard(boardData);
    closeModal();
  };

  const handleEditBoard = () => {
    const boardData = {
      id: editingBoard.id,
      title,
      backgroundColor,
    };
    onUpdateBoard(boardData);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Create New Board Modal"
    >
      <div className="header">
        <h2>Add a name for your board</h2>
        <button onClick={closeModal} className="icon">
          <IoCloseOutline size={25} />
        </button>
      </div>
      <div>
        <input
          className="input1"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="   Places around the world"
        />
      </div>

      <div className="selection">
        <h2 className="title">Select post color</h2>
        <div className="color-options">
          <div
            className={`color-option ${
              backgroundColor === "#A7F0F9" ? "selected" : ""
            }`}
            style={{ backgroundColor: "#A7F0F9" }}
            onClick={() => setBackgroundColor("#A7F0F9")}
          />
          <div
            className={`color-option ${
              backgroundColor === "#C5C5FC" ? "selected" : ""
            }`}
            style={{ backgroundColor: "#C5C5FC" }}
            onClick={() => setBackgroundColor("#C5C5FC")}
          />
          <div
            className={`color-option ${
              backgroundColor === "#FFAEC0" ? "selected" : ""
            }`}
            style={{ backgroundColor: "#FFAEC0" }}
            onClick={() => setBackgroundColor("#FFAEC0")}
          />
          <div
            className={`color-option ${
              backgroundColor === "#FC6" ? "selected" : ""
            }`}
            style={{ backgroundColor: "#FC6" }}
            onClick={() => setBackgroundColor("#FC6")}
          />
        </div>
      </div>

      <button
        className="click"
        onClick={editingBoard ? handleEditBoard : handleCreateBoard}
      >
        Create Board
      </button>
    </Modal>
  );
};

export default BoardModel;
