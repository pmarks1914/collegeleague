import React, { Component, createRef } from 'react';
import {Badge, Col, Card, CardHeader, CardBody, Breadcrumb, BreadcrumbItem, Row, TabContent, TabPane, Jumbotron, Input, InputGroup, InputGroupText, Label} from 'reactstrap';
import './myacc.css';
import $ from 'jquery';
import Dropzone from 'react-dropzone';
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

import file from '../../../assets/images/avatars/1.jpg';
import { CButton } from '@coreui/react';

// $("div#myId").dropzone({ url: "/file/post" });
const dropzoneRef = createRef();
const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point 
  if (dropzoneRef.current) {
    dropzoneRef.current.open()
  }
};


// window.location.href = "/my-account";

class MyAccount extends Component {
    constructor(){
        super();
        this.state = {
            imageUrl: null,
            files: [],
            pass1: "",
            pass2: "",
            pass3: "",
            name: "",
            phone: "",
            email: "",
            walletbtc: "",
            loadVal: 0,
            formCategory: 0
        };
        
    }
    componentDidMount(){
        this.setState({loadVal: 2, businessType: ""});
        
        $(".under-line-1").css("text-decoration", "underline");
    }
    
    onDrop = (files) => {
        this.setState({
            imageUrl: files.map(file => URL.createObjectURL(file) ),
            files: files,
        })
    };
    openSection(hashURL){
        // 
        console.log("hash ", hashURL)
        $(".under-line-1").css("text-decoration", "none");
        $(".under-line-2").css("text-decoration", "none");
        $(".under-line-3").css("text-decoration", "none");
        $(".under-line-4").css("text-decoration", "none");
        switch (hashURL) {
            case "#personal":
                $(".under-line-1").css("text-decoration", "underline");
                break;
            case "#business":
                $(".under-line-2").css("text-decoration", "underline");
                break;
            case "#cert":
                $(".under-line-3").css("text-decoration", "underline");
                break; 
            case "#settlement":
                $(".under-line-4").css("text-decoration", "underline");
                break;        
            default:
                break;
        };  
        
    }

  handleDropdownChange(event){
    // setbusinessType(event.target.value);
  };
  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
    render() {
        const filesDes = this.state?.files[0]?.name;   
        // let hashURL = window.location.hash;
        // console.log(this.state.loadVal);  
        return (
            <div className="row">
                
                <Col xs="12" sm="12" md="4" lg="4" >

                    <div className="profile-left">

                        <i className="fa fa-gears fa-1x under-line-1" onClick={(e)=>{ this.setState({formCategory: 0}); this.openSection("#personal")} }> Personal Information </i> 

                        <br />
                        <i className="fa fa-lock fa-1x under-line-2" onClick={(e)=>{ this.setState({formCategory: 1}); this.openSection("#business") } }> Business Information </i> 
                        
                        <br />
                        <i className="fa fa-info-circle fa-1x under-line-3" onClick={(e)=>{ this.setState({formCategory: 2}); this.openSection("#cert")} }> Upload Certificates </i> 

                        {/* <br />
                        <i className="fa fa-info-circle fa-1x under-line-4" onClick={(e)=>{ this.setState({formCategory: 3}); this.openSection("#certCommence")} }> Certificate to Commence Business </i>  */}
                        <br />

                        <i className="fa fa-info-circle fa-1x under-line-4" onClick={(e)=>{ this.setState({formCategory: 3}); this.openSection("#settlement")} }> Settlement </i> 

                        <br /> 
                        {/* <i className="fa fa-line-chart fa-1x under-line-4" onClick={(e)=>{ this.setState({formCategory: 3}); this.openSection("#wallet")} }>  Manage Wallet </i>  */}

                    </div>
                    
                </Col>

                <Col xs="12" sm="12" md="7" lg="7" className="profile-right">
                    {/*general */}
                    { this.state.formCategory === 0 ?
                    <div className="prof-cont-1" id="general"> 
                        {/* profile general */}
                        
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
                            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar> */}
                            <Typography component="h1" variant="h5">
                            Personal Information 
                            </Typography>
                            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField 
                                id="standard-basic"
                                name = "businessname"
                                label="Business Name"
                                variant="standard"
                                margin = "normal" 
                                type="text"
                                fullWidth
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                    value={this.businessType}
                                    onChange={this.handleDropdownChange}
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
                                <br />
                                <CButton
                                    type="submit"
                                    className='bg-text-com-wp btn-com-wp'
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    >
                                    Next
                                </CButton>
                            </Box>
                            </Box>
                        </Container>
                        <br /><br /><br />
                    </div>
                    : ""}
                    {/* Business Information  */}  
                    {/* { this.state.formCategory } */}
                    { this.state.formCategory === 1 ?
                    <div className="prof-cont-2" id="pass"> 
                        {/* profile  */}
                        <h3 className="top-des"> 1 </h3>
                        
                        <br /><br /><br />
                    </div>
                    : ""}
                    
                    {/* certificates Verification */}
                    { this.state.formCategory === 2 ?
                    <div className="prof-cont-3" id="verify" > 
                        {/* profile id verification */}
                        {/* Picture upload */}
                        {/* {this.state?.files[0]?.type} */}
                        <h3 className="top-des"> Document Verification </h3>

                        {
                            (["image/jpeg", "image/png", "image/jpg"] )?.includes( this.state?.files[0]?.type?.toString()?.toLowerCase() ) ? <img src={ this.state?.imageUrl } className="kyc-file" /> 
                            : ""
                        }

                        {
                            (["application/pdf"])?.includes(this.state?.files[0]?.type?.toString()?.toLowerCase() ) ?
                                <>
                                    <iframe src={this.state?.imageUrl} className="kyc-file" width="100%" height="350px"> 
                                        {
                                            (["application/pdf"] )?.includes(this.state?.files[0]?.type?.toString()?.toLowerCase() ) ? this.state?.filesDes : "ile"
                                        }
                                    </iframe>
                                    <br />
                                    <a href={ this.state?.imageUrl } target="_blank" rel="noopener noreferrer"> Click to view in full</a>
                                </>
                            : ""
                        }

                        <aside>
                            <ul>
                                {
                                    (["image/jpeg", "image/png", "image/jpg", "application/pdf"] )?.includes( this.state?.files[0]?.type?.toString()?.toLowerCase() ) ?
                                    filesDes : <i className="not-supported">{"File not supported"}</i>
                                }
                            </ul>
                        </aside>
                        <Dropzone onDrop={this.onDrop}>
                            {({getRootProps, getInputProps}) => (
                                <section className="container">
                                    <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag and drop file here, or click to select file</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>               
                        <CButton
                            type="submit"
                            className='bg-text-com-wp btn-com-wp'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Next
                        </CButton>
                        <br /><br /><br />
                    </div>
                    : ""}
                    
                    {/* settlement */}
                    { this.state.formCategory === 3 ?
                    <div className="prof-cont-4" id="wallet" > 
                        {/* profile wallet */}
                        <h3 className="top-des"> Settlement </h3>
                        <br />                  
                        <CButton
                            type="submit"
                            className='bg-text-com-wp btn-com-wp'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Next
                        </CButton>
                        <br /><br /><br />
                    </div>
                    : ""}

                </Col>
                  
            </div>
        );
    }
}

export default MyAccount;
