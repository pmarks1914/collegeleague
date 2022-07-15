import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import $ from 'jquery'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import '../../datatable/table.css';
import Stack from '@mui/material/Stack';
import {TextField, Input} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { NativeSelect} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from "materialui-daterange-picker";

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
import { getTransactionData } from '../Data/PageData';
import ViewDetails from '../../datatable/ViewDetails';
import CIcon from '@coreui/icons-react';
import {
  // cilBell,
  cilCreditCard,
  cilUser,
  cilTask,
  cilEnvelopeOpen,
  // cilFile,
  cilLockLocked,
  // cilSettings,
  cilFilter, cilCheckCircle, cilSettings, cilCalendar, cilSearch,
} from '@coreui/icons'
import {Helmet} from "react-helmet";
import Select from 'react-select';

// test data
let posts = [
  {
    "id": "33bc65a6-70f5-470a-812a-61944b6412f3",
    "amount": "0.01",
    "note": "wingipay to MTN ussd GhS 0.01 from Eli",
    "service": 2,
    "status_code": "SUCCESSFUL",
    "status_message": "Transaction completed successfully",
    "created_at": "2022-06-01T14:38:14.995258Z"
  },
  {
    "id": "33bc65a6-70f5-470a-812a-61944b6412f3",
    "amount": "0.01",
    "note": "wingipay to MTN ussd GhS 0.01 from Eli",
    "service": 2,
    "status_code": "PENDING",
    "status_message": "Transaction completed successfully",
    "created_at": "2022-06-01T14:38:14.995258Z"
  },
  {
    "id": "33bc65a6-70f5-470a-812a-61944b6412f3",
    "amount": "0.01",
    "note": "wingipay to MTN ussd GhS 0.01 from Eli",
    "service": 2,
    "status_code": "FAILED",
    "status_message": "Transaction completed successfully",
    "created_at": "2022-06-01T14:38:14.995258Z"
  }
]

let transactionData = getTransactionData();
let transaction = []
transactionData?.transaction?.then(value => { (transaction = value) });

