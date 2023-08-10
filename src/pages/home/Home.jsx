import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Board from "../../components/board/Board";
import BoardModel from "../../model/modelBoard/BoardModel";
import "./Home.scss";

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [editingBoard, setEditingBoard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBoards, setFilteredBoards] = useState(boards);

  // useEffect(() => {
  //   const savedBoards = [];
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);
  //     if (key.startsWith("boards")) {
  //       const boardData = JSON.parse(localStorage.getItem(key));
  //       savedBoards.push(boardData);
  //     }
  //   }
  //   // console.log("Loaded boards:", savedBoards);
  //   setBoards(savedBoards);
  // }, []);

  // useEffect(() => {
  //   const storedBoards = JSON.parse(sessionStorage.getItem("Boards"));
  //   setBoards(storedBoards);
  //   // console.log(storedBoards);
  // }, []);

  const openModal = () => {
    setEditingBoard(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingBoard(null);
  };

  const handleCreateBoard = (boardData) => {
    const newBoard = {
      id: Date.now(),
      ...boardData,
    };
    setBoards([...boards, newBoard]);

    // localStorage.setItem("boards", JSON.stringify([...boards, newBoard]));
    closeModal();
  };

  const handleEditBoard = (boardId) => {
    const boardToEdit = boards.find((board) => board.id === boardId);
    if (boardToEdit) {
      setEditingBoard(boardToEdit);
      setModalIsOpen(true);
    }
    // localStorage.setItem("boards", JSON.stringify(boards));
  };

  const handleUpdateBoard = (updatedBoard) => {
    const index = boards.findIndex((board) => board.id === updatedBoard.id);
    if (index !== -1) {
      const updatedBoards = [...boards];
      updatedBoards[index] = { ...updatedBoard };
      setBoards(updatedBoards);
    }
    // localStorage.setItem("boards", JSON.stringify(filteredBoards));
    closeModal();
    setEditingBoard(null);
  };

  const handleDeleteBoard = (boardId) => {
    const filteredBoards = boards.filter((board) => board.id !== boardId);
    setBoards(filteredBoards);
    closeModal();
    setEditingBoard(null);
  };

  useEffect(() => {
    const newFilteredBoards = boards.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBoards(newFilteredBoards);
  }, [searchQuery, boards]);

  return (
    <>
      <div className="home">
        <Navbar openModal={openModal} setSearchQuery={setSearchQuery} />

        <div className="title">
          <h2>My boards</h2>
        </div>

        <div className="board">
          {/* <Board title="Nand Patel" /> */}
          {filteredBoards.map((board) => (
            <Board
              key={board.id}
              id={board.id}
              title={board.title}
              backgroundColor={board.backgroundColor}
              onEdit={() => handleEditBoard(board.id)}
              onDelete={() => handleDeleteBoard(board.id)}
            />
          ))}
        </div>

        <BoardModel
          isOpen={modalIsOpen}
          closeModal={closeModal}
          onCreateBoard={handleCreateBoard}
          onUpdateBoard={handleUpdateBoard}
          onDeleteBoard={handleDeleteBoard}
          editingBoard={editingBoard}
        />
      </div>
    </>
  );
};

export default Home;
