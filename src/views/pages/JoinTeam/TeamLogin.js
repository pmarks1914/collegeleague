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
import { Col, Row } from 'reactstrap'
import Box from '@mui/material/Box';

const inviteData = JSON.parse(localStorage.getItem("inviteData"));
let permList = [
  "can_view_business_performance_metrics",
  "can_view_transactions",
  "can_export_transactions",
  "can_manage_refunds_&_disputes",
  "can_view_customers",
  "can_create_new_customers",
  "can_manage_&_update_customers",
  "can_view_customer_insights",
  "can_view_payouts",
  "can_export_payouts",
  "can_view_transfers",
  "can_export_transfers",
  "can_create_and_manage_transfers",
  "can_view_balance_history",
  "can_export_balance_history",
  "can_view_payment_pages",
  "can_create_and_manage_payment_pages",
  "can_view_products",
  "can_create_and_manage_products",
  "can_view_invoices",
  "can_create_and_manage_invoices",
  "can_view_subaccounts_&_splits",
  "can_create_and_manage_subaccounts_&_splits",
  "can_view_plans_&_subscriptions",
  "can_create_and_manage_plans_&_subscriptions",
  "can_view_business_settings_&_preferences",
  "can_edit_business_settings_&_preferences",
  "can_view_api_keys_&_webhooks",
  "can_manage_api_keys_&_webhooks",
  "can_view_users",
  "can_manage_and_invite_users",
  "can_view_bank_accounts_settings",
  "can_manage_bank_accounts_settings",
  "can_create_and_manage_charges",
  "can_pay_with_transfer_for_failed_refund"
];
const Login = () => {

  const [usernameVar, setUsernameVar] = useState("")
  const [passwordVar, setPasswordVar] = useState("")
  const [loader, setLoader] = useState("<div></div")
  const [login, setLogin] = useState("Login")
  const [loginError, setLoginError] = useState("")

  function CheckLogin(e) {
    e.preventDefault();

    // // console.log("fff", process.env.REACT_APP_BASE_API, passwordVar, usernameVar)

    if (usernameVar === "") {
      // document.getElementById("usernameError").style.display = "block";
    }
    else if (passwordVar === "") {
      document.getElementById("passwordErr").style.display = "block";
      document.getElementById("usernameError").style.display = "none";
    }
    else {
      setLogin("")
      setLoader('<div class="spinner-border "style="color: #e0922f;"></div>`')
      // console.log(" login ")
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
        // console.log(response.status);
        if (response?.data?.status) { 
          // console.log(response?.data) 600000 == 10m
          let counter = 600000;
          
          const userData = {
            status: response.data.status,
            access: response?.data?.access,
            refresh: response?.data?.refresh,
            account: inviteData?.account_invited_to,
            availableBalance: response?.data?.availableBalance,
            currency: response?.data?.currency,
            firstname: response?.data?.firstname,
            lastname: response?.data?.lastname,
            other_names: response?.data?.other_names,
            gender: response?.data?.gender,
            id: response?.data?.id,
            nationalId: response?.data?.national_id_number,
            phone: response?.data?.phone.replaceAll('+', ""),
            photo: response?.data?.photo,
            photo150: response?.data?.photo150x150,
            photo50: response?.data?.photo50x50,
            wallet: response?.data?.team_list,
            role: response?.data?.role || "none",
            timeLogout: new Date(new Date().getTime() + counter),
            counter: counter,
            business_email: response?.data?.kyc?.business_email, 
            business_name: inviteData?.business_name?.toString(), 
            gps: response?.data?.kyc?.gps,
            business_TIN: response?.data?.kyc?.business_TIN,
            postal_address: response?.data?.kyc?.postal_address,
            NID_director_1: response?.data?.kyc?.NID_director_1,
            NID_director_2: response?.data?.kyc?.NID_director_2,
            bank_name: response?.data?.kyc?.bank_name,
            bank_account: response?.data?.kyc?.bank_account,
            bank_branch: response?.data?.kyc?.bank_branch,
            email: response?.data?.email,
            business_registration_docs: response?.data?.business_registration_docs,
            business_address: response?.data?.kyc?.business_address,
            permission_list: inviteData?.permissions_list,
            team_list: response?.data?.team_list, 

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
          // // console.log("==>");
          
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
    <div className="bg-light min-vh-100 min-vw-100 d-flex flex-row align-items-center">
      <CContainer>
      <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}
                >
                    <img src="https://wingipay.com/static/wingipay/logo/wingipay-2.4086593aa042.png" className='mb-3' style={{ width: "160px"}}/>

                </Box>
        <CRow className="justify-content-center">
          <CCol lg={5} xl={5}>
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
                      <CCol xs={12}>
                        
                      {login === "Login" ? 

                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => CheckLogin(e)}
                        style={{ background: "#FF7643"}}
                        >
                        {login}
                        </Button>
                        // <CButton color="primary" className="px-4 " onClick={(e) => CheckLogin(e)}>
                        //   {login}
                        // </CButton>
                        :
                        // <CButton style={{ background: "#fff"}} className="px-4 ">
                          <a dangerouslySetInnerHTML={{ __html: loader }}></a>
                        // </CButton>
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
            <Box >
              <p className='mt-10 text-center'> 
                <br />
                By clicking {'"'}{login}{'"'}, I agree to the Service Agreement, <a href='https://wingipay.com/terms/'> Terms </a> of service and <a href='https://wingipay.com/privacy/'>  Privacy </a> Policy. 
                <br />
                Don{"'"}t have an account? <a href='/signup'> Sign Up </a>
              </p>

            </Box>
          </CCol>
        </CRow>

        {/* <iframe src='https://dashboard.wingipay.com/pay/42LlzbZI/'  width="100%" height="350px" title="Iframe Example">
          
        </iframe> */}

      </CContainer>
    </div>
  )
}

export default Login
