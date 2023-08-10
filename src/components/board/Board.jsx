import React, { useState, useRef, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import BoardModel from "../../model/modelBoard/BoardModel";
// import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Board.scss";

const Board = ({ id, title, backgroundColor, onEdit, onDelete }) => {
  //   const navigate = useNavigate();
  const [open, setOpne] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBackgroundColor, setEditedBackgroundColor] =
    useState(backgroundColor);

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditBoard = () => {
    const updatedBoard = {
      id: id,
      title: editedTitle,
      backgroundColor: editedBackgroundColor,
    };
    localStorage.setItem(`board_${id}`, JSON.stringify(updatedBoard));
    // console.log("Board saved:", updatedBoard);
    closeEditModal();
  };

  const handleDeleteBoard = () => {
    alert(`Deleting board: ${title}`);
    localStorage.removeItem(`board_${id}`);
    setOpne(false);
  };
  // =============================================================

  return (
    <>
      <div className="container">
        <div className="tmp">
          <div className="frame1">
            <div
              className="frame2"
              style={{ backgroundColor: backgroundColor }}
            >
              {/* <div
                className="frame3"
                // onClick={() => navigate(`/board/${id}`)}
              ></div> */}
              <Link
                to={`/board/${id}?title=${encodeURIComponent(
                  title
                )}&backgroundColor=${encodeURIComponent(backgroundColor)}`}
                className="frame3"
              />
            </div>
            <div className="title">{title}</div>
            <div className="image">
              <div className="inside">
                <button onClick={() => setOpne(!open)}>
                  <BiDotsVerticalRounded size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="options">
          <div className="edit" onClick={onEdit}>
            <RiEdit2Line className="icon"></RiEdit2Line>
            <div className="text">Edit</div>
          </div>
          <div className="delete" onClick={onDelete}>
            <RiDeleteBinLine className="icon"></RiDeleteBinLine>
            <div className="text">Delete</div>
          </div>
        </div>
      )}

      <BoardModel
        isOpen={editModalOpen}
        closeModal={closeEditModal}
        onCreateBoard={handleEditBoard}
        initialTitle={editedTitle}
        initialBackgroundColor={editedBackgroundColor}
      />
    </>
  );
};

export default Board;
