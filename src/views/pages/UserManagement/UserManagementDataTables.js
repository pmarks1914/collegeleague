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
import {Checkbox, FormGroup, FormLabel, Radio, RadioGroup, TextareaAutosize, TextField} from '@mui/material';
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
import { userGetData } from '../Data/PageData';
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
import './user.css'

let currentUser = JSON.parse(localStorage.getItem("userDataStore")); 
let userGetInfoData = userGetData();
let userGetInfo = []
userGetInfoData?.userGet?.then(value => { (userGetInfo = value) });

let permissionList = [];

const UserManagementDataTables = (props) => {
  const [loader, setLoader] = useState('<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>')
  const [tableData, setTableData] = useState([]);
  const [noData, setNoData] = useState("")
  const [monitorState, setMonitorState] = useState(1);
  const [dropValue, setDropValue] = useState(0);
  const [roleData , setRoleData] = useState({})

  const [formInviteData, setFormInviteData] = useState({})

  // handle state transition for delete action to update data
  const [actionDel, setActionDel] = useState(0)

  // date time
  const [dateTo, setDateTo] = useState(new Date('2014-08-18T21:11:54'));
  const [dateFrom, setDateFrom] = useState(new Date('2014-08-18T21:11:54')); 
  const [value, setValue] = useState({});

  // modals
  // create role and add permission
  const [modal1, setModal1] = useState(false)
  // view single userGetInfo 
  const [modal2, setModal2] = useState(false)
  // invite user modal state
  const [modal3, setModal3] = useState(false)

  // set Show form fields
  const [show, setShow] = useState(false)

  const [viewData, setViewData] = useState({})
  const [openDateRange, setOpenDateRange] = useState(true);
  const [dateRange, setDateRange] = useState({});
  const [description, setDescription] = useState("");
  const [userGetInfoStatusInModal, setuserGetInfoStatusInModal] = useState("");
  // startDate: Date.parse("2022-01-13"), endDate: Date.now()
  
  const [userGetInfoStatus, setuserGetInfoStatus] = useState("");
  const [userGetInfoId, setuserGetInfoId] = useState("");
  const [referanceId, setReferanceId] = useState("");
  const [userGetInfoExport, setuserGetInfoExport] = useState({});
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
      setuserGetInfoStatus("")

      setLoader('<a></a>')
    }
    else if (userGetInfo?.length > 0 && monitorState === 1) {
      // setMonitorState(2)
      // console.log("info ", userGetInfo )
      datatablaScript(userGetInfo);

      setLoader('<a></a>')
    }
    else if(dateRange && monitorState === 2){
      performFilter("filterByDate", "none")
      setuserGetInfoStatus("")
      // setMonitorState(3)
    }
    else{
        datatablaScript([])
        setLoader('<a></a>')
        // setTimeout(()=>{
        //     setNoData("dd")
        // }, 200)
    }
    
    // console.log("props ", dateRange, userGetInfo, userGetInfoStatus, monitorState)


    let data = '';
    let config_roles = {
        method: 'get',                    
        url: process.env.REACT_APP_BASE_API + "/roles/" + currentUser?.account + "/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser?.access
        },
        data: data
    };
    axios(config_roles).then(response => {
        // console.log("data 1 ==", response?.data);
        if (response?.data?.status === true) {
            // 
            // console.log("g>>>", response?.data?.data)
            setRoleData(response?.data)

        }
        

    }).catch(function (error) {
        // 
        if(error){
            // Swal.fire({
            //     title: 'Application Error',
            //     title: 'Oops',
            //     html: "<div class='pb-0 pt-0'> Try again later </div>",
            //     icon: 'warning',
            //     showCancelButton: false,
            //     showConfirmButton: false,
            //     allowOutsideClick: false,
            //     // cancelButtonColor: '#d33',
            //     // timer: 4000
            // }).then((result) => {
            //     // 
            // })
        }
        if (error.response) {
            // // console.log("==");
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
    });
  }, [dateRange, userGetInfo, actionDel])

  // perform filter 
  function datatablaScript(tdata) {
    let printCounter = 0;

    setTableData(tdata);
    $('#myTable').DataTable().destroy();
    setTimeout(() => {   
       
      $('#myTable').DataTable(
        {
          // data: userGetInfo,
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
                let sheet = anytype.xl.worksheets['wingipayuserGetInfo.xml'];
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
                let sheet = anytype.xl.worksheets['wingipayuserGetInfo.pdf'];
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
    // userGetInfo = posts;
    try {
      // setTableData(posts);
      let newFilterData = userGetInfo.filter((post) => { return moment(post?.created).format('LLLL') <= moment(dateFrom).format('LLLL') })
      // // console.log("post tableData ", userGetInfo);
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

    w.document.write($('.contentForuserGetInfoPrint').html());
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
  const handleChangeExport = (valSelected) => {
    setuserGetInfoExport(valSelected);
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
    {value: "All userGetInfo", label: "All Keys" }
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
  const optionRoles = Object.keys( roleData?.all_roles || []).map((post, id) => {
    // console.log("optionRoles ", roleData?.all_roles)
    return {
      "value": roleData?.all_roles[id].role_id,
      "label": roleData?.all_roles[id]?.name?.toUpperCase()
  }});
  function performFilter(type, status){

    // // console.log("by status ", userGetInfoStatus, "type", type )
    // perform filter by date range
    if(type === "filterByDate"){
      // 
      let dataFilter = userGetInfo.filter((post, id) => {return ( moment(post?.created).format('DD/MM/yyyy') >= moment(dateRange[0]).format('DD/MM/yyyy') && moment(post?.created).format('DD/MM/yyyy') <= moment(dateRange[1]).format('DD/MM/yyyy') )});

      datatablaScript( dataFilter );

      setDateFilterData( dataFilter );
    }
    else if(type === "filterByStatus"){
      // 
      // // console.log("by status",status, monitorState, apikeyDetails )
      if(status === "All userGetInfo" && monitorState === 1){
        datatablaScript(userGetInfo);
      }
      else if(status === "All userGetInfo" && monitorState === 2){
        datatablaScript(dateFilterData);
      }
      else if(status === "test" && monitorState === 1){
        datatablaScript( userGetInfo?.filter((post, id) => {return ( post?.is_live === false )}) );
      }
      else if(status === "live" && monitorState === 1){
        datatablaScript( userGetInfo?.filter((post, id) => {return ( post?.is_live === true )}) );
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
    setuserGetInfoId("")
    datatablaScript(userGetInfo)
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
    setEditFormData({...editFormData, ...{"dateTo": newValue}})
  };
  
  const handleEditChangeTo = (newValue) => {
    // setDateTo(newValue); 
    setEditFormData({...editFormData, ...{"expiration_date": newValue}}) 
  };
  function sendAction(e, type) {
    e.preventDefault();
    // console.log("setFormData ", formData)
    let data = {};

    let config = {};
    if(type === "invite"){
      //  
      data = JSON.stringify({ 
      // collectFixAmount: true 
      "invitee_email": formInviteData?.email,
      "invitee_account": "",
      "role_id": formInviteData?.role?.value,
      "account_id": currentUser?.account
    });
      config = {
      method: 'post',
      url: process.env.REACT_APP_BASE_API + "/team/member/invite/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser?.access
      },
      data: data
    };
    }
    axios(config).then(response => {
      // console.log(response.data);
      if (response?.data?.status === true) { 

        let userGetInfoDataNew = userGetData();
        let userGetInfoNew = []
        userGetInfoDataNew?.userGet?.then(value => { (userGetInfoNew = value) });

        Swal.fire({
          title: 'Invite sent',
          html: response.data.message.toString(),
          // icon: 'success',
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#FF7643',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            userGetInfo = userGetInfoNew
            setModal1(false);
            setModal2(false);
            setModal3(false);
          // window.location.reload()
          // }
        });
        // setTimeout(() => {
        //   let infoData = userGetData();
        //   let infoArray = [];
        //   infoData?.userGet?.then(value => { 
        //     infoArray = value;
        //     datatablaScript(value);
        //     apikeyDetails = value;
        //     userGetInfo = value

        //   }); 
        //   }, 1000);
      }
      else {
        Swal.fire({
          title: 'Failed!',
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
  function edituserGet(e) {
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

        let userGetInfoDataNew = userGetData();
        let userGetInfoNew = []
        userGetInfoDataNew?.userGet?.then(value => { (userGetInfoNew = value) });

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
            userGetInfo = userGetInfoNew
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
  function deleteuserGet(e) {
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
        let userGetInfoDataNew = userGetData();
        let userGetInfoNew = []
        userGetInfoDataNew?.userGet?.then(value => { (userGetInfoNew = value) });
        // console.log("out ", userGetInfoNew)
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
            // console.log("in ", userGetInfoNew)
            userGetInfo = userGetInfoNew
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
  // roleData?.all_roles?.permissions
  function managePermissionList(permissionData, checkedStatus){
    // console.log(permissionData)
    if(checkedStatus){
      // add new permission to list 
      permissionList.push(permissionData.id)
    }
    else{  
      // console.log(permissionList) 
      // filter to remove permission from list
      let array4 = permissionList?.filter((item, pos) => permissionList?.indexOf(permissionData.id) !== pos) 
      permissionList = array4
      // console.log(permissionList)
    }
  }
  return (

    <div>

      <Row>
        <Col xs="12" sm="12" md={3} lg={3} >
          {/* create */}
          <Box sx={{ minWidth: 140 }}>
            <FormControl fullWidth style={{marginTop: "8px"}}>
              <Button
                  type="submit"
                  fullWidth
                  className='bg-text-wp-action'
                  style={{ height: '36px' }}
                  onClick={ (e) => setModal1(true)}
              >
                USER ROLES MANAGEMENT
              </Button>
            </FormControl>
          </Box>
        </Col>
        <Col xs="12" sm="12" md={3} lg={3} >
          {/* create */}
          <Box>
            <FormControl fullWidth style={{marginTop: "8px"}}>
              <Button
                  type="submit"
                  fullWidth
                  className='bg-text-wp-action'
                  style={{ height: '36px' }}
                  onClick={ (e) => setModal3(true)}
              >
                  INVITE A TEAM MEMBER
              </Button>
            </FormControl>
          </Box>
        </Col>
        <Col xs="12" sm="12" md={3} lg={3} >
          {/* userGetInfo types */}
          {/* <Box sx={{ minWidth: 160 }}>
            <FormControl fullWidth style={{marginTop: "0px"}}>
              <Label for="userGetInfoStatus" className="label-dc"> </Label>
              <Select
                placeholder={"Select status"}
                options={optionsStatus}
                id="userGetInfoStatus"
                className='other-input-select d-filters'
                onChange={(e) => handleChangeuserGetInfoStatus(e.value)}
              />
          
            </FormControl>
          </Box> */}
        </Col>
        {/* Date range */}
        <Col xs="12" sm="12" md={4} lg={4} >
          {/* date range */}
          {/* <FormControl fullWidth>
            <Box
              id='dateRange-control'
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
                onChange={(range) => setDateRange(range || {})}
                id="datePicker-0"
              />
            </Box>
          </FormControl> */}
        </Col>
        <Col xs="12" sm="12" md={2} lg={2} >
          {/* export */}
          {/* <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Label for="userGetInfoExport" className="label-dc"> </Label>
              <Select
                placeholder={"Select export"}
                options={optionsExport}
                id="userGetInfoExport"
                className='other-input-select d-filters mt-0'
                onChange={(e) => handleChangeExport(e.value)}
              />
            </FormControl>
          </Box> */}
        </Col>
      </Row>
      
      {/* {dateTo.toString()}{" rrr "}{dateFrom.toString()} */}
      <br /><br />
      <table id="myTable" className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Invited By</th>
            <th>Role Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            tableData?.map((post, id) =>
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{post?.lastname}</td>
                <td>{post?.email}</td>
                <td>{post?.invited_by }</td> 
                <td>{post?.role_name }</td> 
                {/* <td>{moment(post?.expiration_date || Date() ).format('LLLL') }</td>             */}
                <td>
                  <CBadge className='bg-text-wp' onClick={() => { setEditFormData(post) }} > Edit </CBadge> 
                  {/* <CBadge color='black' style={{marginRight: "5px"}} onClick={(e) => { setEditFormData(post); deleteuserGet(e) }} > Delete </CBadge>  */}
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
        <CModalHeader> <CModalTitle> Roles </CModalTitle> </CModalHeader>
        <CModalBody> 
          {/* <Checkbox {...label} /> */}
          <Row style={{ marginRight: '1px' }}>
            {/* name for user management  */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-2" > 
            <div className='bulk-pay-name' >
              <Box 
                component="form"
                noValidate
                autoComplete="off"
                >
                <Label for="name" className="f-w-label"> Name </Label>
                <TextField
                  fullWidth
                  // error = {pageNameError} 
                  id='name'
                  // value={pageName} 
                  onChange={(e)=>setFormData({...formData, ...{"name": e.target.value}})}
                  // onChange={(e) => {(setPageName(e.target.value)); (setPageNameError(false))}}
                  // label="description"                      
                  />
              </Box>
            </div>
            </Col>
            {/* description */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-3 mb-3" > 
            <div className='bulk-pay-name' >
              <Box 
                component="form"
                noValidate
                autoComplete="off"
                >
                <Label for="description" className="f-w-label mb-1"> Description </Label>
                <TextareaAutosize
                  style={{width: '100%' }}
                  minRows={3}
                  className="mt-0"
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
            {
              [ 
                // console.log("roleData permission_by_category", roleData),
              roleData?.permission_by_category?.map((post, id) =>  
              <Col xs="12" sm="12" md={12} lg={12} className="mt-0 " key={id}>
                <p>{ post?.category?.toUpperCase() }</p>
                <div className='v-flow'>
                {
                  post?.permissions?.map((post2, id_1) =>  
                  <Col xs="12" sm="12" md={12} lg={12} className="mt-0" key={id_1}>
                    <FormGroup style={{ fontSize: "0.8rem !important" }} className="perm" >
                      <FormControlLabel className="f-w-label" control={<Checkbox  defaultChecked={editFormData?.is_fixed || false }/>} label={post2.name} 
                        onClick={(e)=>{ (setEditFormData({...editFormData, ...{"is_fixed": e.target.checked }})) }} onChange={ (e)=> managePermissionList(post2, e.target.checked) }/>
                    </FormGroup>
                  </Col>)
                }
                </div>
              </Col>)
              ]
            }
            {/* <div className='v-flow'>
              <Col xs="12" sm="12" md={12} lg={12} className="mt-2" >
                <FormGroup>
                  <FormControlLabel className="f-w-label" control={<Checkbox  defaultChecked={editFormData?.is_fixed || false }/>} label="I want to collect a fix amount on this page." 
                    onClick={(e)=>setEditFormData({...editFormData, ...{"is_fixed": e.target.checked }})} />
                </FormGroup>
              </Col>
            </div> */}
          </Row>
          
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={(e) => setModal1(false)}> 
            Cancel
          </CButton>
          <CButton color="" className='text-white bg-text-wp' onClick={(e) => sendAction(e)}> 
            Create
          </CButton>
        </CModalFooter>
      </CModal>

      {/* invite modal for  */}
      <CModal visible={modal3} alignment="center" onClose={() => setModal3(false)}>
        <CModalHeader> <CModalTitle> Invite </CModalTitle> </CModalHeader>
        <CModalBody> 
          {/* <Checkbox {...label} /> */}
          <Row style={{ marginRight: '1px' }}>
            {/* description */}
            <Col xs="12" sm="12" md={12} lg={12} className="mt-3" > 
              <div className='bulk-pay-name' >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="email" className="f-w-label mb-2"> Email </Label>
                  <TextField
                    style={{width: '100%' }}
                    className="mt-0"
                    // error = {emailError} 
                    id='email'
                    onChange={(e)=>setFormInviteData({...formInviteData, ...{"email": e.target.value}})}
                    // value={amount}
                    // onChange={(e) => {(setDescription(e.target.value)); (setDescriptionError(false))}}
                    // label="description"                      
                    />
                </Box>
              </div>
            </Col>
            <Col xs="12" sm="12" md={12} lg={12} className="mt-3" >
              {/*  */}
              <Label for="customField" className="f-w-label mb-0"> Roles </Label>
              <Select
                // isMulti
                // defaultValue={editFormData?.additional_fields?.address}
                className='mt-1'
                placeholder="Select a role for the user..."
                // onChange={handleChange}
                onChange={(e)=>setFormInviteData({...formInviteData, ...{"role": e}})}
                options={optionRoles}
              />
            </Col>
          </Row>
          
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={(e) => setModal3(false)}> 
            Cancel
          </CButton>
          <CButton color="" className='text-white bg-text-wp' onClick={(e) => sendAction(e, "invite")}> 
            Invite
          </CButton>
        </CModalFooter>
      </CModal>


      {/* modal for edit item*/}
      <CModal visible={modal2} scrollable backdrop="static" onClose={() => setModal2(false)}>
        <CModalHeader>
          <CModalTitle> Edit Payment Link </CModalTitle>
        </CModalHeader>
        <CModalBody> 
          {/* <Checkbox {...label} /> */}
          <Row style={{ marginRight: '1px' }}>
            {/* name for user management  */}
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
                  onChange={(e)=>setEditFormData({...editFormData, ...{"payLinkName": e.target.value}})}
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
                      Select if the link is a recurring user management  or one time user management .
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
            {/* custom user management  */}
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
          <CButton color="" className='text-white bg-text-wp' onClick={(e) => edituserGet(e)}> 
            Create
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default UserManagementDataTables;