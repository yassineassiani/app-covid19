import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import "./profile.css"
import {
  Box,
  TextField,
  CssBaseline,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
const ProfilePage = () => {
    let {user} = useContext(AuthContext)
    const box = {
      my: 8,
      mx: 4,
      marginTop: "-10",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };
  return (
    <div>
        <div class="context">
        <Grid container component="main" justifyContent="center">
          <CssBaseline />
          <Grid
            item
            sm={8}
            md={5}
            component={Paper}
            sx={{
              background:
                "linear-gradient(rgb(212, 207, 198,0.5), rgb(212, 207, 198, 0.8))",
              marginTop: "-35vh",
            }}
            elevation={20}
          >
            <Box sx={box}>
              <Avatar
                sx={{ m: 3, width: 50, height: 50, bgcolor: "secondary.dark" }}
              ></Avatar>
              <Typography component="h1" variant="h5">
                Informations Personelles:
              </Typography>
              <Box component="form" sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  sx={{ width: "45%", mr: "10%" }}
                  label="Nom:"
                  defaultValue={`${user.last_name.toUpperCase()}`}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  margin="normal"
                  sx={{ width: "45%" }}
                  label="Prénom:"
                  defaultValue={`${user.first_name.toUpperCase()}`}
                  InputProps={{
                    readOnly: true,
                  }}
                />{" "}
                <TextField
                  margin="normal"
                  sx={{ width: "45%", mr: "10%" }}
                  label="Date De Naissance: "
                  defaultValue={`${user.DateDeNaissance}`}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  margin="normal"
                  sx={{ width: "45%" }}
                  label="Sexe: "
                  defaultValue={`${user.Sexe}`}
                  InputProps={{
                    readOnly: true,
                  }}
                />{" "}
                <TextField
                  margin="normal"
                  fullWidth
                  label="Adresse Mail: "
                  defaultValue={`${user.email}`}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
    
  )
}

export default ProfilePage
