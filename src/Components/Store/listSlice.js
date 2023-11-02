import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lists : [],
    error: false,
    loading: true
}

const listSlice = createSlice({
    name :'list',
    initialState,
    reducers:{
        getList:(state,action) => {
            state.lists = action.payload
        },
        createList:(state,action) => {
            state.lists.push(action.payload)
        },
        deleteList:(state,action) => {
            const listId = action.payload
            state.lists =  state.lists.filter((ele) => ele.id != listId)
        },
        error:(state,action)=>{
            state.error = action.payload
        }
    }
})

export const listActions = listSlice.actions
export default listSlice.reducer