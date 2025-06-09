import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   return users;
// });

const usersSlice = createSlice({
  name: "users",
  initialState: [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
  ],
  reducers: {
    userAdded(state, action) {
      state.push(action.payload);
    },
    userUpdated(state, action) {
      const { id, name } = action.payload;

      const existingUser = state.find((user) => user.id === parseInt(id));
      if (existingUser) {
        existingUser.name = name;
      }
    },
    userDeleted(state, action) {
      const id = action.payload;
      console.log(`Deleting user with id: ${id}`);

      return state.filter((user) => user.id !== parseInt(id));
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchUsers.pending, (state) => {
  //         state.loading = true;
  //       })
  //       .addCase(fetchUsers.fulfilled, (state, action) => {
  //         state.data = action.payload;
  //         state.loading = false;
  //       })
  //       .addCase(fetchUsers.rejected, (state) => {
  //         state.loading = false;
  //       });
  //   },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;
