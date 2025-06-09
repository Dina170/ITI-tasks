import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userUpdated } from "./store/slices/usersSlice";

function EditUser() {
  const userId = useParams().id;
  const user = useSelector((state) =>
    state.users.find((user) => user.id === parseInt(userId))
  );
  const [name, setName] = React.useState(user?.name);
  const dispatch = useDispatch();
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userUpdated({ id: userId, name }));
    nav("/users");
  }

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUser;
