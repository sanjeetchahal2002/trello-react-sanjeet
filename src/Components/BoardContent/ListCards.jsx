import { useEffect, useState } from 'react';
import {Box,Typography,Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import ModalBox from '../Modal/Modal';
import Checklist from '../CardContent/Checklist';
const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;


function ListCards(props){
    let {id} = props
    const [cards,setCards] = useState([]);
    const [open, setOpen] = useState(false);
    const [newCardName, setNewCardName] = useState('');
    const handleOpen = () => setOpen(true);
    
    
    function deleteCard(id){
      axios.delete(`https://api.trello.com/1/cards/${id}?key=${apiKey}&token=${token}`)
      let newCardList = cards.filter((ele)=> ele.id !== id)
      setCards(newCardList)
    }
    useEffect(()=>{
        axios.get(`https://api.trello.com/1/lists/${id}/cards?key=${apiKey}&token=${token}`)
        .then((res) => {
            setCards(res.data)
        })
    },[])
    
    return(
        <Box sx={{borderTop:'1px solid'}}>
            <Typography variant='body1' color={"darkblue"}>
                <>
                    {cards && cards.map((ele,index)=>{
                        return(
                             <Box display = {'flex'}  justifyContent='space-between' key ={index} sx={{margin:"1rem"}}>
                              <Checklist id = {ele.id} name = {ele.name}/> 
                                <Button onClick={()=>deleteCard(ele.id)}>
                                <DeleteIcon color='error'/>
                              </Button>
                             </Box> 
                        )
                    })}
                </>
            </Typography>
            <Button onClick={handleOpen}>
                    <AddIcon/>
                    Add Card
            </Button>
          <ModalBox setOpen={setOpen} newCardName={newCardName} setNewCardName={setNewCardName} open={open} setCards={setCards} buttonName={'Card'} url = {`https://api.trello.com/1/cards?idList=${id}&key=${apiKey}&token=${token}&name=${newCardName}`}/>
        </Box>
    )
}
export default ListCards;