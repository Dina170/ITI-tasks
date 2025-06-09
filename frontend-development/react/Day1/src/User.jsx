import React from "react";
import { Link } from "react-router-dom";
import { userDeleted } from "./store/slices/usersSlice";
import { useDispatch } from "react-redux";

function User({ user }) {
  const dispatch = useDispatch();
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>
        <Link to={`edit/${user.id}`} className="btn">
          Edit
        </Link>{" "}
        |{" "}
        <button
          className="delete-btn"
          onClick={() => dispatch(userDeleted(user.id))}
        >
          delete
        </button>
      </td>
    </tr>
  );
}

export default User;
