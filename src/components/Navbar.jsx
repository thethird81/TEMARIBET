import React from 'react';
import { Stack,Typography,Button,Box,Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';


import  logo  from "../utils/keremela.jpg";
import img from "../utils/abye2.png"
import { SearchBar } from "./";

const Navbar = () =>
{

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const open = Boolean(anchorEl);
  const openUser = Boolean(anchorElUser);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {

    setAnchorEl(null);
  };
  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUser = () => {

    setAnchorElUser(null);
  };

  return (
  <Stack direction="row"  alignItems="center" p={2} sx={{ position:  "sticky",zIndex: 1300, background: '#000', top: 0, justifyContent: "space-between" }}>

     <Stack direction="row">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<MenuIcon />}
      >

      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',

        }}
        sx={{ color: "black" ,fontWeight:"bold" }}
      >
        <MenuItem onClick={handleClose}
            component={Link}
            to="/QuizeList">EXAM ROOM</MenuItem>
        <MenuItem onClick={handleClose}  component={Link}
            to="/QuestionForm">ADD QUESTION</MenuItem>
        <MenuItem onClick={handleClose}>PARENT</MenuItem>
      </Menu>

      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" fontWeight="bold" mb={2} sx={{ color: "red" }}>
        <img src={logo} alt="logo" height={25}  width={35}/> KERE
        </Typography><Typography variant="h5" sx={{ color: "blue" }}>MELA</Typography>
      </Link>
      </Stack>


       {/* <Box  margin={2}>

       <Button
           variant="contained"
           style={{ backgroundColor: 'blue' }}
           component={Link}
           to="/QuizeList"
       >
           <Typography variant='h5'> Class Room</Typography>

       </Button>
       </Box> */}

       <div>
        <Avatar sx={{ width:50, height: 50 }}
       aria-controls={openUser ? 'basic-menu-user' : undefined}
       aria-haspopup="true"
       aria-expanded={openUser ? 'true' : undefined}
       onClick={handleClickUser}>
        <img src={img} alt="logo" height={50}  width={50}/>
       </Avatar>

       <Menu
        id="basic-menu-user"
        anchorEl={anchorElUser}
        open={openUser}
        onClose={handleCloseUser}
        MenuListProps={{
          'aria-labelledby': 'basic-button',

        }}
        sx={{ color: "black" ,fontWeight:"bold" }}
      >
        <MenuItem onClick={handleCloseUser}>Register</MenuItem>
        <MenuItem onClick={handleCloseUser}>Login</MenuItem>

      </Menu></div>

 </Stack>

);
};

export default Navbar;