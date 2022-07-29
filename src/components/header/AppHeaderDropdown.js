import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  // CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  // cilBell,
  cilCreditCard,
  // cilCommentSquare,
  cilEnvelopeOpen,
  // cilFile,
  cilLockLocked,
  // cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import $ from 'jquery'
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = (userData) => {
  function logoutUser(){
    window.location.href="/login";
    localStorage.removeItem("userDataStore");
 
  }

// $(document).ready(function () {
//     window.addEventListener('storage', function(event){

//       console.log("storage ")
//     });
    
// });


  return (
    <CDropdown variant="nav">
      <CDropdownToggle placement="bottom-end" className="p-0 profile-img" caret={false}>
        <CAvatar src={(process.env.REACT_APP_MAIN_BASE + userData?.userData?.photo150) || avatar8} size="md" alt="user image"/>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">User Profile</CDropdownHeader>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem> */}
        {
          // console.log("userData ", process.env.REACT_APP_MAIN_BASE + userData?.userData?.photo50, userData?.userData)
        }
        <CDropdownItem>
          <CIcon icon={cilCreditCard} className="me-2" />
          {userData?.userData?.firstname + " " + userData?.userData?.lastname + " " + userData?.userData?.other_names}
        </CDropdownItem>
        <CDropdownItem>
          <CIcon icon={cilUser} className="me-2" />
          {userData?.userData?.phone}
        </CDropdownItem>
        <CDropdownItem>
          <CIcon icon={cilTask} className="me-2" />
          {userData?.userData?.nationalId || "ID not available"}
        </CDropdownItem>
        <CDropdownItem onClick={(e)=>logoutUser()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          <CBadge className="ms-2 bg-text-wp">
          Logout
          </CBadge>
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
