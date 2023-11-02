import { useState } from "react";
import { Box, Button } from "@mui/material";

import CheckListModal from "./ChecklistModal";
import Snackbar from "../Error/ErrorPopUp";

function Checklist(props) {
  let { id, name } = props;
  
  const [openCheckList, setOpenCheckList] = useState(false);
  const [error, setError] = useState(false);

  const handleOpen = () => setOpenCheckList(true);
  return error ? (
    <Snackbar msg={"Error in CheckList"} />
  ) : (
    <Box>
      <Button sx={{ color: "black" }} onClick={handleOpen}>
        {name}
      </Button>
      <CheckListModal
        openCheckList={openCheckList}
        setOpenCheckList={setOpenCheckList}
        name={name}
        cardId={id}
        setError = {setError}
      />
    </Box>
  );
}
export default Checklist;
