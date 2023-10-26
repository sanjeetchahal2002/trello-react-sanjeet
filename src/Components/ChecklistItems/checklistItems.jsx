import { Box,Button, Typography,Input} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import ProgressBar from '../ChecklistItems/ProgressBar'
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useEffect, useState } from 'react';

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;


function CheckListItems(props) {
    let globalId = 1;
    const [listItems,setListItems] = useState([])
    const [newItemName,setNewItemName] = useState('')
    let {id} = props.ele;
    let listId = id;
    let cardId = props.cardId
    function checked(items){
        let {e,itemId} = items
        let state = e.target.checked ? 'complete' : 'incomplete'
        axios.put(`https://api.trello.com/1/cards/${cardId}/checkItem/${itemId}?key=${apiKey}&token=${token}&state=${state}`)
        .then((res) => {
            listItems.map((ele) => {
                if(ele.id === itemId){
                    ele.state = res.data.state
                }
            })
            setListItems([...listItems])
        })
    }
    function additem(){
        axios.post(`https://api.trello.com/1/checklists/${listId}/checkItems?name=${newItemName}&key=${apiKey}&token=${token}`)
        .then((res) => setListItems((prev) => {
            return [...prev,res.data]
        }))
        setNewItemName('')
    }
    function deleteitem(id){
        axios.delete(`https://api.trello.com/1/checklists/${listId}/checkItems/${id}?key=${apiKey}&token=${token}`)
        .then(() => {
            let updateList = listItems.filter((ele) => ele.id !== id)
            setListItems(updateList)
        })
    }
    useEffect(()=>{
        axios.get(`https://api.trello.com/1/checklists/${id}/checkItems?key=${apiKey}&token=${token}`)
        .then((res) => setListItems(res.data))
    },[])
    return ( <Box key = {globalId++}>
        <ProgressBar listItems ={listItems}/>
        {listItems.map((ele) => {

            return (
                <Box id ={ele.id} display={"flex"} alignItems={"center"}>
                <Checkbox onChange={(e) => checked({e:e,itemId : ele.id})}/>
                <Typography>
                    {ele.name} 
                </Typography>
                <Button onClick={() => deleteitem(ele.id)}>
                <ClearIcon color='error' sx={{paddingLeft:"15px"}} />
                </Button>
                </Box>
           )
        })}
        <Input value={newItemName} onChange={(e) => setNewItemName(e.target.value)}></Input>
        <Button onClick={additem}>
            <AddIcon/>
            Create Item
        </Button>
    </Box>);
}
export default CheckListItems;