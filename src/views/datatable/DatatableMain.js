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
import './table.css'
import moment from 'moment';
import { CBadge } from '@coreui/react';
import { getTransactionData } from '../dashboard/DashboardData';

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
transactionData?.transaction?.then(value => { (transaction = value) } );

const DatatableMain = (transactionDetails) => {
  const [loader, setLoader] = useState('<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>')
  // console.log("props ", transaction)
  // let transaction = transactionDetails?.transactionDetails;
  useEffect(() => {
    // if(transaction?.length > 0){
      datatablaScript();
      setLoader('<a></a>')
    // }
  }, [transaction])

  function datatablaScript() {
    let printCounter = 0
    $('#myTable').DataTable( 
      {     
        keys: true,   
        dom: 'Blfrtip',
        page: 'current',
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
              customize: function (anytype)
              {
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
              customize: function (anytype)
              {
                  let sheet = anytype.xl.worksheets['wingipaytransaction.pdf'];
                  $('row:first c', sheet).attr('s', '7');
              }
          }
      ],
        scrollY: 200,
        deferRender: true,
        scroller: true, 
    
      } 
    );

  
  }


  return (
    <div>
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
            posts?.map((post, id) => 
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{post.id}</td>
                <td>{post.note}</td>
                <td><CBadge color= {post.status_code === "SUCCESSFUL" ? "success" : (post.status_code === "PENDING" ? "primary" : "secondary")}>{post.status_code}</CBadge> </td>
                <td>{moment(post.created_at).format('LLLL')}</td>
                <td>{post.amount}</td>
                <td>View</td>
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

      <a dangerouslySetInnerHTML={{ __html: loader }}></a>
    </div>
  )
}

export default DatatableMain
