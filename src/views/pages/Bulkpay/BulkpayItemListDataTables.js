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
  cilFile,
  cilLockLocked,
  // cilSettings,
  cilFilter, cilCheckCircle, cilSettings, cilCalendar, cilSearch, cilPlus, cilKeyboard,
} from '@coreui/icons'
import {Helmet} from "react-helmet";
import Select from 'react-select';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from '@chakra-ui/react';
import 'antd/dist/antd.css';
import { message, Upload } from 'antd';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { getbanksandtelcos, getbanksandtelcosV2, bulkPayItemData } from "../Data/PageData";


const userData = JSON.parse(localStorage.getItem('userDataStore'));

let currentUser = JSON.parse(localStorage.getItem("userDataStore")); 
let bulkPayInfoData = bulkPayItemData(window.location.pathname.split("/")[3]);
let bulkPayInfo = []
bulkPayInfoData?.bulkPayItems?.then(value => { (bulkPayInfo = value?.batch_items) });
let paymentBatchData = {}
bulkPayInfoData?.bulkPayItems?.then(value => { (paymentBatchData = value?.batch) });


let banktelcosList = getbanksandtelcos();
let banktelcosListInfo = []
banktelcosList.list.then(value => banktelcosListInfo = value)
// all banks and telcos 
let banktelcosListAll = getbanksandtelcosV2();
let banktelcosListInfoAll = []
banktelcosListAll.list.then(value => banktelcosListInfoAll = value)

// console.log("getbanksandtelcos ", banktelcosListInfoAll )
// console.log("bulkPayItemData ", bulkPayItemData(window.location.pathname.split("/")[3]) )
// console.log("bulkPayItemData ", bulkPayItemData("97273dc9-388f-4c8f-a054-8ac92e594656") )

