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

import avatar9 from '../../../assets/brand/logo.svg'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import Swal from 'sweetalert2';

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
      // console.log(payload);

      // console.log(payload)
        let config = {
          method: 'post',
          url: process.env.REACT_APP_BASE_API + '/auth/validate_email/',
         
          headers: {
            'Content-Type': 'application/json'
          },
          data: payload
        };
        axios(config).then(function (response){
          console.log(response)
          if (response["data"]["message"] === "Otp has been sent successfully." && response["data"]["status"] === true){
            localStorage.setItem("signupInfo", payload)
            // navigate('/otp')
          }
          else if (!response){
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          }
        })
        .catch(function (error) {
          // console.log(error);
        });
  };

  function sendOTP(){
    

    const payload = JSON.stringify({
      "email": getFormData?.email
    })


    let config_otp = {
      method: 'post',
      url: process.env.REACT_APP_BASE_API + "/otp/send/email/",
      headers: {
          'Content-Type': 'application/json'
      },
      data: payload
  };
    axios(config_otp).then(function (response){
      console.log(response)
      
    })
    .catch(function (error) {
      console.log(error);
    });

     Swal.fire({
      text: 'Check your email and type the code here.',
      input: 'text',
      inputAttributes: {
          autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      confirmButtonColor: '#1677ff',
      cancelButtonColor: '#d33',
      preConfirm: (otpCode) => {
          // otpCodecription = otpCode
          if (otpCode === "") {
              Swal.showValidationMessage(
                  `Request failed! code is required.`
              )
          }
          else {
              let data = JSON.stringify({
                  "email": getFormData?.email,
                  "first_name": getFormData?.first_name,
                  "last_name": getFormData?.last_name,
                  "other_names": getFormData?.other_names,
                  "password": getFormData?.password,
                  "password1": getFormData?.password,
                  "otp": otpCode
              })
              let config = {
                  method: 'post',
                  url: process.env.REACT_APP_BASE_API + "/auth/sign_up/",
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  data: data
              };

              sendApiData(config);
          }
      },
  }).then((result1) => {

  })

  }

  function sendApiData(config){
    // console.log(config)
    axios(config).then(function (response){
      // console.log(response)
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div >
      <div className="bg-light min-vh-100 min-vw-100 d-flex flex-row align-items-center">
        <CssBaseline />

          <CContainer>

            <CRow className="justify-content-center">
              <CCol md={4} lg={3} xl={3}>
                <CCard className="p-0 cl-container">
                  <CCardHeader>
                  </CCardHeader>
                  <CCardBody className='m-0'>
                    <CRow>
                      <CCol xs="0" sm="0" md={0} lg="1" xl="1" ></CCol>
                      <CCol xs="12" sm="12" md={12} lg="10" xl="10" className='trade-name' >
                        <span><img src={avatar9} className='mb-0' style={{ width: "30px" }} alt="college league" /> COLLEGE LEAGUE
                        </span>

                        <p component="h6" variant="h6" className='mt-3 text-center fs-6'>
                            Reset Password
                        </p>
                        <CCol xs="12" sm="12" md={12} lg={12} className="mt-1" >
                          <div className='mui-control-form' >
                            <Box
                              component="form"
                              noValidate
                              autoComplete="on"
                            >
                              <InputLabel shrink htmlFor="email"> </InputLabel>
                              <TextField
                                error={false}
                                id="email"
                                name="email"
                                placeholder="Your email"
                                variant="outlined"
                                margin="normal"
                                type="email"
                                fullWidth
                                required
                              />

                              <InputLabel shrink htmlFor="newPassword"> </InputLabel>

                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder="New password"
                                name="newPassword"
                                autoFocus
                                variant="outlined"
                              />

                              <InputLabel shrink htmlFor="newPassword2"> </InputLabel>

                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder="Confirm password"
                                name="newPassword2"
                                autoFocus
                                variant="outlined"
                              />

                            </Box>
                          </div>
                        </CCol>


                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          style = {{color: "#fff"}}
                          className="bg-text-com-wp"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>

                      </CCol>
                      <CCol xs="0" sm="0" md={0} lg="1" xl="1" ></CCol>
                    </CRow>
                    <div >
                    </div>


                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>


          </CContainer>
        
      </div>


    </div>
  );
}