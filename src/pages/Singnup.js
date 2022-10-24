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
  CircularProgress,
  OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { signUp } from "../api/apiService";
import { validateSignup } from "../helpers/signupValidation";
import head from "../image/main.png";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { color } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*---------style-------- */

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    textAlign:'left',
    borderRadius: "30px",
    background: "rgba(255, 255, 255, 0.06)",
    color: "#FFFFFF",
    marginBottom: ".6rem",
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
      outline: "none",
    },
    "& .MuiSvgIcon-root": {
          color: "#fff",
        },
  },
};

const Singnup = () => {
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordd, setShowPasswordd] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPasswordd = () => {
    setShowPasswordd(!showPasswordd);
  };

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
      // loading true
      setLoading(true);
      const status = await signUp(Signup);
      // loading false
      setLoading(false);
      navigate("/");
      toast.success("good");
    } catch (e) {
      console.log(e);
      // toast(e.message && `you ar not sign up Try again`);
      toast.error("pleas enter valid info!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  return (
    <Box sx={{ fontStyle: "italic" }}>
      <Box>
        <Container sx={{ color: "#fff", width: { md: "100%", lg: "38%" } }}>
          <Box mt={5} sx={{ width: { xs: "25%" }, margin: "4rem auto 1rem " }}>
            <img src={head} alt="main-img" width="100%" />
          </Box>
          <Typography
            mb={3}
            sx={{ fontSize: { sm: "19px", lg: "19px" }, lineHeight: "2.3rem", letterSpacing:'normal' }}
          >
            Please provide following information to continue
          </Typography>
          <form>
            <FormControl fullWidth>
              <Box>
                <TextField
                  type="text"
                  sx={textFieldStyle}
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
                <TextField
                  type="text"
                  name="userName"
                  required
                  sx={textFieldStyle}
                  fullWidth
                  placeholder="User name"
                  id="userName"
                  onChange={handleInput}
                  autoComplete="off"
                />
              </Box>
              <Box>
                <TextField
                  type="email"
                  name="email"
                  fullWidth
                  sx={textFieldStyle}
                  required
                  placeholder="Email"
                  id="email"
                  onChange={handleInput}
                  autoComplete="off"
                />
              </Box>

              <Box>
                <TextField
                  style={{ marginBottom: ".1rem" }}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleInput}
                  placeholder="password"
                  fullWidth
                  sx={textFieldStyle}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility sx={{ color: "#fff" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "#fff" }} />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField
                  style={{ marginBottom: ".1rem" }}
                  id="outlined-adornment-password"
                  type={showPasswordd ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleInput}
                  placeholder="Enter your password"
                  fullWidth
                  sx={textFieldStyle}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordd}
                        edge="end"
                      >
                        {showPasswordd ? (
                          <Visibility sx={{ color: "#fff" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "#fff" }} />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField select
                  name="country"
                  placeholder="Select country"
                  id="country"
                  defaultValue="Select country"
                  fullWidth
                  onChange={handleInput}
                  variant='outlined'
                  required
                  sx={textFieldStyle}
                  // sx={{
                  //   height: "57px",
                  //   borderRadius: 37,
                  //   marginBottom: ".6rem",
                  //   border: "solid 1px #fff",
                  //   color: "#fff",
                  //   textAlign: "left",
                  //   backgroundColor: "rgba(255, 255, 255, 0.06)",
                  //   "& .MuiSvgIcon-root": {
                  //     color: "#fff",
                  //   },
                  // }}
                >
                  <MenuItem value="Select country">Select country</MenuItem>
                  <MenuItem value="pakistan">Pakistan</MenuItem>
                  <MenuItem value="india">India</MenuItem>
                </TextField>
              </Box>
              <Box>
                <TextField
                  type="text"
                  // name="mobileNumber"
                  fullWidth
                  sx={textFieldStyle}
                  placeholder="Enter your mobile number"
                  id="number"
                  // onChange={handleInput}
                  autoComplete="off"
                />
              </Box>
              <Box>
                <TextField
                  type="text"
                  name="referralLink"
                  required
                  fullWidth
                  sx={textFieldStyle}
                  id="enterid"
                  placeholder="Referral id"
                  onChange={handleInput}
                  autoComplete="off"
                />
              </Box>
              <Box sx={{ display: "flex", marginBottom: "1rem" }}>
                <FormControlLabel
                  sx={{ textAlign: "justify" }}
                  control={
                    <Checkbox
                      sx={{ color: "#fff", marginBottom: "1.3rem" }}
                      required
                      onChange={handleCheckBox}
                      name="isUSCitizen"
                      value="isUSCitizen"
                    />
                  }
                  label=<Typography
                    sx={{ fontSize: { sm: "15px", lg: "15px" } }}
                  >
                    I confirm that I am not a Politically Exposed Person who is
                    or has been entrusted with prominent public function.
                  </Typography>
                />
              </Box>
              <Box sx={{ display: "flex", marginBottom: "1rem" }}>
                <FormControlLabel
                  sx={{ textAlign: "justify" }}
                  control={
                    <Checkbox
                      required
                      onChange={handleCheckBox}
                      name="isClosedToPoliticallyExposed"
                      value="isClosedToPoliticallyExposed"
                      sx={{ color: "#fff", marginBottom: "1.3rem" }}
                    />
                  }
                  label=<Typography
                    sx={{ fontSize: { sm: "15px", lg: "15px" } }}
                  >
                    I confirm that I am not closely related to a Politically
                    Exposed Person who is or has been entrusted with prominent
                    public functions
                  </Typography>
                />
              </Box>
              <Box>
                <FormControlLabel
                  sx={{ textAlign: "justify", marginBottom: "1rem" }}
                  control={
                    <Checkbox
                      required
                      onChange={handleCheckBox}
                      name="isPoliticallyExposed"
                      value="isPoliticallyExposed"
                      sx={{ color: "#fff", marginBottom: "1.3rem" }}
                    />
                  }
                  label=<Typography
                    sx={{ fontSize: { sm: "15px", lg: "15px" } }}
                  >
                    I confirm that I am not a citizen/resident of USA, IRAN,
                    DPRK, CUBA and CRIMEAN REGION and/or other jurisdictions
                    and/or PEP and other groups of persons
                  </Typography>
                />
              </Box>
              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  sx={{ textAlign: "justify" }}
                  control={
                    <Checkbox
                      // value="isEighteenYearsOld"
                      // onChange={handleCheckBox}
                      // name="isEighteenYearsOld"
                      sx={{ color: "#fff", marginBottom: "1.3rem" }}
                    />
                  }
                  label=<Typography
                    sx={{ fontSize: { sm: "15px", lg: "15px" } }}
                  >
                    I certify that I am 18 years of age or older, and agree to
                    the terms & conditions and Privacy Policy.
                  </Typography>
                />
              </Box>
              <Button
                ariant="contained"
                onClick={handelSubmit}
                sx={{
                  background: "green",
                  width: "100%",
                  height: "60px",
                  color: "#fff",
                  fontStyle: "italic",
                  fontSize: 20,
                  lineHeight: "28px",
                  margin: "51px 0 32.2px 0",
                  borderRadius: 37,
                  border: "solid 1px rgba(181, 20, 42, 0.58)",
                  backgroundImage:
                    "linear-gradient(to right, #b11705, #5f2e79 99%)",
                }}
              >
                {loading ? <CircularProgress /> : "SIGNUP"}
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
      <ToastContainer />
    </Box>
  );
};

export default Singnup;
