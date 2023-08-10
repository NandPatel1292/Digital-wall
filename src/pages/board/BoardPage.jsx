import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import NavbarPost from "../../components/navbarPost/NavbarPost";
import Post from "../../components/post/Post";
import PostModel from "../../model/modelPost/PostModel";
import "./BoardPage.scss";

import { useLocation } from "react-router-dom";

const BoardPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");
  const backgroundColor = searchParams.get("backgroundColor");

  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const openModal = () => {
    setModalOpen(true);
    setSelectedPost(null);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCreatePost = (title, coverImage, text) => {
    const newPost = {
      id: Date.now(),
      title: title,
      coverImage: coverImage,
      text: text,
    };
    setPosts([...posts, newPost]);
    closeModal();
  };

  const handleEditPost = (id, title, coverImage, text) => {
    const editedPost = {
      id: id,
      title: title,
      coverImage: coverImage,
      text: text,
    };
    setPosts(posts.map((post) => (post.id === id ? editedPost : post)));
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    const newFilteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(newFilteredPosts);
  }, [searchQuery, posts]);

  return (
    <div>
      <div>
        <NavbarPost title={title} setSearchQuery={setSearchQuery} />
      </div>
      <div className="area" style={{ backgroundColor: backgroundColor }}>
        <div className="btn">
          <button onClick={openModal}>
            <BsPlusLg className="icon"></BsPlusLg>
            <p>Create New Board</p>
          </button>
        </div>
        <div className="post-area">
          {/* <Post
            title="Galapagos Islands,  Ecuador"
            coverImage="/image4.png"
            text="The Galápagos Islands is a volcanic archipelago in the Pacific Ocean. It's considered one of the world's foremost destinations for wildlife-viewing. A province of Ecuador, it lies about 1,000km off its coast. Its isolated terrain shelters a diversity of plant and animal species, many found nowhere else. Charles Darwin visited in 1835, and his observation of Galápagos' species later inspired his theory of evolution. "
          /> */}

          {filteredPosts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              coverImage={URL.createObjectURL(post.coverImage)}
              text={post.text}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              onOpenEditModal={() => setSelectedPost(post)}
            />
          ))}

          <PostModel
            isOpen={isModalOpen}
            closeModal={closeModal}
            onCreatePost={handleCreatePost}
            isEditing={selectedPost !== null}
            post={selectedPost}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
