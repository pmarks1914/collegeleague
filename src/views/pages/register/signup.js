import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
const swal = require("sweetalert2");


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Wingipay
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const [businessType, setbusinessType] = React.useState('');

  const handleDropdownChange = (event) => {
    setbusinessType(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };


  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField 
            id="standard-basic"
            name = "businessname"
            label="Business Name"
            variant="standard"
            margin = "normal" 
            type="text"
            fullWidth
            required
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstname"
              label="Firstname"
              type="text"
              id="standard-basic"
              variant = "standard"
              autoComplete="current-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="Lastname"
              type="text"
              id="standard-basic"
              variant = "standard"
              autoComplete="current-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="standard-basic"
              variant = "standard"
              autoComplete="current-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              type="text"
              id="standard-basic"
              variant = "standard"
              autoComplete="current-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="businesstype"
              label="Business Type"
              type="text"
              id="standard-basic"
              variant = "standard"
              autoComplete="current-password"
            />

            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">Type of Business</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={businessType}
                onChange={handleDropdownChange}
                label="Are you a Developer"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Sole Proprietor</MenuItem>
                <MenuItem value={20}>Limited Liability Company</MenuItem>
              </Select>
            </FormControl>

            <FormControl >
              <FormLabel id="demo-row-radio-buttons-group-label">Are you a developer?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
              <FormControlLabel value="female" control={<Radio />} label="Yes" />
              <FormControlLabel value="male" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}