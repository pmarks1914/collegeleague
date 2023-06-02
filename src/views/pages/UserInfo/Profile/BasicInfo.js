import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Label, ButtonGroup } from 'reactstrap'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAccordion,
    CAccordionBody,
    CAccordionHeader,
    CAccordionItem,
    CButton,
    CCardGroup,
    CContainer
} from '@coreui/react';
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

import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Tab, Tabs, TabPanel, TabList, TabPanels, ChakraProvider, Input, Stack, GridItem, Grid, Text, Divider } from '@chakra-ui/react';
import theme from "src/styles/Styles"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import InputAdornment from '@mui/material/InputAdornment';
import CIcon from '@coreui/icons-react';import {
    // cilBell,
    cilCreditCard,
    cilUser,
    cilTask,
    cilEnvelopeOpen,
    // cilFile,
    cilInfo,
    cilCloudDownload,
    cilLockLocked,
    // cilSettings,
    cilWarning,
    cilFilter, cilCheckCircle, cilSettings, cilCalendar, cilSearch,
} from '@coreui/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2';

import 'antd/dist/antd.css';
import { message, Upload } from 'antd';
import { DownloadIcon } from '@chakra-ui/icons';

import { DocsCallout, DocsExample } from 'src/components'
import classnames from 'classnames';
// import './gen.css';
import $ from 'jquery';
import Select, { components } from 'react-select';
import PropTypes, { func } from "prop-types";
import { getSessionTimeout } from '../../../../Utils/Utils';

let date = new Date();
// let dateYearInterval = 100;
// let i = 1;s

// const createOption = (label, dataId) => ({
//   label,
//   value: dataId,
// });
let optionsFinYear = [...Array(100)].map((x, i) => {
    return ({ value: (date.getUTCFullYear() - 100 + 1 + i), label: (date.getUTCFullYear() - 100 + 1 + i), key: i + 1 })
    // return createOption( (date.getUTCFullYear()-100+1+i), (date.getUTCFullYear()-100+1+i) )
}
);
const optionsFinMonth = [
    // {value: "", label: "Select Fin-Month", icon: "", isDisabled: true },
    { value: "January", label: "January", key: 1 },
    { value: "February", label: "February", key: 2 },
    { value: "March", label: "March", key: 3 },
    { value: "April", label: "April", key: 4 },
    { value: "May", label: "May", key: 5 },
    { value: "June", label: "June", key: 6 },
    { value: "July", label: "July", key: 7 },
    { value: "August", label: "August", key: 8 },
    { value: "September", label: "September", key: 9 },
    { value: "October", label: "October", key: 10 },
    { value: "November", label: "November", key: 11 },
    { value: "December", label: "December", key: 12 },
];

const userData = JSON.parse(localStorage.getItem('userDataStore'));

