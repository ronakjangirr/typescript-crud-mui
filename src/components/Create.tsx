import React, { useState, useEffect, ChangeEvent, FormEvent} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { AddUserInterface } from "../models/types";
import { CrudService } from "../services/CrudService";

function Create() {
  const [user, setUser] = useState<AddUserInterface>({
    name: "",
    email: "",
    contact: null,
    checked:false
  });

  let navigate= useNavigate()

  const handleChange = (event:ChangeEvent<HTMLInputElement>): void => {
      let {name, value, type, checked} = event.target;
      setUser((prevUser)=>({...prevUser,[name]:type === "checkbox" ? checked : value,}))
  };

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User data:", user);
    try {
      let sendData= await CrudService.createUser(user);
      console.log("User data:", sendData);
      setUser({
        name: "",
        email: "",
        contact: null,
        checked: false,
      });
      navigate("/read")
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Set height to 100% of the viewport height
          backgroundColor: "yellow",
        }}
      >
        <Box
          component="form"
          sx={{
            backgroundColor: "whitesmoke",
            padding: 4, // Add some padding
            borderRadius: "1px solid black", // Add border radius for better look
            maxWidth: "400px", // Set a maximum width for the form
            width: "100%", // Ensure form takes full width on smaller screens
            marginTop: "3rem",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h3" component="h2">
            Create User
          </Typography>
          <TextField
            type="text"
            label="Name"
            // defaultValue="Your Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            sx={{ width: "100%", mt: 1 }}
          />
          <TextField
            type="email"
            label="Email"
            // defaultValue="Your Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            sx={{ width: "100%", mt: 1 }}
          />
          <TextField
            type="number"
            label="Contact"
            defaultValue="Your Contact"
            name="contact"
            // value={user.contact}
            value={user.contact !== null ? user.contact.toString() : ""}
            onChange={handleChange}
            sx={{ width: "100%", mt: 1 }}
          />
          <FormControlLabel control={<Checkbox name="checked" checked={user.checked} onChange={handleChange}/>} label="Are you human?" />
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="outlined" type="submit">Add User</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Create;
