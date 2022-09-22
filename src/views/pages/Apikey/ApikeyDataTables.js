import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Label, Input } from 'reactstrap';
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
import {TextField} from '@mui/material';
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
import 'rsuite/dist/rsuite.min.css';
import {DateRangePicker as RSuitDateRangePicker} from 'rsuite';

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
import { apikeyData } from '../Data/PageData';
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
  cilFilter, cilCheckCircle, cilSettings, cilCalendar, cilSearch, cilPlus, cilKeyboard,
} from '@coreui/icons'
import {Helmet} from "react-helmet";
import Select from 'react-select';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Swal from 'sweetalert2';

let currentUser = JSON.parse(localStorage.getItem("userDataStore")); 
let apikeyInfoData = apikeyData();
let apikeyInfo = []
apikeyInfoData?.apikey?.then(value => { (apikeyInfo = value) });

const ApikeyDataTables = (apikeyDetails) => {
  const [loader, setLoader] = useState('<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>')
  const [tableData, setTableData] = useState([]);
  const [noData, setNoData] = useState("")
  const [monitorState, setMonitorState] = useState(1);
  const [dropValue, setDropValue] = useState(0);

  // date time
  const [dateTo, setDateTo] = useState(new Date('2014-08-18T21:11:54'));
  const [dateFrom, setDateFrom] = useState(new Date('2014-08-18T21:11:54')); 
  const [value, setValue] = useState([null, null]);

  // modals
  // filer apikeyInfo
  const [modal1, setModal1] = useState(false)
  // view single apikeyInfo 
  const [modal2, setModal2] = useState(false)

  const [viewData, setViewData] = useState({})
  const [openDateRange, setOpenDateRange] = useState(true);
  const [dateRange, setDateRange] = useState({});
  const [description, setDescription] = useState("");
  const [apikeyInfoStatusInModal, setapikeyInfoStatusInModal] = useState("");
  // startDate: Date.parse("2022-01-13"), endDate: Date.now()
  

  const [apikeyInfoStatus, setapikeyInfoStatus] = useState("");
  const [apikeyInfoId, setapikeyInfoId] = useState("");
  const [referanceId, setReferanceId] = useState("");
  const [apikeyInfoExport, setapikeyInfoExport] = useState({});
  const [dateFilterData, setDateFilterData] = useState({});
  const [amountLess, setAmountLess] = useState(0.00);
  const [amountGreat, setAmountGreat] = useState(0.00);
  const [amountEqual, setAmountEqual] = useState(0.00);

  const toggle = () => setOpenDateRange(!openDateRange);

  useEffect(() => {

    if(dateRange.length > 0 && monitorState === 1){
      setMonitorState(2)
      performFilter("filterByDate", "none")
      setapikeyInfoStatus("")

      setLoader('<a></a>')
    }
    else if (apikeyInfo?.length > 0 && monitorState === 1) {
      // setMonitorState(2)
      // console.log("info ", apikeyInfo )
      datatablaScript(apikeyInfo);

      setLoader('<a></a>')
    }
    else if(dateRange && monitorState === 2){
      performFilter("filterByDate", "none")
      setapikeyInfoStatus("")
      // setMonitorState(3)
    }
    else{
        datatablaScript([])
        setLoader('<a></a>')
        // setTimeout(()=>{
        //     setNoData("dd")
        // }, 200)
    }

    // if(apikeyInfoStatus && monitorState === 2){
    //   performFilter("filterByStatus")
    // }

    
    // console.log("props ", dateRange, apikeyInfo, apikeyInfoStatus, monitorState)

  }, [dateRange, apikeyInfo])

  // perform filter 
  function datatablaScript(tdata) {
    let printCounter = 0;

    setTableData(tdata);
    $('#myTable').DataTable().destroy();
    setTimeout(() => {   
       
      $('#myTable').DataTable(
        {
          // data: apikeyInfo,
          columnDefs: [
            { "width": "10%", "targets": 2 }
          ],
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
                let sheet = anytype.xl.worksheets['wingipayapikeyInfo.xml'];
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
                let sheet = anytype.xl.worksheets['wingipayapikeyInfo.pdf'];
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
    // console.log("post tableData ", tableData);
    // apikeyInfo = posts;
    try {
      // setTableData(posts);
      let newFilterData = apikeyInfo.filter((post) => { return moment(post?.created).format('LLLL') <= moment(dateFrom).format('LLLL') })
      // // console.log("post tableData ", apikeyInfo);
      // console.log("post tableData ", newFilterData);
      datatablaScript(newFilterData);
      setModal1(false)
    } catch (error) {
    }
  }
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

    w.document.write($('.contentForapikeyInfoPrint').html());
    w.print();
    w.close();
  }
  function toggleFilter(e, type) {
    e.preventDefault();
    // console.log("test>>> ", dropValue)
    setDropValue(1);
    // console.log("test ", dropValue, "type", type, "openDateRange", openDateRange)
    if(type === "filter"){
      document.getElementById("filterDropdown").classList.toggle("show");
      // document.getElementById("dateRangeDropdown").classList.remove('show');
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
    // event.preventDefault()
    trackActivity();
    // console.log("dropdown ==", dropValue, "e", event.target.matches('.dateRange'), "openDateRange > ", openDateRange)
    setDropValue(0);
    if (!event.target.matches('.dropbtn') && dropValue === 0) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        // // console.log("list ==> ", openDropdown.classList.contains('show'))
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
        else {
          // openDropdown.classList.remove('show');
        }
      }
    }
  }
  const handleChangeapikeyInfoStatus = (valSelected) => {
    setapikeyInfoStatus(valSelected);
    performFilter("filterByStatus", valSelected)
  };
  const handleChangeapikeyInfoStatusInModal = (valSelected) => {
    setapikeyInfoStatusInModal(valSelected);
  };
  const handleChangeExport = (valSelected) => {
    setapikeyInfoExport(valSelected);
    if(valSelected === "Export to excel"){
      // 
      downloadExcel(tableData);
    }
    else if(valSelected === "Export to csv"){
      // 
      downloadCSV(tableData);
    }
  };
  const optionsStatus = [
    // {value: "", label: "Se", icon: "", isDisabled: true },
    {value: "live", label: "Live Key" },
    {value: "test", label: "Test Key" },
    {value: "All apikeyInfo", label: "All Keys" }
  ];
  const optionsStatusInModal = [
    // {value: "", label: "Se", icon: "", isDisabled: true },
    {value: "live", label: "Live Key" },
    {value: "test", label: "Test Key" },
  ];
  const optionsExport = [
    // {value: "", label: "Se", icon: "", isDisabled: true },
    {value: "Export to excel", label: "Export to excel" },
    {value: "Export to csv", label: "Export to csv" }
  ];
  function performFilter(type, status){

    // // console.log("by status ", apikeyInfoStatus, "type", type )
    // perform filter by date range
    if(type === "filterByDate"){
      // 
      let dataFilter = apikeyInfo.filter((post, id) => {return ( moment(post?.created).format('DD/MM/yyyy') >= moment(dateRange[0]).format('DD/MM/yyyy') && moment(post?.created).format('DD/MM/yyyy') <= moment(dateRange[1]).format('DD/MM/yyyy') )});

      datatablaScript( dataFilter );

      setDateFilterData( dataFilter );
    }
    else if(type === "filterByStatus"){
      // 
      // // console.log("by status",status, monitorState, apikeyDetails )
      if(status === "All apikeyInfo" && monitorState === 1){
        datatablaScript(apikeyInfo);
      }
      else if(status === "All apikeyInfo" && monitorState === 2){
        datatablaScript(dateFilterData);
      }
      else if(status === "test" && monitorState === 1){
        datatablaScript( apikeyInfo?.filter((post, id) => {return ( post?.is_live === false )}) );
      }
      else if(status === "live" && monitorState === 1){
        datatablaScript( apikeyInfo?.filter((post, id) => {return ( post?.is_live === true )}) );
      }
      else if(status === "test" && monitorState === 2){
        datatablaScript( dateFilterData?.filter((post, id) => {return ( post?.is_live === false )}) );
      }
      else if(status === "live" && monitorState === 2){
        datatablaScript( dateFilterData?.filter((post, id) => {return ( post?.is_live === true )}) );
      }
    }
    
  }
  function resetFilter(e){
    e.preventDefault()
    setAmountEqual(0)
    setAmountGreat(0)
    setAmountLess(0)
    setReferanceId("")
    setapikeyInfoId("")
    datatablaScript(apikeyInfo)
  }
  function convertArrayOfObjectsToCSV(array) {
    let result;
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    // // console.log("array 0>>", array);
    const keys = Object.keys(array[0]);
    // // console.log("keys", keys );
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
  
    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement('a');
    // // console.log("exp downloadCSV==>", array  );
    let csv = convertArrayOfObjectsToCSV(array);
    // console.log("csv", csv);
    if (csv == null) {return};
  
    const filename = 'WPexport.csv';
  
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
  
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }
  const downloadExcel = (data) => {
    // console.log(data);
    // e.preventDefault();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "WPexport");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "WPexport.xlsx");
  };
  function trackActivity() {
    // e.preventDefault();
    // getSessionTimeout();
    const currentUser_new = JSON.parse(localStorage.getItem("userDataStore"));    
    if(currentUser_new){
      currentUser_new["timeLogout"] = new Date().getTime() + currentUser_new?.counter;
      localStorage.setItem('userDataStore', JSON.stringify(currentUser_new))
    }
  }
  
  function generateApikey(e) {
    e.preventDefault();
    let keyType = false;
    if(apikeyInfoStatusInModal === "live"){
      keyType = true;
    }

    let data = JSON.stringify({
      "description": description,
      "is_live": keyType
    });

    let config = {
      method: 'post',
      url: process.env.REACT_APP_BASE_API + "/account/apikey/generate/" + currentUser?.account + "/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser?.access
      },
      data: data
    };
    axios(config).then(response => {
      console.log(response.status);
      if (response?.data?.status === true) { 

        let apikeyInfoDataNew = apikeyData();
        let apikeyInfoNew = []
        apikeyInfoDataNew?.apikey?.then(value => { (apikeyInfoNew = value) });
        // // console.log("api key", tableData)
        // let arryData = [];
        // // console.log("api key data 1", arryData)
        // let new_data = {
        //   "id": response?.data?.id,
        //   "prefix": response?.data?.prefix,
        //   "name": response?.data?.name,
        //   "is_live": response?.data?.is_live,
        //   "created":  response?.data?.created
        // }
        // arryData.push(new_data)
        // apikeyInfo?.map((post, id)=> {
        //   arryData.push(post);
        // })
        // // console.log("api key data 2", arryData)
        // datatablaScript(arryData)
        let textStr = "The API Key below will be shown only once.<p id='api-key-copy'>Key Prefix: " + response?.data?.prefix + "</p>Key Type: " + apikeyInfoStatusInModal + "<p>Key Secret: <h6>" + response?.data?.key + "</h6></p>";

        Swal.fire({
          title: 'API key Generated',
          html: textStr.toString(),
          icon: 'success',
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#FF7643',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, i have copied and saved the API Key!'
        }).then((result) => {
          // let keyCopyText = document.getElementById("api-key-copy")
          // keyCopyText.select()
          // keyCopyText.setSelectionRange(0, 99999)
          // navigator.clipboard.writeText(keyCopyText.value)
          // alert(keyCopyText.value)
          // if (result.isConfirmed) {
            // 
            // console.log( "old ", apikeyInfo,  " new ", apikeyInfoNew)
            apikeyInfo = apikeyInfoNew
            setModal1(false);
          // window.location.reload()
          // }
        });
        // setTimeout(() => {
        //   let infoData = apikeyData();
        //   let infoArray = [];
        //   infoData?.apikey?.then(value => { 
        //     infoArray = value;
        //     datatablaScript(value);
        //     apikeyDetails = value;
        //     apikeyInfo = value

        //   }); 
        //   }, 1000);
      }
      else {
        Swal.fire({
          title: 'API key Generation Failed!',
          // text: "Try again",
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: '#d33',
        }).then((result) => {
          // 
        })
      }

    }).catch(function (error) {
      if(error){
        Swal.fire({
          title: 'API key Generation Failed!',
          text: "Try again!",
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: '#d33',
        }).then((result) => {
          // 
        })
      }

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
      {/* {// console.log("dateRange ", dateRange)} */}

      {/* open modal for filter date range */}
      {/* <CButton onClick={() => setModal1(!modal1)} icon={cilArrowRight} className="float-end" >Filter</CButton> */}
      <div id="filterDropdown" className="dropdown-content mb-4" onClick={(e) => setDropValue(1)}>
        <CCard sm={12} md={12} lg={12}>
          <CCardHeader>
            <CRow sm={12} md={12} lg={12}>
              <CCol sm={12} md={12} lg={12} > <CBadge color='secondary' onClick={(e)=>resetFilter(e)}>Reset</CBadge> <CBadge color='primary' style={{ float: "right" }} onClick={(e)=>performFilter("filterByOptions", "none")}>Apply</CBadge> </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p>Search by:</p>
            <div> 
              <p className='des-filter-inputs'>apikeyInfo Reference</p>
              <Box
                // component="form"
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
                  value={referanceId}
                  onChange={(e) => setReferanceId(e.target.value)} 
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
                // component="form"
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
                  value={apikeyInfoId}
                  onChange={(e) => setapikeyInfoId(e.target.value)} 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start" >
                        <CIcon icon={cilSearch} className="me-2" />
                      </InputAdornment>
                    ),
                  }}
                  // label="Filter"
                  placeholder="Product ID"
                  // multiline
                  />
              </Box>
            </div>
            <div style={{width: "220px"}}>
              
              <p className='des-filter-inputs'>Filter by amount: </p>
              
              <Box
                // component="form"
                // sx={{
                //   '& > :not(style)': { m: 1, width: '25ch' },
                // }}
                noValidate
                autoComplete="off"
                sx={{ minWidth: 30 }} 
                className='filters-d'
                >
                {/* <TextField 
                  id='filters-d'
                  sx={{ minWidth: 5 }} 
                  // onClick={(e) => toggleFilter(e, "filter")} 
                  // onChange={(e) => setReferanceId(e.target.value)} 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start" >
                        <CIcon icon={cilSearch} className="me-2" />
                      </InputAdornment>
                    ),
                  }}
                  // label="Filter"
                  placeholder="eg. "
                  /> */}
  
              </Box>
              <Box
                noValidate
                autoComplete="off"
                // sx={{ minWidth: 30 }} 
                // className='filters-d'
                >

              <Row sm={12} md={12} lg={12}>
                <Col sm={6} md={6} lg={6} > 
                  <Label for="amount-less"> Less = </Label>
                  <TextField
                    id='amount-less'
                    type="number"
                    value={amountLess}
                    variant="outlined"
                    inputProps={{
                      step: "0.01"
                    }}
                    onChange={(e) => setAmountLess(parseFloat(e.target.value).toFixed(2))} 
                  />
                </Col>
                <Col sm={6} md={6} lg={6} > 
                  <Label for="amount-great"> Greter = </Label>
                  <TextField
                    id='amount-great'
                    type="number"
                    value={amountGreat}
                    variant="outlined"
                    inputProps={{
                      step: "0.01"
                    }}
                    onChange={(e) => setAmountGreat(parseFloat(e.target.value).toFixed(2))} 
                  />
                </Col>
              </Row>
              <Row sm={12} md={12} lg={12}>
                  <Col sm={6} md={6} lg={6} >
                    <Label for="amount-great"> Equal </Label>
                    <TextField
                      id='amount-equal'
                      type="number"
                      value={amountEqual}
                      variant="outlined"
                      inputProps={{
                        step: "0.01"
                      }}
                      onChange={(e) => setAmountEqual(parseFloat(e.target.value).toFixed(2))}
                    />
                  </Col>
              </Row>
              </Box>
            </div>

          </CCardBody>

        </CCard>
      </div>

      <Row>
        <Col xs="12" sm="12" md={2} lg={2} >
          {/* filter */}
          <div className="dropdown filterDrop">

          <FormControl fullWidth >
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
                className='d-filters'
                onClick={(e) => setModal1(true)} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <CIcon icon={cilPlus} className="me-2" /> Add key
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
          </FormControl>
          </div>
        </Col>
        <Col xs="12" sm="12" md={3} lg={3} >
          {/* apikeyInfo types */}
          <Box sx={{ minWidth: 160 }}>
            <FormControl fullWidth style={{marginTop: "0px"}}>
              <Label for="apikeyInfoStatus" className="label-dc"> </Label>
              <Select
                placeholder={"Select status"}
                options={optionsStatus}
                id="apikeyInfoStatus"
                className='other-input-select d-filters'
                // components={{ Option: paymentOption }}
                onChange={(e) => handleChangeapikeyInfoStatus(e.value)}
              />
          
            </FormControl>
          </Box>
        </Col>
        {/* Date range */}
        <Col xs="12" sm="12" md={4} lg={4} >
          {/* date range */}
          <FormControl fullWidth>
            <Box
              // component="form"
              id='dateRange-control'
              // sx={{
              //   '& > :not(style)': { m: 1, width: '25ch' },
              // }}
              noValidate
              autoComplete="off"
              sx={{ minWidth: 170 }}
              
            >
              
              <RSuitDateRangePicker 
                appearance="default" 
                placeholder={"Select date range"} 
                size="lg"
                style={{ width: 260, display: 'block', border: "10px solid #080808 !important"}} 
                className="d-filters"
                // open={openDateRange}
                // toggle={toggle}
                onChange={(range) => setDateRange(range || {})}
                // ranges={dateRange}
                // months={2}
                id="datePicker-0"
              />
              {/* <TextField 
               id="dateRange" 
              //  label="Date range"
              //  onClick={(e)=>toggleFilter(e, "dateRange")} 
              onClick={(e)=>setModal1(true) }
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
               
               /> */}
            </Box>
          </FormControl>
        </Col>
        <Col xs="12" sm="12" md={1} lg={1} >
        </Col>
        <Col xs="12" sm="12" md={2} lg={2} >
          {/* export */}
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Label for="apikeyInfoExport" className="label-dc"> </Label>
              <Select
                placeholder={"Select export"}
                options={optionsExport}
                id="apikeyInfoExport"
                className='other-input-select d-filters'
                // components={{ Option: paymentOption }}
                onChange={(e) => handleChangeExport(e.value)}
              />
            </FormControl>
          </Box>
        </Col>
      </Row>
      
      {/* {dateTo.toString()}{" rrr "}{dateFrom.toString()} */}
      <br /><br />

      <table id="myTable" className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Prefix</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>

        <tbody>
          {
            tableData?.map((post, id) =>
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{post?.prefix}</td>
                <td>{post?.name}</td>
                <td><CBadge color={post?.is_live === true ? "success" : "secondary" }> {post?.is_live === true ? "LIVE" : "TEST"} </CBadge> </td>
                <td>{moment(post?.created).format('LLLL')}</td>
                {/* <td>{post?.amount}</td> */}
                {/* <td onClick={() => { setModal2(true); setViewData(post) }}><CBadge className='bg-text-wp'>View</CBadge></td> */}
              </tr>
            )}
            
        </tbody>
      </table>

      {tableData?.length > 0 ? "" : <p style={{textAlign: "center"}}> <br /><br /> {noData}</p>}

      <a dangerouslySetInnerHTML={{ __html: loader }}></a>

      {/* modals */}
      {/* modal for filter date range */}
      <CModal visible={modal1} alignment="center" onClose={() => setModal1(false)}>
        <CModalHeader> Generate New API key </CModalHeader>
        <CModalBody> 
          {/*  */}
          <Row>
          <Col xs="12" sm="12" md={5} lg={5} className="mt-0" > 
            <Label for="apikeyInfoStatus" className="label-dc"> Description </Label>
            <TextField 
              // id='filters-d'
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              // label="Filter"
              placeholder="Eg. my api key for shopti"
              multiline
              />
          </Col>
          <Col xs="12" sm="12" md={5} lg={5} className="mt-1" >
            <Label for="apikeyInfoStatus" className="label-dc"> Key type </Label>
            <Select
              placeholder={"Select status"}
              options={optionsStatusInModal}
              id="apikeyInfoStatus"
              className='other-input-select'
              // components={{ Option: paymentOption }}
              onChange={(e) => handleChangeapikeyInfoStatusInModal(e.value)}
            />
          </Col>

          </Row>

              
        
          
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={(e) => setModal1(false)}> 
          Cancel
          </CButton>
          <CButton color="" className='text-white bg-text-wp' onClick={(e) => generateApikey(e)}> 
          Create
          </CButton>
        </CModalFooter>
      </CModal>

      {/* modal for filter date range */}
      <CModal visible={modal2} scrollable backdrop="static" fullscreen="xl" onClose={() => setModal2(false)}>
        <CModalHeader>
          <CModalTitle>  </CModalTitle>
        </CModalHeader>
        <CModalBody className='contentForapikeyInfoPrint'>
          <p className="success rounded" style={{ textAlign: "center" }} >
            <h2> apikeyInfo Details </h2>
            <CIcon icon={cilCheckCircle} className="bg-text-wp icon-wp" width="15%" />
          </p>

          {/* view only data for apikeyInfo */}
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

export default ApikeyDataTables;