import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkListItem: {},
  error: false
};

const checkListItemsSlice = createSlice({
  name: "checkListItems",
  initialState,
  reducers: {
    getCheckListItem: (state, action) => {
      state.checkListItem[action.payload.id] = action.payload.data;
    },
    createCheckListItem: (state, action) => {
      state.checkListItem[action.payload.id].push(action.payload.data);
    },
    deleteCheckListItem: (state, action) => {
      state.checkListItem[action.payload.ListId] = state.checkListItem[
        action.payload.ListId
      ].filter(({ id }) => id !== action.payload.elementId);
    },
    updateCheckListItem: (state, action) => {
      state.checkListItem[action.payload.id]
      .forEach((ele) => {
        if (ele.id == action.payload.data.id) {
          ele.state = action.payload.data.state;
        }
      });
    },
  },
});

export const checkListItemsActions = checkListItemsSlice.actions;
export default checkListItemsSlice.reducer;
