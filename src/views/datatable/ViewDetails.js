import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { CBadge } from '@coreui/react';
import HomeIcon from '@mui/icons-material/Home';
import moment from 'moment';
import { Col, Row } from 'reactstrap';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function ViewDetails(post) {
    // // console.log("viewData ", post?.viewData?.device_info)
  return (
    <Box style={{ width: '90%', margin: '0px 10px' }}>
        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}

        <Row className='mt-1 mb-0 d-flex'>
            <Col sm="4" xm="4" md="4" lg="4" xl="4">
                <a style={{ color: "#000" }}>
                    <p className="">Reference ID </p>
                </a>
            </Col>
            <Col sm="4"></Col>
            <Col sm="4">
                <a style={{ color: "#000" }}>
                    {post?.viewData?.reference_id}
                </a>
            </Col>
            <hr />
        </Row>         
        <Row className='mb-0 d-flex'>
            <Col sm="4" xm="4" md="4" lg="4" xl="4">
                <a style={{ color: "#000" }}>
                    <p className="">Amount</p>
                </a>
            </Col>
            <Col sm="4"></Col>
            <Col sm="4">
                <a style={{ color: "#000" }}>
                   {post?.viewData?.currency} {" "} {post?.viewData?.amount}
                </a>
            </Col>
            <hr />
        </Row>      
        <Row className='mb-0 d-flex'>
            <Col sm="4" xm="4" md="4" lg="4" xl="4">
                <a style={{ color: "#000" }}>
                    <p className="">Service Type</p>
                </a>
            </Col>
            <Col sm="4"></Col>
            <Col sm="4">
                <a style={{ color: "#000" }}>
                    { post?.viewData?.service === 1 ? "WINGIPAY TO WINGIPAY" : "" } 
                    { post?.viewData?.service === 2 ? "WINGIPAY TO MTN" : "" }
                    { post?.viewData?.service === 3 ? "WINGIPAY TO VODAFONE" : "" }
                    { post?.viewData?.service === 4 ? "WINGIPAY TO AIRTELTIGO" : "" }
                    { post?.viewData?.service === 5 ? "MTN TO WINGIPAY" : "" }
                    { post?.viewData?.service === 6 ? "VODAFONE TO WINGIPAY" : "" }
                    { post?.viewData?.service === 7 ? "AIRTELTIGO TO WINGIPAY" : "" }
                    { post?.viewData?.service === 8 ? "WINGIPAY TO AGENT" : "" }
                    { [1, 2, 3, 4, 5, 6, 7, 8].includes(post?.viewData?.service) ? "" : "None" }
                </a>
            </Col>
            <hr />
        </Row>        
        <Row className='mb-0 d-flex'>
            <Col sm="4" xm="4" md="4" lg="4" xl="4">
                <a style={{ color: "#000" }}>
                    <p className="">Note</p>
                </a>
            </Col>
            <Col sm="4"></Col>
            <Col sm="4">
                <a style={{ color: "#000" }}>
                    {post?.viewData?.note}
                </a>
            </Col>
            <hr />
        </Row>     
        <Row className='mb-0 d-flex'>
            <Col sm="4" xm="4" md="4" lg="4" xl="4">
                <a style={{ color: "#000" }}>
                    <p className=""> Status Message </p>
                </a>
            </Col>
            <Col sm="4"></Col>
            <Col sm="4">
                <a style={{ color: "#000" }}>
                    {post?.viewData?.status_message}
                </a>
            </Col>
            <hr />
        </Row>     
        <Row className='mb-0 d-flex'>
            <Col sm="4" xm="4" md="4" lg="4" xl="4">
                <a style={{ color: "#000" }}>
                    <p className=""> Status </p>
                </a>
            </Col>
            <Col sm="4"></Col>
            <Col sm="4">
                <a style={{ color: "#000" }}>
                    <CBadge color= {post?.viewData?.status_code === "SUCCESSFUL" ? "success" : (post?.viewData?.status_code === "PENDING" ? "primary" : (post.viewData.status_code === "REVERSED" ? "danger" : "secondary") )}>{post?.viewData?.status_code}</CBadge>
                </a>
            </Col>
            <hr />
        </Row>  
        <Row className='mb-0 d-flex'>
            <Col sm="4" xm="4" md="4" lg="4" xl="4">
                <a style={{ color: "#000" }}>
                    <p className=""> Transaction Date </p>
                </a>
            </Col>
            <Col sm="4"></Col>
            <Col sm="4">
                <a style={{ color: "#000" }}>
                    {moment(post?.viewData?.created_at).format('LLLL')}
                </a>
            </Col>
            <hr />
        </Row>  
        <Row className='mb-0 d-flex'>
            <Col sm="4" xm="4" md="4" lg="4" xl="4">
                <a style={{ color: "#000" }}>
                    {/* <p className=""> Device Info. </p> */}
                </a>
            </Col>
            <Col sm="4" className='ml-120'>
                <p style={{ color: "#000", textAlign: "center" }} >
                    <b>Device Info. </b> <br />

                    {post?.viewData?.device_info["X-Real-Ip"]}
                    <br />
                    {/* {post?.viewData?.device_info["User-Agent"]} */}
                </p>

            </Col>
            <Col sm="2">
            </Col>
            {/* <hr /> */}
        </Row> 
        

    </Box>
  );
}
