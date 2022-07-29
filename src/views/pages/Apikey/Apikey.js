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
import '../../datatable/table.css';
import { apikeyData } from '../Data/PageData';
import ApikeyDataTables from './ApikeyDataTables'

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

// let transactionData = getTransactionData();
// let transaction = []
// transactionData?.transaction?.then(value => { (transaction = value) });

const Apikey = () => {
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
    const [apikeyDetails, setApikeyDetails] = useState(null)

    useEffect(() => { 
        // 
        let apikey_data = apikeyData();
        apikey_data?.apikey?.then(value => { setApikeyDetails(value) });

    }, [])


    return (
        <div>
            {/* open modal for filter date range */}
            {/* <CButton onClick={() => setModal1(!modal1)} icon={cilArrowRight} className="float-end" >Filter</CButton> */}
            <br /><br />
            <ApikeyDataTables apikeyDetails={apikeyDetails} />

        </div>
    )
}

export default Apikey;