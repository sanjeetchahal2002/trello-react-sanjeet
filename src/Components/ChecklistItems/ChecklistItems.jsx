import { useEffect, useState } from "react";
import { Box, Button, Typography, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { checkListItemsActions } from "../Store/checkListItemSlice";

import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from "../ChecklistItems/ProgressBar";
import Snackbars from "../Error/ErrorPopUp";

import updateCheckListItems from "../ApiCalls/updateCheckListItems";
import addCheckListItems from "../ApiCalls/addCheckListItem";
import deleteCheckListItems from "../ApiCalls/deleteCheckListItems";
import getCheckListItems from "../ApiCalls/getCheckListItems";


function CheckListItems(props) {
  const [newItemName, setNewItemName] = useState("");
  const [error, setError] = useState(false);
  let { id } = props.ele;
  let listId = id;
  let cardId = props.cardId;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.checkListItem);

  function checked(items) {
    let { e, itemId } = items;
    let state = e.target.checked ? "complete" : "incomplete";
    updateCheckListItems(cardId, itemId, state)
      .then((res) => {
        dispatch(checkListItemsActions.updateCheckListItem({id : id, data:res.data}))
      })
      .catch((error) => setError(true));
  }
  function additem() {
    if (newItemName !== "") {
      addCheckListItems(listId, newItemName)
        .then((res) => {
          dispatch(checkListItemsActions.createCheckListItem({id : id, data:res.data}));
          setNewItemName("");
        })
        .catch((error) => setError(true));
    }
  }
  function deleteitem(id) {
    deleteCheckListItems(listId, id)
      .then(() => {
        dispatch(checkListItemsActions.deleteCheckListItem({ListId:listId ,elementId:id }))
      })
      .catch((error) => setError(true));
  }
  useEffect(() => {
    getCheckListItems(id)
      .then((res) => {
        dispatch(
          checkListItemsActions.getCheckListItem({ id: id, data: res.data })
        )
      })
      .catch((error) => setError(true));
  }, []);
  return error ? (
    <Snackbars msg={"Error in CheckList Items"} />
  ) : (
    <Box>
      <ProgressBar listItems={state.checkListItem[id]} />
      {state.checkListItem[id] && state.checkListItem[id].map((ele) => {
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
