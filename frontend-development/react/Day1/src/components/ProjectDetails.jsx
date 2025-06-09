import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post";

function ProjectDetails() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  return (
    <div className="project-details">
      <h2>Project Details</h2>
      <p>Project ID: {id}</p>
      <Post post={post} />
    </div>
  );
}

export default ProjectDetails;
