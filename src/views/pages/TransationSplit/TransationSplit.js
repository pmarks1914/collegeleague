import React from 'react';

const TransationSplit = () => {



  function trackActivity() {
    // e.preventDefault();
    // getSessionTimeout();
    const currentUser_new = JSON.parse(localStorage.getItem("userDataStore"));
    if(currentUser_new){
        currentUser_new["timeLogout"] = new Date().getTime() + currentUser_new?.counter;
        localStorage.setItem('userDataStore', JSON.stringify(currentUser_new))
      }
  };

  window.onclick = function (event) {
    event.preventDefault()
    // trackActivity()
  }
    return (
        <div>
            
        </div>
    );
};

export default TransationSplit;