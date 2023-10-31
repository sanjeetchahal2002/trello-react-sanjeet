import { useState } from "react";
import {
  Box,
  Modal,
  List,
  Button,
  ListItemText,
  Input,
  Card,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckListItems from "../ChecklistItems/ChecklistItems";
import Snackbars from "../Error/ErrorPopUp";
import addCheckLists from "../ApiCalls/addCheckList.js";
import deleteCheckLists from "../ApiCalls/deleteCheckList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#89CFF3",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function CheckListModal(props) {
  let { openCheckList, listData, dispatch, name, setOpenCheckList, cardId } =
    props;
  const [newCheckListName, setNewCheckListName] = useState("");
  const [error, setError] = useState(false);
  const handleClose = () => {
    setOpenCheckList((prev) => {
      return false;
    });
  };
  function addCheckList(id) {
    addCheckLists(id, newCheckListName)
      .then((res) => {
        dispatch({ type: "add", payload: res.data });
      })
      .catch((error) => setError(true));
  }
  function deleteCheckList(id) {
    deleteCheckLists(id)
      .then(() => {
        dispatch({ type: "delete", payload: id });
      })
      .catch((error) => setError(true));
  }
  return error ? (
    <Snackbars msg={"Error in CheckList"} />
  ) : (
    <>
      <Modal open={openCheckList} onClose={handleClose}>
        <Box sx={style}>
          <Box>
            {name.toUpperCase()}
            <List>
              {listData.map((ele, index) => {
                return (
                  <ListItemText key={index}>
                    <Card sx={{ padding: "1rem", marginBottom: "1rem" }}>
                      {ele.name}
                      <Button
                        color="error"
                        sx={{ padding: "1rem" }}
                        onClick={() => deleteCheckList(ele.id)}
                      >
                        <DeleteIcon />
                      </Button>
                      <CheckListItems ele={ele} cardId={cardId} />
                    </Card>
                  </ListItemText>
                );
              })}
            </List>
          </Box>
          <Input
            value={newCheckListName}
            sx={{ paddingTop: "5%" }}
            onChange={(e) => setNewCheckListName(e.target.value)}
          />
          <Button
            onClick={() => {
              addCheckList(cardId);
              setNewCheckListName("");
            }}
          >
            <AddIcon />
            Create CheckList
          </Button>
        </Box>
      </Modal>
    </>
  );
}
export default CheckListModal;
