import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost } from "./store/slices/postsSlice";

function Post({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div className="post-actions">
        <button onClick={() => navigate(`/dashboard/project/${post.id}`)}>
          Show More
        </button>
        <button onClick={() => navigate(`/dashboard/edit/${post.id}`)}>
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => dispatch(deletePost(post.id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Post;
