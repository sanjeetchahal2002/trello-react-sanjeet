import { AppBar, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function Navbar(){
    return(
       <AppBar position="relative" sx={{marginBottom:"50px", backgroundColor:"#89CFF3"}} >
            <Toolbar sx={{display:"flex", justifyContent:'center'}}>
                <MenuIcon sx={{position:'absolute',left:'1%'}}/>
                <img src= "../../public/trello-official.svg" width="80px"/>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;