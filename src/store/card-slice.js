import { createSlice } from "@reduxjs/toolkit";

const cardSlice=createSlice({
    name:"card",
    initialState:{
        users:[],
        numberOfPages:0,
        singleUser:[],
        currentUserId:null,
        loading:false,
    },
    reducers:{
        allUsers(state,action){
            state.users=action.payload.data;
            state.numberOfPages=action.payload.numberOfPages
        },
        singleUser(state,action){
            state.singleUser=action.payload;
        },
        currentUser(state,action){
            state.currentUserId=action.payload;
        },
        isLoading(state,action){
            state.loading=action.payload;
        }
    }
})

export const cardActions=cardSlice.actions;
export default cardSlice;