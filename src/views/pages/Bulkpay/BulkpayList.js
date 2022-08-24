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
import BulkpayItemListDataTables from './BulkpayItemListDataTables'

// let transactionData = getTransactionData();
// let transaction = []
// transactionData?.transaction?.then(value => { (transaction = value) });

const BulkpayList = () => {

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
            <BulkpayItemListDataTables apikeyDetails={[]} />

        </div>
    )
}

export default BulkpayList;