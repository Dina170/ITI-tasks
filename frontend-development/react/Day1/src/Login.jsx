import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAdded } from "./store/slices/usersSlice";
import { setUser } from "./store/slices/authSlice";

function Login() {
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const usersCount = useSelector((state) => state.users.length);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) {
      setError("Please enter a username");
    } else if (username.length < 3) {
      setError("Username must be at least 3 characters long");
    } else if (username.length > 100) {
      setError("Username must be less than 100 characters long");
    } else {
      setError("");
      const newUser = { id: usersCount + 1, name: username };
      dispatch(userAdded(newUser));
      dispatch(setUser(newUser));
      nav("/dashboard");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
