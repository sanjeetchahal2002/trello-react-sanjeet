import { useEffect, useReducer, useState } from "react";
import { Box, Button, Typography, Input } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from "../ChecklistItems/ProgressBar";
import Snackbars from "../Error/ErrorPopUp";

import updateCheckListItems from "../ApiCalls/updateCheckListItems";
import addCheckListItems from "../ApiCalls/addCheckListItem";
import deleteCheckListItems from "../ApiCalls/deleteCheckListItems";
import getCheckListItems from "../ApiCalls/getCheckListItems";

const reducer = (listItems, action) => {
  switch (action.type) {
    case "addNew":
      return [...action.payload];
    case "additem":
      return [...listItems, action.payload];
    case "deleteitem":
      let updateList = listItems.filter((ele) => ele.id !== action.payload);
      return updateList;
    case "update":
      return listItems.map((ele) => {
        if (ele.id === action.payload.id) {
          ele.state = action.payload.state;
        }
        return ele;
      });
  }
};

function CheckListItems(props) {
  const [listItems, dispatch] = useReducer(reducer, []);
  const [newItemName, setNewItemName] = useState("");
  const [error, setError] = useState(false);
  let { id} = props.ele;
  let listId = id;
  let cardId = props.cardId;
  function checked(items) {
    let { e, itemId } = items;
    let state = e.target.checked ? "complete" : "incomplete";
    updateCheckListItems(cardId, itemId, state)
      .then((res) => {
        dispatch({ type: "update", payload: res.data });
      })
      .catch((error) => setError(true));
  }
  function additem() {
    if (newItemName !== "") {
      addCheckListItems(listId, newItemName)
        .then((res) => {
          dispatch({ type: "additem", payload: res.data });
          setNewItemName("");
        })
        .catch((error) => setError(true));
    }
  }
  function deleteitem(id) {
    deleteCheckListItems(listId, id)
      .then(() => {
        dispatch({ type: "deleteitem", payload: id });
      })
      .catch((error) => setError(true));
  }
  useEffect(() => {
    getCheckListItems(id)
      .then((res) => {
        dispatch({ type: "addNew", payload: res.data });
      })
      .catch((error) => setError(true));
  }, []);
  return error ? (
    <Snackbars msg={"Error in CheckList Items"} />
  ) : (
    <Box>
      <ProgressBar listItems={listItems} />
      {listItems.map((ele) => {
        return (
          <Box key={ele.id} display={"flex"} alignItems={"center"}>
            <Checkbox onChange={(e) => checked({ e: e, itemId: ele.id })} />
            <Typography>{ele.name}</Typography>
            <Button onClick={() => deleteitem(ele.id)}>
              <ClearIcon color="error" sx={{ paddingLeft: "15px" }} />
            </Button>
          </Box>
        );
      })}
      <Input
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
      ></Input>
      <Button onClick={additem}>
        <AddIcon />
        Create Item
      </Button>
    </Box>
  );
}
export default CheckListItems;
