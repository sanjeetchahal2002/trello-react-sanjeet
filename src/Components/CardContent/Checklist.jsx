import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import {Box,Button} from '@mui/material';
import CheckListModal from './checklistModal';

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const reducer = (listData,action) => {
    switch(action.type){
        case 'addNew' : 
            return action.payload;
        case 'add':
            return [...listData,action.payload]
        case 'delete':
            return action.payload;   
    } 

}

function Checklist(props) {
    let {id,name} = props
    const [openCheckList, setOpenCheckList] = useState(false);
    // const [listData,setListData] = useState([])
    const [listData,dispatch] = useReducer(reducer,[])
    const handleOpen = () => setOpenCheckList(true);
    useEffect(()=>{
        axios.get(`https://api.trello.com/1/cards/${id}/checklists?key=${apiKey}&token=${token}`)
        .then((res) => dispatch({type:'addNew',payload:res.data}))
    },[])     
    return (  
    <Box>
    <Button sx={{color:'black'}} onClick={handleOpen}>
            {name}
    </Button>
    <CheckListModal openCheckList={openCheckList} listData={listData} setOpenCheckList={setOpenCheckList} name={name} cardId = {id} dispatch= {dispatch}/>
    </Box>);
}

export default Checklist;