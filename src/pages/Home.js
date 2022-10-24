import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate()

    const logOut = () => {
      localStorage.removeItem("token")
        navigate('/')
    }
  return (
    <Box sx={{marginTop:'10%'}}>
      <Typography variant="h3" gutterBottom color={'#fff'} sx={{fontSize:{xs:'20px',md:'50px'}}}>WELCOME YOR ARE </Typography>
      <Typography  variant="h3" gutterBottom color={'#fff'} sx={{fontSize:{xs:'20px',md:'50px'}}}> LOGIN</Typography>
      
      <Button
            endIcon={<SendIcon />}
            onClick={logOut}
            ariant="contained"
            sx={{
              marginBottom: "1rem",
              height:{xs:'40px',md:'70px'},
              color: "#fff",
              fontSize: {xs:'20px',md:'30px'},
              marginTop:'10%',
              fontStyle:'italic',
              lineHeight: "28px",
              borderRadius: 37,
              border: "solid 1px rgba(181, 20, 42, 0.58)",
              backgroundImage:
                "linear-gradient(to right, #b11705, #5f2e79 99%)",
            }}
          >
            LOGOUT
          </Button>
    </Box>
  );
};

export default Home;
