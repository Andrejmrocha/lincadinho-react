import {
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  IconButton,
  debounce,
  Button,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Message from "../Util/Message";

import { useSelector, useDispatch } from "react-redux";

import { login, reset } from "../../slices/authSlice";

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, auth } = useSelector((state) => state.auth);

  const [helperText, setHelperText] = useState("");
  const [visible, setVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const debouncedValidateEmail = useCallback(
    debounce((emailValue) => {
      setEmailError(!validateEmail(emailValue));
    }, 500),
    []
  );

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    debouncedValidateEmail(emailValue);
  };

  const handleShowPassword = () => {
    setVisible(!visible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      senha: password,
    };

    dispatch(login(user));
  };

  useEffect(() => {
    let timer;
    if (error) {
      console.log("tem erro: ", error);
      timer = setTimeout(() => {
        dispatch(reset());
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [error, dispatch]);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          maxWidth: "50%",
          justifyContent: "center",
          backgroundColor: "#fffffff2",
          padding: "1rem",
          borderRadius: ".5rem",
          marginTop: "5rem",
          boxShadow: "rgba(0, 0, 0, 0.308) 4px 8px 12px",
        }}
      >
        <FormControl sx={{ width: "25vw" }}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              margin: "1rem",
              textAlign: "center",
              color: "#000",
            }}
          >
            Login
          </FormLabel>
          <TextField
            label="Email"
            placeholder="Digite seu email"
            required
            type="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="email"
            error={emailError}
            helperText={emailError ? "Email inválido" : " "}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#abacad",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.75rem",
              },
            }}
          ></TextField>
          <TextField
            label="Senha"
            placeholder="Digite sua senha"
            required
            type={visible ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Alternar visibilidade da senha"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#abacad",
              },
            }}
            margin="normal"
          ></TextField>
          {!loading && (
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "25%", margin: "1rem auto" }}
            >
              Login
            </Button>
          )}
          {loading && (
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "25%", margin: "1rem auto" }}
              disabled
            >
              Aguarde
            </Button>
          )}
          {error && <Message message={error} type="error" />}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Não tem uma conta?{" "}
            <Link href="/registro" underline="hover">
              Cadastre-se
            </Link>
          </Typography>
        </FormControl>
      </Box>
    </>
  );
};

export default LoginForm;
