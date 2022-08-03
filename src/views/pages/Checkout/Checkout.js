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
sessionStorage.setItem("trackTransaction", false)
let intervalWait;

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

    // for checkout page 
    const [isCheckout, setIsCheckout] = useState(false)
    // for custom checkout page
    const [isCustomCheckout, setIsCustomCheckout] = useState(false)

    const [pagePaymentMethod, setPagePaymentMethod] = useState(false)
    const [trackTransaction, setTrackTransaction] = useState(false)

    const [transactionId, setTransactionId] = useState("")
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
    const [feeType, setFeeType] = useState("")
    const [admissionId, setAdmissionId] = useState("")
    const [email, setEmail] = useState("")
    const [prefix, setPrefix] = useState(window.location.pathname.split("/")[3]);
      
    // error states
    const [fullNameError, setFullNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [accountTypeError, setAccountTypeError] = useState(false);
    const [accountNumberError, setAccountNumberError] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [feeTypeError, setFeeTypeError] = useState(false)
    const [admissionIdError, setAdmissionIdError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    
    // data
    const [payeeData, setPayeeData] = useState({})
    const [feeData, setFeeData] = useState([])

    // modals
    const [modal1, setModal1] = useState(false)
    // 
    const [modal2, setModal2] = useState(false)

    useEffect(()=>{
        // condition for only normal checkout
        if(window.location.pathname.split("/")[1] === "checkout"){
            // 
            let checkoutId = window.location.pathname.split("/")[2]
            // console.log("window", checkoutId)
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
                    // console.log("data checkout ==", response?.data);
                    if (response?.data?.status === true) {
                        // 
                        // console.log("g>>>")
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
                let config_fee_list = {
                    method: 'get',
                    url: process.env.REACT_APP_BASE_API + "/list/" + checkoutId + "/",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                };
            
                axios(config_fee_list).then(response => {
                    // console.log("data checkout ==", response?.data);
                    if (response?.data?.status === true) {
                        // 
                    }
                }).catch(function (error) {
                    // 
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
                }).then((result) => {
                    // 
                })

            }
        

        }
        else if(window.location.pathname.split("/")[1] === "pay"){
            // for custom checkout
            let prefix = window.location.pathname.split("/")[2]
            // console.log("window", checkoutId)
            setPrefix(prefix)
            setIsCheckout(true)
            setIsCustomCheckout(true)
            if(prefix){
                // setMerchantId(checkoutId);
                let data = '';
                let config_ch = {
                    method: 'get',
                    url: process.env.REACT_APP_BASE_API + "/verify/paymentlink/" + prefix + "/",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                };
                
                axios(config_ch).then(response => {
                    // console.log("data custom checkout ==", response?.data);
                    if (response?.data?.status === true) {
                        // console.log("g>>>")
                        sessionStorage.setItem("sessionData", JSON.stringify(response?.data))
                        setSessionData(response?.data)
                        // setAccountNumber(response?.data?.data?.phone)
                        // setPhoneNumber(response?.data?.data?.phone)
                        // setAmount(response?.data?.data?.amount)
                        setFee(response?.data?.data?.fee || "0.00")
                        setPrefix(response?.data?.prefix)
                        setSourceMetadata(response?.data?.data)

                        // window.history.pushState("", "", '/pay')

                        getFeeType()

                    }
                    else{
                        // Swal.fire({
                        //     title: 'Oops',
                        //     html: "<div class='pb-0 pt-0'> Invalid Session</div>",
                        //     icon: 'error',
                        //     showCancelButton: false,
                        //     showConfirmButton: false,
                        //     allowOutsideClick: false,
                        // }).then((result) => {
                        //     // 
                        // })
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
        // console.log("window.location pathname ", window.location.pathname.split("/")[1])
        let expPhone = /(020|023|024|025|026|027|028|050|054|055|059)[\s.-]?\d{7}$/;
        // expPhone.test(phoneNumber)  
        // console.log("amountError ", formType, expPhone.test(phoneNumber), (Number(amount) ? true : false), admissionId.length)
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
            // console.log("accountType ", formType, Number(accountType), accountType, accountTypeError, ([1, 5, 6, 7]).includes(accountType), accountNumber)
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
                // setModal2(true)
                setModal1(false)
                setTimeout(() => {
                    // genericOpt("sendOtp");
                    nameCheck();
                    // setModal2(true);
                }, 1000);
            }
        }
        if (formType === 3) {
            // for custom checkout initial form fields 
            if (admissionId.length < 8) {
                setAdmissionIdError(true)
            }

            if (!emailError && email.length < 4) {
                setEmailError(true)
            }
            if (!feeTypeError && feeType.length < 4) {
                setFeeTypeError(true)
            }
            else if (!(expPhone.test(phoneNumber))) {
                setPhoneNumberError(true)
            }
            else if (!(Number(amount) ? !(amount.length < 1) : false)) {
                // console.log("amount ", amount)
                setAmountError(true)
            }
            else{
                // setModal1(true) payeed
                setPagePaymentMethod(true)
                setSourceMetadata(
                    {
                    "full_name": payeeData.fullName,
                    "first_name": "",
                    "last_name": "",
                    "email": email,
                    "admission_id": admissionId,
                    "fee_type": feeType,
                    "mobile_number": phoneNumber,
                    "recipient_address": accountNumber,
                    "studentId": payeeData.studentId,
                    "currentLevel": payeeData.currentLevel,
                    "sex": payeeData.sex,
                    "program": payeeData.program,
                    "sessionName": payeeData.sessionName,
                    "mobileNo": payeeData.mobileNo,
                    "currency": payeeData.currency,
                    "accountNo": payeeData.accountNo,
                    "balance": payeeData.balance
                })
            }
        }
        if (formType === 4) {
            // console.log("otp >>>>", otpError, otp.charAt(3))
            if (!otpError && (otp.length < 4) || !(otp.charAt(3)) || !(Number(otp) ? true : false) ) {
                // add verify otp to the if checks
                setOtpError(true)
            }
            else{
                genericOpt("verifyOtp");
                
            }

        }

        // check btn text for pay now
        // if (btnText === "Pay now") {
        //     setBtnText("Pay now")
        // }
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
    // const typeOfFee = [
    //     { "name": "Fee 1", "id": 1 },
    //     { "name": "Fee 2", "id": 5 },
    // ]
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
                // console.log("data otp==", response?.data);
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
                // console.log("data otp verify==", response?.data);
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
        setLoader('<div class="spinner dashboard-loader" style="color: #e0922f; text: center"></div>')

        axios(config).then(response => {
            // console.log("data otp==", response?.data);
            if (response?.data?.status) {
                // 
                setTransactionId(response?.data?.transaction_id)
                setLoader(``)
                let textStr = "<p>Payment of GHS" + amount.toString() + " to " + (sessionData?.merchant_name?.toString() || '') + " </p> <p>1. Kindly approve the payment request on your phone </p>";

                Swal.fire({
                title: 'Pending Approval',
                html: textStr.toString(),
                // icon: 'success',
                // timer: 6000,
                allowOutsideClick: false,
                // allowEscapeKey: false,
                showCancelButton: false,
                showConfirmButton: false,
                confirmButtonColor: '#FF7643',
                // cancelButtonColor: '#d33',
                // confirmButtonText: 'OK'
                didOpen: () => {
                    Swal.showLoading()
                    setTrackTransaction(sessionStorage.getItem("trackTransaction"))
                    intervalWait = setInterval(function(){
                        statusTransaction(response?.data?.transaction_id)
                    }, 5000)
                },
                willClose: () => {
                    // clearInterval(timerInterval)
                }
                }).then((result) => {
                setTimeout(() => {
                    setModal2(false)
                    if(isCheckout){
                        // checkout redirect 
                        // window.location.href = sourceMetadata?.callbackurl
                    }
                }, 1000);
                });
            }
            else{
                // setLoader(``)

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

    // telcos
    function nameCheck(){

        let data = {}
        if(accountType === 1){
            // WINGIPAY
            data = {
                "phone": accountNumber,
                "network": "WINGIPAY"
            }
        }
        else if(accountType === 5){
            // MTN
            data = {
                "phone": accountNumber,
                "network": "MTN"
            }
        }
        else if(accountType === 6){
            // VODAFONE
            data = {
                "phone": accountNumber,
                "network": "VODAFONE"
            }
        }
        else if(accountType === 7){
            // AIRTELTIGO
            data = {
                "phone": accountNumber,
                "network": "AIRTELTIGO"
            }
        }

        let config = {
            method: 'post',
            url: process.env.REACT_APP_BASE_API + "/namecheck/",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + userData?.access
            },
            data: data
        };

        setLoader('<div class="spinner-border dashboard-loader" style="color: #e0922f; text: center"></div>')
        axios(config).then(response => {
            console.log("data namecheck verify==", response?.data);
            if (response?.data?.status) {
                setLoader('')
                makePayment();
                setTimeout(() => {
                    setModal2(false)
                }, 3000);
            }
            else{
                setLoader('')
                genericOpt("sendOtp");
            }
        }).catch(function (error) {
            if(error){
                setLoader('')
                genericOpt("sendOtp");
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
        }
        )
    }
    // schools name check
    function nameOrganizationCheck(organizationType, admissionInputValue){
        let data = {}
        if(organizationType === 1 && admissionInputValue.length > 7){
            // atu
            data = {
                "StudentID": admissionId,
            }
            let config = {
                method: 'get',
                url: process.env.REACT_APP_BASE_API + "/atu/student/lookup/" + admissionInputValue + "/",
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + userData?.access
                },
                data: data
            };

            axios(config).then(response => {
                console.log("data setPayeeData verify==", response?.data);
                if (response?.data?.status) {
                    setPayeeData(response?.data?.student)
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
    // fee types orga

    function getFeeType(){
        let data = {}

        let config = {
            method: 'get',
            url: process.env.REACT_APP_BASE_API + "/atu/fee/type/",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + userData?.access
            },
            data: data
        };

        axios(config).then(response => {
            console.log("data setFeeData ==", response?.data);
            if (response?.data?.status) {
                setFeeData(response?.data?.payment_types)
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
    function statusTransaction(id){

        let data = '';
        let config_ch = {
            method: 'get',
            url: process.env.REACT_APP_BASE_API + "/transaction/status/" + id + "/",
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
    
        axios(config_ch).then(response => {
            // console.log("data transaction status ==", response?.data);
            if (response?.data?.transaction_status === "SUCCESSFUL") {
                // console.log("g>>>")
                // setTrackTransaction(true)
                clearInterval(intervalWait)
                sessionStorage.setItem("trackTransaction", true)
                
                let textStr = "<p>Payment of GHS" + amount.toString() + " to " + (sessionData?.merchant_name?.toString() || sessionData?.merchant_id || '') + " </p> <p>Reference :</p>" + response?.data?.referance_id;

                Swal.fire({
                title: 'Successful',
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
                    if(isCheckout){
                        // checkout redirect 
                        if(sourceMetadata?.callbackurl){
                            // 
                            window.location.href = sourceMetadata?.callbackurl
                        }
                    }
                }, 1000);
                });

            }  
            else if(response?.data?.transaction_status === "FAILED") {
                // console.log("g>>>")
                // setTrackTransaction(true)
                clearInterval(intervalWait)                
                let textStr = "<p>Payment not successful </p>";

                Swal.fire({
                title: 'Failed',
                html: textStr.toString(),
                icon: 'error',
                // timer: 6000,
                allowOutsideClick: false,
                // allowEscapeKey: false,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: '#FF7643',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
                }).then((result) => {
                    
                    
                });

            }           

        }).catch(function (error) {
            // 
            // if(error){
            //     Swal.fire({
            //         title: 'Application Error',
            //         title: 'Oops',
            //         html: "<div class='pb-0 pt-0'> Try again later </div>",
            //         icon: 'warning',
            //         showCancelButton: false,
            //         showConfirmButton: false,
            //         allowOutsideClick: false,
            //     }).then((result) => {
            //         // 
            //     })
            // }
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
                    !pagePaymentMethod ? (
                        (isCheckout && isCustomCheckout) ?
                        (
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

                            {/* custom checkout form fields */} 
                            <Box noValidate sx={{ m: 2 }} id="form-1">

                                <TextField
                                    error={admissionIdError}
                                    value={admissionId}
                                    onChange={(e) => { (setAdmissionId(e.target.value)); (setAdmissionIdError(false)); (nameOrganizationCheck(1, e.target.value)) }}
                                    id="admissionId"
                                    name="admissionId"
                                    label="Student ID or Reference No."
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
                                    error={emailError}
                                    value={email}
                                    onChange={(e) => { (setEmail(e.target.value)); (setEmailError(false)) }}
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="standard"
                                    margin="normal"
                                    type="email"
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
                                <FormControl fullWidth className='m-0' variant="standard">
        
                                    <InputLabel id="fee-type">Select fee type</InputLabel>
                                    <Select
                                        labelId="fee-type"
                                        // id="demo-simple-select-standard"
                                        error={feeTypeError}
                                        value={feeType}
                                        onChange={(e) => { (setFeeType(e.target.value)); (setFeeTypeError(false)) }}
                                        label="Select"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            feeData?.map((post, id) =>
                                                <MenuItem value={post.id} key={post.id}>{post.paymentName}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>

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
                                    onClick={(e) => {handleSubmit(e, 3)}}
                                >
                                    {btnText}
                                </Button>

                            </Box>

                            </Box>
                            )
                            :
                            ( isCheckout ?
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
                                                <b component="h1">{sessionData?.data?.full_name} </b> 
                                            </p>
                                            <p className='m-0 d-fixed checkout-ps-info'>
                                                <b component="h1">Amount :</b> GHS {amount}
                                            </p>
                                            <p className='m-0 d-fixed checkout-ps-info'>
                                                <b component="h1">Fee :</b> GHS {fee}
                                            </p>
                                            {/* <p className='m-0 d-fixed checkout-ps-info'>
                                                <b component="h1">Phone :</b> {phoneNumber}
                                            </p> */}
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
                                        onClick={(e) => {handleSubmit(e, 1)}}
                                    >
                                        {btnText}
                                    </Button>

                                </Box>

                            </Box>
                        )
                    ) : ""
                }

                {
                    pagePaymentMethod ?
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
                                    {
                                        console.log("", )
                                    }
                                    <p className='m-0 d-fixed checkout-ps-info'>
                                        <b component="h1">{sessionData?.data?.full_name || payeeData.fullName} </b> 
                                    </p>
                                    <p className='m-0 d-fixed checkout-ps-info'>
                                        <b component="h1">Amount :</b> GHS {amount}
                                    </p>
                                    <p className='m-0 d-fixed checkout-ps-info'>
                                        <b component="h1">Fee :</b> GHS {fee}
                                    </p>
                                    {/* <p className='m-0 d-fixed checkout-ps-info'>
                                        <b component="h1">Phone :</b> {phoneNumber}
                                    </p> */}
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
                            onClick={(e) => handleSubmit(e, 2)}
                        >
                            PAY NOW
                        </Button>
                        </Box>
                    </Box>
                    : ""
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
                                        <b component="h1">{fullName} </b> {}
                                    </p>
                                    <p className='m-0 d-fixed'>
                                        <b component="h1">Amount :</b> GHS {amount}
                                    </p>
                                    <p className='m-0 d-fixed'>
                                        <b component="h1">Fee :</b> GHS {fee}
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
                                        <b component="h1">Amount :</b> GHS {amount}
                                    </p>
                                    <p className='m-0 d-fixed'>
                                        <b component="h1">Fee :</b> GHS {fee}
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
