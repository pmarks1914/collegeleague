import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


// import swal from 'sweetalert2'

const swal = require("sweetalert2");

const Login = () => {

  const [usernameVar, setUsernameVar] = useState("")
  const [passwordVar, setPasswordVar] = useState("")
  const [loader, setLoader] = useState("<div></div")
  const [login, setLogin] = useState("Login")
  const [loginError, setLoginError] = useState("")

  function CheckLogin(e) {
    e.preventDefault();
    setLogin("")
    setLoader('<div class="spinner-border "style="color: #e0922f;"></div>`')

    console.log("fff", process.env.REACT_APP_BASE_API, passwordVar, usernameVar)

    if (usernameVar === "") {
      // document.getElementById("usernameError").style.display = "block";
    }
    else if (passwordVar === "") {
      document.getElementById("passwordErr").style.display = "block";
      document.getElementById("usernameError").style.display = "none";
    }
    else {
      console.log(" login ")
      let data = JSON.stringify({
        "username": usernameVar,
        "password": passwordVar
      });

      let config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_API + "/auth/login/",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios(config).then(response => {
        setLoader("<a></a>")
        setLogin("Login")
        console.log(response.status);
        if (response.status === 200) { 
          console.log(response?.data)
          let counter = 10000;

          const userData = {
            status: response.status,
            access: response.data.access,
            refresh: response.data.refresh,
            account: response.data.account,
            availableBalance: response.data.availableBalance,
            currency: response.data.currency,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            other_names: response.data.other_names,
            gender: response.data.gender,
            id: response.data.id,
            nationalId: response.data.national_id_number,
            phone: response.data.phone.replaceAll('+', ""),
            photo: response.data.photo,
            photo150: response.data.photo150x150,
            photo50: response.data.photo50x50,
            wallet: response.data.wallet,
            role: response?.data?.role || "none",
            timeLogout: new Date(new Date().getTime() + counter),
            counter: counter
          };
          localStorage.setItem("userDataStore", JSON.stringify(userData));

          window.location.href = "/dashboard";

        }
        else {
          setLoginError("Wrong user credentials")
          document.getElementById("wrongUser_id").style.display = "block";
        }

      }).catch(function (error) {

        if (error.response) {
          // console.log("==>");
          
          setLoader("<a></a>")
          setLogin("Login")
          setLoginError("Wrong user credentials")
          document.getElementById("wrongUser_id").style.display = "block";
          /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */

        } else if (error.request) {
          
          setLoader("<a></a>")
          setLogin("Login")
          setLoginError("Wrong user credentials")
          document.getElementById("wrongUser_id").style.display = "block";


          /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */

        } else {
          // Something happened in setting up the request and triggered an Error

        }
      }
      );

      // swal.fire({
      //     background: '#ffffff00',
      //     // html: `<div class="spinner-border "style="color: #e0922f;"></div>`, 
      //     showLoaderOnConfirm: false,
      //     showConfirmButton: false,
      //     allowOutsideClick: false,
      //     willOpen: () => {
      //     return 
      //     },
      //   });
    }

  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>


                    <TextField 
                    id="standard-basic"
                    name = "email"
                    label="Email"
                    variant="standard"
                    margin = "normal" 
                    type="email"
                    fullWidth
                    required
                    onChange={(e) => { setUsernameVar(e.target.value) }}
                    />

                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="standard-basic"
                    variant = "standard"
                    autoComplete="current-password"
                    onChange={(e) => { setPasswordVar(e.target.value) }}
                    />

                    <p className="text-medium-emphasis">{loginError}</p>
                    <CRow>
                      <CCol xs={6}>
                        
                      {login === "Login" ? 

                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => CheckLogin(e)}>
                        {login}
                        </Button>
                        // <CButton color="primary" className="px-4 " onClick={(e) => CheckLogin(e)}>
                        //   {login}
                        // </CButton>
                        :
                        <CButton color="primary" className="px-4 ">
                          <a dangerouslySetInnerHTML={{ __html: loader }}></a>
                        </CButton>
                        }
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
