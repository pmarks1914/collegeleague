 import axios from "axios";
import React from "react";


let loader = '<div class="spinner-border dashboard-loader" style="color: #e0922f;"></div>'
const userData = JSON.parse(localStorage.getItem("userDataStore"));

export function getTransactionData(){

    // /939e8b7b-ce5c-421f-b635-a88dc14fcb32/
    let data = '';
    let config_transaction = {
        method: 'get',
        url: process.env.REACT_APP_BASE_API + "/transaction/historyByBusiness/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData?.access
        },
        data: data
    };

    function transactionDetails(){
        return axios(config_transaction).then(response => {
            // // console.log("data ==", response?.data);
            if (response.status === 200) {
                //  
                if(response?.data){loader = "<a></>";}
                return response.data;
            }
            return

        }).catch(function (error) {
            loader = "<a></>";
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
        }
        );

    }
    
    return {
        "transaction": transactionDetails()
    }
}
export function refundData(){

    <a dangerouslySetInnerHTML={{ __html: loader }}></a>
    // /939e8b7b-ce5c-421f-b635-a88dc14fcb32/
    let data = '';
    let config_transaction = {
        method: 'get',
        url: process.env.REACT_APP_BASE_API + "/transactions/refunds/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData?.access
        },
        data: data
    };

    function refundDetails(){
        return axios(config_transaction).then(response => {
            // // console.log("data ==", response?.data);
            if (response.status === 200) {
                //  
                if(response?.data){loader = "<a></>";}
                return response.data;
            }
            return

        }).catch(function (error) {
            loader = "<a></>";
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
        }
        );

    }
    
    return {
        "refund": refundDetails()
    }
}
export function apikeyData(){

    // /939e8b7b-ce5c-421f-b635-a88dc14fcb32/

    let data = '';
    let config_transaction = {
        method: 'get',
        url: process.env.REACT_APP_BASE_API + "/account/apikeys/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData?.access
        },
        data: data
    };

    function apikeyDetails(){
        <a dangerouslySetInnerHTML={{ __html: loader }}></a>
        return axios(config_transaction).then(response => {
            // // console.log("data ==", response?.data);
            if (response.status === 200) {
                // 
                if(response?.data){loader = "<a></>";}
                
                <a dangerouslySetInnerHTML={{ __html: loader }}></a>;
                return response.data;
            }
            return

        }).catch(function (error) {
            loader = "<a></>";
            <a dangerouslySetInnerHTML={{ __html: loader }}></a>;
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
        }
        );

    }
    
    return {
        "apikey": apikeyDetails()
    }
}
export function payoutData(){

    // /939e8b7b-ce5c-421f-b635-a88dc14fcb32/
    let data = '';
    let config_transaction = {
        method: 'get',
        url: process.env.REACT_APP_BASE_API + "/transactions/payouts/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData?.access
        },
        data: data
    };

    function payoutDetails(){
        return axios(config_transaction).then(response => {
            // // console.log("data ==", response?.data);
            if (response.status === 200) {
                // 
                return response.data;
            }
            return

        }).catch(function (error) {

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
        }
        );

    }
    
    return {
        "payout": payoutDetails()
    }
}
export function getbanksandtelcos(){

    // /939e8b7b-ce5c-421f-b635-a88dc14fcb32/
    let data = '';
    let config_transaction = {
        method: 'get',
        url: process.env.REACT_APP_BASE_API + "/service/list/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData?.access
        },
        data: data
    };

    let dataSource = axios(config_transaction).then(response => {
        // console.log("data ==", response?.data);
        <a dangerouslySetInnerHTML={{ __html: loader }}></a>
        if (response.status === 200) {
            // 
            if(response?.data){loader = "<a></>";}
                
            <a dangerouslySetInnerHTML={{ __html: loader }}></a>;
            return response.data;
        }
        return

    }).catch(function (error) {

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
    }
    );
    
    return {
        "list": dataSource
    }
}

export function bulkPayData(){

    // /939e8b7b-ce5c-421f-b635-a88dc14fcb32/

    let data = '';
    let config_transaction = {
        method: 'get',
        url: process.env.REACT_APP_BASE_API + "/batch/list/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData?.access
        },
        data: data
    };

    function bulkPayDetails(){
        <a dangerouslySetInnerHTML={{ __html: loader }}></a>
        return axios(config_transaction).then(response => {
            // console.log("data ==", response?.data?.data);
            if (response.data.data) {
                // 
                if(response?.data){loader = "<a></>";}
                
                <a dangerouslySetInnerHTML={{ __html: loader }}></a>;
                return response.data.data;
            }
            return

        }).catch(function (error) {
            loader = "<a></>";
            <a dangerouslySetInnerHTML={{ __html: loader }}></a>;
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
        }
        );

    }
    
    return {
        "bulkPay": bulkPayDetails()
    }
}
export function bulkPayItemData(id){

    // /939e8b7b-ce5c-421f-b635-a88dc14fcb32/

    let data = '';
    let config_transaction = {
        method: 'get',
        url: process.env.REACT_APP_BASE_API + "/batch/detail/" + id + "/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData?.access
        },
        data: data
    };

    function bulkPayItemDetails(){
        <a dangerouslySetInnerHTML={{ __html: loader }}></a>
        return axios(config_transaction).then(response => {
            // console.log("data ==", response?.data);
            if (response.data.status) {
                // 
                if(response?.data){loader = "<a></>";}
                
                <a dangerouslySetInnerHTML={{ __html: loader }}></a>;
                return response.data;
            }
            else{
                setTimeout(()=>{
                    window.location.href = '/bulk-pay'
                }, 3000)
            }
            return

        }).catch(function (error) {
            loader = "<a></>";
            <a dangerouslySetInnerHTML={{ __html: loader }}></a>;
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
        }
        );

    }
    
    return {
        "bulkPayItems": bulkPayItemDetails()
    }
}


export function paymentLinkData(){
    let data = '';
    let config_transaction = {
        method: 'get',
        url: process.env.REACT_APP_BASE_API + "/payment/links/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData?.access
        },
        data: data
    };

    function paymentLinkDetails(){
        <a dangerouslySetInnerHTML={{ __html: loader }}></a>
        return axios(config_transaction).then(response => {
            // console.log("data ==", response?.data?.data);
            if (response.data.data) {
                // 
                if(response?.data){loader = "<a></>";}
                
                <a dangerouslySetInnerHTML={{ __html: loader }}></a>;
                return response.data.data;
            }
            return

        }).catch(function (error) {
            loader = "<a></>";
            <a dangerouslySetInnerHTML={{ __html: loader }}></a>;
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
        }
        );

    }
    
    return {
        "paymentLink": paymentLinkDetails()
    }
}
