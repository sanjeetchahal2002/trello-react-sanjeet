import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    boards : [],
    error: false,
    loading: true
}


const boardSlice = createSlice({
    name:'boards',
    initialState,
    reducers:{
        getBoards: (state,action) => {
            state.boards = action.payload
            state.loading = false
        },
        createBoard:(state,action) => {
            state.boards.push(action.payload)
        },
        error:(state,action)=>{
            state.error = action.payload
        }
    }
})

export const boardActions = boardSlice.actions
export default boardSlice.reducer