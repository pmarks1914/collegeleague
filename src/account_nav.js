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
  cilMoon,
  cilPeople,
  cilUser,
  cilSpeech,
  cilSpeedometer,
  cilStar,
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
    name: 'PAYMENTS',
    items: [
      {
        component: CNavItem,
        name: 'Transaction',
        to: '/payment/transaction',
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
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
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Payouts',
        to: '/payment/payout',
        icon: <CIcon icon={cilMoon} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Payouts',
        to: '/payment/payout',
        icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Subaccounts',
        to: '/payment/subaccount',
        icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Dispute',
        to: '/payment/dispute',
        icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  
]

export default account_nav
