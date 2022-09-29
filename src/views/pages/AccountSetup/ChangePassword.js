// import React, { useState } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CRow,
// } from '@coreui/react'

// import axios from 'axios';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import { useNavigate } from 'react-router-dom';
// import CircularProgress from '@mui/material/CircularProgress';


// const swal = require("sweetalert2");

// export default function ChangePassword(){
//     const navigate = useNavigate()

//     const handleSubmit = (event) => {

//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
    
//             const oldPassword = data.get('oldPassword')
//             const newPassword = data.get('newPassword')
//             const newPassword2 = data.get('newPassword2')
//             console.log(oldPassword)
//             console.log(newPassword)
//             console.log(newPassword2)

//             const payload = JSON.stringify({
//                 "old_password": oldPassword,
//                 "password": newPassword,
//                 "password2": newPassword2
//             })

//             console.log(payload)
//                 let config = {
//                 method: 'post',
//                 url: process.env.REACT_APP_BASE_API + 'auth/changePassword/',
                
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 data: payload
//                 };
//                 axios(config).then(function (response){
//                 console.log(response["data"])
//                 if (response["data"]["message"] === "Otp has been sent successfully." && response["data"]["status"] === true){
//                     localStorage.setItem("signupInfo", payload)
//                     navigate('/otp')
//                 }
//                 else if (!response){
//                     <Box sx={{ display: 'flex' }}>
//                     <CircularProgress />
//                     </Box>
//                 }
//                 })
//                 .catch(function (error) {
//                 console.log(error);
//                 });
// };

//     // // console.log("fff", process.env.REACT_APP_BASE_API, passwordVar, usernameVar)
//   return (
//     <div className="bg-light min-vh-100 min-vw-100 d-flex flex-row align-items-center">
//       <CContainer>
//       <Box
//         sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginBottom: '10px'
//         }}
//     >
//         <img src="https://wingipay.com/static/wingipay/logo/wingipay-2.4086593aa042.png" className='mb-3' style={{ width: "160px"}}/>

//     </Box>
//         <CRow className="justify-content-center">
//           <CCol lg={5} xl={5}>
//             <CCardGroup>
//               <CCard className="p-4">
//                 <CCardBody>
//                   <CForm>
//                     <h2>Change Password</h2>

//                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

//                     <TextField 
//                     id="standard-basic"
//                     name = "oldPassword"
//                     label="Old Password"
//                     variant="standard"
//                     margin = "normal" 
//                     type="password"
//                     fullWidth
//                     required
//                     />

//                     <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="newPassword"
//                     label="New Password"
//                     type="password"
//                     id="standard-basic"
//                     variant = "standard"
//                     autoComplete="current-password"
//                     />

//                     <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="newPassword2"
//                     label="Confirm New Password"
//                     type="password"
//                     id="standard-basic"
//                     variant = "standard"
//                     autoComplete="current-password"
//                     />

//                     <CRow>
//                       <CCol xs={12}>
                     
//                       <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                         style = {{color: "#fff"}}
//                         >
//                         Change Password
//                         </Button>
//                       </CCol>
//                     </CRow>
//                       </Box>
//                   </CForm>
//                 </CCardBody>
//               </CCard>
              
//             </CCardGroup>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }



import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import theme from "src/styles/Styles"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


export default function SignUp() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
      const oldPassword = data.get('oldPassword')
      const newPassword = data.get('newPassword')
      const newPassword2 = data.get('newPassword2')
     

      const payload = JSON.stringify({
        "oldPassword": oldPassword,
        "newPassword": newPassword,
        "newPassword2": newPassword2,
      })
      console.log(payload);

      console.log(payload)
        let config = {
          method: 'post',
          url: process.env.REACT_APP_BASE_API + '/auth/validate_email/',
         
          headers: {
            'Content-Type': 'application/json'
          },
          data: payload
        };
        axios(config).then(function (response){
          console.log(response["data"])
          if (response["data"]["message"] === "Otp has been sent successfully." && response["data"]["status"] === true){
            localStorage.setItem("signupInfo", payload)
            navigate('/otp')
          }
          else if (!response){
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
          
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          
           
            <TextField
              margin="normal"
              required
              fullWidth
              label="old password"
              name="oldPassword"
              autoFocus
              variant = "standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="new password"
              name="newPassword"
              autoFocus
              variant = "standard"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="confirm new password"
              name="newPassword2"
              autoFocus
              variant = "standard"
            />
            
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style = {{color: "#fff"}}
            >
              Change Password
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}