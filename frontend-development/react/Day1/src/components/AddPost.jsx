import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../store/slices/postsSlice";

function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addPost({
        id: Date.now(),
        title,
        body,
      })
    );
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">
        Add Post
      </button>
    </form>
  );
}

export default AddPost;
