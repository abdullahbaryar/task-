import {
  AppBar,
  Box,
  Button,
  Input,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import logo from "../image/v2flogo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const MenuItems = [
    { Name: "Home", Link: "#" },
    { Name: "Announcments", link: "#" },
    { Name: "VIP fan token", link: "#" },
    { Name: "Wallet", link: "#" },
    { Name: "History", link: "#" },
    { Name: "Exchange", link: "#" },
    { Name: "Dashboard", link: "#" },
    { Name: "Help", link: "#" },
  ];
  const [open, SetOpen] = useState(false);
  return (
    
    <AppBar sx={{ boxShadow: 'none' ,background: "transparent" }} position="static">
      <StyledToolbar>
      
        <Box sx={{mt:'1rem' ,maxWidth:{xs:"110px",sm:"150px",md:"200px"}}}>
          <Link to='/home'> <img src={logo} alt="" width="100%"  /></Link>
        </Box>
        
        <MenuBox sx={{ display: { xs: "none", sm: "none", md: "none",xl:'flex' } }}>
          {MenuItems.map((item) => (
            <Typography
              sx={{ cursor: "pointer", fontSize: 20, lineHeight: "28px" }}
              key={item.Name}
            >
              {item.Name}
            </Typography>
          ))}
        </MenuBox>
        <SearchBox>
          <Typography 
            sx={{
              marginTop: "20px",
              height: 30,
              fontSize: 22,
              borderLeft: "1px solid #dddddd",
              padding: "0 2.3rem",
              display:{xs:'none', sm:'none', md:'block'}
            }}
          >
            ENGLISH
          </Typography>
          <Link to="/singnup">
          <Button
            ariant="contained"
            sx={{
              background: "linear-gradient(115deg, #662a74 6%, #802255 95%)",
              color: "#fff",
              fontSize: 18,
              lineHeight: "28px",
              width: 177,
              height: 70,
              marginRight:"2.5rem",
              display:{xs:'none', sm:'none', md:'block'}
            }}
          >
            Get Started
          </Button>
          </Link>
          <MenuIcon
            sx={{
              color: "white",
              height: "60px",
              display: { xs: "block", sm: "block", md: "block",lg:'block',xl:'none' },
            }}
            onClick={() => SetOpen(!open)}
          />
        </SearchBox>
      </StyledToolbar>
      <Menu
        sx={{color:'greenyellow'}}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={() => SetOpen(!open)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: '100%', height: "70vh", background:'linear-gradient(115deg, #662a74 6%, #802255 95%)', color:'#fff' }}>
          {MenuItems.map((item) => (
            <MenuItem sx={{ cursor: "pointer", fontSize: 20 }} key={item.Name}>
              {item.Name}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </AppBar>
  );
};

export default Navbar;

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  boxShadow:'none',
});
const SocialBox = styled(Box)({
  margin: "1rem 0 1rem 0",
  maxWidth:"110px",
});
const MenuBox = styled(Box)({
  display: "flex",
  gap: 30,
});
const SearchBox = styled(Box)({
  display: "flex",
  gap: 5,
});

