import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";
import listReducer from "./listSlice";
import cardReducer from "./cardSlice";
import checkReducer from "./checkListSlice";
import checkListItemReducer from "./checkListItemSlice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    lists: listReducer,
    cards: cardReducer,
    checkList: checkReducer,
    checkListItem: checkListItemReducer,
  },
});

export default store;
