import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { signUp } from "../api/apiService";
import { validateSignup } from "../helpers/signupValidation";
import head from "../image/main.png";

/*---------style-------- */

const StyleTextField = styled(TextField)(() => ({
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
  }
}));

const Singnup = () => {
  const [Signup, setSingup] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    referralLink: "https://staging.v2f.exchange/signup/5E13-WX4P-U684",
    userName: "",
    // mobileNumber: "",
    isUSCitizen: false,
    isPoliticallyExposed: false,
    isClosedToPoliticallyExposed: false,
    // isEighteenYearsOld: false,
  });

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

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
    setSingup({ ...Signup, [name]: value });
  };

  const handleCheckBox = (e, checked) => {
    const name = e.target.name;
    setSingup({ ...Signup, [name]: checked });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const { isValidated, error } = validateSignup(Signup);
    if (isValidated) {
      awaitData();
    } else {
      setErrorMessage(error);
      handleClick();
      return;
    }
  };

  const awaitData = async () => {
    try {
      const status = await signUp(Signup);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{fontStyle:'italic'}}>
      <Container sx={{ color: "#fff", width: { md: "100%", lg: "38%" } }}>
        <Box mt={5} mb={3} >
          <img src={head} alt="main img" sstyle={{ height: "10vh", width: "10vh" }} />
        </Box>
        <Typography mb={3} sx={{ fontSize:{sm:'20px', lg:'25px'}, lineHeight: "2.3rem" }}>
          Please provide following information to continue
        </Typography>
        <form>
          <FormControl fullWidth>
            <Box>
              <StyleTextField
                type="text"
                required
                name="firstName"
                fullWidth
              placeholder="Full name"
                id="name"
                onChange={handleInput}
                autoComplete="off"
              />
            </Box>
            <Box>
              <StyleTextField
                type="text"
                name="userName"
                required
                fullWidth
                placeholder="User name"
                id="userName"
                onChange={handleInput}
                autoComplete="off"
              />
            </Box>
            <Box>
              <StyleTextField
                type="email"
                name="email"
                fullWidth
                required
                placeholder="Email"
                id="email"
                onChange={handleInput}
                autoComplete="off"
              />
            </Box>
            <Box>
              <StyleTextField
                type="password"
                name="password"
                placeholder="password"
                fullWidth
                required
                id="password"
                onChange={handleInput}
                autoComplete="off"
              />
            </Box>
            <Box>
              <StyleTextField
                type="password"
                name="confirmPassword"
                placeholder="conforim password"
                fullWidth
                required
                id="conforim"
                onChange={handleInput}
                autoComplete="off"
              />
            </Box>
            <Box>
              <Select
                name="country"
                placeholder="Select country"
                id="country"
                defaultValue="pakistan"
                fullWidth
                onChange={handleInput}
                required
                style={{
                  height: "73px",
                  borderRadius: 37,
                  marginBottom:'2.4rem',
                  border: "solid 1px #fff",
                  color:"#fff",
                  backgroundColor: "rgba(255, 255, 255, 0.06",
                }}
              >
                <MenuItem value="" disabled>
                  Please select
                </MenuItem>
                <MenuItem value="pakistan">Pakistan</MenuItem>
                <MenuItem value="india">India</MenuItem>
              </Select>
            </Box>
            <Box>
              <StyleTextField
                type="text"
                // name="mobileNumber"
                fullWidth
                placeholder="Enter your mobile number"
                id="number"
                // onChange={handleInput}
                autoComplete="off"
              />
            </Box>
            <Box>
              <StyleTextField
                type="text"
                name="referralLink"
                required
                fullWidth
                id="enterid"
                placeholder="Referral id"
                onChange={handleInput}
                autoComplete="off"
              />
            </Box>
            <Box sx={{ display: "flex", marginBottom:'1rem' }}>
              <FormControlLabel
              sx={{textAlign:'justify'}}
                control={
                  <Checkbox
                    sx={{ color: "#fff",marginBottom:'1.3rem' }}
                    required
                    onChange={handleCheckBox}
                    name="isUSCitizen"
                    value="isUSCitizen"
                  />
                }
                label= <Typography sx={{fontSize:{sm:'15px', lg:'18px'}}}>I confirm that I am not a Politically Exposed Person who is or
                has been entrusted with prominent public function.</Typography>
              />
            </Box>
            <Box sx={{ display: "flex", marginBottom:'1rem' }}>
              <FormControlLabel
              sx={{textAlign:'justify'}}
                control={
                  <Checkbox
                    required
                    onChange={handleCheckBox}
                    name="isClosedToPoliticallyExposed"
                    value="isClosedToPoliticallyExposed"
                    sx={{ color: "#fff",marginBottom:'1.3rem'  }}
                  />
                }
                label=<Typography sx={{fontSize:{sm:'15px', lg:'18px'}}}>I confirm that I am not closely related to a Politically
                  Exposed Person who is or has been entrusted with prominent 
                  public functions</Typography> 
              />
            </Box>
            <Box >
              <FormControlLabel
                sx={{textAlign:'justify', marginBottom:'1rem'}}
                control={
                  <Checkbox
                    required
                    onChange={handleCheckBox}
                    name="isPoliticallyExposed"
                    value="isPoliticallyExposed"
                    sx={{ color: "#fff" ,marginBottom:'1.3rem' }}
                  />
                }
                label=<Typography sx={{fontSize:{sm:'15px', lg:'18px'}}}>I confirm that I am not a citizen/resident of USA, IRAN, DPRK,
                  CUBA and CRIMEAN REGION and/or other jurisdictions and/or PEP
                  and other groups of persons</Typography>
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                sx={{textAlign:'justify'}}
                control={
                  <Checkbox
                    // value="isEighteenYearsOld"
                    // onChange={handleCheckBox}
                    // name="isEighteenYearsOld"
                    sx={{ color: "#fff",marginBottom:'1.3rem'  }}
                  />
                }
                label=<Typography sx={{fontSize:{sm:'15px', lg:'18px'}}}>I certify that I am 18 years of age or older, and agree to the
                  terms & conditions and Privacy Policy.</Typography>
              />
            </Box>
            <Button
              ariant="contained"
              onClick={handelSubmit}
              sx={{
                background: "green",
                width: "100%",
                height: "73px",
                color: "#fff",
                fontStyle:'italic',
                fontSize: 26,
                lineHeight: "28px",
                margin: "51px 0 32.2px 0",
                borderRadius: 37,
                border: "solid 1px rgba(181, 20, 42, 0.58)",
                backgroundImage:
                  "linear-gradient(to right, #b11705, #5f2e79 99%)",
              }}
            >
              SIGNUP
            </Button>
          </FormControl>
        </form>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Singnup;

