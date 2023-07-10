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
import axios from "axios"

const College = () => {


    function getDataInfo(){
        let config = {
            method: "get",
            maxBodyLength: "Infinity",
            url: process.env.REACT_APP_BASE_API + "/user-account/" + userData?.id + "/user-detail/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.access
            },
        };
        axios(config).then(response => {
            console.log(response.data);
            if(response.status === 200){
                // 
            }

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
        <div>
            
        </div>
    );
};

export default College;