import { useState } from 'react';
import { Box,Modal,List,Button, ListItemText,Input, Card} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CheckListItems from '../ChecklistItems/checklistItems';
const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#89CFF3',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function CheckListModal(props) {
    let {openCheckList,listData,dispatch,name,setOpenCheckList,cardId} = props
    const [newCheckListName,setNewCheckListName] = useState('')
    const handleClose = () =>{ 
        setOpenCheckList((prev) =>{
            return false;
        })};
    function addCheckList(id){
            axios.post(`https://api.trello.com/1/cards/${id}/checklists?key=${apiKey}&token=${token}&name=${newCheckListName}`)
            .then((res) => {
                // setListData((prev) => {
                //     return [...prev,res.data]
                // })
                dispatch({type:'add',payload:res.data})
            })
    }    
    function deleteCheckList(id){
            axios.delete(`https://api.trello.com/1/checklists/${id}?key=${apiKey}&token=${token}`)
            .then(() => {
                let newList = listData.filter((ele) => ele.id !== id)
                // setListData(newList)
                dispatch({type:'delete',payload:newList})
            })
    }
    return (  <>
         <Modal
            open={openCheckList}
            onClose={handleClose}
          >
            <Box sx={style}>
                <Box>
                    {name.toUpperCase()}
                    <List>
                    {listData.map((ele,index) => {
                      return <ListItemText id = {index}>
                                <Card sx={{padding:"1rem", marginBottom:"1rem"}}>
                                { ele.name}
                                <Button color='error'  sx={{padding:"1rem"}} onClick={() => (deleteCheckList(ele.id)) }>
                                    <DeleteIcon/>
                                </Button>
                                <CheckListItems ele = {ele} cardId={cardId}/>
                                </Card>
                        </ListItemText>
                    })}
                    </List>
                </Box>
              <Input value = {newCheckListName} sx={{paddingTop:"5%"}} onChange={(e) => (setNewCheckListName(e.target.value))}/>
              <Button
                onClick={() => {
                    addCheckList(cardId)  
                    setNewCheckListName('')
                }}
              >
                <AddIcon/>
                Create CheckList
              </Button>
            </Box>
          </Modal>       
    </>);
}
export default CheckListModal;