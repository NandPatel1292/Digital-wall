import React, { useState } from "react";
import { BiDotsVerticalRounded, BiBookmark } from "react-icons/bi";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import PostModel from "../../model/modelPost/PostModel";
import "./Post.scss";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

const Post = ({
  id,
  title,
  coverImage,
  text,
  onCreatePost,
  onEditPost,
  onDeletePost,
  onOpenEditModal,
}) => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);
  const [count, setCount] = useState(0);
  const [open, setOpne] = useState(false);

  const openEditModal = () => {
    setEditModalOpen(true);
    onOpenEditModal();
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditPost = (editedTitle, editedCoverImage, editedText) => {
    onEditPost(id, editedTitle, editedCoverImage, editedText);
    closeEditModal();
  };
  return (
    <>
      <div className="container2">
        <div className="frame">
          <div className="title">{title}</div>
          <div className="icon">
            <BiBookmark />
            <BiDotsVerticalRounded onClick={() => setOpne(!open)} />
          </div>
        </div>
        <div className="date">{currentDate}</div>
        <div className="img">
          {coverImage && <img src={coverImage} alt="Uploaded" />}
        </div>
        <div className="text">{text}</div>
        <hr />
        <div className="like">
          <div className="hart" onClick={() => setCount(count + 1)}>
            {count === 0 ? <FcLikePlaceholder /> : <FcLike />}
          </div>
          <div className="cnt">{count}</div>
        </div>
      </div>
      {open && (
        <div className="options">
          <div className="edit" onClick={openEditModal}>
            <RiEdit2Line className="icon"></RiEdit2Line>
            <div className="text">Edit</div>
          </div>
          <div className="delete" onClick={() => onDeletePost(id)}>
            <RiDeleteBinLine className="icon"></RiDeleteBinLine>
            <div className="text">Delete</div>
          </div>
        </div>
      )}

      <PostModel
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        title={title}
        coverImage={coverImage}
        text={text}
        onCreatePost={onCreatePost}
        onEditPost={handleEditPost}
        post={Post}
      />
    </>
  );
};

export default Post;
