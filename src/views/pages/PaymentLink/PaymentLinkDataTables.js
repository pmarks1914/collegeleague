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
import { paymentLinkData } from '../Data/PageData';
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
let paymentLinkInfoData = paymentLinkData();
let paymentLinkInfo = []
paymentLinkInfoData?.paymentLink?.then(value => { (paymentLinkInfo = value) });

const PaymentLinkDataTables = (apikeyDetails) => {
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
  // filer paymentLinkInfo
  const [modal1, setModal1] = useState(false)
  // view single paymentLinkInfo 
  const [modal2, setModal2] = useState(false)

  // set Show form fields
  const [show, setShow] = useState(false)

  const [viewData, setViewData] = useState({})
  const [openDateRange, setOpenDateRange] = useState(true);
  const [dateRange, setDateRange] = useState({});
  const [description, setDescription] = useState("");
  const [paymentLinkInfoStatusInModal, setpaymentLinkInfoStatusInModal] = useState("");
  // startDate: Date.parse("2022-01-13"), endDate: Date.now()
  
  const [paymentLinkInfoStatus, setpaymentLinkInfoStatus] = useState("");
  const [paymentLinkInfoId, setpaymentLinkInfoId] = useState("");
  const [referanceId, setReferanceId] = useState("");
  const [paymentLinkInfoExport, setpaymentLinkInfoExport] = useState({});
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
      setpaymentLinkInfoStatus("")

      setLoader('<a></a>')
    }
    else if (paymentLinkInfo?.length > 0 && monitorState === 1) {
      // setMonitorState(2)
      // console.log("info ", paymentLinkInfo )
      datatablaScript(paymentLinkInfo);

      setLoader('<a></a>')
    }
    else if(dateRange && monitorState === 2){
      performFilter("filterByDate", "none")
      setpaymentLinkInfoStatus("")
      // setMonitorState(3)
    }
    else{
        datatablaScript([])
        setLoader('<a></a>')
        // setTimeout(()=>{
        //     setNoData("dd")
        // }, 200)
    }

    // if(paymentLinkInfoStatus && monitorState === 2){
    //   performFilter("filterByStatus")
    // }

    
    // console.log("props ", dateRange, paymentLinkInfo, paymentLinkInfoStatus, monitorState)

  }, [dateRange, paymentLinkInfo, actionDel])

  // perform filter 
  function datatablaScript(tdata) {
    let printCounter = 0;

    setTableData(tdata);
    $('#myTable').DataTable().destroy();
    setTimeout(() => {   
       
      $('#myTable').DataTable(
        {
          // data: paymentLinkInfo,
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
                let sheet = anytype.xl.worksheets['wingipaypaymentLinkInfo.xml'];
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
                let sheet = anytype.xl.worksheets['wingipaypaymentLinkInfo.pdf'];
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
    // paymentLinkInfo = posts;
    try {
      // setTableData(posts);
      let newFilterData = paymentLinkInfo.filter((post) => { return moment(post?.created).format('LLLL') <= moment(dateFrom).format('LLLL') })
      // // console.log("post tableData ", paymentLinkInfo);
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

    w.document.write($('.contentForpaymentLinkInfoPrint').html());
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
  const handleChangepaymentLinkInfoStatus = (valSelected) => {
    setpaymentLinkInfoStatus(valSelected);
    performFilter("filterByStatus", valSelected)
  };
  const handleChangepaymentLinkInfoStatusInModal = (valSelected) => {
    setpaymentLinkInfoStatusInModal(valSelected);
  };
  const handleChangeExport = (valSelected) => {
    setpaymentLinkInfoExport(valSelected);
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
    {value: "All paymentLinkInfo", label: "All Keys" }
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

    // // console.log("by status ", paymentLinkInfoStatus, "type", type )
    // perform filter by date range
    if(type === "filterByDate"){
      // 
      let dataFilter = paymentLinkInfo.filter((post, id) => {return ( moment(post?.created).format('DD/MM/yyyy') >= moment(dateRange[0]).format('DD/MM/yyyy') && moment(post?.created).format('DD/MM/yyyy') <= moment(dateRange[1]).format('DD/MM/yyyy') )});

      datatablaScript( dataFilter );

      setDateFilterData( dataFilter );
    }
    else if(type === "filterByStatus"){
      // 
      // // console.log("by status",status, monitorState, apikeyDetails )
      if(status === "All paymentLinkInfo" && monitorState === 1){
        datatablaScript(paymentLinkInfo);
      }
      else if(status === "All paymentLinkInfo" && monitorState === 2){
        datatablaScript(dateFilterData);
      }
      else if(status === "test" && monitorState === 1){
        datatablaScript( paymentLinkInfo?.filter((post, id) => {return ( post?.is_live === false )}) );
      }
      else if(status === "live" && monitorState === 1){
        datatablaScript( paymentLinkInfo?.filter((post, id) => {return ( post?.is_live === true )}) );
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
    setpaymentLinkInfoId("")
    datatablaScript(paymentLinkInfo)
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

        let paymentLinkInfoDataNew = paymentLinkData();
        let paymentLinkInfoNew = []
        paymentLinkInfoDataNew?.paymentLink?.then(value => { (paymentLinkInfoNew = value) });
        let textStr = "The Payment Link below .<p> <h6>" + window.location.hostname  + "/" + ( response?.data?.data?.custom_link || response?.data?.prefix ) + "</h6></p>";

        Swal.fire({
          title: 'Payment Link Generated',
          html: textStr.toString(),
          icon: 'success',
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#FF7643',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, i have copied and saved the Payment Link!'
        }).then((result) => {
          // let keyCopyText = document.getElementById("api-key-copy")
          // keyCopyText.select()
          // keyCopyText.setSelectionRange(0, 99999)
          // navigator.clipboard.writeText(keyCopyText.value)
          // alert(keyCopyText.value)
          // if (result.isConfirmed) {
            // 
            // console.log( "old ", paymentLinkInfo,  " new ", paymentLinkInfoNew)
            paymentLinkInfo = paymentLinkInfoNew
            setModal1(false);
          // window.location.reload()
          // }
        });
        // setTimeout(() => {
        //   let infoData = paymentLinkData();
        //   let infoArray = [];
        //   infoData?.paymentLink?.then(value => { 
        //     infoArray = value;
        //     datatablaScript(value);
        //     apikeyDetails = value;
        //     paymentLinkInfo = value

        //   }); 
        //   }, 1000);
      }
      else {
        Swal.fire({
          title: 'Payment Link Generation Failed!',
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
          title: 'Payment Link Generation Failed!',
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
  function editPaymentLink(e) {
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

        let paymentLinkInfoDataNew = paymentLinkData();
        let paymentLinkInfoNew = []
        paymentLinkInfoDataNew?.paymentLink?.then(value => { (paymentLinkInfoNew = value) });

        Swal.fire({
          title: 'Payment Link Edited',
          icon: 'success',
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#FF7643',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'OK!'
        }).then((result) => {
            paymentLinkInfo = paymentLinkInfoNew
            setModal2(false);
        });
      }
      else {
        Swal.fire({
          title: 'Failed To Edit Payment Link!',
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
          title: 'Failed To Edit Payment Link!',
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
  function deletePaymentLink(e) {
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
        let paymentLinkInfoDataNew = paymentLinkData();
        let paymentLinkInfoNew = []
        paymentLinkInfoDataNew?.paymentLink?.then(value => { (paymentLinkInfoNew = value) });
        // console.log("out ", paymentLinkInfoNew)
        Swal.fire({
          title: 'Payment Link Deleted',
          icon: 'success',
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#FF7643',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'OK!'
        }).then((result) => {
            // console.log("in ", paymentLinkInfoNew)
            paymentLinkInfo = paymentLinkInfoNew
            setActionDel(2)
            // setModal2(false);
        });
      }
      else {
        Swal.fire({
          title: 'Failed To Delete Payment Link!',
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
          title: 'Failed To Delete Payment Link!',
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

  function handleInputChange(e){
    // console.group('Input Changed');
    // console.log(e);
    setFormData({...formData, ...{"customField": e}})
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };
  function handleInputEditChange(e){
    // console.group('Input Changed');
    // let additional_fields = editFormData?.additional_fields 
    // let array3 = (editFormData?.additional_fields?.address || []).concat(e)
    // console.log(array3)
    // let array4 = array3?.filter((item, pos) => array3?.indexOf(item) === pos) 
    // console.log(e)
    setEditFormData({...editFormData, ...{"additional_fields": {
      "address": e
    }}})
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };

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
              <p className='des-filter-inputs'>paymentLinkInfo Reference</p>
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
                  value={paymentLinkInfoId}
                  onChange={(e) => setpaymentLinkInfoId(e.target.value)} 
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
                    CEATE PAYMENT LINK
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
                <Label for="paymentLinkInfoExport" className="label-dc"> </Label>
                <Select
                  placeholder={"Select export"}
                  options={optionsExport}
                  id="paymentLinkInfoExport"
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
                      <CBadge color='black' style={{marginRight: "5px"}} onClick={(e) => { setEditFormData(post); deletePaymentLink(e) }} >   </CBadge> 
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
        <CModalHeader> <CModalTitle> Create a Payment Link </CModalTitle> </CModalHeader>
        <CModalBody> 
          {/* <Checkbox {...label} /> */}
          <Row style={{ marginRight: '1px' }}>
            {/* name for payment link */}
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

            <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >
              {/*  */}
              
              {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}

            </Col>
            {/* collect fixed amount */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-2" >
              {/*  */}
              <FormGroup>
                {/* <FormControlLabel className="f-w-label" control={<Checkbox defaultChecked/>}  */}
                <FormControlLabel className="f-w-label" control={<Checkbox />} label="I want to collect a fix amount on this page." 
                  onClick={(e)=>setFormData({...formData, ...{"collectFixAmount": e.target.checked }})} />
              </FormGroup>
            </Col>
            {/* collect phone */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-0" >
              {/*  */}
              <FormGroup>
                <FormControlLabel className="f-w-label" control={<Checkbox />} label="I want to collect phone number." 
                  onClick={(e)=>setFormData({...formData, ...{"collectPhoneNumber": e.target.checked }})} />
              </FormGroup>
            </Col>
            {/* set status to active */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-0" >
              {/*  */}
              {/* <FormGroup> */}
                <FormControlLabel className="f-w-label" control={<Checkbox />} label="I want to set the status to be active."
                  onClick={(e)=>setFormData({...formData, ...{"setStatusToActive": e.target.checked }})} />
              {/* </FormGroup> */}
            </Col>
            {/* recurring */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-2" >
              {/*  */}
              <p>                
                <FormControl>
                    <p className="f-w-label mb-0" > 
                      <Row className='mb-1' style={{ marginLeft: '0px'}}> Recurring Payment </Row >
                      Select if the link is a recurring payment link or one time payment link.
                    </p>
                  <FormLabel id="demo-radio-buttons-group-label"> </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="oneTime"
                    name="radio-buttons-group"
                    className='d-flex'

                  > 
                  {/* recurring onetime action */}
                  <Row>
                    <Col md={6} lg={6}>
                      <FormControlLabel className='mt-0' value="oneTime" control={<Radio />} label="One time" onClick={(e)=>setFormData({...formData, ...{"oneTime": e.target.checked},  ...{"recurring": false} }) }  />
                    </Col>
                    <Col md={6} lg={6}>
                      <FormControlLabel className='mt-0' value="recurring" control={<Radio />} label="Recurring" onClick={(e)=>setFormData({...formData, ...{"recurring": e.target.checked}, ...{"oneTime": false} })} md={6} lg={6} />
                    </Col>
                  </Row> 
                  </RadioGroup>
                </FormControl>
              </p>
            </Col>

            {/* phone number*/}
            {
              formData?.collectPhoneNumber ? 

              <Col xs="12" sm="12" md={6} lg={6} className="mt-3" > 
                <div className='bulk-pay-name' >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="phoneNumber" className="f-w-label"> Phone Number </Label>
                    <TextField
                      fullWidth
                      // error = {phoneNumberError} 
                      id='customLink'
                      placeholder='eg. 0202538033'
                      onChange={(e)=>setFormData({...formData, ...{"phoneNumber": e.target.value}})}                     
                      />
                  </Box>
                </div>
              </Col>
              : ""
            }

            {/* amount */}
            {
              formData?.collectFixAmount ? 
              <Col xs="12" sm="12" md={6} lg={6} className="mt-3" > 
                <div className='bulk-pay-name' >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="amount" className="f-w-label"> Amount </Label>
                    <TextField
                      fullWidth
                      type="number"
                      inputProps={{ min: 0, step: 0.01 }}
                      // error = {phoneNumberError} 
                      id='amount'
                      placeholder='eg. 2.00'
                      onChange={(e)=>setFormData({...formData, ...{"amount": e.target.value}})}                     
                      />
                  </Box>
                </div>
              </Col>
              : ""
            }

            {/* Additional Fields (optional) */}
            { 
              show ?
              <>
              <Row>
                <Col xs="12" sm="12" md={12} lg={12} className="mt-2 d-flex" > 
                <h6 style={{ marginRight: '4px'}} > Additional </h6>{" "}(optional) 
                </Col>
              </Row>
              {/* set expiration date */}
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
                <div className='bulk-pay-name' width='100%' >
                  <Box
                    component="form"
                    fullWidth
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="expirationPeriod" className="f-w-label" xs="12" sm="12" md="12" lg="12"> Set expiration period </Label>
                      {/* <TextField
                      fullWidth
                      error = {expirationPeriodError} 
                      id='expirationPeriod'
                      value={expirationPeriod}
                      onChange={(e) => {(setExpirationPeriod(e.target.value)); (setExpirationPeriodError(false))}}
                      label="expirationPeriod"                      
                      /> */}
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        sx={{ width: 720 }}
                        id="expirationPeriod"
                        inputFormat="dd/MM/yyyy hh:mm:ss"
                        value={dateTo}
                        onChange={handleChangeTo}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      </LocalizationProvider>
                  </Box>
                </div>
              </Col>
              {/* custom payment link */}
              <Col xs="12" sm="12" md={6} lg={6} className="mt-3" > 
                <div className='bulk-pay-name' >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="customLink" className="f-w-label"> Custom Payment Link </Label>
                    <TextField
                      fullWidth
                      // error = {customLinkError} 
                      id='customLink'
                      placeholder='eg. myPage'
                      onChange={(e)=>setFormData({...formData, ...{"customLink": e.target.value}})}
                      // value={amount}
                      // onChange={(e) => {(setCustomLink(e.target.value)); (setCustomLinkError(false))}}
                      // label="description"                      
                      />
                  </Box>
                </div>
              </Col>
              {/* success message */}
              <Col xs="12" sm="12" md={6} lg={6} className="mt-3" > 
              <div className='bulk-pay-name' >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="successMessage" className="f-w-label"> Success Message </Label>
                  <TextField
                    fullWidth
                    // error = {successMessageError} 
                    id='successMessage'
                    onChange={(e)=>setFormData({...formData, ...{"successMessage": e.target.value}})}
                    // value={amount}
                    // onChange={(e) => {(setSuccessMessage(e.target.value)); (setSuccessMessageError(false))}}
                    // label="description"                      
                    />
                </Box>
              </div>
              </Col>
              {/* split payment */}
              <Col xs="12" sm="12" md={6} lg={6} className="mt-3" > 
              <div className='bulk-pay-name' >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="splitPayment" className="f-w-label"> Split Payment </Label>
                  <TextField
                    fullWidth
                    // error = {splitPaymentError} 
                    id='splitPayment'
                    onChange={(e)=>setFormData({...formData, ...{"splitPayment": e.target.value}})}
                    // value={amount}
                    // onChange={(e) => {(setSplitPayment(e.target.value)); (setSplitPaymentError(false))}}
                    // label="description"                      
                    />
                </Box>
              </div>
              </Col>
              {/* redirect url */}
              <Col xs="12" sm="12" md={12} lg={12} className="mt-3" > 
                <div className='bulk-pay-name' >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="redirectUrl" className="f-w-label"> Redirect URL </Label>
                    <TextField
                      fullWidth
                      // error = {redirectUrlError} 
                      placeholder='eg. wingipay.com/buy'
                      id='redirectUrl'
                      onChange={(e)=>setFormData({...formData, ...{"redirectUrl": e.target.value}})}
                      // value={amount}
                      // onChange={(e) => {(setRedirectUrl(e.target.value)); (setRedirectUrlError(false))}}
                      // label="description"                      
                      />
                  </Box>
                </div>
              </Col>

            {/* email */}
            {
              formData?.collectFixAmount ? 
              <Col xs="12" sm="12" md={12} lg={12} className="mt-3" > 
                <div className='bulk-pay-name' >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="email" className="f-w-label"> Email </Label>
                    <TextField
                      fullWidth
                      // error = {phoneNumberError} 
                      id='email'
                      placeholder='eg. test@gmail.com'
                      onChange={(e)=>setFormData({...formData, ...{"email": e.target.value}})}                     
                      />
                  </Box>
                </div>
              </Col>
              : ""
            }
              {/* Custom Field */}
              <Col xs="12" sm="12" md={12} lg={12} className="mt-3" >
                {/*  */}
                <Label for="customField" className="f-w-label"> Custom Field(s) </Label>
                <CreatableSelect
                  isMulti
                  placeholder="Type to create custom field(s)"
                  // onChange={handleChange}
                  onChange={(e)=>handleInputChange(e)}
                  options={[]}
                />
              </Col>

            </>
            : "" 
            }

          </Row>
          <p style={{ textAlign: 'center' }} className='mt-4' >
            { 
              show ? <a href='#' onClick={ (e)=>setShow(false) }> Show less </a> :
              <a href='#' onClick={ (e)=>setShow(true) }> Show more </a>
            }
          </p>
          
          
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
          <CModalTitle> Edit Payment Link </CModalTitle>
        </CModalHeader>
        <CModalBody> 
          {/* <Checkbox {...label} /> */}
          <Row style={{ marginRight: '1px' }}>
            {/* name for payment link */}
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

            <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >
              {/*  */}
              
              {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}

            </Col>
            {/* collect fixed amount */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-2" >
              {/*  */}
              <FormGroup>
                {/* <FormControlLabel className="f-w-label" control={<Checkbox defaultChecked/>}  */}
                <FormControlLabel className="f-w-label" control={<Checkbox  defaultChecked={editFormData?.is_fixed || false }/>} label="I want to collect a fix amount on this page." 
                  onClick={(e)=>setEditFormData({...editFormData, ...{"is_fixed": e.target.checked }})} />
              </FormGroup>
            </Col>
            {/* collect phone */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-0" >
              {/*  */}
              <FormGroup>
                <FormControlLabel className="f-w-label" control={<Checkbox defaultChecked={editFormData?.phone_number || false } />} label="I want to collect phone number." 
                  onClick={(e)=>setEditFormData({...editFormData, ...{"phone_number": e.target.checked }})} />
              </FormGroup>
            </Col>
            {/* set status to active */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-0" >
              {/*  */}
              {/* <FormGroup> */}
                <FormControlLabel className="f-w-label" control={<Checkbox defaultChecked={editFormData?.setStatusToActive || false } />} label="I want to set the status to be active."
                  onClick={(e)=>setEditFormData({...editFormData, ...{"setStatusToActive": e.target.checked }})} />
              {/* </FormGroup> */}
            </Col>
            {/* recurring */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-2" >
              {/*  */}
              <p>                
                <FormControl>
                    <p className="f-w-label mb-0" > 
                      <Row className='mb-1' style={{ marginLeft: '0px'}}> Recurring Payment </Row >
                      Select if the link is a recurring payment link or one time payment link.
                    </p>
                  <FormLabel id="demo-radio-buttons-group-label"> </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue= { editFormData?.is_recurring === true ? "recurring" : "oneTime"}
                    name="radio-buttons-group"
                    className='d-flex'

                  > 
                  {/* recurring onetime action */}
                  <Row> 
                    <Col md={6} lg={6}>
                      <FormControlLabel className='mt-0' value="oneTime" control={<Radio />} label="One time" onClick={(e)=>setEditFormData({...editFormData, ...{"oneTime": e.target.checked},  ...{"recurring": false} }) }  />
                    </Col>
                    <Col md={6} lg={6}>
                      <FormControlLabel className='mt-0' value="recurring" control={<Radio />} label="Recurring" onClick={(e)=>setEditFormData({...editFormData, ...{"recurring": e.target.checked}, ...{"oneTime": false} })} md={6} lg={6} />
                    </Col>
                  </Row> 
                  </RadioGroup>
                </FormControl>
              </p>
            </Col>

            {/* phone number*/}
            {
              editFormData?.phone_number ? 

              <Col xs="12" sm="12" md={6} lg={6} className="mt-3" > 
                <div className='bulk-pay-name' >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="phoneNumber" className="f-w-label"> Phone Number </Label>
                    <TextField
                      fullWidth
                      // error = {phoneNumberError} 
                      value={editFormData?.phone_number} 
                      id='customLink'
                      placeholder='eg. 0202538033'
                      onChange={(e)=>setEditFormData({...editFormData, ...{"phone_number": e.target.value}})}                     
                      />
                  </Box>
                </div>
              </Col>
              : ""
            }

            {/* amount */}
            {
              editFormData?.is_fixed ? 
              <Col xs="12" sm="12" md={6} lg={6} className="mt-3" > 
                <div className='bulk-pay-name' >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="amount" className="f-w-label"> Amount </Label>
                    <TextField
                      fullWidth
                      type="number"
                      inputProps={{ min: 0, step: 0.01 }}
                      // error = {phoneNumberError} 
                      value={editFormData?.fixed_amount}
                      id='amount'
                      placeholder='eg. 2.00'
                      onChange={(e)=>setEditFormData({...editFormData, ...{"fixed_amount": e.target.value}})}                     
                      />
                  </Box>
                </div>
              </Col>
              : ""
            }

            {/* Additional Fields (optional) */}
            <Row>
              <Col xs="12" sm="12" md={12} lg={12} className="mt-2 d-flex" > 
              <h6 style={{ marginRight: '4px'}} > Additional </h6>{" "}(optional) 
              </Col>
            </Row>
            {/* set expiration date */}
            <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name' width='100%' >
                <Box
                  component="form"
                  fullWidth
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="expirationPeriod" className="f-w-label" xs="12" sm="12" md="12" lg="12"> Set expiration period </Label>
                    {/* <TextField
                    fullWidth
                    error = {expirationPeriodError} 
                    id='expirationPeriod'
                    value={expirationPeriod}
                    onChange={(e) => {(setExpirationPeriod(e.target.value)); (setExpirationPeriodError(false))}}
                    label="expirationPeriod"                      
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      sx={{ width: 720 }}
                      id="expirationPeriod"
                      inputFormat="dd/MM/yyyy hh:mm:ss"
                      // value={dateTo}
                      value={editFormData?.expiration_date}
                      onChange={handleEditChangeTo}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                </Box>
              </div>
            </Col>
            {/* custom payment link */}
            <Col xs="12" sm="12" md={6} lg={6} className="mt-3" > 
              <div className='bulk-pay-name' >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="customLink" className="f-w-label"> Custom Payment Link </Label>
                  <TextField
                    fullWidth
                    // error = {customLinkError} 
                    value={editFormData?.custom_link}
                    id='customLink'
                    placeholder='eg. myPage'
                    onChange={(e)=>setEditFormData({...editFormData, ...{"custom_link": e.target.value}})}
                    // value={amount}
                    // onChange={(e) => {(setCustomLink(e.target.value)); (setCustomLinkError(false))}}
                    // label="description"                      
                    />
                </Box>
              </div>
            </Col>
            {/* success message */}
            <Col xs="12" sm="12" md={6} lg={6} className="mt-3" > 
            <div className='bulk-pay-name' >
              <Box 
                component="form"
                noValidate
                autoComplete="off"
                >
                <Label for="successMessage" className="f-w-label"> Success Message </Label>
                <TextField
                  fullWidth
                  // error = {successMessageError} 
                  value={editFormData?.custom_success_message}
                  id='successMessage'
                  onChange={(e)=>setEditFormData({...editFormData, ...{"custom_success_message": e.target.value}})}
                  // value={amount}
                  // onChange={(e) => {(setSuccessMessage(e.target.value)); (setSuccessMessageError(false))}}
                  // label="description"                      
                  />
              </Box>
            </div>
            </Col>
            {/* split payment */}
            <Col xs="12" sm="12" md={6} lg={6} className="mt-3" > 
            <div className='bulk-pay-name' >
              <Box 
                component="form"
                noValidate
                autoComplete="off"
                >
                <Label for="splitPayment" className="f-w-label"> Split Payment </Label>
                <TextField
                  fullWidth
                  // error = {splitPaymentError} 
                  id='splitPayment'
                  value={editFormData?.split_payment}
                  onChange={(e)=>setEditFormData({...editFormData, ...{"split_payment": e.target.value}})}
                  // value={amount}
                  // onChange={(e) => {(setSplitPayment(e.target.value)); (setSplitPaymentError(false))}}
                  // label="description"                      
                  />
              </Box>
            </div>
            </Col>
            {/* redirect url */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-3" > 
              <div className='bulk-pay-name' >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="redirectUrl" className="f-w-label"> Redirect URL </Label>
                  <TextField
                    fullWidth
                    // error = {redirectUrlError} 
                    placeholder='eg. wingipay.com/buy'
                    id='redirectUrl'
                    value={editFormData?.redirect_url}
                    onChange={(e)=>setEditFormData({...editFormData, ...{"redirect_url": e.target.value}})}
                    // value={amount}
                    // onChange={(e) => {(setRedirectUrl(e.target.value)); (setRedirectUrlError(false))}}
                    // label="description"                      
                    />
                </Box>
              </div>
            </Col>

            {/* email */}
            {
              editFormData?.collectFixAmount ? 
              <Col xs="12" sm="12" md={12} lg={12} className="mt-3" > 
                <div className='bulk-pay-name' >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="email" className="f-w-label"> Email </Label>
                    <TextField
                      fullWidth
                      value={editFormData?.email}
                      // error = {phoneNumberError} 
                      id='email'
                      placeholder='eg. test@gmail.com'
                      onChange={(e)=>setEditFormData({...editFormData, ...{"email": e.target.value}})}                     
                      />
                  </Box>
                </div>
              </Col>
              : ""
            }
            {/* Custom Field */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-3" >
              {/*  */}
              <Label for="customField" className="f-w-label"> Custom Field(s) </Label>
              <CreatableSelect
                isMulti
                defaultValue={editFormData?.additional_fields?.address}
                placeholder="Type to create custom field(s)"
                // onChange={handleChange}
                onChange={(e)=>handleInputEditChange(e)}
                // options={editFormData?.additional_fields?.address}
              />
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
          <CButton color="" className='text-white bg-text-wp' onClick={(e) => editPaymentLink(e)}> 
            Update
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default PaymentLinkDataTables;