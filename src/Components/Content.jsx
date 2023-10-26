import { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, CardMedia, Button} from '@mui/material';
import { Link } from 'react-router-dom';

import axios from 'axios';

import AddIcon from '@mui/icons-material/Add';
import ModalBox from './Modal/Modal';
import Loader from '../Components/Loader/Loader'


const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN



function Content() {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  const [open, setOpen] = useState(false);
  const[loader,setLoader] = useState(true)
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    axios
      .get(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`)
      .then((res) => {
        setCards(res.data);
        setTimeout(()=>{
          setLoader(false);
        },2000)
      });
  }, []);


  return (
    <>
      {loader ? <Loader/> : <Box display={'flex'} flexWrap={'wrap'} columnGap={3} rowGap={3} justifyContent={'space-evenly'} p={3}  >
        {cards.map(({ id, name, prefs }) => {
          const cardLinkStyle = {
            textDecoration: 'none', 
          };

          return (
            <Link key={id} to={`/boards/${id}`} style={cardLinkStyle}>
              <Card sx={{ padding: '2rem', height: '15rem', width: '15rem', backgroundColor:"#ffffff"}}>
                <CardMedia
                  component="img"
                  image={prefs.backgroundImage ? prefs.backgroundImage : 'https://source.unsplash.com/random'}
                  width="100px"
                  height="150px"
                />
                <CardContent image={`${prefs.backgroundImage}`}>
                  <Typography variant="h5" component="span" color="DarkBlue">
                    {name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        <Card sx={{ padding: '2rem', height: '15rem', width: '15rem' }}>
          <Button onClick={handleOpen}>
            <AddIcon />Create Board
          </Button>
          <ModalBox setOpen={setOpen} newCardName={newCardName} setNewCardName={setNewCardName} open={open} setCards={setCards} buttonName={'Board'} url ={`https://api.trello.com/1/boards/?name=${newCardName}&key=${apiKey}&token=${token}`}/>
        </Card>
      </Box>}
    </>
  );
}

export default Content;
