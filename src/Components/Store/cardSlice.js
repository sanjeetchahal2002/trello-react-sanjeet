import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cards : {},
    error:false,
}


const cardSlice = createSlice({
    name:'cards',
    initialState,
    reducers:{
        getCards: (state,action) => {
            state.cards[action.payload.id] = action.payload.data;
        },
        createCard:(state,action) => {
            state.cards[action.payload.idList].push(action.payload)
        },
        deleteCard:(state,action) => {
            for(let listId in state.cards){
                state.cards[listId] = state.cards[listId].filter(({id}) => id !== action.payload)
            }
        },
        error:(state,action) => {
            state.error =action.payload
        }
    }
})

export const cardActions = cardSlice.actions
export default cardSlice.reducer