import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./PostModel.scss";
import { IoCloseOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { CiImageOn } from "react-icons/ci";

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
    width: "460px",
    height: "480px",
    borderRadius: "8px",
    background: "#FFF",
    border: "1px solid #EBEBEB",
    boxShadow: "0px 5px 10px 0px rgba(0, 46, 57, 0.15)",
  },
};

const PostModel = ({
  isOpen,
  closeModal,
  onCreatePost,
  onEditPost,
  isEditing,
  post,
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handlePostAction = () => {
    if (isEditing) {
      onEditPost(post.id, title, uploadedImage, text);
      // onCreatePost(post.id, title, uploadedImage, text);
    } else {
      onCreatePost(title, uploadedImage, text);
    }
    closeModal();
  };

  useEffect(() => {
    if (isEditing && post) {
      setTitle(post.title);
      setText(post.text);
    }
  }, [isEditing, post]);
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="main">
        <div className="head">
          <h1>Create a Post</h1>
          <button onClick={closeModal} className="close">
            <IoCloseOutline size={20} />
          </button>
        </div>
        <p>Writing something for your post</p>
      </div>
      <h3>Subject</h3>

      <div className="subject">
        <input
          className="input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="   Galápagos Islands, Ecuador"
        />
      </div>

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {uploadedImage ? (
          <img
            className="preview"
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded"
          />
        ) : (
          <p className="input-img">
            {" "}
            <CiImageOn />
            Add your image
          </p>
        )}
      </div>
      <hr />

      <div className="text-area">
        <h3 className="head">What’s on your mind? </h3>
        <div className="text-frame">
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>

      <button onClick={handlePostAction} className="pb-fream">
        {isEditing ? "Save Changes" : "Publish"}
      </button>
    </Modal>
  );
};

export default PostModel;
