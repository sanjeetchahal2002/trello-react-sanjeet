import { Box, Modal, Input, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { boardActions } from "../Store/boardSlice";
import { listActions } from "../Store/listSlice";
import {cardActions} from '../Store/cardSlice'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalBox(props) {
  let {
    setOpen,
    newCardName,
    setNewCardName,
    open,
    buttonName,
    setError,
    url,
  } = props;
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  function updateNewCardName(e) {
    setNewCardName(e.target.value);
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Input
          value={newCardName}
          onChange={updateNewCardName}
          placeholder={`Enter ${buttonName} Name`}
        />
        <Button
          onClick={() => {
            axios
              .post(`${url}`)
              .then((res) => {
                if(buttonName === 'Board'){
                  dispatch(boardActions.createBoard(res.data))
                }else if(buttonName === 'List'){
                  dispatch(listActions.createList(res.data))
                }else if(buttonName === 'Card'){
                  dispatch(cardActions.createCard(res.data))
                }
                setNewCardName('')
              })
              .catch((error) => {
                setError(true);
              });
            handleClose();
          }}
        >
          Create {buttonName}
        </Button>
      </Box>
    </Modal>
  );
}
export default ModalBox;
