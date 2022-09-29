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
import { getbanksandtelcos, bulkPayData, bulkPayItemData } from "../Data/PageData";


const userData = JSON.parse(localStorage.getItem('userDataStore'));

let currentUser = JSON.parse(localStorage.getItem("userDataStore")); 
let bulkPayInfoData = bulkPayData();
let bulkPayInfo = []
bulkPayInfoData?.bulkPay?.then(value => { (bulkPayInfo = value) });

let banktelcosList = getbanksandtelcos();
let banktelcosListInfo = []
banktelcosList.list.then(value => banktelcosListInfo = value)
// console.log("getbanksandtelcos ", banktelcosListInfo )
// console.log("bulkPayData ", bulkPayData() )
// console.log("bulkPayItemData ", bulkPayItemData("97273dc9-388f-4c8f-a054-8ac92e594656") )

const BulkpayDataTables = (apikeyDetails) => {
  const [loader, setLoader] = useState('<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>')
  const [tableData, setTableData] = useState([]);
  const [noData, setNoData] = useState("")
  const [monitorState, setMonitorState] = useState(1);
  const [dropValue, setDropValue] = useState(0);

  // set Edit Batch Data
  const [editBatchData, setEditBatchData] = useState({});

  // date time
  const [dateTo, setDateTo] = useState(new Date('2014-08-18T21:11:54'));
  const [dateFrom, setDateFrom] = useState(new Date('2014-08-18T21:11:54')); 
  const [value, setValue] = useState([null, null]);

  // modals
  // filer bulkPayInfo
  const [modal1, setModal1] = useState(false)
  // view single bulkPayInfo 
  const [modal2, setModal2] = useState(false)
  // modal for edit batch name
  const [modal3, setModal3] = useState(false)

  const [viewData, setViewData] = useState({})
  const [openDateRange, setOpenDateRange] = useState(true);
  const [dateRange, setDateRange] = useState({});
  const [description, setDescription] = useState("");
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
            { "width": "15%", "targets": 0 },
            { "width": "20%", "targets": 2 },
            { "width": "18%", "targets": 3 }
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
    let data = [
      {
        "account_number": "",
        "bank_code_or_network_code": "",
        "destination_bank_name_or_network_name": "",
        "account_holder_name": "",
        "amount": "",
        "payment_method": "",
        "email": "",
        "note": ""
      }
    ];
   
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "WPexport");
    let listServices = [];
    /* generate XLSX file and send to client */
    if( type === "bank" ){
      // do for sheet two
      listServices = (banktelcosListInfo?.bank_list).concat((banktelcosListInfo?.telcos_list).filter((item) => (banktelcosListInfo?.bank_list).indexOf(item) < 0))
      // console.log("mergedList", listServices)
      const ws2 = XLSX.utils.json_to_sheet(listServices);
      XLSX.utils.book_append_sheet(wb, ws2, "codeList");
      XLSX.writeFile(wb, "WPexportBankAndNetWork.xlsx");
    }
    else{
      // do for sheet two
      listServices = (banktelcosListInfo?.telcos_list).concat((banktelcosListInfo?.bank_list).filter((item) => (banktelcosListInfo?.telcos_list).indexOf(item) < 0))
      // console.log("mergedList", listServices)
      const ws2 = XLSX.utils.json_to_sheet(listServices);
      XLSX.utils.book_append_sheet(wb, ws2, "codeList");
      XLSX.writeFile(wb, "WPexportMobileMoneyAndBank.xlsx");
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

  const handleChangeBankListInModal = (valSelected, nameSelected) => {
    setBankDropdownInModal({"code": valSelected, "name": nameSelected});
  };

  function handleSubmit(event) {
      event.preventDefault();    
      let expPhone = /(020|023|024|025|026|027|028|050|054|055|059)[\s.-]?\d{7}$/;
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
      if (batchName.length < 1 || !batchName ) {
        setBatchNameError(true)
      }
      if (telcoEmail.length < 1 || !telcoEmail ) {
        setTelcoEmailError(true)
      }
      if ( !expPhone.test(phoneNumber) ) {
        setPhoneNumberError(true)
      }
      if (networkCode.length < 1 || !networkCode ) {
        setNetworkCodeError(true)
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
      if( (accountName && email && accountNumber && amount && note && bankDropdownInModal.code && batchName) || (telcoEmail && expPhone.test(phoneNumber) && momoAccountName && telcoAmount && telcoNote && networkName.code ) ){
        // 
        createBulkListApiCall('singleForm', [])
      }

  }
  // create batch with list
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

    if(paymentMethodInfoStatusInModal === "bank"){
      // 
      payMethod = "BANK";
      account_number = accountNumber;
      bank_code = bankDropdownInModal.code;
      destination_bank_name = bankDropdownInModal.name;
      account_holder_name = accountName;
      currency = 'GHS';
      val_amount = amount;
      c_note = note;
      e_mail = email;
    }
    else{
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
    }


    if(type === "bulkFromExcel"){
      // console.log(" arrayData ", arrayData)
      let destructureData = Object.keys(arrayData).map((post, id) => {
        // console.log(" post current ", arrayData[id])
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

      // bulk payload setting
      data = JSON.stringify({
        "name": batchName, 
        "payment_method": payMethod,
        "batch_items": destructureData
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

    let config = {
      method: 'post',
      url: process.env.REACT_APP_BASE_API + "/batch/bulk/create/" + currentUser?.account + "/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser?.access
      },
      data: data
    };
    axios(config).then(response => {
      // console.log(response.data);
      if (response?.data?.status === true) { 
        let bulkPayInfoDataNew = bulkPayData();
        let bulkPayInfoNew = []
        bulkPayInfoDataNew?.bulkPay?.then(value => { (bulkPayInfoNew = value) });

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
            setModal2(false);
          
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
    let config = {};
    let data = {};
    if(type === "batch"){
      // 
      config = {
        method: 'delete',
        url: process.env.REACT_APP_BASE_API + "/batch/delete/" + postData?.id + "/",
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
        url: process.env.REACT_APP_BASE_API + "/batch/delete/" + postData?.id + "/",
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
      text: postData?.name,
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
      // console.log(response.data);
      if (response?.data?.status === true) { 
        let bulkPayInfoDataNew = bulkPayData();
        let bulkPayInfoNew = []
        bulkPayInfoDataNew?.bulkPay?.then(value => { (bulkPayInfoNew = value) });

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
            // console.log( "old ", bulkPayInfo,  " new ", bulkPayInfoNew)
            bulkPayInfo = bulkPayInfoNew;
            setBatchName(batchName + " ")
            setModal1(false)
            setModal2(false)
            setModal3(false)
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

    let config = {};
    let data = {};
    if(type === "batch"){
      // 
      config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_API + "/batch/pay/"+ currentUser?.account + "/" + postData?.id + "/",
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
        method: 'post',
        url: process.env.REACT_APP_BASE_API + "/batch/pay/"+ currentUser?.account + "/"  + postData?.id + "/",
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
      text: postData?.name,
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
  // redirect to list for batch selected
  function itemPage(url){
    // 
    window.location.href = url
  } 
  // edit 
  function editBatchOrItem(type){
    // 
    let config = {};
    let data = {
      "name": batchName,
      "payment_method": editBatchData?.payment_method
    };
    if(type === "batch"){
      // 
      config = {
        method: 'patch',
        url: process.env.REACT_APP_BASE_API + "/batch/update/" + editBatchData?.id + "/",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentUser?.access
        },
        data: data
      };
    }
    
    Swal.fire({
      icon: 'info',
      title: 'Do you want to update the item?',
      html: `<p> ${editBatchData?.name} to ${ batchName } </p>`,
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
  
  return (

    <div className='mt-0'>
      {/* {// console.log("dateRange ", dateRange)} */}

      {/* open modal for filter date range */}
      {/* <CButton onClick={() => setModal1(!modal1)} icon={cilArrowRight} className="float-end" >Filter</CButton> */}
      <Row className='mt-0 mb-3' onClick={ (e)=> getExcelTemplate("none") } >
        <a href='#' className='d-flex'>
          <Col xs="6" sm="6" md={6} lg={6}> Download template for bulk payments. </Col>
          <Col xs="6" sm="6" md={6} lg={6} >  <CIcon icon={cilFile}  style={{float: "right"}} />  </Col>
        </a>
      </Row>
      {/* <Row className='mt-3' onClick={ (e)=> getExcelTemplate("mobile") } >
        <a href='#' className='d-flex'>
          <Col xs="6" sm="6" md={6} lg={6}> Download template for mobile money bulk payments. </Col>
          <Col xs="6" sm="6" md={6} lg={6} >  <CIcon icon={cilFile}  style={{float: "right"}} />  </Col>
        </a>
      </Row>  */}
      <br />

      <div id="filterDropdown" className="dropdown-content mb-4" onClick={(e) => setDropValue(1)}>
        <CCard sm={12} md={12} lg={12}>
          <CCardHeader>
            <CRow>
              <CCol sm={12} md={12} lg={12} > <CBadge color='secondary' onClick={(e)=>resetFilter(e)}>Reset</CBadge> <CBadge color='primary' style={{ float: "right" }} onClick={(e)=>performFilter("filterByOptions", "none")}>Apply</CBadge> </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p>Search by:</p>
            <div> 
              <p className='des-filter-inputs'>bulkPayInfo Reference</p>
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
                  fullWidth
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
                  fullWidth
                  id='filters-d'
                  value={bulkPayInfoId}
                  onChange={(e) => setbulkPayInfoId(e.target.value)} 
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
                    fullWidth
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
                    fullWidth
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
                      fullWidth
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

      {/* <Container> */}
      <Row>
          {
            currentUser?.permission_list?.includes("bulk_pay_add_edit_delete") ?
            <Col xs="12" sm="12" md={4} lg={4} >
              {/* create */}
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
                            <CIcon icon={cilPlus} className="me-2" /> Create
                          </InputAdornment>
                        ),
                      }}
                      multiline
                      />
                  </Box>
              </div>
              {/* Upload */}
              <div className="dropdown filterDrop ">
                  <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                      <TextField 
                        fullWidth
                        id="dropbtn" 
                        className='d-filters'
                        onClick={(e) => setModal1(true)} 
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" >
                              <CIcon icon={cilPlus} className="me-2" /> Upload
                            </InputAdornment>
                          ),
                        }}
                        multiline
                        />
                  </Box>
                {/* </FormControl> */}
              </div>
            </Col>
              : ""
          }

          {
            currentUser?.permission_list?.includes("bulk_pay_add_edit_delete") ?
            <Col xs="12" sm="12" md={2} lg={2} >
              {/* bulkPayInfo types */}
              <Box sx={{ minWidth: 160 }}>
                <FormControl style={{marginTop: "0px"}}>
                  <Label for="bulkPayInfoStatus" className="label-dc"> </Label>
                  <Select
                    placeholder={"Select"}
                    options={optionsStatus}
                    id="bulkPayInfoStatus"
                    className='other-input-select d-filters'
                    // components={{ Option: paymentOption }}
                    onChange={(e) => handleChangebulkPayInfoStatus(e.value)}
                  />
              
                </FormControl>
              </Box>
            </Col>
            : ""
          }
          {/* Date range */}
          <Col xs="12" sm="12" md={3} lg={3} >
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
                  style={{ width: 260, display: 'block', border: "10px solid #080808 !important"}} 
                  className="d-filters"
                  // open={openDateRange}
                  // toggle={toggle}
                  onChange={(range) => setDateRange(range || {})}
                  // ranges={dateRange}
                  // months={2}
                  id="datePicker-0"
                />
              </Box>
            {/* </FormControl> */}
          </Col>
          {/* export */}
          {
            currentUser?.permission_list?.includes("bulk_pay_add_edit_delete") ?
            <Col xs="12" sm="12" md={3} lg={3} >
              {/* export */}
              <Box sx={{ minWidth: 120}}>
                <FormControl fullWidth>
                  <Label for="bulkPayInfoExport" className="label-dc"> </Label>
                  <Select
                    placeholder={"Select export"}
                    options={optionsExport}
                    id="bulkPayInfoExport"
                    className='other-input-select d-filters float-item-media'
                    // components={{ Option: paymentOption }}
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
            <th>Batch</th>
            <th>Status</th>
            <th>Date created</th>
            <th>Date updated</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            tableData?.map((post, id) =>
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{post?.name}</td>
                <td>{post?.batch_items_count}</td>
                <td>{moment(post?.created_at).format('LLLL')}</td>
                <td>{moment(post?.updated_at).format('LLLL')}</td>
                <td>
                  {/*  */}
                  {/* <CBadge className='bg-text-wp mr-5' style={{marginRight: "5px"}} onClick={ (e) => payExecute("batch", post) }  >Pay</CBadge> 
                  <CBadge color='black' style={{marginRight: "5px"}}  onClick={ (e) => deleteBatchOrItem("batch", post) }  >Delete</CBadge>
                  <CBadge color='warning' style={{marginRight: "5px"}} onClick={ (e) => {(setModal3(true)); (setBatchName(post.name)); (setEditBatchData(post)) } }  > Edit </CBadge> */}
                  <CBadge className='bg-text-wp' onClick={()=>itemPage(`/bulk-pay/item/${post?.id}/`)}>View Batch Details </CBadge>
                  
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
      {/* modal for bulk upload */}
      <CModal visible={modal1} alignment="center" onClose={() => setModal1(false)}>
        <CModalHeader>   
        <CModalTitle> Bulk Upload </CModalTitle>
        </CModalHeader>
        <CModalBody> 
          {/*  */}
          <Row className='m-3'>
          <Col xs="12" sm="12" md={12} lg={12} className="mt-0" > 
            <div className='bulk-pay-name'  >
              <Box 
                component="form"
                noValidate
                autoComplete="off"
                >
                <Label for="bulkPayInfoStatus" className="label-dc"> Batch name </Label>
                <TextField 
                  fullWidth
                  value={batchName}                         
                  error = {batchNameError}
                  onChange={(e) => { (setBatchName(e.target.value)); (setBatchNameError(false)) }}
                  // label="Filter"
                  placeholder="Eg. my batch name"
                  style={{height: "30px !important" }}
                  
                  />
              </Box>
              </div>
          </Col>
          {/* <Col xs="12" sm="12" md={5} lg={5} className="mt-0" >
            <Label for="bulkPayInfoStatus" className="label-dc mb-1"> Payment method </Label>
            <Select
              error = {paymentMethodInfoStatusInModalError}
              placeholder={"Select"}
              options={optionsAccTypeInModal}
              id="bulkPayInfoStatus"
              className='other-input-select'
              onChange={(e) => handleChangeInfoAccTypeInModal(e.value)}
            />
          </Col> */}

          </Row>
          <Row className='m-3' style={{"border-style": "dotted", height: "90px", textAlign: "center", padding: "30px" }}>

            <Upload {...props1} maxCount={1} accept=".xls,.xlsx">
              <Button >Click to select an excel file </Button>
            </Upload>
            
          </Row>

              
        
          
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" className='text-white' onClick={(e) => setModal1(false)}> 
          Cancel
          </CButton>
          <CButton color="" className='text-white bg-text-wp' onClick={(e) => readExcelFile()}> 
          Create
          </CButton>
        </CModalFooter>
      </CModal>

      {/* modal for create batch list in app */}
      <CModal visible={modal2} alignment='center' onClose={() => setModal2(false)}>
        <CModalHeader>
          <CModalTitle>  Create </CModalTitle>
        </CModalHeader>
        <CModalBody className='contentForbulkPayInfoPrint'>
          <p className="success rounded" style={{ textAlign: "center" }} >
            {/* <h6> bulkPayInfo Details </h6> */}
          </p>
          <Row style={{ marginLeft: '-10px' }}>


            <Col xs="12" sm="12" md={6} lg={6} className="mt-0" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Batch name </Label>
                  <TextField 
                    fullWidth
                    value={batchName}                         
                    error = {batchNameError}
                    onChange={(e) => { (setBatchName(e.target.value)); (setBatchNameError(false)) }}
                    // label="Filter"
                    placeholder="Eg. my batch name"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
                </div>
            </Col>
            <Col xs="12" sm="12" md={6} lg={6} className="mt-0" >
            <Label for="bulkPayInfoStatus" className="label-dc mb-1"> Payment method </Label>
            <Select
              error = {paymentMethodInfoStatusInModalError}
              placeholder={"Select"}
              options={optionsAccTypeInModal}
              id="bulkPayInfoStatus"
              className='other-input-select' 
              onChange={(e) => handleChangeInfoAccTypeInModal(e.value)}
            />
            </Col>
          </Row>

        {/* FORMS FOR TRANSFER TO BANK BEGINS HERE */}
        {
          paymentMethodInfoStatusInModal === "bank" ?
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
                      value={accountName}
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
              <Label for="bulkPayInfoStatus" className="label-dc mb-1"> Bank Name</Label>
              <Select
                error = {bankDropdownInModalError}
                maxWidth
                placeholder={"Select bank"}
                options={optionBankList}
                id="bulkPayInfoStatus"
                className='other-input-select'
                // components={{ Option: paymentOption }}
                onChange={(e) => handleChangeBankListInModal(e.value, e.label)}
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
                      value={email}
                      onChange={(e) => {(setEmail(e.target.value)); (setEmailError(false))}}
                      // label="Filter"
                      placeholder="youremail@email.com"
                      // style={{height: "30px !important" }}
                      
                      />
                  </Box>
                </div>
              </Col>

              {/* <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Bank Code </Label>
                  <TextField
                    error = {bankCodeError} 
                    value={bankCode}
                    onChange={(e) => {(setBankCode(e.target.value)); (setBankCodeError(false))}}
                    placeholder="12032123"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col> */}
                <Col xs="12" sm="12" md={6} lg={6} className="mt-2" >
                <div className='bulk-pay-name'  >
                  <Box 
                    component="form"
                    noValidate
                    autoComplete="off"
                    >
                    <Label for="bulkPayInfoStatus" className="label-dc"> Bank Account Number </Label>
                    <TextField 
                    error = {accountNumberError}
                      // id='filters-d'
                      value={accountNumber}
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
                      error = {amountError} 
                      // id='filters-d'
                      value={amount}
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
                      error = {noteError}
                      // id='filters-d'
                      value={note}
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
          paymentMethodInfoStatusInModal === "mobile" ?
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
                      value={momoAccountName}
                      onChange={(e) => {(setMomoAccountName(e.target.value)); (setMomoAccountNameError(false))}}

                      // label="Filter"
                      placeholder="Patrick Wunake"
                      style={{height: "30px !important" }}
                      
                      />
                  </Box>
                </div>
              </Col>

              <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <Label for="bulkPayInfoStatus" className="label-dc mb-1"> Network Name</Label>
              <Select
                // value={networkName}
                error = {networkNameError}
                maxWidth
                placeholder={"Select network"}
                options={optionMobileMoneyList}
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
                      value={telcoEmail}
                      onChange={(e) => {(setTelcoEmail(e.target.value)); (setTelcoEmailError(false))}}
                      // label="Filter"
                      placeholder="youremail@email.com"
                      style={{height: "30px !important" }}
                      
                      />
                  </Box>
                </div>
              </Col>

              
              {/* <Col xs="12" sm="12" md={6} lg={6} className="mt-2" > 
              <div className='bulk-pay-name'  >
                <Box 
                  component="form"
                  noValidate
                  autoComplete="off"
                  >
                  <Label for="bulkPayInfoStatus" className="label-dc"> Network Code </Label>
                  <TextField 
                    error = {networkCodeError}
                    // id='filters-d'
                    value={networkCode}
                    onChange={(e) => {(setNetworkCode(e.target.value)); (setNetworkCodeError(false))}}

                    // label="Filter"
                    placeholder="12032123"
                    style={{height: "30px !important" }}
                    
                    />
                </Box>
              </div>
              </Col> */}
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
                    value={phoneNumber}
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
                    fullWidth
                    value={telcoAmount}
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
                    fullWidth
                    error = {noteError}
                    // id='filters-d'
                    value={telcoNote}
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
          : "" }
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
            Create
          </CButton>

        </CModalFooter>
      </CModal>


      {/* modal for create batch list in app */}
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
                    fullWidth
                    value={batchName}               
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
          onClick={(e)=>editBatchOrItem("batch")}
          >
            Save
          </CButton>

        </CModalFooter>
      </CModal>

    </div>
  )
}

export default BulkpayDataTables;