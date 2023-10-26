import { Box,Modal,Input,Button} from '@mui/material';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ModalBox(props){
    let {setOpen,newCardName,setNewCardName,open,setCards,buttonName,url} = props
    const handleClose = () => setOpen(false);
    function updateNewCardName(e) {
        setNewCardName(e.target.value);
    }
   return ( <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <Input Value={newCardName} onChange={updateNewCardName} placeholder={`Enter ${buttonName} Name`} />
              <Button
                onClick={() => {  
                    axios.post(`${url}`)
                    .then((res) => {
                      setCards((prev) => {
                        return [...prev, res.data];
                      });
                    });
                  handleClose();
                }}
              >
                Create {buttonName}
              </Button>
            </Box>
          </Modal>
   )  
}
export default ModalBox;