const Transaction = (transactionDetails) => {
  const [loader, setLoader] = useState('<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>')
  const [tableData, setTableData] = useState([]);
  const [monitorState, setMonitorState] = useState(1);
  const [dropValue, setDropValue] = useState(0);

  // date time
  const [dateTo, setDateTo] = useState(new Date('2014-08-18T21:11:54'));
  const [dateFrom, setDateFrom] = useState(new Date('2014-08-18T21:11:54')); 
  const [value, setValue] = useState([null, null]);

  // modals
  // filer transaction
  const [modal1, setModal1] = useState(false)
  // view single transaction 
  const [modal2, setModal2] = useState(false)

  const [viewData, setViewData] = useState({})
  const [openDateRange, setOpenDateRange] = useState(true);
  const [dateRange, setDateRange] = useState({startDate: Date.parse("2022-01-13"), endDate: Date.now()});
  const [transactionStatus, setTransactionStatus] = useState({});
  const [transactionExport, setTransactionExport] = useState({});

  const toggle = () => setOpenDateRange(!openDateRange);

  useEffect(() => {

    if (transaction?.length > 0 && monitorState === 1) {
      setMonitorState(2)
      datatablaScript(transaction);

      setLoader('<a></a>')
    }
    console.log("props ", transaction)

  }, [transaction])

  // perform filter 
  function datatablaScript(tdata) {
    let printCounter = 0;

    setTableData(tdata);
    $('#myTable').DataTable().destroy();
    setTimeout(() => {   
       
      $('#myTable').DataTable(
        {
          // data: transaction,
          processing: true,
          deferLoading: true,
          keys: true,
          // dom: 'Blfrtip',
          // dom: '<"top"Bfrt>rt<"bottom"lip>',
          page: true,
          dom: '<"top">rt<"bottom"ilp><"clear">',
          buttons: [
            {
              extend: 'copy',
              messageTop: null,
              // text: 'Copy Current Page',
              exportOptions: {
                modifier: {
                  page: 'current'
                }
              }
            },
            {
              extend: 'pdfHtml5',
              messageTop: null,
              // text: 'Export to PDF Current Page',
              exportOptions: {
                modifier: {
                  page: 'current'
                }
              }
            },
            {
              extend: 'excel',
              messageTop: null,
              // text: 'Export Current Page',
              exportOptions: {
                modifier: {
                  page: 'current'
                }
              },
              customize: function (anytype) {
                let sheet = anytype.xl.worksheets['wingipaytransaction.xml'];
                $('row:first c', sheet).attr('s', '7');
              }
            },
            {
              extend: 'csv',
              messageBottom: null,
              exportOptions: {
                modifier: {
                  page: 'current'
                }
              },
            },
            {
              extend: 'print',
              messageBottom: null,
              exportOptions: {
                modifier: {
                  page: 'current'
                }
              },
              customize: function (anytype) {
                let sheet = anytype.xl.worksheets['wingipaytransaction.pdf'];
                $('row:first c', sheet).attr('s', '7');
              }
            },
            {
              text: 'Filter',
              action: function (e, dt, node, config) {
                setModal1(true)
              }
            }
          ],
          // scrollY: 600,
          deferRender: false,
          // scroller: false,
          // lengthChange: false

        }
      );
    }, 0);

  }

  function getFilterData(e) {
    // 
    e.preventDefault();
    console.log("post tableData ", tableData);
    // transaction = posts;
    try {
      // setTableData(posts);
      let newFilterData = transactionDetails?.transactionDetails.filter((post) => { return moment(post.created_at).format('LLLL') <= moment(dateFrom).format('LLLL') })
      // console.log("post tableData ", transactionDetails?.transactionDetails);
      console.log("post tableData ", newFilterData);
      datatablaScript(newFilterData);
      setModal1(false)
    } catch (error) {
    }
  }

  const handleChangeTo = (newValue) => {
    setDateTo(newValue);
  };
  const handleChangeFrom = (newValue) => {
    setDateFrom(newValue);
  };
  function printContent() {
    let w = window.open();

    $(".bg-text-wp").css("background-color", "#FF7643");
    $(".bg-text-wp").css("color", "#fff");
    $(".bg-text-wp").css("text-align", "center");
    $(".icon-wp").css("border-radius", "100%");
    $(".icon-wp").css("width", "15%");
    $(".viewDescription").css("font-size", "1.2rem");
    // $(".viewDescription").css("box-shadow", "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)");
    $(".viewDescription").css("font-family", "Roboto", "Helvetica", "Arial", "sans-serif");
    $(".viewDescription").css("font-weight", "400");
    $(".viewDescription").css("font-size", "0.875rem");
    $(".viewDescription").css("line-height", "1.43");
    $(".viewDescription").css("letter-spacing", "0.01071em");
    $(".viewDescription").css("padding", "8px");
    // $(".viewDescription").css("max-width", "50%");
    $(".viewDescription").css("flex-basis", "50%");

    w.document.write($('.contentForTransactionPrint').html());
    w.print();
    w.close();
  }
  function toggleFilter(e, type) {
    e.preventDefault();
    console.log("test>>> ", dropValue)
    setDropValue(1);
    console.log("test ", dropValue, "type", type, "openDateRange", openDateRange)
    if(type === "filter"){
      document.getElementById("filterDropdown").classList.toggle("show");
      document.getElementById("dateRangeDropdown").classList.remove('show');
    }
    if(type === "dateRange"){
      setOpenDateRange(true)
      document.getElementById("dateRangeDropdown").classList.toggle("show");
      // document.getElementById("filterDropdown").classList.remove('show');
    }
    // setDropValue(0);
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    event.preventDefault()
    console.log("dropdown ==", dropValue, "e", event.target.matches('.dateRange'), "openDateRange > ", openDateRange)
    setDropValue(0);
    if (!event.target.matches('.dropbtn') && dropValue === 0) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        console.log("list ==> ", openDropdown.classList.contains('show'))
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
        else {
          // openDropdown.classList.remove('show');
        }
      }
    }

    if (!event.target.matches('.dateRange') && dropValue === 0) {
      
      let dropdowns = document.getElementsByClassName("dropdown-content-dateRange");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        console.log("list ==> ", openDropdown.classList.contains('show'))
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
        else {
          // openDropdown.classList.remove('show');
        }
      }
    }
  }
  const handleChangeTransactionStatus = (event) => {
    setTransactionStatus(event.target.value);
  };
  const handleChangeExport = (event) => {
    setTransactionExport(event.target.value);
  };
  const optionsStatus = [
    // {value: "", label: "Se", icon: "", isDisabled: true },
    {value: "All Transaction", label: "All Transaction" },
    {value: "Successfull", label: "Successfull" },
    {value: "Pending", label: "Pending" },
    {value: "Failed", label: "Failed" }
  ];
  const optionsExport = [
    // {value: "", label: "Se", icon: "", isDisabled: true },
    {value: "Export to excel", label: "Export to excel" },
    {value: "Export to csv", label: "Export to csv" }
  ];
  return (
    <div>
      {console.log("dateRange ", dateRange)}
      
      {/* open modal for filter date range */}
      {/* <CButton onClick={() => setModal1(!modal1)} icon={cilArrowRight} className="float-end" >Filter</CButton> */}
      <div id="filterDropdown" className="dropdown-content mb-4" onClick={(e) => setDropValue(1)}>
        <CCard sm={12} md={12} lg={12}>
          <CCardHeader>
            <CRow sm={12} md={12} lg={12}>
              <CCol sm={12} md={12} lg={12} > <CBadge color='secondary'>Reset</CBadge> <CBadge color='primary' style={{ float: "right" }}>Apply</CBadge> </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p>Search by:</p>
            <div> 
              <p className='des-filter-inputs'>Transaction Reference</p>
              <Box
                component="form"
                // sx={{
                //   '& > :not(style)': { m: 1, width: '25ch' },
                // }}
                noValidate
                autoComplete="off"
                sx={{ minWidth: 30 }} 
                className='filters-d'
                >
                <TextField 
                  id='filters-d'
                  // onClick={(e) => toggleFilter(e, "filter")} 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" >
                        <CIcon icon={cilSearch} className="me-2" />
                      </InputAdornment>
                    ),
                  }}
                  // label="Filter"
                  placeholder="eg. WP55467987765"
                  // multiline
                  />
              </Box>
            </div>
            <div>
              
              <p className='des-filter-inputs'>Product ID </p>
              <Box
                component="form"
                // sx={{
                //   '& > :not(style)': { m: 1, width: '25ch' },
                // }}
                noValidate
                autoComplete="off"
                sx={{ minWidth: 30 }} 
                className='filters-d'
                >
                <TextField 
                  id='filters-d'
                  // onClick={(e) => toggleFilter(e, "filter")} 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start" >
                        <CIcon icon={cilSearch} className="me-2" />
                      </InputAdornment>
                    ),
                  }}
                  // label="Filter"
                  placeholder="eg. WP55467987765"
                  // multiline
                  />
              </Box>
            </div>
            <div>
              
              <p className='des-filter-inputs'>Filter by: </p>
              <Box
                component="form"
                // sx={{
                //   '& > :not(style)': { m: 1, width: '25ch' },
                // }}
                noValidate
                autoComplete="off"
                sx={{ minWidth: 30 }} 
                className='filters-d'
                >
                <TextField 
                  id='filters-d'
                  // onClick={(e) => toggleFilter(e, "filter")} 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start" >
                        <CIcon icon={cilSearch} className="me-2" />
                      </InputAdornment>
                    ),
                  }}
                  // label="Filter"
                  placeholder="eg. WP55467987765"
                  // multiline
                  />
              </Box>
            </div>

          </CCardBody>

        </CCard>
      </div>

      <Container>
      
          {/* date range dropdown */}      
          <div id="dateRangeDropdown" className="dropdown-content-dateRange mb-9" onClick={(e) => setDropValue(1)}>
                {/*  */}
            <DateRangePicker
              open={openDateRange}
              toggle={toggle}
              onChange={(range) => setDateRange(range)}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              months={2}
              // locale={locales["ja"]}
              // direction="verticle"
            />
          </div>
      <Row>
        <Col xs="12" sm="12" md={2} lg={2} >
          {/* filter */}
          <div className="dropdown filterDrop">
            <Box
              component="form"
              // sx={{
              //   '& > :not(style)': { m: 1, width: '25ch' },
              // }}
              noValidate
              autoComplete="off"
              sx={{ minWidth: 30 }} 
              >
              <TextField 
                id="dropbtn" 
                onClick={(e) => toggleFilter(e, "filter")} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <CIcon icon={cilFilter} className="me-2" /> Filter
                    </InputAdornment>
                  ),
                }}
                // label="Filter"
                // placeholder="Placeholder"
                multiline
                // variant="standard"
                // style={{height: "10px"}}
                />
            </Box>
          </div>
        </Col>
        <Col xs="12" sm="12" md={3} lg={3} >
          {/* transaction types */}
          <Box sx={{ minWidth: 160 }}>
            <FormControl fullWidth>
              <Label for="transactionStatus" className="label-dc"> </Label>
              <Select
                placeholder={"Select "}
                options={optionsStatus}
                id="transactionStatus"
                className='other-input-select'
                // components={{ Option: paymentOption }}
                onChange={(e) => handleChangeTransactionStatus(e.value)}
              />
          
            </FormControl>
          </Box>
        </Col>
        <Col xs="12" sm="12" md={4} lg={4} >
          {/* date range */}
          <FormControl fullWidth>
            <Box
              component="form"
              // sx={{
              //   '& > :not(style)': { m: 1, width: '25ch' },
              // }}
              noValidate
              autoComplete="off"
              sx={{ minWidth: 170 }}
              
            >
              <TextField 
               id="dateRange" 
              //  label="Date range"
               onClick={(e)=>toggleFilter(e, "dateRange")} 
              //  variant="outlined" 
               placeholder=
               {" " + moment(dateRange?.startDate).format("DD/MM/yyyy") + " - " + moment(dateRange?.endDate).format("DD/MM/yyyy")} 
               InputProps={{
                 startAdornment: (
                   <InputAdornment position="end" > 
                   <CIcon icon={cilCalendar} className="me-6" />
                   </InputAdornment>
                 ),
               }}
               
               />
            </Box>
          </FormControl>
        </Col>
        <Col xs="12" sm="12" md={1} lg={1} >
        </Col>
        <Col xs="12" sm="12" md={2} lg={2} >
          {/* export */}
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Label for="transactionExport" className="label-dc"> </Label>
              <Select
                placeholder={"Select "}
                options={optionsExport}
                id="transactionExport"
                className='other-input-select'
                // components={{ Option: paymentOption }}
                onChange={(e) => handleChangeExport(e.value)}
              />
            </FormControl>
          </Box>
        </Col>
      </Row>
      </Container>



      {/* {dateTo.toString()}{" rrr "}{dateFrom.toString()} */}
      <br /><br />

      <table id="myTable" className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reference</th>
            <th>Note</th>
            <th>Status</th>
            <th>Transaction Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            tableData?.map((post, id) =>
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{post.reference_id}</td>
                <td>{post.note}</td>
                <td><CBadge color={post.status_code === "SUCCESSFUL" ? "success" : (post.status_code === "PENDING" ? "primary" : "secondary")}>{post.status_code}</CBadge> </td>
                <td>{moment(post.created_at).format('LLLL')}</td>
                <td>{post.amount}</td>
                <td onClick={() => { setModal2(true); setViewData(post) }}><CBadge className='bg-text-wp'>View</CBadge></td>
              </tr>
            )}
            
        </tbody>
      </table>

      <a dangerouslySetInnerHTML={{ __html: loader }}></a>

      {/* modals */}
      {/* modal for filter date range */}
      <CModal visible={modal1} alignment="center" scrollable backdrop="static" fullscreen='md' onClose={() => setModal1(false)}>
        <CModalHeader>
          <CModalTitle> Filter </CModalTitle>
        </CModalHeader>
        <CModalBody>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DateTimePicker
                label="From"
                inputFormat="dd/MM/yyyy hh:mm:ss"
                value={dateTo}
                onChange={handleChangeTo}
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                label="To"
                inputFormat="dd/MM/yyyy hh:mm:ss"
                value={dateFrom}
                onChange={handleChangeFrom}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={() => setModal1(false)}>
            Close
          </CButton>
          <CButton color="" className='text-white bg-text-wp' onClick={(e) => getFilterData(e)}> Apply</CButton>
        </CModalFooter>
      </CModal>

      {/* modal for filter date range */}
      <CModal visible={modal2} scrollable backdrop="static" fullscreen="xl" onClose={() => setModal2(false)}>
        <CModalHeader>
          <CModalTitle>  </CModalTitle>
        </CModalHeader>
        <CModalBody className='contentForTransactionPrint'>
          <p className="success rounded" style={{ textAlign: "center" }} >
            <h2> Transaction Details </h2>
            <CIcon icon={cilCheckCircle} className="bg-text-wp icon-wp" width="15%" />
          </p>

          {/* view only data for transaction */}
          <ViewDetails viewData={viewData} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={() => setModal2(false)}>
            Close
          </CButton>
          <CButton className='text-white bg-text-wp' onClick={() => printContent()}>
            Print
          </CButton>

        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Transaction;