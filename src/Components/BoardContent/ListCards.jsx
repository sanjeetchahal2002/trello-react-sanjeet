import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import ModalBox from "../Modal/Modal";
import Checklist from "../CardContent/Checklist";
import ErrorHandle from "../Error/Error";

import getCards from "../ApiCalls/getCards";
import deleteCards from "../ApiCalls/deleteCard";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

function ListCards(props) {
  let { id } = props;
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [newCardName, setNewCardName] = useState("");
  const handleOpen = () => setOpen(true);

  function deleteCard(id) {
    deleteCards(id)
      .then(() => {
        let newCardList = cards.filter((ele) => ele.id !== id);
        setCards(newCardList);
      })
      .catch((error) => setError(true));
  }

  useEffect(() => {
    getCards(id)
      .then((res) => {
        setCards(res.data);
      })
      .catch((error) => setError(true));
  }, []);

  return error ? (
    <ErrorHandle msg={"Error in Cards"} />
  ) : (
    <Box sx={{ borderTop: "1px solid" }}>
      <Typography variant="body1" color={"darkblue"}>
        <>
          {cards &&
            cards.map((ele, index) => {
              return (
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  key={index}
                  sx={{ margin: "1rem" }}
                >
                  <Checklist id={ele.id} name={ele.name} />
                  <Button onClick={() => deleteCard(ele.id)}>
                    <DeleteIcon color="error" />
                  </Button>
                </Box>
              );
            })}
        </>
      </Typography>
      <Button onClick={handleOpen}>
        <AddIcon />
        Add Card
      </Button>
      <ModalBox
        setOpen={setOpen}
        newCardName={newCardName}
        setNewCardName={setNewCardName}
        open={open}
        setCards={setCards}
        buttonName={"Card"}
        url={`https://api.trello.com/1/cards?idList=${id}&key=${apiKey}&token=${token}&name=${newCardName}`}
      />
    </Box>
  );
}
export default ListCards;
