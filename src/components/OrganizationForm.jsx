import { FormControl, FormLabel, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createOrganization } from "../slices/organizationSlice";
import Message from "./Util/Message";
import { reset } from "../slices/authSlice";

const OrganizationForm = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.organization
  );

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0] || null;
    setLogo(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const organization = new FormData();
    organization.append("nome", name);
    organization.append("imagem", logo);
    dispatch(createOrganization(organization));
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "60%",
          justifyContent: "center",
          backgroundColor: "#fffffff2",
          padding: "2rem",
          borderRadius: ".5rem",
          marginTop: "3rem",
        }}
      >
        <FormControl sx={{ width: "30vw" }}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              margin: "1rem",
              textAlign: "center",
              color: "#000",
            }}
          >
            Cadastro de organização
          </FormLabel>
          <TextField
            label="Nome"
            placeholder="Digite o nome da organização"
            required
            type="text"
            value={name}
            margin="normal"
            onChange={(e) => setName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#05111b",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.75rem",
              },
            }}
          ></TextField>
          <Button variant="contained" component="label" color="primary">
            Upload Logo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleLogoChange}
            />
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{ width: "25%", margin: "1rem auto" }}
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </FormControl>
        {success && (
          <Message message="Organização cadastrada." type="success" />
        )}
        {error && <Message message={error} type="error" />}
      </Box>
    </>
  );
};

export default OrganizationForm;
