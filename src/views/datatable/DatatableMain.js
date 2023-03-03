import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import './table.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
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
  CTooltip,
} from '@coreui/react'
import { getTransactionData } from '../dashboard/DashboardData';
import { cilX, cilCheckCircle } from '@coreui/icons';
import ViewDetails from './ViewDetails';
import CIcon from '@coreui/icons-react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';

let transactionData = getTransactionData();
let transaction = []
transactionData?.transaction?.then(value => { (transaction = value) } );

const DatatableMain = (transactionDetails) => {
  const [loader, setLoader] = useState('<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>')
  const [tableData, setTableData] = useState([]);
  const [monitaState, setMonitaState] = useState(1);

  // date time
  const [dateTo, setDateTo] = useState(new Date('2014-08-18T21:11:54'));
  const [dateFrom, setDateFrom] = useState(new Date('2014-08-18T21:11:54'));

  // modals
  // filer transaction
  const [modal1, setModal1] = useState(false)
  // view single transaction 
  const [modal2, setModal2] = useState(false)

  const [viewData, setViewData] = useState({})
  useEffect(() => {
    
    if(transaction?.length > 0 && monitaState === 1){
      setMonitaState(2)
      datatablaScript(transaction);

      setLoader('<a></a>')
    }
    else{
      setTimeout(()=> {
        // 
        setLoader('<a></a>')
      }, 4000);
    }
    // console.log("props ", transaction)
  }, [transaction])

  // perform filter 
  function datatablaScript(tdata) {
    let printCounter = 0;

    setTableData(tdata.filter((post, id)=>{return id < 5}));
    $('#myTable').DataTable().destroy();

    setTimeout(()=>{

      $('#myTable').DataTable(
        {
          // data: transaction,
          columnDefs: [
            { "width": "10%", "targets": 2 }
          ],
          processing: true,
          deferLoading: true,
          keys: true,
          // dom: 'Blfrtip',
          paging: false,
          searching: false,
          // "dom": 't<"bottom"if><"clear">',
          // scrollY: 200,
          deferRender: false,
          scroller: false,
  
        }
      );
    }, 0);
  }
  
  function getFilterData(e){
    // 
    e.preventDefault();
    // console.log("post tableData ", tableData);
    // transaction = posts;
    try {
      // setTableData(posts);
      let newFilterData = transactionDetails?.transactionDetails.filter((post)=> { return moment(post.created_at).format('LLLL') <= moment(dateFrom).format('LLLL') })
      // // console.log("post tableData ", transactionDetails?.transactionDetails);
      // console.log("post tableData ", newFilterData);
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
  function printContent(){
      let w=window.open();

      $(".bg-text-wp").css("background-color", "#0a0463");
      $(".bg-text-wp").css("color", "#fff");
      $(".bg-text-wp").css("text-align", "center");
      $(".icon-wp").css("border-radius", "100%");
      $(".icon-wp").css("width", "15%");
      $(".viewDescription").css("font-size", "1.2rem");
      // $(".viewDescription").css("box-shadow", "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)");
      $(".viewDescription").css("font-family", "Roboto","Helvetica","Arial", "sans-serif");
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
  return (
    <div>
      {/* open modal for filter date range */}
      {/* <CButton onClick={() => setModal1(!modal1)} icon={cilArrowRight} className="float-end" >Filter</CButton> */}
      <br /><br />


      {/* {dateTo.toString()}{" rrr "}{dateFrom.toString()} */}

      <table id="myTable" className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>No.</th>
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
                <td><CBadge color={post.status_code === "SUCCESSFUL" ? "success" : (post.status_code === "PENDING" ? "primary" : (post.status_code === "REVERSED" ? "danger" : "secondary") )}>{post.status_code}</CBadge> </td>
                <td>{moment(post.created_at).format('LLLL')}</td>
                <td>{post.amount}</td>
                <td onClick={()=>{setModal2(true); setViewData(post)}}><CBadge className='bg-text-wp'>View</CBadge></td>
              </tr>            
          )}
          {/* <tr>
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
            <td>61</td>
            <td>2011-04-25</td>
            <td>$320,800</td>
          </tr> */}
        </tbody>
      </table>
      {tableData?.length > 0 ? "" : <p style={{textAlign: "center"}}> <br /><br /> No data</p>}
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
          <CButton color="" className='text-white bg-text-wp'  onClick={(e)=>getFilterData(e)}> Apply</CButton>
        </CModalFooter>
      </CModal>

      {/* modal for filter date range */}
      <CModal visible={modal2} scrollable backdrop="static" fullscreen="xl" onClose={() => setModal2(false)}>
        <CModalHeader>
          <CModalTitle>  </CModalTitle>
        </CModalHeader>
        <CModalBody className='contentForTransactionPrint'>
          <p className="success rounded" style={{textAlign: "center"}} > 
            <h2> Transaction Details </h2>
            <CIcon icon={cilCheckCircle} className="bg-text-wp icon-wp" width="15%"/>
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

export default DatatableMain