const BulkpayItemListDataTables = (apikeyDetails) => {
  const [loader, setLoader] = useState('<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>')
  const [tableData, setTableData] = useState([]);
  const [noData, setNoData] = useState("")
  const [monitorState, setMonitorState] = useState(1);
  const [dropValue, setDropValue] = useState(0);

  const [batchTotal, setBatchTotal] = useState(0)

  // date time
  const [dateTo, setDateTo] = useState(new Date('2014-08-18T21:11:54'));
  const [dateFrom, setDateFrom] = useState(new Date('2014-08-18T21:11:54')); 
  const [value, setValue] = useState([null, null]);

  // modals
  // filer bulkPayInfo
  const [modal1, setModal1] = useState(false)
  // view single bulkPayInfo 
  const [modal2, setModal2] = useState(false)
  // edit batch modal
  const [modal3, setModal3] = useState(false)
  // edit re-upload batch modal
  const [modal4, setModal4] = useState(false)

  const [viewData, setViewData] = useState({})
  const [openDateRange, setOpenDateRange] = useState(true);
  const [dateRange, setDateRange] = useState({});
  const [currentPostItemSelected, setCurrentPostItemSelected] = useState({});
  const [paymentMethodInfoStatusInModal, setPaymentMethodInfoStatusInModal] = useState("");
  // startDate: Date.parse("2022-01-13"), endDate: Date.now()
  

  const [bulkPayInfoStatus, setbulkPayInfoStatus] = useState("");
  const [bulkPayInfoId, setbulkPayInfoId] = useState("");
  const [referanceId, setReferanceId] = useState("");
  const [bulkPayInfoExport, setbulkPayInfoExport] = useState({});
  const [dateFilterData, setDateFilterData] = useState({});
  const [amountLess, setAmountLess] = useState(0.00);
  const [amountGreat, setAmountGreat] = useState(0.00);
  const [amountEqual, setAmountEqual] = useState(0.00);


  // upload excel file
  const [excelFileList, setExcelFileList] = useState([]);
  const [uploading1, setUploading1] = useState(false);

  // STATES FOR TRANSFER TO BANK
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [bankDropdownInModal, setBankDropdownInModal] = useState({});
  const [batchName, setBatchName] = useState("");

  // STATES FOR TRANSFER TO TELCOS
  const [telcoEmail, setTelcoEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [networkCode, setNetworkCode] = useState("");
  const [momoAccountName, setMomoAccountName] = useState("");
  const [telcoAmount, setTelcoAmount] = useState("");
  const [telcoNote, setTelcoNote] = useState("");
  const [networkName, setNetworkName] = useState({});
  const [singleBatchName, setSingleBatchName] = useState("");
  
  // SET ERROR STATES// STATES FOR TRANSFER TO BANK
  const [emailError, setEmailError] = useState(false);
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [bankCodeError, setBankCodeError] = useState(false);
  const [accountNameError, setAccountNameError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [noteError, setNoteError] = useState(false);
  const [bankDropdownInModalError, setBankDropdownInModalError] = useState(false);
  const [batchNameError, setBatchNameError] = useState(false);
  const [paymentMethodInfoStatusInModalError, setPaymentMethodInfoStatusInModalError] = useState(false);


  // STATES FOR TRANSFER TO TELCOS
  const [telcoEmailError, setTelcoEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [networkCodeError, setNetworkCodeError] = useState(false);
  const [momoAccountNameError, setMomoAccountNameError] = useState(false);
  const [telcoAmountError, setTelcoAmountError] = useState(false);
  const [telcoNoteError, setTelcoNoteError] = useState(false);
  const [networkNameError, setNetworkNameError] = useState(false);
  const [singleBatchNameError, setSingleBatchNameError] = useState(false);



  const toggle = () => setOpenDateRange(!openDateRange);

  useEffect(() => {

    if(dateRange.length > 0 && monitorState === 1){
      setMonitorState(2)
      performFilter("filterByDate", "none")
      setbulkPayInfoStatus("")

      setLoader('<a></a>')
    }
    else if (bulkPayInfo?.length > 0 && monitorState === 1) {
      // setMonitorState(2)
      datatablaScript(bulkPayInfo);

      setLoader('<a></a>')
    }
    else if(dateRange && monitorState === 2){
      performFilter("filterByDate", "none")
      setbulkPayInfoStatus("")
      // setMonitorState(3)
    }
    else{
        datatablaScript([])
        setLoader('<a></a>')
        // setTimeout(()=>{
        //     setNoData("dd")
        // }, 200)
    }

    // if(bulkPayInfoStatus && monitorState === 2){
    //   performFilter("filterByStatus")
    // }

    
    // console.log("props ", dateRange, bulkPayInfo, bulkPayInfoStatus, monitorState)
    // console.log("props ", bulkPayInfo, paymentBatchData )

  }, [dateRange, bulkPayInfo])

  // perform filter 
  function datatablaScript(tdata) {
    let printCounter = 0;

    setTableData(tdata);
    $('#myTable').DataTable().destroy();
    setTimeout(() => {   
       
      $('#myTable').DataTable(
        {
          // data: bulkPayInfo,
          columnDefs: [
            { "width": "1px", "targets": 0 },
            // { "width": "2%", "targets": 2 },
            // { "width": "1%", "targets": 3 }
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
                let sheet = anytype.xl.worksheets['wingipaybulkPayInfo.xml'];
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
                let sheet = anytype.xl.worksheets['wingipaybulkPayInfo.pdf'];
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
    // bulkPayInfo = posts;
    try {
      // setTableData(posts);
      let newFilterData = bulkPayInfo.filter((post) => { return moment(post?.created).format('LLLL') <= moment(dateFrom).format('LLLL') })
      // // console.log("post tableData ", bulkPayInfo);
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

    w.document.write($('.contentForbulkPayInfoPrint').html());
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
  const handleChangebulkPayInfoStatus = (valSelected) => {
    setbulkPayInfoStatus(valSelected);
    performFilter("filterByStatus", valSelected)
  };
  const handleChangeInfoAccTypeInModal = (valSelected) => {
    setPaymentMethodInfoStatusInModal(valSelected);
    setPaymentMethodInfoStatusInModalError(false)
  };
  const handleChangeExport = (valSelected) => {
    setbulkPayInfoExport(valSelected);
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
    {value: "mobile", label: "MOBILE MONEY" },
    {value: "bank", label: "BANK" },
    {value: "All bulkPayInfo", label: "ALL BULK PAY" }
  ];
  const optionsAccTypeInModal = [
    // {value: "", label: "Se", icon: "", isDisabled: true },
    {value: "mobile", label: "MOBILE MONEY" },
    {value: "bank", label: "BANK" },
  ];
  
  const optionBankListAll = Object.keys(banktelcosListInfoAll?.services || []).map((post, id) => {
    return {
      "value": banktelcosListInfoAll?.services[id].BankSortCode,
      "label": banktelcosListInfoAll?.services[id].BankName,
      "method": banktelcosListInfoAll?.services[id].Payment_method
  }});
  
  const optionBankList = Object.keys(banktelcosListInfo?.bank_list || []).map((post, id) => {
    return {
      "value": banktelcosListInfo?.bank_list[id].BankSortCode,
      "label": banktelcosListInfo?.bank_list[id].BankName
  }});
  
  const optionMobileMoneyList = Object.keys(banktelcosListInfo?.telcos_list || []).map((post, id) => {
  return {
    "value": banktelcosListInfo?.telcos_list[id].BankSortCode,
    "label": banktelcosListInfo?.telcos_list[id].BankName
  }});

  const optionsExport = [
    // {value: "", label: "Se", icon: "", isDisabled: true },
    {value: "Export to excel", label: "Export to excel" },
    {value: "Export to csv", label: "Export to csv" }
  ];
  function performFilter(type, status){

    // // console.log("by status ", bulkPayInfoStatus, "type", type )
    // perform filter by date range
    if(type === "filterByDate"){
      // 
      let dataFilter = bulkPayInfo.filter((post, id) => {return ( moment(post?.created).format('DD/MM/yyyy') >= moment(dateRange[0]).format('DD/MM/yyyy') && moment(post?.created).format('DD/MM/yyyy') <= moment(dateRange[1]).format('DD/MM/yyyy') )});

      datatablaScript( dataFilter );

      setDateFilterData( dataFilter );
    }
    else if(type === "filterByStatus"){
      // 
      // // console.log("by status",status, monitorState, bulkPayDetails )
      if(status === "All bulkPayInfo" && monitorState === 1){
        datatablaScript(bulkPayInfo);
      }
      else if(status === "All bulkPayInfo" && monitorState === 2){
        datatablaScript(dateFilterData);
      }
      else if(status === "bank" && monitorState === 1){
        datatablaScript( bulkPayInfo?.filter((post, id) => {return ( post?.payment_method === "BANK" )}) );
      }
      else if(status === "mobile" && monitorState === 1){
        datatablaScript( bulkPayInfo?.filter((post, id) => {return ( post?.payment_method === "MOBILEMONEY" )}) );
      }
      else if(status === "bank" && monitorState === 2){
        datatablaScript( dateFilterData?.filter((post, id) => {return ( post?.payment_method === "BANK" )}) );
      }
      else if(status === "mobile" && monitorState === 2){
        datatablaScript( dateFilterData?.filter((post, id) => {return ( post?.payment_method === "MOBILEMONEY" )}) );
      }
    }
    
  }
  function resetFilter(e){
    e.preventDefault()
    setAmountEqual(0)
    setAmountGreat(0)
    setAmountLess(0)
    setReferanceId("")
    setbulkPayInfoId("")
    datatablaScript(bulkPayInfo)
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
  // genetrate excel template for both mobile money and bank accounts
  const getExcelTemplate = (type) => {
    // console.log(data);
    // e.preventDefault();
    let data = [];
    if( type === "bank" ){
      data = [
        {
          "account_number": "",
          "bank_code": "",
          "destination_bank_name": "",
          "account_holder_name": "",
          "amount": "",
          "email": "",
          "note": ""
        }
      ]
    }
    else{
      data = [
        {
          "account_number": "",
          "network_name": "",
          "network_code": "",
          "account_holder_name": "",
          "amount": "",
          "email": "",
          "note": ""
        }
      ]
    }
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "WPexport");
    /* generate XLSX file and send to client */
    if( type === "bank" ){
      // do for sheet two
      const ws2 = XLSX.utils.json_to_sheet(banktelcosListInfo?.bank_list);
      XLSX.utils.book_append_sheet(wb, ws2, "codeListBank");
      XLSX.writeFile(wb, "WPexportBank.xlsx");
    }
    else{
      // do for sheet two
      const ws2 = XLSX.utils.json_to_sheet(banktelcosListInfo?.telcos_list);
      XLSX.utils.book_append_sheet(wb, ws2, "codeListMobileMoney");
      XLSX.writeFile(wb, "WPexportMobileMoney.xlsx");
    }
  };
  function readExcelFile(){
    let reader = new FileReader();

    reader.onload = function(e) {
      let data = e.target.result;
      let workbook = XLSX.read(data, {
        type: 'binary'
      });

      workbook.SheetNames.forEach(function(sheetName, id) {
        // Here is your object
        let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        let json_object = JSON.stringify(XL_row_object);
        if(id === 0){
          // console.log("arr ",sheetName, id, XL_row_object);

          // pass data as array to api for creation
          createBulkListApiCall('bulkFromExcel', XL_row_object)
          
        }
      })

    };

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(excelFileList);
  }
  function trackActivity() {
    // getbanksandtelcos()
    // e.preventDefault();
    // getSessionTimeout();
    const currentUser_new = JSON.parse(localStorage.getItem("userDataStore"));    
    if(currentUser_new){
      currentUser_new["timeLogout"] = new Date().getTime() + currentUser_new?.counter;
      localStorage.setItem('userDataStore', JSON.stringify(currentUser_new))
    }
  }
  const handleFileOneUpload = () => {
    const formData1 = new FormData();
    // console.log("rtghrghhrthrhrthrthrthrtrtrtgrt", excelFileList)
    // readExcelFile();

    // if (response["data"]) {
    // message.success('file successfully uploaded.');
    // }
    // if (!response["data"]) {
    // message.error('Sorry, something went wrong. Please try again.');
    // }
  
    setUploading1(false); // You can use any AJAX library you like
  };

  const props1 = {
    onRemove: (excelFileId) => {
      // console.log(excelFileId)
      // const index = excelFileList.indexOf(excelFileId);
      // const newExcelFileList = excelFileList.slice();
      // newExcelFileList.splice(0, 1);
      setExcelFileList([]);
    },
    beforeUpload: (excelFileId) => {
        setExcelFileList(excelFileId);
      return false;
    },
    excelFileList,
  };

  const handleChangeBankListInModal = (valSelected, nameSelected, method) => {
    setBankDropdownInModal({"code": valSelected, "name": nameSelected, "method": method});
  };

  function handleSubmit(event) {
      event.preventDefault();    
      let expPhone = /(020|023|024|025|026|027|028|050|054|055|059|233)[\s.-]?(\d{7}|\d{8})$/;
      // console.log("phoneNumber ", paymentMethodInfoStatusInModal, expPhone.test(phoneNumber))

      if (accountName.length < 1 || !accountName ) {
        setAccountNameError(true)
      } 
      if (email.length < 1 || !email ) {
        setEmailError(true)
      }
      if (accountNumber.length < 1 || !accountNumber ) {
        setAccountNumberError(true)
      }
      if ( !bankDropdownInModal.code ) {
        setBankCodeError(true)
      }
      if (amount.length < 1 || !amount ) {
        setAmountError(true)
      }
      if (note.length < 1 || !note ) {
        setNoteError(true)
      }
      if ( !bankDropdownInModal.code ) {
        setBankDropdownInModalError(true)
      }
      if (telcoEmail.length < 1 || !telcoEmail ) {
        setTelcoEmailError(true)
      }
      if ( !expPhone.test(phoneNumber) ) {
        setPhoneNumberError(true)
      }
      
      if (momoAccountName.length < 1 || !momoAccountName ) {
        setMomoAccountNameError(true)
      }
      if (telcoAmount.length < 1 || !telcoAmount ) {
        setTelcoAmountError(true)
      }
      if (telcoNote.length < 1 || !telcoNote ) {
        setTelcoNoteError(true)
      } 
      if ( !networkName.code ) {
        setNetworkNameError(true)
      } 
      if (singleBatchName.length < 1 || !singleBatchName ) {
        setSingleBatchNameError(true)
      } 
      if( (accountName && email && accountNumber && amount && note && bankDropdownInModal.code ) || (telcoEmail && expPhone.test(phoneNumber) && momoAccountName && telcoAmount && telcoNote && networkName.code ) ){
        // 
        createBulkListApiCall('addToBatch', [])
      }

  }
  // add item to batch
  function createBulkListApiCall(type, arrayData) {
    // e.preventDefault();
    let data;
    // let bulkPayType = false;
    let payMethod = "";
    let account_number = '';
    let bank_code = '';
    let destination_bank_name = '';
    let account_holder_name = '';
    let currency = 'GHS';
    let val_amount = '';
    let c_note = '';
    let e_mail = '';
    let batch_id = window.location.pathname.split("/")[3];
    let payment_method = "NONE";
    let config = {};

    if(paymentBatchData?.payment_method === "BANK"){
      // 
      payMethod = "BANK";
      account_number = accountNumber || "" ;
      bank_code = bankDropdownInModal.code || "";
      destination_bank_name = bankDropdownInModal.name || "";
      account_holder_name = accountName || "";
      currency = 'GHS';
      val_amount = amount || "";
      c_note = note || "";
      e_mail = email || "";
      payment_method = bankDropdownInModal.method || "NONE"
    }
    else if(paymentBatchData?.payment_method === "MOBILEMONEY"){
      // 
      payMethod = 'MOBILEMONEY';
      account_number = phoneNumber;
      bank_code = networkName.code;
      destination_bank_name = networkName.name;
      account_holder_name = momoAccountName;
      currency = 'GHS';
      val_amount = telcoAmount;
      c_note = telcoNote;
      e_mail = telcoEmail;
      payment_method = networkName.method || "NONE";
    }


    if(type === "bulkFromExcel"){
      // bulk payload setting
      let destructureData = Object.keys(arrayData).map((post, id) => {
        // console.log(" post current ", arrayData)
        return { 
            "account_number": arrayData[id].account_number || "",
            "bank_code": arrayData[id]?.bank_code_or_network_code || arrayData[id]?.code || arrayData[id]?.network_code || arrayData[id]?.bank_code || "",
            "destination_bank_name": arrayData[id].destination_bank_name_or_network_name || arrayData[id].network_name || arrayData[id].destination_bank_name || arrayData[id].network_name_or_destination_bank_name  || "",
            "account_holder_name": arrayData[id].account_holder_name || "",
            "currency": "GHS",
            "amount": arrayData[id].amount || "",
            "note": arrayData[id].note || "",
            "email": arrayData[id].email || "",
            "source_metadata": "",
            "payment_method": arrayData[id].payment_method || ""
        }
      })

      data = JSON.stringify({
        "name": batchName, 
        "payment_method": payMethod,
        "batch_items": destructureData
      });

    }
    else if(type === 'addToBatch'){
      // 
      data = JSON.stringify({
        "batch_id": batch_id,
        "account_holder_name": account_holder_name,
        "bank_code": bank_code,
        "external_account_id": account_number,
        "account_number": account_number,
        "destination_bank_name": destination_bank_name,
        "currency": "GHS",
        "amount": val_amount,
        "note": c_note,
        "email": e_mail,
        "source_metadata": {
                            "full_name": account_holder_name,
                            "email": e_mail,
                            "mobile_number": account_number,
                            "recipient_address": "234 none"
                    }
      });
    }
    else{
      // single list submit payload
      data = JSON.stringify({
        "name": batchName, 
        "payment_method": payMethod,
        "batch_items": [
          {
            "account_number": account_number,
            "bank_code": bank_code,
            "destination_bank_name": destination_bank_name,
            "account_holder_name": account_holder_name,
            // "payment_method": payment_method,
            "currency": currency,
            "amount": val_amount,
            "note": c_note,
            "email": e_mail,
            "source_metadata": {
                "full_name": account_holder_name,
                "email": e_mail,
                "mobile_number": account_number
            }
          }
        ]
      });
    }

    if(type === 'addToBatch'){
      // 
      config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_API + "/batch/item/add/" + batch_id + '/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentUser?.access
        },
        data: data
        };
    }
    else{
      config = {
      method: 'patch',
      url: process.env.REACT_APP_BASE_API + "/batch/bulk/update/" + batch_id + '/',
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
        let bulkPayInfoDataNew = bulkPayItemData(window.location.pathname.split("/")[3]);
        let bulkPayInfoNew = []
        bulkPayInfoDataNew?.bulkPayItems?.then(value => { (bulkPayInfoNew = value?.batch_items) });

        Swal.fire({
          title: 'Successfully created!',
          icon: 'success',
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#FF7643',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            // console.log( "old ", bulkPayInfo,  " new ", bulkPayInfoNew)
            bulkPayInfo = bulkPayInfoNew
            setBatchName(batchName + " ")
            setModal1(false);
            setModal2(false);
            setModal3(false);
            setModal4(false);
          
        });
      }
      else {
        Swal.fire({
          title: 'Failed!',
          // text: "Try again",
          text: response?.data?.message,
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Ok'
        }).then((result) => {
          // 
        })
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
  // delete 
  function deleteBatchOrItem(type, postData){
    // 
    // console.log(postData)
    let config = {};
    let data = {};
    if(type === "batch"){
      // 
      config = {
        method: 'delete',
        url: process.env.REACT_APP_BASE_API + "/batch/delete/" + window.location.pathname.split("/")[3] + "/",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentUser?.access
        },
        data: data
      };
    }
    else if( type === "item" ){
      // 
      config = {
        method: 'delete',
        url: process.env.REACT_APP_BASE_API + "/batch/item/Delete/" + postData?.id + "/",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentUser?.access
        },
        data: data
      };
    }

    Swal.fire({
      icon: 'info',
      title: 'Do you want to delete the item?',
      text: postData?.name || postData?.account_holder_name,
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
          genericApiCall(config)
        }
        else{
          // 
        }
        
    });
  }
  // generic method
  function genericApiCall(config){
    // 

    axios(config).then(response => {
      // console.log(">>>>", response.data);
      if (response?.data?.status === true) { 
        let bulkPayInfoDataNew = bulkPayItemData(window.location.pathname.split("/")[3]);
        let bulkPayInfoNew = []
        bulkPayInfoDataNew?.bulkPayItems?.then(value => { (bulkPayInfoNew = value?.batch_items) });

        let paymentBatchDataNew = {}
        bulkPayInfoDataNew?.bulkPayItems?.then(value => { (paymentBatchDataNew = value?.batch) });

        Swal.fire({
          title: 'Successful!',
          icon: 'success',
          allowOutsideClick: false,
          // allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: '#FF7643',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            // console.log( "old ", bulkPayInfo,  " new ", bulkPayInfoNew, "old>", paymentBatchData, "new >>", paymentBatchDataNew)
            bulkPayInfo = bulkPayInfoNew;
            paymentBatchData = paymentBatchDataNew;
            setBatchName(batchName + " ")
            setModal1(false);
            setModal2(false)
            setModal3(false)
            setModal4(false);
        });
      }
      else {
        Swal.fire({
          title: 'Failed!',
          // text: "Try again",
          text: response?.data?.message,
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Ok'
        }).then((result) => {
          // 
        })
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
  // execute pay queue for batch list
  function payExecute(type, postData){
    let getTotalBatch = 0
    tableData?.map((post, id)=> {
      getTotalBatch = getTotalBatch + parseFloat(post.amount)
    } )
    let config = {};
    let data = {};
    let txtString = "";
    if(type === "batch"){
      //
      txtString = `<table id="table" width="90%" border=0>
    <thead>
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr width="100%" class="ml-3">
            <td style="float: left">Name :</td>
            <td style="float: right; margin-right: -40px">${ paymentBatchData?.name || 'N/A' } </td>
        </tr>
        <tr width="100%" class="ml-3">
            <td style="float: left">Number of Recipients :</td>
            <td style="float: right; margin-right: -40px">${  tableData?.length || 0 } </td>
        </tr>
        <tr width="100%" class="ml-3">
            <td style="float: left">Currency :</td>
            <td style="float: right; margin-right: -40px">${ "GHS" } </td>
        </tr>
        <tr width="100%" class="ml-3">
            <td style="float: left">Total Amount :</td>
            <td style="float: right; margin-right: -40px">${ ( getTotalBatch || 0)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString() } </td>
        </tr>
    </tbody>
        </table>`
      config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_API + "/batch/pay/" + currentUser?.account + "/" + window.location.pathname.split("/")[3] + "/",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentUser?.access
        },
        data: data
      };
    }
    else if( type === "item" ){
      // 
      txtString = `<p> ${postData?.account_holder_name || postData?.name} </p>`

      txtString = `<table id="table" width="90%" border=0>
    <thead>
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr width="100%" class="ml-3">
            <td style="float: left">Name :</td>
            <td style="float: right; margin-right: -40px">${ postData?.account_holder_name || postData?.name || 'N/A' } </td>
        </tr>
        <tr width="100%" class="ml-3">
            <td style="float: left">Currency :</td>
            <td style="float: right; margin-right: -40px">${ "GHS" } </td>
        </tr>
        <tr width="100%" class="ml-3">
            <td style="float: left">Total Amount :</td>
            <td style="float: right; margin-right: -40px">${ parseFloat( postData?.amount || postData?.amount || 0)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString() } </td>
        </tr>
    </tbody>
        </table>`
      config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_API + "/batch/item/pay/" + currentUser?.account + "/" + postData?.id + "/",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentUser?.access
        },
        data: data
      };
    }

    Swal.fire({
      icon: 'info',
      title: 'Proceed to make payment for!',
      html: txtString,
      // text: postData?.account_holder_name || postData?.name,
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
          genericApiCall(config)
        }
        else{
          // 
        }   
    }); 
  }
  // openModalEdit list
  function openModalEdit(e, itemData){
    e.preventDefault()
    // setEmail()
    // setAccountNumber()
    // setBankCode()
    // setAccountName()
    // setAmount()
    // setNote()
    // setBankDropdownInModal()
    // setBatchName()
    // setTelcoEmail()
    // setPhoneNumber()
    // setNetworkCode()
    // setMomoAccountName()
    // setTelcoAmount()
    // setTelcoNote() 
    // setNetworkName()
    // setSingleBatchName()
    setModal1(true)

    setAmount(itemData?.amount)
    setTelcoAmount(itemData?.amount)
    
    setNote(itemData?.note)
    setTelcoNote(itemData?.note)

    setAccountName(itemData?.account_holder_name)
    setMomoAccountName(itemData?.account_holder_name)

    setEmail(itemData?.email)
    setTelcoEmail(itemData?.email)

    setAccountNumber(itemData?.account_number)
    setPhoneNumber(itemData?.account_number)
    
    setBankDropdownInModal({"code": itemData?.bank_code, "name": itemData?.destination_bank_name, "method": itemData?.payment_method});
    setNetworkName({"code": itemData?.bank_code, "name": itemData?.destination_bank_name, "method": itemData?.payment_method});

    // setTimeout(()=>{
    // }, 2000)
  }
  function handleEditSubmit(e){
    // 
    e.preventDefault()
    let data = {};

    if(paymentBatchData?.payment_method === "BANK"){
      // 
      data = JSON.stringify({
        "account_number": accountNumber,
        "external_account_id": accountNumber,
        "bank_code": bankDropdownInModal.code,
        "destination_bank_name": bankDropdownInModal.name,
        "account_holder_name": accountName,
        "currency": 'GHS',
        "amount": amount,
        "note": note,
        "email": email,
        "source_metadata": {
            "full_name": accountName,
            "email": email,
            "mobile_number": accountNumber
        } 
      });
    }
    else{
      data = JSON.stringify({
        "account_number": phoneNumber,
        "external_account_id": phoneNumber,
        "bank_code": networkName.code,
        "destination_bank_name": networkName.name,
        "account_holder_name": momoAccountName,
        "currency": 'GHS',
        "amount": telcoAmount,
        "note": telcoNote,
        "email": telcoEmail,
        "source_metadata": {
            "full_name": momoAccountName,
            "email": telcoEmail,
            "mobile_number": phoneNumber
        }
      })
    }
    let config = {
      method: 'patch',
      url: process.env.REACT_APP_BASE_API + "/batch/item/update/" + currentPostItemSelected?.id + "/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser?.access
      },
      data: data
    };
    genericApiCall(config)

  }
  // edit batch
  function editBatchOrItem(editBatchData){
    // 
    let config = {};
    let data = {
      "name": batchName || paymentBatchData?.name,
      "payment_method": editBatchData?.payment_method
    };
    
    config = {
      method: 'patch',
      url: process.env.REACT_APP_BASE_API + "/batch/update/" + window.location.pathname.split("/")[3] + "/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser?.access
      },
      data: data
    };
    
    
    Swal.fire({
      icon: 'info',
      title: 'Do you want to update the item?',
      html: `<p> ${editBatchData?.name} to ${ batchName || paymentBatchData?.name} </p>`,
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
          genericApiCall(config)
        }
        else{
          // 
        }
        
    });
  }
  
  let addVal = 0
    // compute array data
  function arraySum(accumulator, a){
    addVal = addVal + parseFloat(a.amount || 0);
    return addVal
  }

  return (
    <div>
      <Row style={{ marginBottom: '25px', fontSize: '15px' }} >
        <h5>Batch Overview</h5>
        <Col xs="6" sm="6" md={3} lg={3}>
          {/*  */}
          Batch Name:  <br />
          {/* Payment Method: <br /> */}
          Currency: <br />
          Number of Recipients: <br />
          Total Amount: <br />
        </Col>
        <Col xs="6" sm="6" md={3} lg={3}>
          {/*  */}
          { paymentBatchData?.name || 'N/A'} <br />
          {/* { paymentBatchData?.payment_method || 'N/A'} <br /> */}
          {"GHS"} <br />
          { tableData?.length || 0} <br />
          { (tableData?.reduce(arraySum, 0) || 0)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString() } <br />
        </Col>
      </Row>
      <Row style={{ marginBottom: '25px' }} >
        {/*  */}
        {
          currentUser?.permission_list?.includes("process_bulk_transactions") ?
          <Col xs="12" sm="12" md={6} lg={6} >
            <Button
                type="submit"
                className='bg-text-wp-action'
                style={{ height: '35px', width: '150px'}}
                onClick={ (e) => payExecute("batch", paymentBatchData) }
            >
                PROCESS PAYMENT
          </Button>
          </Col>
          : ""
        }
        
        {
          currentUser?.permission_list?.includes("bulk_pay_add_edit_delete") ?
        <Col xs="12" sm="12" md={3} lg={3} style={{ margin: '1px 0px'}} >
          <Button
              type="submit"
              className='bg-text-wp-action'
              style={{ margin: '0px 2% 0px 0px', height: '35px', width: '45%'}}
              onClick={ (e) => setModal3(true)}
          >
              EDIT
        </Button>
          <Button
              type="submit"
              className='bg-text-wp-action'
              style={{ height: '35px', width: '53%'}}
              onClick={ (e) => setModal4(true)}
          >
              Re-Upload
        </Button>
        </Col>
        : ""
        }

        {
          currentUser?.permission_list?.includes("bulk_pay_add_edit_delete") ?
          <Col xs="12" sm="12" md={3} lg={3} >
            <Button
                type="submit"
                className='bg-text-wp-action float-item-media'
                style={{ height: '35px', width: '63%' }}
                onClick={ (e) => deleteBatchOrItem("batch", paymentBatchData)}
            >
                DELETE
          </Button>
          </Col>
          : ""
        }

      </Row>
      {/* <Container> */}
      <Row>
        {
          currentUser?.permission_list?.includes("bulk_pay_add_edit_delete") ?
          <Col xs="12" sm="12" md={6} lg={6} >
            {/* filter */}
            <div className="dropdown filterDrop add-item">
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <TextField 
                    fullWidth
                    id="dropbtn" 
                    className='d-filters'
                    onClick={(e) => setModal2(true)} 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" >
                          <CIcon icon={cilPlus} className="me-2" /> Add
                        </InputAdornment>
                      ),
                    }}
                    multiline
                    />
                </Box>
            </div>
            
          </Col>
          : "" 
        }
        {/* Date range */}
        <Col xs="12" sm="12" md={3} lg={3} style={{ margin: '1px 0px' }} >
          {/* date range */}
          {/* <FormControl fullWidth> */}
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
                style={{ width: 310, display: 'block', border: "10px solid #080808 !important"}} 
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
          {/* </FormControl> */}
        </Col>
        <Col xs="0" sm="0" md={1} lg={1} > </Col>

        {
          currentUser?.permission_list?.includes("bulk_pay_add_edit_delete") ?
          <Col xs="12" sm="12" md={2} lg={2} >
            {/* export */}
            <Box sx={{ minWidth: 120}}>
              <FormControl fullWidth>
                <Label for="bulkPayInfoExport" className="label-dc"> </Label>
                <Select
                  placeholder={"Select export"}
                  options={optionsExport}
                  id="bulkPayInfoExport"
                  className='other-input-select other-input-select'
                  onChange={(e) => handleChangeExport(e.value)}
                />
              </FormControl>
            </Box>
          </Col>
          : ""
        }
      </Row>
      {/* </Container> */}

      {/* {dateTo.toString()}{" rrr "}{dateFrom.toString()} */}
      <br /><br />

      <table id="myTable" className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>A/C No</th>
            <th>Destination A/C</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Email</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            tableData?.map((post, id) =>
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{post?.account_holder_name}</td>
                <td>{post?.account_number}</td>
                <td> {post?.destination_bank_name} </td>
                <td> { post?.amount.toString()} </td>
                <td>{ post?.note }</td>
                <td>{ post?.email }</td>
                <td>{ post?.status_code || "Created" }</td>
                <td>{moment(post?.created).format('LLLL')}</td>
                <td>
                  {
                    currentUser?.permission_list?.includes("process_bulk_transactions") ? 
                    (
                      post?.status_code === "Failed" ?
                      <CBadge className='bg-text-wp mr-5' style={{marginRight: "5px"}} onClick={ (e) => payExecute("item", post) }  >Retry</CBadge> 
                      : ""
                    ) : ""
                  }

                  {
                    currentUser?.permission_list?.includes("bulk_pay_add_edit_delete") ?
                    <p>
                      <CBadge color='black' style={{marginRight: "5px"}}  onClick={ (e) => deleteBatchOrItem("item", post) }  >Delete</CBadge> 
                      <CBadge className='bg-text-wp-action' onClick={ (e)=>{(openModalEdit(e, post)); (setCurrentPostItemSelected(post))} } > {" "}Edit</CBadge>
                    </p>
                  : ""
                  }
                  {
                    currentUser?.permission_list?.includes("process_bulk_transactions") ? 
                    "" : 
                    (
                      currentUser?.permission_list?.includes("bulk_pay_add_edit_delete") ?
                      "" : "N/A"
                    )
                  }
            
                </td>
                {/* <td>{post?.amount}</td> */}
                {/* <td onClick={() => { setModal2(true); setViewData(post) }}><CBadge className='bg-text-wp'>View</CBadge></td> */}
              </tr>
            )}
            
        </tbody>
      </table>

      {tableData?.length > 0 ? "" : <p style={{textAlign: "center"}}> <br /><br /> {noData}</p>}

      <a dangerouslySetInnerHTML={{ __html: loader }}></a>

      {/* modals */}

      {/* modal for add batch item to list in app  fullscreen="xl" */}
      <CModal visible={modal2} alignment='center' onClose={() => setModal2(false)}>
        <CModalHeader>
          <CModalTitle>  Add To List  </CModalTitle>
        </CModalHeader>
        <CModalBody className='contentForbulkPayInfoPrint'>
        {/* FORMS FOR TRANSFER TO BANK BEGINS HERE */}
        {
          paymentBatchData?.payment_method === "BANK" ?
          <div>
              <Row style={{ marginLeft: '-10px' }}>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
                <div className='bulk-pay-name'  >
                  <Box 
                    component="form"
                    noValidate
                    // autoComplete="off"
                    >
                    <Label for="bulkPayInfoStatus" className="label-dc"> Name on Account </Label>
                    <TextField 
                      fullWidth
                      error = {accountNameError}
                      // id='filters-d'
                      // xs="12" sm="12" md={12} lg={12}
                      // value={accountName}
                      onChange={(e) => {(setAccountName(e.target.value)); (setAccountNameError(false))}} 
                      // label="Filter"
                      placeholder="Michael Amoo"
                      style={{height: "30px !important" }}
                      required
                      />
                  </Box>
                </div>
              </Col>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >
              <Label for="bulkPayInfoStatus" className="label-dc mb-1"> Bank/Network Name</Label>
              <Select
                error = {bankDropdownInModalError}
                maxWidth
                placeholder={"Select bank"}
                options={optionBankListAll}
                id="bulkPayInfoStatus"
                className='other-input-select'
                // components={{ Option: paymentOption }}
                onChange={(e) => handleChangeBankListInModal(e.value, e.label, e.method)}
              />
              </Col>
              
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
                <div className='bulk-pay-name'  >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="bulkPayInfoStatus" className="label-dc"> Email </Label>
                    <TextField 
                      fullWidth
                      error = {emailError}
                      // id='filters-d'
                      // xs="12" sm="12" md={12} lg={12}
                      // value={email}
                      onChange={(e) => {(setEmail(e.target.value)); (setEmailError(false))}}
                      // label="Filter"
                      placeholder="youremail@email.com"
                      // style={{height: "30px !important" }}
                      
                      />
                  </Box>
                </div>
              </Col>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Bank/Network Account Number </Label>
                  <TextField 
                    error = {accountNumberError}
                    fullWidth
                    // id='filters-d'
                    // value={accountNumber}
                    onChange={(e) => {(setAccountNumber(e.target.value)); (setAccountNumberError(false))}}
                    // label="Filter"
                    placeholder="110324000000"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col>
              
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Amount </Label>
                  <TextField
                    fullWidth
                    error = {amountError} 
                    // id='filters-d'
                    // value={amount}
                    onChange={(e) => {(setAmount(e.target.value)); (setAmountError(false))}}

                    // label="Filter"
                    placeholder="100"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Note </Label>
                  <TextField 
                    fullWidth
                    error = {noteError}
                    // id='filters-d'
                    // value={note}
                    onChange={(e) => {(setNote(e.target.value)); (setNoteError(false))}}

                    // label="Filter"
                    placeholder="Salaries"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col>
              </Row>

            
          </div>
          : ""
        }
        {/* FORMS FOR BANK ENDS HERE */}

        {/* FORMS FOR TRANSFER TO TELCOS BEGIN HERE */}
        {
          paymentBatchData?.payment_method === "MOBILEMONEY" ?
          <div>
            <Row style={{ marginLeft: '-10px' }}>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
                <div className='bulk-pay-name'  >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="bulkPayInfoStatus" className="label-dc"> Name on Account </Label>
                    <TextField 
                      fullWidth
                      error = {momoAccountNameError}
                      // id='filters-d'
                      // xs="12" sm="12" md={12} lg={12}
                      // value={momoAccountName}
                      onChange={(e) => {(setMomoAccountName(e.target.value)); (setMomoAccountNameError(false))}}

                      // label="Filter"
                      placeholder="Patrick Wunake"
                      style={{height: "30px !important" }}
                      
                      />
                  </Box>
                </div>
              </Col>

              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <Label for="bulkPayInfoStatus" className="label-dc mb-1"> Bank/Network Name</Label>
              <Select
                // value={networkName}
                error = {networkNameError}
                maxWidth
                placeholder={"Select network"}
                options={optionBankListAll}
                id="bulkPayInfoStatus"
                className='other-input-select'
                // components={{ Option: paymentOption }}
                onChange={(e) => {(setNetworkName({"code": e.value, "name": e.label})); (setNetworkNameError(false))}}

              />
              </Col>

              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >  
                <div className='bulk-pay-name'  >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="bulkPayInfoStatus" className="label-dc"> Email </Label>
                    <TextField 
                      fullWidth
                      error = {telcoEmailError}
                      // id='filters-d'
                      // xs="12" sm="12" md={12} lg={12}
                      // value={telcoEmail}
                      onChange={(e) => {(setTelcoEmail(e.target.value)); (setTelcoEmailError(false))}}
                      // label="Filter"
                      placeholder="youremail@email.com"
                      style={{height: "30px !important" }}
                      
                      />
                  </Box>
                </div>
              </Col>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Phone Number </Label>
                  <TextField 
                    fullWidth
                    error = {phoneNumberError}
                    // id='filters-d'
                    // value={phoneNumber}
                    onChange={(e) => {(setPhoneNumber(e.target.value)); (setPhoneNumberError(false))}}

                    // label="Filter"
                    placeholder="0200000000"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col>

              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Amount </Label>
                  <TextField 
                    // id='filters-d'
                    // value={telcoAmount}
                    fullWidth
                    onChange={(e) => {(setTelcoAmount(e.target.value)); (setTelcoAmountError(false))}}

                    // label="Filter"
                    placeholder="100"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col>

              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Note </Label>
                  <TextField 
                    error = {noteError}
                    // id='filters-d'
                    // value={telcoNote}
                    fullWidth
                    onChange={(e) => {(setTelcoNote(e.target.value)); (setTelcoNoteError(false))}}

                    // label="Filter"
                    placeholder="Salaries"
                    style={{height: "30px !important" }}
                    
                  />
                </Box>
              </div>
              </Col>

            </Row>
          </div>
          : "" 
        }
        {/* FORMS FOR TELCOS END HERE */}

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={() => setModal2(false)}>
            Close
          </CButton>
          <CButton 
          // type = 'submit'
          color=''
          className='text-white bg-text-wp'
          onClick={(e)=>handleSubmit(e)}
          >
            Add
          </CButton>

        </CModalFooter>
      </CModal>

      {/* modal for edit batch item to list in app */}
      <CModal visible={modal1} alignment='center' onClose={() => setModal1(false)}>
        <CModalHeader>
          <CModalTitle>  Edit Item  </CModalTitle>
        </CModalHeader>
        <CModalBody className='contentForbulkPayInfoPrint'>
        {/* FORMS FOR TRANSFER TO BANK BEGINS HERE */} 
        {
          paymentBatchData?.payment_method === "BANK" ?
          <div>
              <Row style={{ marginLeft: '-10px' }}>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
                <div className='bulk-pay-name'  >
                  <Box 
                    component="form"
                    noValidate
                    // autoComplete="off"
                    >
                    <Label for="bulkPayInfoStatus" className="label-dc"> Name on Account </Label>
                    <TextField 
                      fullWidth
                      error = {accountNameError}
                      // id='filters-d'
                      // xs="12" sm="12" md={12} lg={12}
                      defaultValue={currentPostItemSelected?.account_holder_name}
                      onChange={(e) => {(setAccountName(e.target.value)); (setAccountNameError(false))}} 
                      // label="Filter"
                      // placeholder="Michael Amoo"
                      style={{height: "30px !important" }}
                      required
                      />
                  </Box> 

                </div>
              </Col>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >
              <Label for="bulkPayInfoStatus" className="label-dc mb-1"> Bank/Network Name</Label>
              <Select
                error = {bankDropdownInModalError}
                maxWidth
                // placeholder={"Select bank"}
                defaultInputValue={currentPostItemSelected?.destination_bank_name }
                options={optionBankListAll}
                id="bulkPayInfoStatus"
                className='other-input-select'
                // components={{ Option: paymentOption }}
                onChange={(e) => handleChangeBankListInModal(e.value, e.label, e.method)}
              />
              </Col>
              
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
                <div className='bulk-pay-name'  >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="bulkPayInfoStatus" className="label-dc"> Email </Label>
                    <TextField 
                      fullWidth
                      error = {emailError}
                      // id='filters-d'
                      // xs="12" sm="12" md={12} lg={12}
                      defaultValue={currentPostItemSelected?.email}
                      onChange={(e) => {(setEmail(e.target.value)); (setEmailError(false))}}
                      // label="Filter"
                      // placeholder="youremail@email.com"
                      // style={{height: "30px !important" }}
                      
                      />
                  </Box>
                </div>
              </Col>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Bank/Network Account Number </Label>
                  <TextField 
                    error = {accountNumberError}
                    fullWidth
                    // id='filters-d'
                    defaultValue={currentPostItemSelected?.account_number}
                    onChange={(e) => {(setAccountNumber(e.target.value)); (setAccountNumberError(false))}}

                    // label="Filter"
                    // placeholder="110324000000"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col>
              
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Amount </Label>
                  <TextField
                    error = {amountError} 
                    // id='filters-d'
                    fullWidth
                    defaultValue={currentPostItemSelected?.amount}
                    onChange={(e) => {(setAmount(e.target.value)); (setAmountError(false))}}

                    // label="Filter"
                    // placeholder="100"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Note </Label>
                  <TextField 
                    error = {noteError}
                    // id='filters-d'
                    fullWidth
                    defaultValue={currentPostItemSelected?.note}
                    onChange={(e) => {(setNote(e.target.value)); (setNoteError(false))}}

                    // label="Filter"
                    // placeholder="Salaries"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col>
              </Row>

            
          </div>
          : ""
        }
        {/* FORMS FOR BANK ENDS HERE */}

        {/* FORMS FOR TRANSFER TO TELCOS BEGIN HERE */}
        {
          paymentBatchData?.payment_method === "MOBILEMONEY" ?
          <div>
            <Row style={{ marginLeft: '-10px' }}>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >
                <div className='bulk-pay-name'  >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="bulkPayInfoStatus" className="label-dc"> Name on Account </Label>
                    <TextField 
                      fullWidth
                      error = {momoAccountNameError}
                      // id='filters-d'
                      // xs="12" sm="12" md={12} lg={12}
                      defaultValue={currentPostItemSelected?.account_holder_name}
                      onChange={(e) => {(setMomoAccountName(e.target.value)); (setMomoAccountNameError(false))}}
                      // label="Filter"
                      // placeholder="Patrick Wunake"
                      style={{height: "30px !important" }}
                      
                      />
                  </Box>
                </div>
              </Col>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <Label for="bulkPayInfoStatus" className="label-dc mb-1"> Bank/Network Name</Label>
              <Select
                // value={networkName}
                error = {networkNameError}
                maxWidth
                defaultInputValue={currentPostItemSelected?.destination_bank_name }
                // placeholder={"Select network"}
                options={optionBankListAll}
                id="bulkPayInfoStatus"
                className='other-input-select'
                // components={{ Option: paymentOption }}
                onChange={(e) => {(setNetworkName({"code": e.value, "name": e.label})); (setNetworkNameError(false))}}

              />
              </Col>

              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >  
                <div className='bulk-pay-name'  >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="bulkPayInfoStatus" className="label-dc"> Email </Label>
                    <TextField 
                      fullWidth
                      error = {telcoAmountError}
                      // id='filters-d'
                      // xs="12" sm="12" md={12} lg={12}
                      defaultValue={currentPostItemSelected?.email}
                      onChange={(e) => {(setTelcoEmail(e.target.value)); (setTelcoEmailError(false))}}
                      // label="Filter"
                      // placeholder="youremail@email.com"
                      style={{height: "30px !important" }}
                      
                      />
                  </Box>
                </div>
              </Col>
              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Phone Number </Label>
                  <TextField 
                    error = {phoneNumberError}
                    // id='filters-d'
                    fullWidth
                    defaultValue={currentPostItemSelected?.account_number}
                    onChange={(e) => {(setPhoneNumber(e.target.value)); (setPhoneNumberError(false))}}

                    // label="Filter"
                    // placeholder="0200000000"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col>

              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Amount </Label>
                  <TextField 
                    // id='filters-d'
                    fullWidth
                    defaultValue={currentPostItemSelected?.amount}
                    onChange={(e) => {(setTelcoAmount(e.target.value)); (setTelcoAmountError(false))}}

                    // label="Filter"
                    // placeholder="100"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col>

              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Note </Label>
                  <TextField 
                    error = {noteError}
                    // id='filters-d'
                    fullWidth
                    defaultValue={currentPostItemSelected?.note}
                    onChange={(e) => {(setTelcoNote(e.target.value)); (setTelcoNoteError(false))}}

                    // label="Filter"
                    // placeholder="Salaries"
                    style={{height: "30px !important" }}
                    
                  />
                </Box>
              </div>
              </Col>

            </Row>
          </div>
          : "" 
        }
        {/* FORMS FOR TELCOS END HERE */}

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={() => setModal1(false)}>
            Close
          </CButton>
          <CButton 
          // type = 'submit'
          color=''
          className='text-white bg-text-wp'
          onClick={(e)=>handleEditSubmit(e)}
          >
            Save
          </CButton>

        </CModalFooter>
      </CModal>

      {/* modal for edit batch name in app */}
      <CModal visible={modal3} alignment='center' onClose={() => setModal3(false)}>
        <CModalHeader>
          <CModalTitle>  Edit Batch Name </CModalTitle>
        </CModalHeader>
        <CModalBody className='contentForbulkPayInfoPrint'>
          <p className="success rounded"  >
            {/* <h6> bulkPayInfo Details </h6> */}
          </p>
          {/* <Row style={{ marginRight: '30%' }}> */}


            <Col xs="12" sm="12" md={12} lg={12} className="mt-0" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoBatchName" className="label-dc"> Batch name </Label>
                  <TextField 
                    defaultValue={paymentBatchData?.name}    
                    fullWidth                     
                    error = {batchNameError}
                    onChange={(e) => { (setBatchName(e.target.value)); (setBatchNameError(false)) }}
                    // label="Filter"
                    placeholder="Eg. my batch name"
                    style={{height: "30px !important"}}
                    
                    />
                </Box>
              </div>
            </Col>
            
          {/* </Row> */}

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={() => setModal3(false)}>
            Close
          </CButton>
          <CButton 
          // type = 'submit'
          color=''
          className='text-white bg-text-wp'
          onClick={(e)=>editBatchOrItem(paymentBatchData)}
          >
            Save
          </CButton>

        </CModalFooter>
      </CModal>


      {/* modal for reupload batch list in app */}
      <CModal visible={modal4} alignment='center' onClose={() => setModal4(false)}>
        <CModalHeader>
          <CModalTitle> Re-Upload Batch </CModalTitle>
        </CModalHeader>
        <CModalBody className='contentForbulkPayInfoPrint'>
          
          <Row className='m-3' style={{"border-style": "dotted", height: "90px", textAlign: "center", padding: "30px" }}>

            <Upload {...props1} maxCount={1} accept=".xls,.xlsx">
              <Button >Click to select an excel file </Button>
            </Upload>
            
          </Row>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={() => setModal4(false)}>
            Close
          </CButton>
          <CButton 
          // type = 'submit'
          color=''
          className='text-white bg-text-wp'
          onClick={(e)=>readExcelFile()}
          >
            Save
          </CButton>

        </CModalFooter>
      </CModal>


    </div>
  )
}

export default BulkpayItemListDataTables;