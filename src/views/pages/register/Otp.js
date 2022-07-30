import React, { useState } from 'react';
import { HStack, Box, PinInput, PinInputField, ChakraProvider, Button } from '@chakra-ui/react';
import {
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CRow,
  } from '@coreui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const signup = JSON.parse(localStorage.getItem('signupInfo'));

export function Otp() {
  const navigate = useNavigate()


  const [otp, setOtp] = useState("")

  const handleVerifyOtpSubmit = (event) => {  
      event.preventDefault(); 
      const payload = {   
        "otp": otp,
        "email": signup.email,
      }
      console.log(otp)
        let config = {
          method: 'post',
          url: process.env.REACT_APP_BASE_API + '/auth/validate_otp/',
          headers: {
            'Content-Type': 'application/json',
          },
          data: payload
        };
        axios(config).then(function (response){
            console.log(response["data"])
            if (response["data"]["message"] === "OTP Matched. Please proceed to registration" && response["data"]["status"] === true){
              const RegisterPayload = {   
                "firstname": signup.firstname,
                "lastame": signup.lastname,
                "email": signup.email,
                "phone": signup.phone,
                "business_name": signup.business_name,
                "business_type": signup.business_type,
                "password": signup.password,
              }
              console.log(RegisterPayload)
              console.log("password", signup?.password,)
                let config = {
                  method: 'post',
                  url: process.env.REACT_APP_BASE_API + '/auth/signup/',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  data: RegisterPayload
                };
                axios(config).then(function (response){
                  if (response["data"]["message"] === "Account successfully created." && response["data"]["status"] === true){
                    navigate("/login")
                  }

                  navigate("/login")
                  })
                  .catch(function (error) {
                  console.log(error);
                });
            }
          })
          .catch(function (error) {
          console.log(error);
        });
      };




    

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>A 4 digit PIN has been sent to your email. Please enter the digits below for verification.</h1>
                        <ChakraProvider>
                            <Box p={4}>
                                <HStack>
                                    <PinInput type='numeric' onChange={(e) => setOtp(e)}>
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                   
                                </HStack> 
                                <br />
                                    <Button type = "submit" colorScheme='orange' onClick={(e) => handleVerifyOtpSubmit(e)}>Verify</Button>
                            </Box>
                        </ChakraProvider>
                    </CForm>
                    </CCardBody>
                </CCard>
            </CCardGroup>
        </CCol>
            </CRow>
        </CContainer>
        </div>
        
    );
}

export default Otp;