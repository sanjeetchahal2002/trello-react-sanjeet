import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import {Card,Typography,Box, Button} from '@mui/material';
import ListCards from "./ListCards";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ModalBox from '../Modal/Modal';

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN

export default function BoardList(){
    const {id} = useParams()
    const [list,setList] = useState([])
    const [open, setOpen] = useState(false);
    const [newListName,setNewListName]=useState('')
    const handleOpen = () => setOpen(true);

    
    function deleteList(Listid){
        axios.put(`https://api.trello.com/1/lists/${Listid}/closed?key=${apiKey}&token=${token}&value=true`)
        const updateList = list.filter((ele) => ele.id!=Listid)
        setList(updateList)
    }
    
    
    useEffect( ()=>{
        axios.get(`https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${token}`)
        .then((res)=>{
            setList(res.data)
        })
    },[])
    
    return (
        <Box sx={{minHeight:"100vh",padding:"1rem"}}>
            <Link to='/'>
                <Button  sx={{marginLeft:'3rem',color:"darkblue"}}  >back</Button>
            </Link>
           < Box display={'flex'} flexDirection = "row" flexWrap={"wrap"} justifyContent={'space-evenly'} columnGap={2} rowGap={2} m={2}>
           {list.length >= 0  && list.map((ele,index) => {
                return (
                    <Card key = {index} sx={{padding:"1rem",minHeight:"15rem", width:"10rem"}}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography  varient="h5" color={"darkblue"}>
                                {ele.name}
                            </Typography>
                                <Button onClick={()=>{deleteList(ele.id)}}>
                                <DeleteIcon color='error'/>
                                </Button>
                        </Box>
                        <ListCards id = {ele.id}/>
                    </Card>
                )
            })}
            <Card sx={{padding:"1rem", height:"15rem", width:"10rem"}}>
            <Button onClick={handleOpen}><AddIcon/>Create List</Button>
            <ModalBox setOpen={setOpen} newCardName={newListName} setNewCardName={setNewListName} open={open} setCards={setList} buttonName={'List'} url = {`https://api.trello.com/1/lists?name=${newListName}&idBoard=${id}&key=${apiKey}&token=${token}`}/>
            </Card>
            </Box>
        </Box>  
    )
}