import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    checkList : [],
    error: false
}


const checkListSlice = createSlice({
    name:'checkList',
    initialState,
    reducers:{
        getCheckList: (state,action) => {
            state.checkList = action.payload
        },
        createCheckList:(state,action) => {
            state.checkList.push(action.payload)
        },
        deleteCheckList:(state,action) => {
            state.checkList = state.checkList.filter(({id}) => id !== action.payload)
        }
    }
})

export const checkListActions = checkListSlice.actions
export default checkListSlice.reducer