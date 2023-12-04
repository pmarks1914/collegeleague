import React from 'react';
import Box from '@mui/material/Box';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardFooter,
    CCardGroup,
    CCardHeader,
    CCardImage,
    CCardLink,
    CCardSubtitle,
    CCardText,
    CCardTitle,
    CButton,
    CListGroup,
    CListGroupItem
} from '@coreui/react';
import HomeIcon from '@mui/icons-material/Home';
import moment from 'moment';
import { Col, Row } from 'reactstrap';



const applicantData = JSON.parse(localStorage.getItem("applicantData"));
console.log(applicantData)




const ApplicationDetail = () => {
    return (
        <div className='d-flex justify-content-center' style={{ margin: '0px 0px 0px 0px' }}  >
            {/* <Counter /> */}

            {/* <CCard>
                <CCardHeader></CCardHeader>
                <CCardBody>
                  <CCardTitle></CCardTitle>
                  <CCardText>
                  </CCardText>
                  
                </CCardBody>
              </CCard> */}

            <Box style={{ width: '50%', margin: '0px 0px' }} >
                {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
                <CCard className='mt-5'>
                    <p className='d-flex justify-content-center mt-4 mb-2 '> <h4>{("Details").toUpperCase() }</h4> </p>
                    <CListGroup flush>

                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p  className="fs-6 fst-italic">Name</p>
                                    </a>
                                </Col>
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <a >
                                        {applicantData?.applicant_full_name}
                                    </a>
                                </Col>

                            </Row>

                        </CListGroupItem>

                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p  className="fs-6 fst-italic"> Programme </p>
                                    </a>
                                </Col>
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <a >
                                        {applicantData?.applicant_program_name}
                                    </a>
                                </Col>

                            </Row>

                        </CListGroupItem>

                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p  className="fs-6 fst-italic"> Email</p>
                                    </a>
                                </Col>
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <a >
                                        {applicantData?.applicant_email || "N/A"}
                                    </a>
                                </Col>

                            </Row>

                        </CListGroupItem>

                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p  className="fs-6 fst-italic"> Phone number </p>
                                    </a>
                                </Col>
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <a >
                                        {applicantData?.applicant_phone || "N/A"}
                                    </a>
                                </Col>

                            </Row>

                        </CListGroupItem>

<CListGroupItem>

    <Row className='mb-0 d-flex'>
        <Col sm="4" xm="4" md="4" lg="4" xl="4">
            <a >
                <p  className="fs-6 fst-italic"> Application open period </p>
            </a>
        </Col>
        <Col sm="4"></Col>
        <Col sm="4">
            <a >
                {applicantData?.applicant_program_start_date || "N/A"}
                <br />
                {"To"}
                <br />
                {applicantData?.applicant_program_end_date || "N/A"}
            </a>
        </Col>

    </Row>

</CListGroupItem>
                        
                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="2" md="2" lg="2" xl="2">
                                    <a >
                                        {/* <p  className="fs-6 fst-italic"> Device Info. </p> */}
                                    </a>
                                </Col>
                                <Col sm="8" className='ml-120'>
                                    <p style={{ textAlign: "center" }} className='fst-italic' >
                                        {/* <b> Currency GHS </b> <br /> */}

                                    </p>

                                </Col>
                                <Col sm="2">

                                </Col>

                            </Row>
                        </CListGroupItem>
                        
                    </CListGroup>

                </CCard>


            </Box>
        </div>
    );
};

export default ApplicationDetail;