const BasicInfo = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);

    const [getFormDataError, setGetFormDataError] = React.useState({
        "first_name": false,
        "last_name": false,
        "other_names": false,
        "email": false,
        "phoneNumber": false,
        "photo": false,
        "dateOfBirth": false,
    })
    const [getFormData, setGetFormData] = React.useState({})
    const [selectedValue, setSelectedValue] = React.useState('a');

    const [country, setCountry] = React.useState('');
    const [profileType, setProfileType] = React.useState('');

    const [profilePhoto, setProfilePhoto] = useState(userData.photo)
    const [photoList, setPhotoList] = useState([]);
    // profile photo loading
    const [uploading3, setUploading3] = useState(false);
    const [newPhoto, setNewPhoto] = useState(null)
    
    // console.log(props?.profileManage)
    // certificate    
    const [profileCertificate, setProfileCertificate] = useState(userData.certificate)
    const [certificateList, setCertificateList] = useState([]);
    // profile Certificate loading
    const [uploading2, setUploading2] = useState(false);
    const [newCertificate, setNewCertificate] = useState(null)
    useEffect(() => {

        //   getSessionTimeout();
    }, [])

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
        if (tab === '1' || tab === '14') {
            document.getElementById("fin-month-id").style.display = "block";
        }
        else {
            document.getElementById("fin-month-id").style.display = "none";
        }


    }

    const props2 = {
        onChange: (info) => {
            console.log("l ", info.fileList);
        },
        onRemove: (file) => {
            const index = certificateList.indexOf(file);
            const newFileList = certificateList.slice();
            newFileList.splice(index, 1);
            setCertificateList(newFileList);
        },
        beforeUpload: (file) => {
            setCertificateList([file]);
            return false;
        },
        certificateList,
    };
    const props3 = {
        onChange: (info) => {
            console.log("l ", info.fileList);
        },
        onRemove: (file) => {
            const index = photoList.indexOf(file);
            const newFileList = photoList.slice();
            newFileList.splice(index, 1);
            setPhotoList(newFileList);
        },
        beforeUpload: (file) => {
            setPhotoList([file]);
            return false;
        },
        photoList,
    };
    // profile upload
    const handlePhotoUpload = () => {
        const formData2 = new FormData();
        photoList.forEach((photo) => {
            formData2.append('photo', photo);
            // console.log("rtghrghhrthrhrthrthrthrtrtrtgrt", directorTwoID)

            let config = {
                method: 'patch',
                url: process.env.REACT_APP_BASE_API + '/account/photo/upload/' + userData.account + "/",
                headers: {
                    "Authorization": `Bearer ${userData.access}`,
                    'Content-Type': 'application/json',
                },
                data: formData2
            };
            //   console.log(photo.type)
            if (photo.type === 'image/png' || photo.type === 'image/jpg' || photo.type === 'image/jpeg') {
                axios(config).then(function (response) {

                    // console.log(response?.data, photo)
                    if (response.status === 200) {
                        toast.success('File Upload Successful', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setNewPhoto(photo);
                        let currentUser_new = JSON.parse(localStorage.getItem('userDataStore'));

                        currentUser_new["photo"] = response?.data?.photo;

                        localStorage.setItem("userDataStore", JSON.stringify(currentUser_new));
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)

                    }
                    if (response.status != 200) {
                        toast.error('An error occured. Please try again', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }

                })
                    .catch(function (error) {

                        toast.error('An error occured. Please try again', {
                            position: toast.POSITION.TOP_RIGHT
                        });

                        // console.log(error);
                    });
            }
            else {
                //
                toast.error('Unsupported file type for photo.', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        });

        setUploading3(false); // You can use any AJAX library you like
    };



    // function trackActivity() {
    //   // e.preventDefault();
    //   getSessionTimeout();
    //   const currentUser_new = JSON.parse(localStorage.getItem("userDataStore"));    
    //   if(currentUser_new){
    //     currentUser_new["timeLogout"] = new Date().getTime() + currentUser_new?.counter;
    //     localStorage.setItem('userDataStore', JSON.stringify(currentUser_new))
    //   }
    // }

    // window.onclick = function (event) {
    //   // event.preventDefault()
    //   trackActivity()
    // }

    return (
        <div className="">
            {
                props?.profileManage === "basic" ?
                <CAccordion activeItemKey={1} className="mt-5">
                    <h6>Basic Information</h6>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>Personal Information</CAccordionHeader>
                        <CAccordionBody>

                            <CCol xs="12" sm="12" md={12} lg={12} className="mt-1" >
                                <div className='mui-control-form' >
                                    <Box
                                        component="form"
                                        noValidate
                                        autoComplete="on"
                                    >
                                        <InputLabel shrink htmlFor="fname"> </InputLabel>
                                        <TextField
                                            error={getFormDataError?.first_name}
                                            id="fname"
                                            name="fname"
                                            placeholder="First name"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            fullWidth
                                            required
                                            onChange={(e) => (setGetFormData({ ...getFormData, ...{ "first_name": e.target.value } }), setGetFormDataError({ ...getFormDataError, ...{ "first_name": false } }))}
                                        />

                                        <InputLabel shrink htmlFor="lname"> </InputLabel>
                                        <TextField
                                            error={getFormDataError?.last_name}
                                            id="lname"
                                            name="lname"
                                            placeholder="Last name"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            fullWidth
                                            required
                                            onChange={(e) => (setGetFormData({ ...getFormData, ...{ "last_name": e.target.value } }), setGetFormDataError({ ...getFormDataError, ...{ "last_name": false } }))}

                                        />

                                        <InputLabel shrink htmlFor="oname"> </InputLabel>
                                        <TextField
                                            error={getFormDataError?.other_names}
                                            id="oname"
                                            name="oname"
                                            placeholder="Other name"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            fullWidth
                                            required
                                            onChange={(e) => (setGetFormData({ ...getFormData, ...{ "other_names": e.target.value } }), setGetFormDataError({ ...getFormDataError, ...{ "other_names": false } }))}
                                        />
                                        <Row className='m-3 mt-4'>
                                            <Col sm="2" xs="2" md="2" lg="2" xl="2" className='float-left'> Date of birth :</Col>
                                            <Col sm="4" xs="4" md="4" lg="4" xl="4" className='ml-1'>
                                                <InputLabel shrink htmlFor="dateOfBirth"> </InputLabel>
                                                <TextField
                                                    error={getFormDataError?.dateOfBirth}
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="date"
                                                    placeholder="Date of birth"
                                                    name="dateOfBirth"
                                                    autoFocus
                                                    variant="outlined"
                                                    className='mb-0'
                                                    onChange={(e) => (setGetFormData({ ...getFormData, ...{ "dateOfBirth": e.target.value } }), setGetFormDataError({ ...getFormDataError, ...{ "dateOfBirth": false } }))}
                                                />
                                            </Col>
                                        </Row>
                                    </Box>
                                </div>
                            </CCol>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            // style={{ color: "#fff" }}
                            // className="bg-text-com-wp"
                            //   onClick={(e)=>handleSubmit(e)}
                            >
                                Save
                            </Button>
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={2}>
                        <CAccordionHeader>Profile Image</CAccordionHeader>
                        <CAccordionBody>
                            <strong>Upload your profile image</strong>
                            <p className='mt-4 mb-1'>Your file size must be less than 1.22 MB</p>                                            
                            <Upload {...props3} onChange={(e) => { setProfilePhoto(e?.target?.value || null) }} value={profilePhoto} maxCount={1} >                        
                                <ButtonGroup variant='outline' spacing='6'>
                                    <Button className='bg-secondary text-white' ><CIcon icon={cilCloudDownload} className="me-2" /> Select an image </Button>
                                </ButtonGroup>
                            </Upload>
                            {/* <Button
                                // type="primary"
                                colorScheme='orange'
                                onClick={handlePhotoUpload}
                                disabled={photoList.length === 0}
                                loading={uploading3}
                                style={{
                                    marginTop: 16,
                                }}
                            >
                                {uploading3 ? 'Uploading' : 'Submit Photo'}
                            </Button> */}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            //   onClick={(e)=>handleSubmit(e)}
                            >
                                Save
                            </Button>
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={3}>
                        <CAccordionHeader>Contact Details</CAccordionHeader>
                        <CAccordionBody>

                            <CCol xs="12" sm="12" md={12} lg={12} className="mt-1" >
                                <div className='mui-control-form' >
                                    <Box
                                        component="form"
                                        noValidate
                                        autoComplete="on"
                                    >
                                        <InputLabel shrink htmlFor="email"> </InputLabel>
                                        <TextField
                                            error={getFormDataError?.email}
                                            id="email"
                                            name="email"
                                            placeholder="Your email"
                                            variant="outlined"
                                            margin="normal"
                                            type="email"
                                            fullWidth
                                            required
                                            onChange={(e) => (setGetFormData({ ...getFormData, ...{ "email": e.target.value } }), setGetFormDataError({ ...getFormDataError, ...{ "email": false } }))}
                                        />

                                        <InputLabel shrink htmlFor="phoneNumber"> </InputLabel>
                                        <TextField
                                            error={getFormDataError?.phoneNumber}
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="text"
                                            placeholder="Phone number"
                                            name="phoneNumber"
                                            autoFocus
                                            variant="outlined"
                                            className='mt-3 mb-0'
                                            onChange={(e) => (setGetFormData({ ...getFormData, ...{ "phoneNumber": e.target.value } }), setGetFormDataError({ ...getFormDataError, ...{ "phoneNumber": false } }))}
                                        />
                                    </Box>
                                </div>
                            </CCol>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            //   onClick={(e)=>handleSubmit(e)}
                            >
                                Save
                            </Button>
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={4}>
                        <CAccordionHeader>Address</CAccordionHeader>
                        <CAccordionBody>
                            <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
                            
                        </CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
                : ""
            }
            {
                props?.profileManage === "education" ?
                <CAccordion activeItemKey={1} className="mt-5">
                    <h6>Education Information</h6>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>Certificate</CAccordionHeader>
                        <CAccordionBody>
                            <strong>Upload your certificate</strong>
                            <p className='mt-4 mb-1'>Your file size must be less than 1.22 MB</p>                                            
                            <Upload {...props3} onChange={(e) => { setProfileCertificate(e?.target?.value || null) }} value={profileCertificate} maxCount={1} >                        
                                <ButtonGroup variant='outline' spacing='6'>
                                    <Button className='bg-secondary text-white' ><CIcon icon={cilCloudDownload} className="me-2" /> Select a certificate </Button>
                                </ButtonGroup>
                            </Upload>
                            {/* <Button
                                // type="primary"
                                colorScheme='orange'
                                onClick={handlePhotoUpload}
                                disabled={photoList.length === 0}
                                loading={uploading3}
                                style={{
                                    marginTop: 16,
                                }}
                            >
                                {uploading3 ? 'Uploading' : 'Submit Photo'}
                            </Button> */}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            //   onClick={(e)=>handleSubmit(e)}
                            >
                                Save
                            </Button>
                        </CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
                : ""
            }

{
                props?.profileManage === "family" ?
                <CAccordion activeItemKey={1} className="mt-5">
                    <h6>Family Information</h6>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>Parent Primary</CAccordionHeader>
                        <CAccordionBody>
                            <strong></strong>
                        
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            //   onClick={(e)=>handleSubmit(e)}
                            >
                                Save
                            </Button>
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={2}>
                        <CAccordionHeader>Parent Secondary</CAccordionHeader>
                        <CAccordionBody>
                            <strong></strong>
                        
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            //   onClick={(e)=>handleSubmit(e)}
                            >
                                Save
                            </Button>
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={3}>
                        <CAccordionHeader>Household</CAccordionHeader>
                        <CAccordionBody>
                            <strong></strong>
                        
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            //   onClick={(e)=>handleSubmit(e)}
                            >
                                Save
                            </Button>
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={3}>
                        <CAccordionHeader>Sibling</CAccordionHeader>
                        <CAccordionBody>
                            <strong></strong>
                        
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            //   onClick={(e)=>handleSubmit(e)}
                            >
                                Save
                            </Button>
                        </CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
                : ""
            }

        </div>
    );
};

export default BasicInfo;


BasicInfo.propTypes = {
    profileManage: PropTypes.string,
    // getNewPassedWalkAction: PropTypes.instanceOf(PropTypes.any).isRequired
};