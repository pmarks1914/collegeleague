import React, { useState, useEffect } from 'react';
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
import { Col, Row } from 'reactstrap';
import moment from 'moment';
import {
  CAvatar,
  CDropdown,
  // CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CBadge,
  CButton,
  CNavbar,
  CImage,
  CNavbarBrand,
  CCard,
  CDropdownDivider,
  CCardBody,
  CCollapse,
  CCardHeader,
  CCol,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CRow,
  CNav,
  CNavItem,
  CTooltip,
} from '@coreui/react'
import InputAdornment from '@mui/material/InputAdornment';
import CIcon from '@coreui/icons-react';
import {
  // cilBell,
  cilCreditCard,
  cilUser,
  cilTask,
  cilEnvelopeOpen,
  // cilFile,
  cilInfo,
  cilLockLocked,
  // cilSettings,
  cilWarning,
  cilFilter, cilCheckCircle, cilSettings, cilCalendar, cilSearch,
} from '@coreui/icons'
import Swal from 'sweetalert2';

let userData = JSON.parse(localStorage.getItem("userDataStore"));


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

export default function Checkout() {

    const [isCheckout, setIsCheckout] = useState(false)
    const [merchantId, setMerchantId] = useState("")
    const [sessionData, setSessionData] = useState({})
    const [sourceMetadata, setSourceMetadata] = useState({})

    const [loader, setLoader] = useState('')
    // Pay now, 
    const [btnText, setBtnText] = useState("Pay now")

    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [amount, setAmount] = useState("")
    const [accountType, setAccountType] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [otp, setOtp] = useState('');
    const [fee, setFee] = useState('')
    const [prefix, setPrefix] = useState(window.location.pathname.split("/")[3]);

    // error states
    const [fullNameError, setFullNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [accountTypeError, setAccountTypeError] = useState(false);
    const [accountNumberError, setAccountNumberError] = useState(false);
    const [otpError, setOtpError] = useState(false);
    

    // modals
    const [modal1, setModal1] = useState(false)
    // 
    const [modal2, setModal2] = useState(false)

    useEffect(()=>{
        // 
        if(window.location.pathname.split("/")[1] === "checkout"){
            // 
            let checkoutId = window.location.pathname.split("/")[2]

            console.log("window", checkoutId)
            
            setIsCheckout(true)
            if(checkoutId){
                setMerchantId(checkoutId);
                let data = '';
                let config_ch = {
                    method: 'get',
                    url: process.env.REACT_APP_BASE_API + "/checkout/" + checkoutId + "/",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                };
            
                axios(config_ch).then(response => {
                    console.log("data checkout ==", response?.data);
                    if (response?.data?.status === true) {
                        // 
                        console.log("g>>>")
                        sessionStorage.setItem("sessionData", JSON.stringify(response?.data))
                        setSessionData(response?.data)
                        setAccountNumber(response?.data?.data?.phone)
                        setPhoneNumber(response?.data?.data?.phone)
                        setAmount(response?.data?.data?.amount)
                        setFee(response?.data?.data?.fee || "0.00")
                        setPrefix(response?.data?.prefix)
                        setSourceMetadata(response?.data?.data)

                        window.history.pushState("", "", '/checkout')

                    }
                    else{
                        Swal.fire({
                            title: 'Oops',
                            html: "<div class='pb-0 pt-0'> Invalid Session</div>",
                            icon: 'error',
                            showCancelButton: false,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            // cancelButtonColor: '#d33',
                            // timer: 4000
                        }).then((result) => {
                            // 
                        })
                    }
                    
        
                }).catch(function (error) {
                    // 
                    if(error){
                        Swal.fire({
                            title: 'Application Error',
                            title: 'Oops',
                            html: "<div class='pb-0 pt-0'> Try again later </div>",
                            icon: 'warning',
                            showCancelButton: false,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            // cancelButtonColor: '#d33',
                            // timer: 4000
                        }).then((result) => {
                            // 
                        })
                    }
                    if (error.response) {
                        // console.log("==");
                        /*
                        * The request was made and the server responded with a
                        * status code that falls out of the range of 2xx
                        */
        
                    } else if (error.request) {
                        /*
                        * The request was made but no response was received, `error.request`
                        * is an instance of XMLHttpRequest in the browser and an instance
                        * of http.ClientRequest in Node.js
                        */
        
                    } else {
                        // Something happened in setting up the request and triggered an Error
        
                    }
                });
            }
            else{
                Swal.fire({
                    title: 'Oops',
                    html: "<div class='pb-0 pt-0'> Invalid Session</div>",
                    icon: 'error',
                    showCancelButton: false,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    // cancelButtonColor: '#d33',
                    // timer: 4000
                }).then((result) => {
                    // 
                })

            }
        

        }
    }, [])
    const handleDropdownChange = (event) => {
        // setbusinessType(event.target.value);
    };
    function handleSubmit(event, formType) {
        event.preventDefault();
        console.log("window.location pathname ", window.location.pathname.split("/")[1])
        let expPhone = /(020|023|024|025|026|027|028|050|054|055|059)[\s.-]?\d{7}$/;
        // expPhone.test(phoneNumber)  
        // console.log("amountError ", formType, expPhone.test(phoneNumber), (Number(amount) ? true : false) )
        if (formType === 1) {
            // for initial form fields
            if (!fullNameError && fullName.length < 4) {
                setFullNameError(true)
            }
            else if (!phoneNumberError && phoneNumber.length < 10 && !(expPhone.test(phoneNumber))) {
                setPhoneNumberError(true)
            }
            else if (!amountError && (amount.length < 1) || !(Number(amount) ? true : false)) {
                // console.log("amount ", amount)
                setAmountError(true)
            }
            else{
                setModal1(true)
                setSourceMetadata(
                    {
                    "full_name": fullName,
                    "first_name": "",
                    "last_name": "",
                    "mobile_number": phoneNumber,
                    "recipient_address": accountNumber
                }   )
            }
        }
        else if (formType === 2) {
            // for mobile network form fields
            console.log("accountType ", formType, Number(accountType), accountType, accountTypeError, ([1, 5, 6, 7]).includes(accountType), accountNumber)
            if ( Number(accountType)===0 ) {
                console.log("<<  >>")
                setAccountTypeError(true)
            }
            else if (!(expPhone.test(accountNumber))) {
                // console.log(">>><<<<")
                setAccountNumberError(true)
            }
            else if(accountNumber && accountType){
                console.log("fffff")
                setModal2(true)
                setModal1(false)
                setTimeout(() => {
                    genericOpt("sendOtp");
                    // setModal2(true);
                }, 1000);
            }
        }
        if (formType === 4) {
            console.log("otp >>>>", otpError, otp.charAt(3))
            if (!otpError && (otp.length < 4) || !(otp.charAt(3)) || !(Number(otp) ? true : false) ) {
                // add verify otp to the if checks
                setOtpError(true)
            }
            else{
                genericOpt("verifyOtp");
                
            }

        }

        // check btn text for pay now
        if (btnText === "Pay now") {
            // 
            setBtnText("Pay now")
        }
        // const data = new FormData(event.currentTarget);
        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        // });
    };


    const [selectedValue, setSelectedValue] = React.useState('a');
    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const methodOfPayment = [
        { "name": "WINGIPAY", "id": 1 },
        { "name": "MTN", "id": 5 },
        { "name": "VODAFONE", "id": 6 },
        { "name": "AIRTELTIGO", "id": 7 },
    ]
    function genericOpt(otpType){
        // 


        if(otpType === "sendOtp"){
            let data = {"phone": accountNumber};
            let config = {
                method: 'post',
                url: process.env.REACT_APP_BASE_API + "/request/otp/sms/",
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + userData?.access
                },
                data: data
            };
            axios(config).then(response => {
                console.log("data otp==", response?.data);
                if (response.status === 200) {
                    // 
                }
            }).catch(function (error) {
                if (error.response) {
                    // console.log("==");
                    /*
                    * The request was made and the server responded with a
                    * status code that falls out of the range of 2xx
                    */
    
                } else if (error.request) {
                    /*
                    * The request was made but no response was received, `error.request`
                    * is an instance of XMLHttpRequest in the browser and an instance
                    * of http.ClientRequest in Node.js
                    */
    
                } else {
                    // Something happened in setting up the request and triggered an Error
    
                }
            }
            )

        }
        else if(otpType === "verifyOtp"){
            let dataVerify = {"phone": accountNumber, "otp": otp};
            let config = {
                method: 'post',
                url: process.env.REACT_APP_BASE_API + "/validate/otp/",
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + userData?.access
                },
                data: dataVerify
            };
            axios(config).then(response => {
                console.log("data otp verify==", response?.data);
                if (response?.data?.status) {
                    // 
                    // let textStr = "Payment of <p> <h6>GHS" + amount + "</h6> for </p>" + accountNumber;

                        
                    makePayment();
                    setTimeout(() => {
                        setModal2(false)
                    }, 3000);
                    // Swal.fire({
                    // title: 'OPT Verified',
                    // html: textStr.toString(),
                    // icon: 'success',
                    // timer: 4000,
                    // allowOutsideClick: false,
                    // // allowEscapeKey: false,
                    // showCancelButton: false,
                    // showConfirmButton: false,
                    // // confirmButtonColor: '#FF7643',
                    // // cancelButtonColor: '#d33',
                    // // confirmButtonText: ''
                    // }).then((result) => {
                        
                    // makePayment();
                    // setTimeout(() => {
                    //     setModal2(false)
                    // }, 3000);
                    // });
                }
                else{

                    Swal.fire({
                        title: 'OTP',
                        text: "OTP Verification Failed! Try again",
                        icon: 'warning',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonColor: '#d33',
                        timer: 4000
                    }).then((result) => {
                        // 
                    })
                }
            }).catch(function (error) {
                if (error.response) {
                    // console.log("==");
                    /*
                    * The request was made and the server responded with a
                    * status code that falls out of the range of 2xx
                    */
    
                } else if (error.request) {
                    /*
                    * The request was made but no response was received, `error.request`
                    * is an instance of XMLHttpRequest in the browser and an instance
                    * of http.ClientRequest in Node.js
                    */
    
                } else {
                    // Something happened in setting up the request and triggered an Error
    
                }
            }
            )

        }
    }

    function makePayment(){
        // 
        
        let data = {};
        if(accountType === 1){
            data = {
                "service": accountType,
                "customer_phone": phoneNumber,
                "amount": amount,
                "currency": "GHS",
                "note": "Merchant pay of GHS" + amount.toString() + " from " + fullName,
                "prefix": prefix,
                "source_metadata": sourceMetadata
            }

        }
        else{
            data = {
                "service": accountType,
                "external_account_id": phoneNumber,
                "amount": amount,
                "currency": "GHS",
                "note": "Merchant pay of GHS" + amount.toString() + " from " + fullName,
                "prefix": prefix,
                "source_metadata":  sourceMetadata 
            }

        }
        
        let config = {
            method: 'post',
            url: process.env.REACT_APP_BASE_API + "/transactions/transfers/",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + userData?.access
            },
            data: data
        };
        setLoader('<div class="spinner-border dashboard-loader" style="color: #e0922f; text: center"></div>')

        axios(config).then(response => {
            console.log("data otp==", response?.data);
            if (response?.data?.status) {
                // 
                setLoader(``)
                let textStr = "Payment of <p> <h6>GHS" + amount + "</h6> made to WingiPay </p>";

                Swal.fire({
                title: 'Payment Successful',
                html: textStr.toString(),
                icon: 'success',
                // timer: 6000,
                allowOutsideClick: false,
                // allowEscapeKey: false,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: '#FF7643',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
                }).then((result) => {
                setTimeout(() => {
                    setModal2(false)
                    if(isCheckout){
                        // checkout redirect 
                        window.location.href = sourceMetadata?.callbackurl
                    }
                }, 1000);
                });
            }
            else{
                setLoader(``)

                Swal.fire({
                    title: 'Payment Failed',
                    text: "Try again",
                    icon: 'warning',
                    allowOutsideClick: false,
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: '#d33',
                    // timer: 4000
                }).then((result) => {
                    // 
                })
            }
        }).catch(function (error) {

            setLoader(``)
            if (error.response) {
                // console.log("==");
                /*
                * The request was made and the server responded with a
                * status code that falls out of the range of 2xx
                */

            } else if (error.request) {
                /*
                * The request was made but no response was received, `error.request`
                * is an instance of XMLHttpRequest in the browser and an instance
                * of http.ClientRequest in Node.js
                */

            } else {
                // Something happened in setting up the request and triggered an Error

            }
        }
        )
    }

    function nameCheck(){
        
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs"
                style={{
                    paddingTop: 80,
                }}
                className="checkout-0"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src="https://wingipay.com/static/wingipay/logo/wingipay-2.4086593aa042.png" className='mb-3' />

                    <Typography component="h1" variant="h5" className='mb-5 checkout-0'>
                        WingiPay Transaction
                    </Typography>
                </Box>

                <CssBaseline />
                {
                    isCheckout ?
                    <Box 
                        sx={{
                            paddingTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: 'solid 1px #f2e5e5',
                            borderRadius: '15px'
                        }}
                    >
                    {/* {merchantId} */}
                
                    <Box noValidate sx={{ m: 2 }} id="form-1">
                        <FormControl fullWidth className='m-0' variant="standard">
                            {/*  */}
                            <Row>
                                <Col sm="4" style={{textAlign: "right"}}>
                                    {/*  */}
                                </Col>
                                <Col sm="1" style={{textAlign: "right"}}>
                                    {/*  */}
                                </Col>
                                <Col sm="7" style={{textAlign: "right"}}>
                                    {/*  */}
                                    <p className='m-0 d-fixed checkout-ps-info'>
                                        <b component="h1">Fee :</b> GHS {fee}
                                    </p>
                                    <p className='m-0 d-fixed checkout-ps-info'>
                                        <b component="h1">Amount :</b> GHS {amount}
                                    </p>
                                    <p className='m-0 d-fixed checkout-ps-info'>
                                        <b component="h1">Phone :</b> {phoneNumber}
                                    </p>
                                    {/* {phoneNumber.replace(/\s+/g, '')} */}

                                </Col>
                            </Row>
                        </FormControl>
                        <FormControl fullWidth className='m-0' variant="standard">

                            <InputLabel id="demo-simple-select-standard-label">Select mobile operator</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                error={accountTypeError}
                                value={accountType}
                                onChange={(e) => { (setAccountType(e.target.value)); (setAccountTypeError(false)) }}
                                label="Select"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    methodOfPayment?.map((post, id) =>
                                        <MenuItem value={post.id} key={post.id}>{post.name}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>

                        <TextField
                            error={accountNumberError}
                            value={accountNumber}
                            onChange={(e) => { (setAccountNumber(e.target.value)); (setAccountNumberError(false)); (setPhoneNumber(e.target.value)) }}
                            id="accountNumber"
                            name="accountNumber"
                            label="Phone number"
                            variant="standard"
                            margin="normal"
                            type="tel"
                            fullWidth
                            required
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" >
                                    <CTooltip
                                        content=" This field is required, provide a valid phone number in the form eg. 0xx xxxx xxx"
                                        placement="top"
                                    >
                                    <CIcon icon={cilInfo} className="me-2" />
                                    </CTooltip>
                                </InputAdornment>
                              ),
                            }}
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{background: "#FF7643"}}
                            onClick={(e) => handleSubmit(e, 2)}
                        >
                            PAY NOW
                        </Button>
                        </Box>
                    </Box>
                    :
                    <Box
                        sx={{
                            paddingTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: 'solid 1px #f2e5e5',
                            borderRadius: '15px'
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                        {/* {fullName}{" "}{fullNameError.toString()} */}

                        {/* basic user form fields */}
                        <Box noValidate sx={{ m: 2 }} id="form-1">

                            <TextField
                                error={fullNameError}
                                value={fullName}
                                onChange={(e) => { (setFullName(e.target.value)); (setFullNameError(false)) }}
                                id="fullName"
                                name="fullName"
                                label="Full name"
                                variant="standard"
                                margin="normal"
                                type="text"
                                fullWidth
                                required
                                autoComplete='on'
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" >
                                        <CTooltip
                                            content="This field is required."
                                            placement="top"
                                        >
                                        <CIcon icon={cilInfo} className="me-2" />
                                        </CTooltip>
                                    </InputAdornment>
                                ),
                                }}
                            />

                            <TextField
                                error={phoneNumberError}
                                value={phoneNumber}
                                onChange={(e) => { (setPhoneNumber(e.target.value)); (setAccountNumber(e.target.value)); (setPhoneNumberError(false)) }}
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone number"
                                variant="standard"
                                margin="normal"
                                type="text"
                                fullWidth
                                required
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" >
                                        <CTooltip
                                            content="This field is required, provide a valid phone number in the form eg. 0xx xxxx xxx"
                                            placement="top"
                                        >
                                        <CIcon icon={cilInfo} className="me-2" />
                                        </CTooltip>
                                    </InputAdornment>
                                ),
                                }}
                            />

                            <TextField
                                error={amountError}
                                value={amount}
                                onChange={(e) => { (setAmount(e.target.value)); (setAmountError(false)) }}
                                id="amount"
                                name="amount"
                                label="Amount"
                                variant="standard"
                                margin="normal"
                                type="text"
                                fullWidth
                                required
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" >
                                        <CTooltip
                                            content="This field is required."
                                            placement="top"
                                        >
                                        <CIcon icon={cilInfo} className="me-2" />
                                        </CTooltip>
                                    </InputAdornment>
                                ),
                                }}
                            />


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{background: "#FF7643"}}
                                onClick={(e) => {handleSubmit(e, 1)}}
                            >
                                {btnText}
                            </Button>

                        </Box>

                    </Box>
                }
                <Typography component="h6" className='mt-10' style={{textAlign: "center", fontSize: "15px", margin: "40px auto"}}>
                    Powered by WingiPay&copy;{(new Date()).getUTCFullYear()}
                </Typography>
            </Container>



            <CModal visible={modal1} alignment="center" backdrop="static" onClose={() => setModal1(false)}>
                <CModalHeader>
                    <CModalTitle>  </CModalTitle>
                </CModalHeader>
                <CModalBody className=''>
                    {/*  */}

                    {/* moblie network and wingipay payment methods */}
                    <Box noValidate sx={{ m: 2 }} id="form-2">
                    
                        <FormControl fullWidth className='m-0' variant="standard">
                            {/*  */}
                            <Row>
                                <Col sm="4" style={{textAlign: "right"}}>
                                    {/*  */}
                                </Col>
                                <Col sm="1" style={{textAlign: "right"}}>
                                    {/*  */}
                                </Col>
                                <Col sm="7" style={{textAlign: "right"}}>
                                    {/*  */}
                                    <p className='m-0 d-fixed'>
                                        <b component="h1">Fee :</b> GHS {fee}
                                    </p>
                                    <p className='m-0 d-fixed'>
                                        <b component="h1">Amount :</b> GHS {amount}
                                    </p>
                                    <p className='m-0 d-fixed'>
                                        <b component="h1">Phone :</b> {phoneNumber}
                                    </p>
                                    {/* {phoneNumber.replace(/\s+/g, '')} */}

                                </Col>
                            </Row>
                        </FormControl>
                        <FormControl fullWidth className='m-0' variant="standard">

                            <InputLabel id="demo-simple-select-standard-label">Select mobile operator</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                error={accountTypeError}
                                value={accountType}
                                onChange={(e) => { (setAccountType(e.target.value)); (setAccountTypeError(false)) }}
                                label="Select"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    methodOfPayment?.map((post, id) =>
                                        <MenuItem value={post.id} key={post.id}>{post.name}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>

                        <TextField
                            error={accountNumberError}
                            value={accountNumber || phoneNumber}
                            onChange={(e) => { (setAccountNumber(e.target.value)); (setAccountNumberError(false)) }}
                            id="accountNumber"
                            name="accountNumber"
                            label="Phone number"
                            variant="standard"
                            margin="normal"
                            type="tel"
                            fullWidth
                            required
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" >
                                    <CTooltip
                                        content=" This field is required, provide a valid phone number in the form eg. 0xx xxxx xxx"
                                        placement="top"
                                    >
                                    <CIcon icon={cilInfo} className="me-2" />
                                    </CTooltip>
                                </InputAdornment>
                              ),
                            }}
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{background: "#FF7643"}}
                            onClick={(e) => handleSubmit(e, 2)}
                        >
                            Continue
                        </Button>

                    </Box>
                </CModalBody>
                {/* <CModalFooter>
                    <CButton color="secondary" className='text-white' onClick={() => setModal2(false)}>
                        Close
                    </CButton>
                    <CButton className='text-white bg-text-wp' onClick={() => printContent()}>
                        Print
                    </CButton>

                </CModalFooter> */}
            </CModal>


            <CModal visible={modal2} alignment="center" backdrop="static" onClose={() => setModal2(false)}>
                <CModalHeader>
                    <CModalTitle>  </CModalTitle>
                </CModalHeader>
                <CModalBody className=''>
                    {/* form feild to validate otp form 4*/}
                    
                    <FormControl fullWidth className='m-0' variant="standard">
                        {/*  */}
                        <Row>
                            <Col sm="4" style={{textAlign: "right"}}>
                                {/*  */}
                            </Col>
                            <Col sm="1" style={{textAlign: "right"}}>
                                {/*  */}
                            </Col>
                            <Col sm="7" style={{textAlign: "right"}}>
                                    {/*  */}
                                    <p className='m-0 d-fixed'>
                                        <b component="h1">Fee :</b> GHS {fee}
                                    </p>
                                    <p className='m-0 d-fixed'>
                                        <b component="h1">Amount :</b> GHS {amount}
                                    </p>
                                    <p className='m-0 d-fixed'>
                                        <b component="h1">Phone :</b> {phoneNumber}
                                    </p>
                                    {/* {phoneNumber.replace(/\s+/g, '')} */}

                                </Col>
                        </Row>
                    </FormControl>
                    <Box noValidate sx={{ m: 2 }} id="form-4">

                        <TextField
                            error={otpError}
                            value={otp}
                            onChange={(e) => { (setOtp(e.target.value)); (setOtpError(false)) }}
                            id="otp"
                            name="otp"
                            label="Otp"
                            variant="standard"
                            margin="normal"
                            type="text"
                            fullWidth
                            required
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" >
                                    <CTooltip
                                        content="This field is required. Please check your mobile phone and type the code here"
                                        placement="top"
                                    >
                                    <CIcon icon={cilInfo} className="me-2" />
                                    </CTooltip>
                                </InputAdornment>
                              ),
                            }}
                        />
                        <Row>
                            <Col xs="5" sm="5" lg="5"></Col>
                            <Col xs="4" sm="4" lg="4"> <a dangerouslySetInnerHTML={{ __html: loader }}></a> </Col >
                            
                        </Row>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{background: "#FF7643"}}
                            onClick={(e) => handleSubmit(e, 4)}
                        >
                            Continue
                        </Button>

                    </Box>
                </CModalBody>
                {/* <CModalFooter>
                    <CButton color="secondary" className='text-white' onClick={() => setModal2(false)}>
                        Close
                    </CButton>
                    <CButton className='text-white bg-text-wp' onClick={() => printContent()}>
                        Print
                    </CButton>

                </CModalFooter> */}
            </CModal>
            
        </ThemeProvider>
    );
}
