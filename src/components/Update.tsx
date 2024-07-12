import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { CrudService } from "../services/CrudService";
import { AddUserInterface } from "../models/types"; // Ensure this interface includes all necessary fields

function Update() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<AddUserInterface>({
    name: "",
    email: "",
    contact: null,
    checked: false,
  });

  useEffect(() => {
    const fetchToUpdate = async () => {
      if (id) {
        try {
          let response = await CrudService.readUserById(id);
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchToUpdate();
  }, [id]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    setUser(prevState => ({
      ...prevState,
      // [name]: type === 'checkbox' ? checked : value,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      if (id) {
        CrudService.updateUser(id, user)
        navigate("/read");

      }
    }catch(error){
      console.error("Error updating user data:", error);
    }
    }
  

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "yellow",
        }}
      >
        <Box
          component="form"
          sx={{
            backgroundColor: "whitesmoke",
            padding: 4,
            borderRadius: "1px solid black",
            maxWidth: "400px",
            width: "100%",
            marginTop: "3rem",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h3" component="h2">
            Update User
          </Typography>
          <TextField
            type="text"
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            sx={{ width: "100%", mt: 1 }}
          />
          <TextField
            type="email"
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            sx={{ width: "100%", mt: 1 }}
          />
          <TextField
            type="number"
            label="Contact"
            name="contact"
            value={user.contact}
            onChange={handleChange}
            sx={{ width: "100%", mt: 1 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checked"
                checked={user.checked}
                onChange={handleChange}
              />
            }
            label="Are you human?"
          />
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="outlined" type="submit">
              Update User
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Update;
