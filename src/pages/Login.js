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
  InputLabel,
  OutlinedInput,
  LinearProgress,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, getInfo, signUp } from "../api/apiService";
import { validateSignin } from "../helpers/signinValidation";
import head from "../image/main.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
  };

  const awaitData = async (login) => {
    try {
      setLoading(true);
      const { countryName, countryCode, ip } = await getInfo();
      const status = await signIn(login, countryName, countryCode, ip);
      toast.success('🦄 Wow so easy!', {
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
      localStorage.setItem("token", status.data.token);
      navigate("/home");
    } catch (e) {
      console.log(e);
      toast.error(e.message, {
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
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate("/home");
    }
  });

  return (
    <Box sx={{ fontStyle: "italic" }}>
      <Container sx={{ color: "#fff", width: { md: "100%", lg: "40%" } }}>
        <Box mt={5} sx={{ width: { xs: "25%" }, margin: "4rem auto 1rem " }}>
          <img src={head} alt="main-img" width="100%" />
        </Box>
        <Typography
          sx={{
            margin: "2rem 0 1.6rem 0",
            fontSize: { sm: "19px", lg: "19px" },
          }}
        >
          login to your account
        </Typography>

        <form>
          <FormControl fullWidth>
            <Box>
              <TextField
                type="text"
                name="email"
                onChange={handleInput}
                fullWidth
                sx={textFieldStyle}
                placeholder="Email Address"
                autoComplete="off"
              />
            </Box>
            <TextField
              style={{ marginBottom: ".6rem" }}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={handleInput}
              name="password"
              placeholder="Enter your password"
              fullWidth
              sx={textFieldStyle}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box mb="3rem" sx={{ display: "flex" }}>
                <Checkbox sx={{ color: "#fff" }} />
                <Typography
                  mt={1}
                  sx={{
                    cursor: "pointer",
                    fontSize: { sm: "15px", lg: "15px" },
                  }}
                >
                  Remember me
                </Typography>
              </Box>
              <Typography
                mt={1}
                sx={{ cursor: "pointer", fontSize: { sm: "15px", lg: "15px" } }}
              >
                Forgot my password
              </Typography>
            </Box>
            <Button
              ariant="contained"
              onClick={handelSubmit}
              sx={{
                marginBottom: "1rem",
                width: "100%",
                height: "60px",
                color: "#fff",
                fontSize: 20,
                fontStyle: "italic",
                lineHeight: "28px",
                borderRadius: 37,
                border: "solid 1px rgba(181, 20, 42, 0.58)",
                backgroundImage:
                  "linear-gradient(to right, #b11705, #5f2e79 99%)",
              }}
            >
              {loading ? <CircularProgress /> : "Login"}
            </Button>
          </FormControl>
        </form>
        <Typography sx={{ mb: "3rem", fontSize: { sm: "15px", lg: "15px" } }}>
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
      <ToastContainer />
    </Box>
  );
};

export default Login;

/*---------       style       ---------*/

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
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
  },
};
