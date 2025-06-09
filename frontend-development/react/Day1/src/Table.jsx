import React, { useEffect, useState } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers } from "./store/slices/usersSlice";

function Table() {
  const users = useSelector((state) => state.users);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);
  return (
    <div className="users-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
