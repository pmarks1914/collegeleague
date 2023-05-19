import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Label } from 'reactstrap'
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
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import classnames from 'classnames';
// import './gen.css';
import $ from 'jquery';
import Select, { components } from 'react-select';


import { getSessionTimeout } from '../../../Utils/Utils'; 

let date = new Date();
// let dateYearInterval = 100;
// let i = 1;s

// const createOption = (label, dataId) => ({
//   label,
//   value: dataId,
// });
let optionsFinYear = [...Array(100)].map((x, i) =>{
  return({value: (date.getUTCFullYear()-100+1+i), label: (date.getUTCFullYear()-100+1+i), key: i+1 })
  // return createOption( (date.getUTCFullYear()-100+1+i), (date.getUTCFullYear()-100+1+i) )
}
);
const optionsFinMonth = [
  // {value: "", label: "Select Fin-Month", icon: "", isDisabled: true },
  {value: "January", label: "January", key: 1 },
  {value: "February", label: "February", key: 2 },
  {value: "March", label: "March", key: 3 },
  {value: "April", label: "April", key: 4 },
  {value: "May", label: "May", key: 5 },
  {value: "June", label: "June", key: 6 },
  {value: "July", label: "July", key: 7 },
  {value: "August", label: "August", key: 8 },
  {value: "September", label: "September", key: 9 },
  {value: "October", label: "October", key: 10 },
  {value: "November", label: "November", key: 11 },
  {value: "December", label: "December", key: 12 },
];

// const { Option } = components;
// const IconOption = props => (
//   <Option {...props} >
      {/* <img 
          src={props?.data?.icon} 
          style={{ height: 36 }}
          alt={props.data.label}
      /> */}
      
//       { props.data.icon }
//       { props.data.label }
//   </Option>
// );
// const paymentOption = props => (
//   <Option {...props} >
//       <img 
//           src={props?.data?.icon}
//           style={{ height: 36, padding: "0px 10px" }}
//           // alt={props.data.label}
//       />
//       { props.data.label }
//   </Option>
// );

const General = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    useEffect(()=>{

      getSessionTimeout();
    }, [])
  
    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
      if(tab === '1' || tab === '14' ){
        document.getElementById("fin-month-id").style.display = "block";
      }
      else{
        document.getElementById("fin-month-id").style.display = "none";
      }

      
    }
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
        <div className="App">
          <Nav tabs className="v-flow">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Colleges
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Profile
              </NavLink>
            </NavItem>
            
            <br /><br />
          </Nav>
          <TabContent activeTab={activeTab}>
              
              {/* <div className="date-01">
                
                <Col sm="4" md="3" lg="3"></Col>
                <Col sm="4" md="3" lg="3">
                  <Label for="cryptoType" className="label-dc"> </Label>
                  <Select
                    placeholder={"Select Fin-Year "}
                    id="fin-year-id"
                    options={optionsFinYear}
                    // components={{ Option: IconOption }}
                    className="cryptoType"
                    onChange={(e) => setYear(e?.value || null)}
                  />
                </Col>
                <Col sm="4" md="3" lg="3">
                  <Label for="paymentType" className="label-dc"> </Label>
                  <Select
                    placeholder={"Select Fin-Month "}
                    options={optionsFinMonth}
                    id="fin-month-id"
                    // components={{ Option: paymentOption }}
                    className="cryptoType"
                    onChange={(e) => setMonth(e.value)}
                  />
                </Col>
                      
                  <br />
              </div> */}
            { activeTab === "1" ?
            <TabPane tabId="1">
              <Row> 
                <Col sm="3" id="tab-type1">
                  {/* <DailyIncomeTable year={year} month={month} date={date} className="daily-income-table"/> */}


                <CAccordion activeItemKey={2} className="mt-5">
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>Accordion Item #1</CAccordionHeader>
                        <CAccordionBody>
                            <strong>This is the first item&#39;s accordion body.</strong> It is hidden by
                            default, until the collapse plugin adds the appropriate classes that we use to
                            style each element. These classes control the overall appearance, as well as the
                            showing and hiding via CSS transitions. You can modify any of this with custom
                            CSS or overriding our default variables. It&#39;s also worth noting that just
                            about any HTML can go within the <code>.accordion-body</code>, though the
                            transition does limit overflow.
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={2}>
                        <CAccordionHeader>Accordion Item #2</CAccordionHeader>
                        <CAccordionBody>
                            <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
                            default, until the collapse plugin adds the appropriate classes that we use to
                            style each element. These classes control the overall appearance, as well as the
                            showing and hiding via CSS transitions. You can modify any of this with custom
                            CSS or overriding our default variables. It&#39;s also worth noting that just
                            about any HTML can go within the <code>.accordion-body</code>, though the
                            transition does limit overflow.
                        </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={3}>
                        <CAccordionHeader>Accordion Item #3</CAccordionHeader>
                        <CAccordionBody>
                            <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
                            default, until the collapse plugin adds the appropriate classes that we use to
                            style each element. These classes control the overall appearance, as well as the
                            showing and hiding via CSS transitions. You can modify any of this with custom
                            CSS or overriding our default variables. It&#39;s also worth noting that just
                            about any HTML can go within the <code>.accordion-body</code>, though the
                            transition does limit overflow.
                        </CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
                  
                </Col>
              </Row>
            </TabPane>
            : ""}
            { activeTab === "2" ?
            <TabPane tabId="2">
              <Row>
                <Col sm="12" id="tab-type2">
                    ffg
                  {/* <MonthlyIncomeTable year={year} month={month} date={date} className="monthhly-income-table" /> */}
                </Col>
              </Row>
              
            </TabPane>
            : ""}
            
          </TabContent>
        </div>
    );
};

export default General;