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


const userData = JSON.parse(localStorage.getItem("userDataStore"));
const applicantData = JSON.parse(localStorage.getItem("applicantData"));
console.log(applicantData, userData)



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

            <Box style={{ width: '70%', margin: '0px 0px' }} >
                {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
                <CCard className='mt-5'>
                    <p className='d-flex justify-content-center mt-4 mb-2 '> <h4>{("Details").toUpperCase()}</h4> </p>
                    <CListGroup flush>

                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p className="fs-6 fst-italic">Name</p>
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
                                        <p className="fs-6 fst-italic"> Programme </p>
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
                                        <p className="fs-6 fst-italic"> Email</p>
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
                                        <p className="fs-6 fst-italic"> Phone number </p>
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
                                        <p className="fs-6 fst-italic"> Application open period </p>
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
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p className="fs-6 fst-italic"> Name of school </p>
                                    </a>
                                </Col>
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <a >
                                        {userData?.schools[0]?.name  || "N/A"}
                                    
                                    </a>
                                </Col>

                            </Row>

                        </CListGroupItem>

                        <CListGroupItem>

                            <Row className='mb-0 d-flex'>
                                <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                    <a >
                                        <p className="fs-6 fst-italic"> Application status  </p>
                                    </a>
                                </Col>
                                <Col sm="4"></Col>
                                <Col sm="4">
                                    <a >
                                        {userData?.schools[0]?.status  || "N/A"}
                                    
                                    </a>
                                </Col>

                            </Row>

                        </CListGroupItem>

                        {
                            applicantData?.account?.family?.map((element, id) => {
                                return <CListGroupItem key={id}>
                                    <Row className='mb-0 d-flex'>
                                        <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                            <a >
                                                <p className="fs-6 fst-italic"> Family {id + 1}  </p>
                                            </a>
                                        </Col>
                                        <Col sm="4"></Col>
                                        <Col sm="4">
                                            <a >
                                                {(element?.first_name + " " + element?.last_name  ) || "N/A"}                               
                                            </a>
                                        </Col>
                                    </Row>
        
                                </CListGroupItem>
                            })
                        }

                        {
                            applicantData?.account?.address?.map((element, id) => {
                                return <CListGroupItem key={id}>
                                    <Row className='mb-0 d-flex'>
                                        <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                            <a >
                                                <p className="fs-6 fst-italic"> Address line {id + 1}  </p>
                                            </a>
                                        </Col>
                                        <Col sm="4"></Col>
                                        <Col sm="4">
                                            <a >
                                                {(element?.name) || "N/A"}                               
                                            </a>
                                        </Col>
                                    </Row>
        
                                </CListGroupItem>
                            })
                        }

                        {
                            applicantData?.account?.account_certificate?.map((element, id) => {
                                return <CListGroupItem key={id}>
                                    <Row className='mb-0 d-flex'>
                                        <Col sm="4" xm="4" md="4" lg="4" xl="4">
                                            <a >
                                                <p className="fs-6 fst-italic"> Certificate {id + 1} {"("}{element?.name}{")"} </p>
                                            </a>
                                        </Col>
                                        <Col sm="4"></Col>
                                        <Col sm="4">
                                            <a href={element?.file_attachment} target="_blank" rel='noreferrer'>
                                                {(element?.file_attachment) || "N/A"}                               
                                            </a>
                                        </Col>
                                    </Row>
        
                                </CListGroupItem>
                            })
                        }



                    </CListGroup>
                </CCard>


            </Box>
        </div>
    );
};

export default ApplicationDetail;