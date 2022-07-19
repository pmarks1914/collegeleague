import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilEco,
  cilMoney,
  cilPeople,
  cilTransfer,
  cilMediaSkipForward,
  cilTriangle,
  cilReload,
  cilWallet,
  cilDataTransferUp,
  cilUser,
  cilSmilePlus,
  cilSpeedometer,
  cilStar,
  cilTablet,
  cilLibrary,
  cilControl,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const account_nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavGroup,
    name: 'Payments',
    items: [
      {
        component: CNavItem,
        name: 'Transaction',
        to: '/payment/transaction',
        icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Customers',
        to: '/payment/customers',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Refunds',
        to: '/payment/refund',
        icon: <CIcon icon={cilReload} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Transaction Splits',
        to: '/payment/transaction-split',
        icon: <CIcon icon={cilEco} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Payouts',
        to: '/payment/payout',
        icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Subaccounts',
        to: '/payment/subaccount',
        icon: <CIcon icon={cilTriangle} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Dispute',
        to: '/payment/dispute',
        icon: <CIcon icon={cilDataTransferUp} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Transfers',
    items: [
      {
        component: CNavItem,
        name: 'Transfers',
        to: '/transfer/transfer',
        icon: <CIcon icon={cilMediaSkipForward} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Recipients',
        to: '/transfer/recipient',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Balance',
        to: '/transfer/balance',
        icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Compliance',
    to: '/compliance',
    icon: <CIcon icon={cilControl} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Api keys',
    to: '/api-keys',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
  
]

export default account_nav
