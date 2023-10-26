import { useEffect, useState } from 'react';
import axios from 'axios';
import {Box,Button} from '@mui/material';
import CheckListModal from './checklistModal';

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;


function Checklist(props) {
    let {id,name} = props
    const [openCheckList, setOpenCheckList] = useState(false);
    const [listData,setListData] = useState([])
    const handleOpen = () => setOpenCheckList(true);
    useEffect(()=>{
        axios.get(`https://api.trello.com/1/cards/${id}/checklists?key=${apiKey}&token=${token}`)
        .then((res) => setListData(res.data))
    },[])     
    return (  
    <Box>
    <Button sx={{color:'black'}} onClick={handleOpen}>
            {name}
    </Button>
    <CheckListModal openCheckList={openCheckList} listData={listData} setOpenCheckList={setOpenCheckList} name={name} setListData={setListData} cardId = {id}/>
    </Box>);
}

export default Checklist;