import {
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  IconButton,
  debounce,
  Button,
  Box,
  NativeSelect,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useCallback, useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Message from "../Util/Message";

import { register, reset } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import organizationService from "../../services/organizationService";

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("STARTER");
  const [visible, setVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [open, setOpen] = useState(false);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const { loading, error, success, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (organization === "new") {
      setRole("ADMIN");
    }

    setShouldSubmit(true);
  };

  useEffect(() => {
    if (shouldSubmit) {
      const user = {
        nome: name,
        sobrenome: lastName,
        email: email,
        senha: password,
        role: role,
        organizacao: organization === "new" ? null : organization,
      };
      try {
        dispatch(register(user));
        setShouldSubmit(false);
      } catch (error) {
        console.error("Erro ao registrar: ", error);
      }
    }
  }, [
    shouldSubmit,
    role,
    dispatch,
    name,
    lastName,
    email,
    password,
    organization,
  ]);

  useEffect(() => {
    if (success) {
      setOpen(true);
      dispatch(reset());
    }
  }, [success, dispatch]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await organizationService.getOrganizations();
        const organizationsWithOption = [
          { id: "new", nome: "Nova organização" },
          ...data.data.content,
        ];
        setOrganizations(organizationsWithOption);
      } catch (err) {
        console.log("Erro ao buscar organizações: ", err);
      }
    };

    fetchOrganizations();
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      <Box
        component="form"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          justifyContent: "center",
          backgroundColor: "#fffffff2",
          padding: "1rem",
          borderRadius: ".5rem",
          marginTop: "5rem",
          boxShadow: "rgba(0, 0, 0, 0.308) 4px 8px 12px",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ width: "100%" }}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              margin: "1rem",
              textAlign: "center",
              color: "#000",
            }}
          >
            Cadastre-se
          </FormLabel>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: ".8rem",
            }}
          >
            <TextField
              label="Nome"
              placeholder="Digite seu nome"
              required
              type="text"
              value={name}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#abacad",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "0.75rem",
                },
                width: "28%",
              }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <TextField
              label="Sobrenome"
              placeholder="Digite seu sobrenome"
              required
              type="text"
              value={lastName}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#abacad",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "0.75rem",
                },
                width: "30%",
              }}
              onChange={(e) => setLastname(e.target.value)}
            ></TextField>
            <TextField
              label="Email"
              placeholder="Digite seu email"
              required
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? "Email inválido" : " "}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#abacad",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "0.75rem",
                },
                width: "40%",
              }}
            ></TextField>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: ".8rem",
            }}
          >
            <TextField
              label="Senha"
              placeholder="Digite sua senha"
              required
              type={visible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                width: "48%",
              }}
            ></TextField>
            <TextField
              label="Confirme sua senha"
              placeholder="Confirme sua senha"
              required
              type={visible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                width: "50%",
              }}
            ></TextField>
          </div>
        </FormControl>
        <FormControl>
          <InputLabel id="org-label" variant="standard" shrink={true}>
            Organização
          </InputLabel>
          <NativeSelect
            id="Organização"
            value={organization}
            required
            onChange={(e) => setOrganization(e.target.value)}
          >
            <option value="" disabled>
              Selecione uma organização
            </option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.nome}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        {!loading && (
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "25%", margin: "1rem auto" }}
          >
            Cadastrar
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
        {message && <Message message={message} type="success" />}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastro realizado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Seu cadastro foi realizado com sucesso!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ir para Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterForm;
