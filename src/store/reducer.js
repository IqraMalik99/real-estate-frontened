import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    currentUser: null,
    login: false
}
export const Slice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        userState: (state, action) => {
            state.currentUser = action.payload;
        },
        userLogout: (state, action) => {
            state.currentUser = null;
            state.login = false
        },
        userLogin: (state, action) => {
            state.login = true
        }
    }

})
export const { userState, userLogout, userLogin } = Slice.actions;
export default Slice.reducer