import axios from "axios";



const userData = JSON.parse(localStorage.getItem("userDataStore"));

export function getSchData(){

    // /939e8b7b-ce5c-421f-b635-a88dc14fcb32/ 
    let data = '';
    let config_sch = {
        method: 'get',
        url: process.env.REACT_APP_BASE_API + "/admission/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData?.access
        },
        data: data
    };

    function schDetails(){
        return axios(config_sch).then(response => {
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
        "sch": schDetails(),
    }
}