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
import {Checkbox, FormGroup, FormLabel, Radio, RadioGroup, TextField} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputAdornment from '@mui/material/InputAdornment';
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
import { ticketData } from '../Data/PageData';
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
  cilFilter, cilCheckCircle, cilSettings, cilCalendar, cilSearch, cilPlus, cilKeyboard, cilMinus,
} from '@coreui/icons'
import Select, { ActionMeta, OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'antd';

let currentUser = JSON.parse(localStorage.getItem("userDataStore")); 
let ticketInfoData = ticketData();
let ticketInfo = []
ticketInfoData?.ticket?.then(value => { (ticketInfo = value) });

const TicketDataTables = (ticketDetails) => {
  const [loader, setLoader] = useState('<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>')
  const [tableData, setTableData] = useState([]);
  const [noData, setNoData] = useState("")
  const [monitorState, setMonitorState] = useState(1);
  const [dropValue, setDropValue] = useState(0);

  // handle state transition for delete action to update data
  const [actionDel, setActionDel] = useState(0)

  // date time
  const [dateTo, setDateTo] = useState(new Date('2014-08-18T21:11:54'));
  const [dateFrom, setDateFrom] = useState(new Date('2014-08-18T21:11:54')); 
  const [value, setValue] = useState([null, null]);

  // modals
  // filer ticketInfo
  const [modal1, setModal1] = useState(false)
  // view single ticketInfo 
  const [modal2, setModal2] = useState(false)

  // set Show form fields
  const [show, setShow] = useState(false)

  const [viewData, setViewData] = useState({})
  const [openDateRange, setOpenDateRange] = useState(true);
  const [dateRange, setDateRange] = useState({});
  const [description, setDescription] = useState("");
  const [ticketInfoStatusInModal, setticketInfoStatusInModal] = useState("");
  // startDate: Date.parse("2022-01-13"), endDate: Date.now()
  
  const [ticketInfoStatus, setticketInfoStatus] = useState("");
  const [ticketInfoId, setticketInfoId] = useState("");
  const [referanceId, setReferanceId] = useState("");
  const [ticketInfoExport, setticketInfoExport] = useState({});
  const [dateFilterData, setDateFilterData] = useState({});
  const [amountLess, setAmountLess] = useState(0.00);
  const [amountGreat, setAmountGreat] = useState(0.00);
  const [amountEqual, setAmountEqual] = useState(0.00);

  // get form data 
  const [formData, setFormData] = useState({});
  const [editFormData, setEditFormData] = useState({});

  const toggle = () => setOpenDateRange(!openDateRange);

  useEffect(() => {

    if(dateRange.length > 0 && monitorState === 1){
      setMonitorState(2)
      performFilter("filterByDate", "none")
      setticketInfoStatus("")

      setLoader('<a></a>')
    }
    else if (ticketInfo?.length > 0 && monitorState === 1) {
      // setMonitorState(2)
      // console.log("info ", ticketInfo )
      datatablaScript(ticketInfo);

      setLoader('<a></a>')
    }
    else if(dateRange && monitorState === 2){
      performFilter("filterByDate", "none")
      setticketInfoStatus("")
      // setMonitorState(3)
    }
    else{
        datatablaScript([])
        setLoader('<a></a>')
        // setTimeout(()=>{
        //     setNoData("dd")
        // }, 200)
    }

    // if(ticketInfoStatus && monitorState === 2){
    //   performFilter("filterByStatus")
    // }

    
    // console.log("props ", dateRange, ticketInfo, ticketInfoStatus, monitorState)

  }, [dateRange, ticketInfo, actionDel])

  // perform filter 
  function datatablaScript(tdata) {
    let printCounter = 0;

    setTableData(tdata);
    $('#myTable').DataTable().destroy();
    setTimeout(() => {   
       
      $('#myTable').DataTable(
        {
          // data: ticketInfo,
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
                let sheet = anytype.xl.worksheets['wingipayticketInfo.xml'];
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
                let sheet = anytype.xl.worksheets['wingipayticketInfo.pdf'];
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
  
  const handleChangeExport = (valSelected) => {
    setticketInfoExport(valSelected);
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
    {value: "All ticketInfo", label: "All Keys" }
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

    // // console.log("by status ", ticketInfoStatus, "type", type )
    // perform filter by date range
    if(type === "filterByDate"){
      // 
      let dataFilter = ticketInfo.filter((post, id) => {return ( moment(post?.created).format('DD/MM/yyyy') >= moment(dateRange[0]).format('DD/MM/yyyy') && moment(post?.created).format('DD/MM/yyyy') <= moment(dateRange[1]).format('DD/MM/yyyy') )});

      datatablaScript( dataFilter );

      setDateFilterData( dataFilter );
    }
    else if(type === "filterByStatus"){
      // 
      // // console.log("by status",status, monitorState, apikeyDetails )
      if(status === "All ticketInfo" && monitorState === 1){
        datatablaScript(ticketInfo);
      }
      else if(status === "All ticketInfo" && monitorState === 2){
        datatablaScript(dateFilterData);
      }
      else if(status === "test" && monitorState === 1){
        datatablaScript( ticketInfo?.filter((post, id) => {return ( post?.is_live === false )}) );
      }
      else if(status === "live" && monitorState === 1){
        datatablaScript( ticketInfo?.filter((post, id) => {return ( post?.is_live === true )}) );
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
    setticketInfoId("")
    datatablaScript(ticketInfo)
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
  
  const handleChangeTo = (newValue) => {
    setDateTo(newValue);
    setFormData({...formData, ...{"dateTo": newValue}})
  };
  
  const handleEditChangeTo = (newValue) => {
    // setDateTo(newValue); 
    setEditFormData({...editFormData, ...{"expiration_date": newValue}}) 
  };
  function generateLinkkey(e) {
    e.preventDefault();
    // console.log("setFormData ", formData)
    let data = JSON.stringify({ 
      // collectFixAmount: true 
      "type": formData?.oneTime,
      "custom_link": formData?.customLink,
      "page_name": formData?.payLinkName, 
      "description": formData?.description,
      "is_fixed": formData?.collectFixAmount,
      "is_recurring": formData?.recurring ? true : false,
      "phone_required": formData?.collectPhoneNumber,
      "phone_number": formData?.phoneNumber,
      "fixed_amount": formData?.amount,
      "custom_success_message": formData?.successMessage, 
      "notify_email": formData?.email,
      "expiration_date": formData?.dateTo,
      "split_payment": formData?.splitPayment,
      "additional_fields": {
          "address": formData?.customField
      },
      "callback_url": "", 
      "redirect_url": formData?.redirectUrl
    });

    let config = {
      method: 'post',
      url: process.env.REACT_APP_BASE_API + "/payment/link/create/" + currentUser?.account + "/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser?.access
      },
      data: data
    };
    axios(config).then(response => {
      // console.log(response.data);
      if (response?.data?.status === true) { 

        let ticketInfoDataNew = ticketData();
        let ticketInfoNew = []
        ticketInfoDataNew?.ticket?.then(value => { (ticketInfoNew = value) });

        Swal.fire({
          title: 'Ticket Sent',
          icon: 'success',
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#FF7643',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
          // let keyCopyText = document.getElementById("api-key-copy")
          // keyCopyText.select()
          // keyCopyText.setSelectionRange(0, 99999)
          // navigator.clipboard.writeText(keyCopyText.value)
          // alert(keyCopyText.value)
          // if (result.isConfirmed) {
            // 
            // console.log( "old ", ticketInfo,  " new ", ticketInfoNew)
            ticketInfo = ticketInfoNew
            setModal1(false);
          // window.location.reload()
          // }
        });
        // setTimeout(() => {
        //   let infoData = ticketData();
        //   let infoArray = [];
        //   infoData?.ticket?.then(value => { 
        //     infoArray = value;
        //     datatablaScript(value);
        //     apikeyDetails = value;
        //     ticketInfo = value

        //   }); 
        //   }, 1000);
      }
      else {
        Swal.fire({
          title: 'TicketCreation Failed!',
          text: response.data.message,
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
          title: 'TicketCreation Failed!',
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
  function editticket(e) {
    e.preventDefault();
    console.log("editFormData ", editFormData)
    let data = JSON.stringify({ 
      // collectFixAmount: true 
      "type": editFormData?.type,
      "custom_link": editFormData?.custom_link,
      "page_name": editFormData?.page_name, 
      "description": editFormData?.description,
      "is_fixed": editFormData?.is_fixed,
      "is_recurring": editFormData?.recurring === true ? true : false,
      "phone_required": editFormData?.phone_required,
      "phone_number": editFormData?.phone_number,
      "fixed_amount": editFormData?.fixed_amount,
      "custom_success_message": editFormData?.custom_success_message, 
      "notify_email": editFormData?.notify_email,
      "expiration_date": editFormData?.expiration_date,
      "split_payment": editFormData?.split_payment,
      "additional_fields": editFormData?.additional_fields,
      "callback_url": editFormData?.callback_url, 
      "redirect_url": editFormData?.redirect_url
    });

    let config = {
      method: 'patch',
      url: process.env.REACT_APP_BASE_API + "/payment/link/update/" + editFormData.id + "/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser?.access
      },
      data: data
    };
    axios(config).then(response => {
      console.log(response.data);
      if (response?.data?.status === true) { 

        let ticketInfoDataNew = ticketData();
        let ticketInfoNew = []
        ticketInfoDataNew?.ticket?.then(value => { (ticketInfoNew = value) });

        Swal.fire({
          title: 'TicketEdited',
          icon: 'success',
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#FF7643',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'OK!'
        }).then((result) => {
            ticketInfo = ticketInfoNew
            setModal2(false);
        });
      }
      else {
        Swal.fire({
          title: 'Failed To Edit Ticket!',
          text: response.data.message,
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
          title: 'Failed To Edit Ticket!',
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
  // delete
  function deleteticket(e) {
    e.preventDefault();
    let data = {}
    let config = {
      method: 'delete',
      url: process.env.REACT_APP_BASE_API + "/payment/link/delete/" + editFormData.id + "/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser?.access
      },
      data: data
    };

    Swal.fire({
      icon: 'info',
      title: 'Do you want to delete the item?',
      allowOutsideClick: false,
      // allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonColor: '#FF7643',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancel",
      confirmButtonText: 'Confirm',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2'
      }
    }).then((result) => {
        // console.log( "old ", bulkPayInfo,  " new ", bulkPayInfoNew)
        if (result.isConfirmed) {
          // 
          passConfigDeleteLink(config)
        }
        else{
          // 
        }
        
    });
  }
  // get delete config for delete action 
  function passConfigDeleteLink(config){
    // 
    axios(config).then(response => {
      // console.log(response.data);
      if (response?.data?.status === true) { 
        let ticketInfoDataNew = ticketData();
        let ticketInfoNew = []
        ticketInfoDataNew?.ticket?.then(value => { (ticketInfoNew = value) });
        // console.log("out ", ticketInfoNew)
        Swal.fire({
          title: 'TicketDeleted',
          icon: 'success',
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#FF7643',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'OK!'
        }).then((result) => {
            // console.log("in ", ticketInfoNew)
            ticketInfo = ticketInfoNew
            setActionDel(2)
            // setModal2(false);
        });
      }
      else {
        Swal.fire({
          title: 'Failed To Delete Ticket!',
          text: response.data.message,
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
          title: 'Failed To Delete Ticket!',
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
      <Row>
        {
          currentUser?.permission_list?.includes("can_create_and_manage_payment_pages") ?
          <Col xs="12" sm="12" md={3} lg={3} >
            {/* filter */}
            <Box sx={{ minWidth: 140 }}>
              <FormControl fullWidth style={{marginTop: "8px"}}>
                <Button
                    type="submit"
                    fullWidth
                    // variant="contained"
                    // sx={{ mt: 0, mb: 20 }}
                    className='bg-text-wp-action'
                    style={{ height: '36px' }}
                    onClick={ (e) => setModal1(true)}
                >
                    CREATE TICKET
                </Button>
              </FormControl>
            </Box>
          </Col>
          : ""
        }
        <Col xs="12" sm="12" md={3} lg={3} >
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
        {/* export */}
        {
          currentUser?.permission_list?.includes("can_create_and_manage_payment_pages") ?
          <Col xs="12" sm="12" md={2} lg={2} >
            {/* export */}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Label for="ticketInfoExport" className="label-dc"> </Label>
                <Select
                  placeholder={"Select export"}
                  options={optionsExport}
                  id="ticketInfoExport"
                  className='other-input-select d-filters mt-0'
                  // components={{ Option: paymentOption }}
                  onChange={(e) => handleChangeExport(e.value)}
                />
              </FormControl>
            </Box>
          </Col>
          : ""
        }
      </Row>
      
      {/* {dateTo.toString()}{" rrr "}{dateFrom.toString()} */}
      <br /><br />

      <table id="myTable" className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Description</th>
            <th>Recurring</th>
            <th>Amount</th>
            <th>Link</th>
            <th>Expiration Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            tableData?.map((post, id) =>
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{post?.page_name}</td>
                <td>{post?.description}</td>
                <td>{post?.is_fixed ? "Yes" : "No" }</td>
                <td>{post?.fixed_amount || "No" }</td>
                <td><a href={ "/link/"+post?.custom_link} > { window.location.hostname + "/link/" + post?.custom_link} </a></td>   
                <td>{moment(post?.expiration_date || Date() ).format('LLLL') }</td>            
                <td>
                  {
                    currentUser?.permission_list?.includes("can_create_and_manage_payment_pages") ?
                    <p>
                      <CBadge className='bg-text-wp' onClick={() => { setModal2(true); setEditFormData(post) }} > Edit </CBadge> 
                      <CBadge color='black' style={{marginRight: "5px"}} onClick={(e) => { setEditFormData(post); deleteticket(e) }} > Delete </CBadge> 
                    </p>
                    : "N/A"
                  }
                </td>
              </tr>
            )}
            
        </tbody>
      </table>

      {tableData?.length > 0 ? "" : <p style={{textAlign: "center"}}> <br /><br /> {noData}</p>}

      <a dangerouslySetInnerHTML={{ __html: loader }}></a>

      {/* modals */}
      {/* modal for create */}
      <CModal visible={modal1} alignment="center" onClose={() => setModal1(false)}>
        <CModalHeader> <CModalTitle> Create a Ticket</CModalTitle> </CModalHeader>
        <CModalBody> 
          {/* <Checkbox {...label} /> */}
          <Row style={{ marginRight: '1px' }}>
            {/* name for Ticket*/}
            <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
            <div className='bulk-pay-name' >
              <Box 
                component="form"
                noValidate
                autoComplete="off"
                >
                <Label for="payLinkName" className="f-w-label"> Name </Label>
                <TextField
                  fullWidth
                  // error = {pageNameError} 
                  id='payLinkName'
                  // value={pageName} 
                  onChange={(e)=>setFormData({...formData, ...{"payLinkName": e.target.value}})}
                  // onChange={(e) => {(setPageName(e.target.value)); (setPageNameError(false))}}
                  // label="description"                      
                  />
              </Box>
            </div>
            </Col>
            {/* description */}
            <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
            <div className='bulk-pay-name' >
              <Box 
                component="form"
                noValidate
                autoComplete="off"
                >
                <Label for="description" className="f-w-label"> Description </Label>
                <TextField
                  fullWidth
                  // error = {descriptionError} 
                  id='description'
                  onChange={(e)=>setFormData({...formData, ...{"description": e.target.value}})}
                  // value={amount}
                  // onChange={(e) => {(setDescription(e.target.value)); (setDescriptionError(false))}}
                  // label="description"                      
                  />
              </Box>
            </div>
            </Col>


          </Row>
          
          
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={(e) => setModal1(false)}> 
            Cancel
          </CButton>
          <CButton color="" className='text-white bg-text-wp' onClick={(e) => generateLinkkey(e)}> 
            Create
          </CButton>
        </CModalFooter>
      </CModal>

      {/* modal for edit */}
      <CModal visible={modal2} scrollable backdrop="static" onClose={() => setModal2(false)}>
        <CModalHeader>
          <CModalTitle> Edit Ticket</CModalTitle>
        </CModalHeader>
        <CModalBody> 
          {/* <Checkbox {...label} /> */}
          <Row style={{ marginRight: '1px' }}>
            {/* name for Ticket*/}
            <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
            <div className='bulk-pay-name' >
              <Box 
                component="form"
                noValidate
                autoComplete="off"
                >
                <Label for="payLinkName" className="f-w-label"> Page name </Label>
                <TextField
                  fullWidth
                  // error = {pageNameError} 
                  id='payLinkName'
                  value={editFormData?.page_name} 
                  onChange={(e)=>setEditFormData({...editFormData, ...{"page_name": e.target.value}})}
                  // onChange={(e) => {(setPageName(e.target.value)); (setPageNameError(false))}}
                  // label="description"                      
                  />
              </Box>
            </div>
            </Col>
            {/* description */}
            <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
            <div className='bulk-pay-name' >
              <Box 
                component="form"
                noValidate
                autoComplete="off"
                >
                <Label for="description" className="f-w-label"> Description </Label>
                <TextField
                  fullWidth
                  // error = {descriptionError} 
                  id='description'
                  value={editFormData?.description} 
                  onChange={(e)=>setEditFormData({...editFormData, ...{"description": e.target.value}})}
                  // value={amount}
                  // onChange={(e) => {(setDescription(e.target.value)); (setDescriptionError(false))}}
                  // label="description"                      
                  />
              </Box>
            </div>
            </Col>

            
          </Row>
          {/* <p style={{ textAlign: 'center' }} className='mt-4' >
            { 
              show ? <a href='#' onClick={ (e)=>setShow(false) }> Show less </a> :
              <a href='#' onClick={ (e)=>setShow(true) }> Show more </a>
            }
          </p> */}
                  
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={(e) => setModal2(false)}> 
            Cancel
          </CButton>
          <CButton color="" className='text-white bg-text-wp' onClick={(e) => editticket(e)}> 
            Update
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default TicketDataTables;