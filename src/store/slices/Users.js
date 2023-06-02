import { createSlice } from "@reduxjs/toolkit";

const initialState= [{
name:"sanjay",
email:"sanjayparmar1650@gmail.com",
password:"123456",
id:1,
}]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

    addUser(state, action){
        // console.log(action.payload,"state");
      const registerdata = action.payload;
      state.push(registerdata);
    //   console.log(state,"statte");
    },

   
  },
});

export default usersSlice.reducer;

export const {
    addUser
} = usersSlice.actions;
