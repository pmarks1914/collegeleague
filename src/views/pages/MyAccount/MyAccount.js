import React, { Component, createRef } from 'react';
import {Badge, Col, Card, CardHeader, CardBody, Breadcrumb, BreadcrumbItem, Row, TabContent, TabPane, Jumbotron, Input, InputGroup, InputGroupText, Label, Button} from 'reactstrap';
import './myacc.css';
import $ from 'jquery';
import Dropzone from 'react-dropzone';
import file from '../../../assets/images/avatars/1.jpg';

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
        this.setState({loadVal: 2});
        
        $(".uder-line-1").css("text-decoration", "underline");
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
        $(".uder-line-1").css("text-decoration", "none");
        $(".uder-line-2").css("text-decoration", "none");
        $(".uder-line-3").css("text-decoration", "none");
        $(".uder-line-4").css("text-decoration", "none");
        switch (hashURL) {
            case "#personal":
                $(".uder-line-1").css("text-decoration", "underline");
                break;
            case "#business":
                $(".uder-line-2").css("text-decoration", "underline");
                break;
            case "#certiIncorporation":
                $(".uder-line-3").css("text-decoration", "underline");
                break;
                case "#certCommence":
                    $(".uder-line-4").css("text-decoration", "underline");
                    break; 
            case "#settlement":
                $(".uder-line-5").css("text-decoration", "underline");
                break;        
            default:
                break;
        };  
        
    }
    render() {
        const filesDes = this.state?.files[0]?.name;   
        // let hashURL = window.location.hash;
        // console.log(this.state.loadVal);  
        return (
            <div className="row">
                
                <Col xs="12" sm="12" md="4" lg="4" >

                    <div className="profile-left">

                        <i className="fa fa-gears fa-1x uder-line-1" onClick={(e)=>{ this.setState({formCategory: 0}); this.openSection("#personal")} }> Personal Information </i> 

                        <br />
                        <i className="fa fa-lock fa-1x uder-line-2" onClick={(e)=>{ this.setState({formCategory: 1}); this.openSection("#business") } }> Business Information </i> 
                        
                        <br />
                        <i className="fa fa-info-circle fa-1x uder-line-3" onClick={(e)=>{ this.setState({formCategory: 2}); this.openSection("#certiIncorporation")} }> Certificate of Incorporation </i> 

                        <br />
                        <i className="fa fa-info-circle fa-1x uder-line-4" onClick={(e)=>{ this.setState({formCategory: 3}); this.openSection("#certCommence")} }> Certificate to Commence Business </i> 
                        <br />

                        <i className="fa fa-info-circle fa-1x uder-line-5" onClick={(e)=>{ this.setState({formCategory: 4}); this.openSection("#settlement")} }> Settlement </i> 

                        <br /> 
                        {/* <i className="fa fa-line-chart fa-1x uder-line-4" onClick={(e)=>{ this.setState({formCategory: 3}); this.openSection("#wallet")} }>  Manage Wallet </i>  */}

                    </div>
                    
                </Col>

                <Col xs="12" sm="12" md="7" lg="7" className="profile-right">
                    {/*general */}
                    { this.state.formCategory === 0 ?
                    <div className="prof-cont-1" id="general"> 
                        {/* profile general */}                    
                        <h3 className="top-des"> General Profile </h3>
                        <i className="fa fa-user-circle fa-7x" id="userIcon-profile"></i>
                        <p>
                            Patrick Marks <br />
                            233543418718 <br />
                            pmarks1914@gmail.com 
                        </p>
                        <div className="prof-cont-1-i">
                            <Label for="name" className="label-ac">Please provide full name </Label>
                            <InputGroup>
                                
                                    <InputGroupText>
                                        <i className="icon-user"></i>
                                    </InputGroupText>
                                
                                <Input type="text" placeholder="Please provide full name" id="name" onChange={(e) => this.setState({ name: e.target.value })} />
                            </InputGroup>

                            <Label for="phone" className="label-ac">Please provide phone number </Label>
                            <InputGroup>
                                
                                    <InputGroupText>
                                        <i className="icon-phone"></i>
                                    </InputGroupText>
                                
                                <Input type="tel" placeholder="Please provide phone number" id="phone" onChange={(e) => this.setState({ phone: e.target.value })} />
                            </InputGroup>

                            <Label for="email" className="label-ac">Please confirm email </Label>
                            <InputGroup>
                                
                                    <InputGroupText>
                                        <i className="icon-envelope"></i>
                                    </InputGroupText>
                                
                                <Input  type="email" placeholder="Please confirm email" id="email" onChange={(e) => this.setState({ email: e.target.value })} />
                            </InputGroup>     
                            <Button color="danger" className="btn-save" >Save</Button>
                        </div>
                        <br /><br /><br />
                    </div>
                    : ""}
                    {/* password */}  
                    {/* { this.state.formCategory } */}
                    { this.state.formCategory === 1 ?
                    <div className="prof-cont-2" id="pass"> 
                        {/* profile change pass */}
                        <h3 className="top-des"> Change Password </h3>
                        <Label for="pass1" className="label-ac">Please provide current password </Label>
                        <InputGroup>
                            
                                <InputGroupText>
                                    <i className="icon-lock-open"></i>
                                </InputGroupText>
                            
                            <Input type="password" placeholder="Please provide current password" id="pass1" onChange={(e) => this.setState({ pass1: e.target.value })} />
                        </InputGroup>

                        <Label for="pass2" className="label-ac">Please provide new password </Label>
                        <InputGroup>
                            
                                <InputGroupText>
                                    <i className="icon-lock"></i>
                                </InputGroupText>
                            
                            <Input type="password" placeholder="Please provide new password" id="pass2" onChange={(e) => this.setState({ pass2: e.target.value })} />
                        </InputGroup>

                        <Label for="pass3" className="label-ac">Please confirm password </Label>
                        <InputGroup>
                            
                                <InputGroupText>
                                    <i className="icon-lock"></i>
                                </InputGroupText>
                            
                            <Input  type="password" placeholder="Please confirm password" id="pass3" onChange={(e) => this.setState({ pass3: e.target.value })} />
                        </InputGroup>
                            
                        <Button color="danger" className="btn-save" >Save</Button>
                        <br /><br /><br />
                    </div>
                    : ""}
                    
                    {/* ID Verification */}
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
                        <Button color="danger" className="btn-save" >Save</Button>
                        <br /><br /><br />
                    </div>
                    : ""}
                    
                    {/* Wallet */}
                    { this.state.formCategory === 3 ?
                    <div className="prof-cont-4" id="wallet" > 
                        {/* profile wallet */}
                        <h3 className="top-des"> Wallet Account </h3>
                        <br />
                            <Label for="wallet-btc" className="label-ac"> </Label>
                            <InputGroup>
                                
                                    <InputGroupText>
                                        <i className="icon-wallet"></i>
                                    </InputGroupText>
                                
                                <Input type="text" placeholder="provide btc wallet account" id="wallet-btc" onChange={(e) => this.setState({ walletbtc: e.target.value })} />
                            </InputGroup>    
                            <Button color="danger" className="btn-save" >Save</Button>
                            <br /><br /><br />
                    </div>
                    : ""}
                </Col>
                
                
                
            </div>
        );
    }
}

export default MyAccount;
