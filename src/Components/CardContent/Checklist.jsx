import { useEffect, useReducer, useState } from "react";
import { Box, Button } from "@mui/material";
import CheckListModal from "./ChecklistModal";
import Snackbar from "../Error/ErrorPopUp";
import getCheckList from "../ApiCalls/getCheckList";

const reducer = (listData, action) => {
  switch (action.type) {
    case "addNew":
      return action.payload;
    case "add":
      return [...listData, action.payload];
    case "delete":
      let newList = listData.filter((ele) => ele.id !== action.payload);
      return newList;
  }
};
function Checklist(props) {
  let { id, name } = props;
  const [openCheckList, setOpenCheckList] = useState(false);
  const [listData, dispatch] = useReducer(reducer, []);
  const [error, setError] = useState(false);
  const handleOpen = () => setOpenCheckList(true);
  useEffect(() => {
    getCheckList(id)
      .then((res) => dispatch({ type: "addNew", payload: res.data }))
      .catch((error) => setError(true));
  }, []);
  return error ? (
    <Snackbar msg={"Error in CheckList"} />
  ) : (
    <Box>
      <Button sx={{ color: "black" }} onClick={handleOpen}>
        {name}
      </Button>
      <CheckListModal
        openCheckList={openCheckList}
        listData={listData}
        setOpenCheckList={setOpenCheckList}
        name={name}
        cardId={id}
        dispatch={dispatch}
      />
    </Box>
  );
}
export default Checklist;
