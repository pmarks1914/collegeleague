import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Label, ButtonGroup, Badge } from 'reactstrap'
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
import Select, { components } from 'react-select';
import axios from "axios"


const userData = JSON.parse(localStorage.getItem('userDataStore'));

const College = () => {
    const [collegeInformation, setCollegeInformation] = useState(null)
    const [schoolInformation, setSchoolInformation] = useState(null)    
    const [getFormData, setGetFormData] = useState(null)

    useEffect(() => {
        // 
        getSchoolInfo()
    }, [])
    let transformProgramData = Object.keys(collegeInformation || []).map((post, id) => {

        return {
            "id": id + 1,
            "programId": collegeInformation[id]?.id,
            "value": collegeInformation[id]?.name,
            "label": collegeInformation[id]?.name,
            // "icon": ,
            // "image": collegeInformation[id]?.flag
        }
    })
    console.log("collegeInformation ", transformProgramData)

    function setProgramInfo(e){
        setGetFormData({...getFormData, ...{ "programName": e.value, "programId": e.id }})
    }
    function getSchoolInfo() {
        let config = {
            method: "get",
            maxBodyLength: "Infinity",
            url: process.env.REACT_APP_BASE_API + "/organization/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.access
            },
        };
        axios(config).then(response => {
            console.log(response?.data);
            setCollegeInformation(response?.data)
        }).catch(function (error) {

            if (error.response) {
                // // console.log("==>");
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
        );

    }

    function getProgramInfo(schoolId) {
        let config = {
            method: "get",
            maxBodyLength: "Infinity",
            url: process.env.REACT_APP_BASE_API + "/organization/" + schoolId + "/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.access
            },
        };
        axios(config).then(response => {
            console.log(response?.data);
            setSchoolInformation(response?.data)
        }).catch(function (error) {

            if (error.response) {
                // // console.log("==>");
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
        );

    }

    return (
        <div className='mt-5'>
            {
                collegeInformation ?
                    collegeInformation?.map((post, id) => 
                        (
                            <CAccordion activeItemKey={id+1} key={post.id} className="mt-0">
                            <CAccordionItem itemKey={post.id} >
                                <CAccordionHeader> {post?.name} </CAccordionHeader>
                                <CAccordionBody>
                                    <CRow>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="8" sm="8" md={8} lg={8} className="mt-1" >
                                            {/*  */}
                                            {post?.bio}

                                        </CCol>
                                        <CCol xs="4" sm="4" md={4} lg={4} className="mt-1" >
                                            <img src={post?.banner} alt="School Image" width="40%" />
                                            <br />
                                            {post?.organization_address?.country} { post?.organization_address?.country?.length > 1 ? <br /> : ""}
                                            {post?.organization_address?.town} { post?.organization_address?.town?.length > 1 ? <br /> : ""}
                                            {post?.organization_address?.city} { post?.organization_address?.city?.length > 1 ? <br /> : ""}
                                            {post?.organization_address?.address} { post?.organization_address?.address?.length > 1 ? <br /> : ""}
                                            {post?.organization_address?.street_name} { post?.organization_address?.street_name?.length > 1 ? <br /> : ""}
                                            {post?.organization_email} { post?.organization_email?.length > 1 ? <br /> : ""}
                                            {post?.organization_phone} { post?.organization_phone?.length > 1 ? <br /> : ""}
                                            <a href={post?.website} > {post?.website} </a> <br />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="8" sm="8" md={8} lg={8} className="mt-1" >
                                            {/*  */}
                                        </CCol>
                                        <CCol xs="4" sm="4" md={4} lg={4} className="mt-1" >

                                            <Label for="program" className="label-dc"> </Label>
                                            <Select
                                                placeholder={"Select program"}
                                                options={transformProgramData}
                                                id="program"
                                                className='other-input-select d-filters wp-cursor-pointer'
                                                onChange={(e) => setProgramInfo(e)}
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            // style={{ color: "#fff" }}
                                            // className="bg-text-com-wp"
                                            // onClick={(e) => passConfiguration("add", "patch", "personal", 419)}
                                            >
                                                Apply
                                            </Button>
                                        </CCol>
                                    </CRow>
                                </CAccordionBody>
                            </CAccordionItem>
                            </CAccordion>
                        )
                    )
                    : ""
            }
        </div>
    );
};

export default College;