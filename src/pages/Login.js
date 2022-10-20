import {
  Box,
  Button,
  Checkbox,
  Typography,
  Container,
  TextField,
  Input,
  FormControl,
  IconButton,
  Snackbar,
  Alert,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, getInfo, signUp } from "../api/apiService";
import { validateSignin } from "../helpers/signinValidation";
import head from "../image/main.png";

const Login = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate()
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setlogin({ ...login, [name]: value });
  };
  
  const handelSubmit = (e) => {
    e.preventDefault();
    const { isValidated, error } = validateSignin(login);
    if (isValidated) {
      awaitData(login);
    } else {
      setErrorMessage(error);
      handleClick();
      return;
    }
    if(awaitData(login)){
      navigate('/home')
    }else{
      alert('sdfghjkl')
    }
    
  };

  const awaitData = async (login) => {
    try {
      const { countryName, countryCode, ip } = await getInfo();
      const status = await signIn(login, countryName, countryCode, ip)
      alert('successfully login',status);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{fontStyle:'italic'}}>
      <Container sx={{ color: "#fff", width: { md: "100%", lg: "40%" } }}>
        <Box mt={5} sx={{ borderRadius: "50%" }}>
          <img src={head} alt="main-img" />
        </Box>
        <Typography sx={{margin:'2rem 0 1.6rem 0', fontSize:{sm:'20px', lg:'25px'}}}>login to your account</Typography>
        <form>
        <FormControl fullWidth>
          <Box>
            <StyleTextField
              type="text"
              name="email"
              onChange={handleInput}
              fullWidth
              placeholder="Email Address"
              autoComplete="off"
            />
          </Box>
          <Box>
            <StyleTextField
              type="password"
              name="password"
              onChange={handleInput}
              fullWidth
              placeholder="Password"
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box mb="3rem" sx={{ display: "flex" }}>
              <Checkbox sx={{ color: "#fff" }} />
              <Typography mt={1} sx={{ cursor: "pointer", fontSize:{sm:'15px', lg:'18px'} }}>
                Remember me
              </Typography>
            </Box>
            <Typography mt={1} sx={{ cursor: "pointer", fontSize:{sm:'15px', lg:'18px'} }}>
              Forgot my password
            </Typography>
          </Box>
          <Button
            ariant="contained"
            onClick={handelSubmit}
            sx={{
              marginBottom: "1rem",
              width: "100%",
              height: "73px",
              color: "#fff",
              fontSize: 26,
              fontStyle:'italic',
              lineHeight: "28px",
              borderRadius: 37,
              border: "solid 1px rgba(181, 20, 42, 0.58)",
              backgroundImage:
                "linear-gradient(to right, #b11705, #5f2e79 99%)",
            }}
          >
            LOGIN
          </Button>
        </FormControl>
        </form>
        <Typography sx={{ mb: "3rem", fontSize:{sm:'15px', lg:'18px'} }}>
          If you don't have an account
          <Link style={{ color: "#fff", marginLeft: "8px" }} to="/singnup">
            Signup
          </Link>
        </Typography>
      </Container>
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;

/*---------       style       ---------*/

export const StyleTextField = styled(TextField)(() => ({
  '& input': {
    paddingLeft: '30px',
    color:'#fff',
    marginBottom:'3rem',
    
  },
  '& fieldset': {
    borderRadius: '37px',
    height: "73px",
    border: "solid 1px #fff",
    background:"rgba(255, 255, 255, 0.06)",
    color:'#fff',
  }, 
}));