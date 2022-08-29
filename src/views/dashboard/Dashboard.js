import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import moment from 'moment';

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

// import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import Datatable from '../datatable/DatatableMain'
import { getTransactionData } from './DashboardData'
import { getSessionTimeout } from '../../Utils/Utils'; 

const Dashboard = () => {
  const [transactionDetails, setTransactionDetails] = useState(null)
  const [summaryDetails, setSummaryDetails] = useState(null)

  useEffect(() => {
    // 
    let transactionData = getTransactionData();
    transactionData?.transaction?.then(value => { setTransactionDetails(value) });
    trackActivity();
    
    let summaryData = getTransactionData();
    summaryData?.summary?.then(value => { setSummaryDetails(value) });
   
  }, [])
  // // console.log("summarry ", summaryDetails)

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'Total Transaction', value: '29', percent: 40, color: 'success' },
    { title: 'Unique Transaction', value: '24', percent: 20, color: 'info' },
    // { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    // { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    // { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]


  function trackActivity() {
    // e.preventDefault();
    getSessionTimeout();
    const currentUser_new = JSON.parse(localStorage.getItem("userDataStore"));    
    if(currentUser_new){
      currentUser_new["timeLogout"] = new Date().getTime() + currentUser_new?.counter;
      localStorage.setItem('userDataStore', JSON.stringify(currentUser_new))
    }
  }

  window.onclick = function (event) {
    // event.preventDefault()
    trackActivity()
  }

  return (
    <>
      {/* Transaction  */}
      {/* <WidgetsDropdown /> */}
      {/* <WidgetsBrand withCharts /> */}

      <CRow>
        <CCol xs={12} sm={12} md={9} xl={9} style={{float: "left!important"}}>

          <CCard className="mb-0">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Recent Activity
                  </h4>
                  {/* <div className="small text-medium-emphasis">January - July 2021</div> */}
                </CCol>
              </CRow>

              <CChartLine
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                      borderColor: getStyle('--cui-info'),
                      pointHoverBackgroundColor: getStyle('--cui-info'),
                      borderWidth: 2,
                      data: [
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                      ],
                      fill: true,
                    },
                    {
                      label: 'My Second dataset',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-success'),
                      pointHoverBackgroundColor: getStyle('--cui-success'),
                      borderWidth: 2,
                      data: [
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                      ],
                    },
                    {
                      label: 'My Third dataset',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-danger'),
                      pointHoverBackgroundColor: getStyle('--cui-danger'),
                      borderWidth: 1,
                      borderDash: [8, 5],
                      data: [65, 65, 65, 65, 65, 65, 65],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    y: {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                        max: 250,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
              />
            </CCardBody> 
            <CCardFooter>
              <CRow xs={{ cols: 1 }} md={{ cols: 4 }} className="text-center">
                {progressExample.map((item, index) => (
                  <CCol className="mb-sm-6 mb-3" key={index}>
                    <div className="text-medium-emphasis">{item.title}</div>
                    <strong>
                      {item.value} ({item.percent}%)
                    </strong>
                    <CProgress thin className="mt-2" color={item.color} value={item.percent} />
                  </CCol>
                ))}
              </CRow>
            </CCardFooter>
          </CCard>
          <Datatable transactionDetails={transactionDetails} />
        </CCol>

        <CCol xs={12} sm={12} md={3} xl={3} style={{float: "right" }}>
          <CCard className="mb-4">
              <CCardHeader> Quick Overview </CCardHeader>
          </CCard>
          <div style={{ height: "69em", "overflowY": "auto", whiteSpace: "nowrap" }}>
            {/*  */}
            



            <CCard className="mb-4">
                  <CCardBody>
                    <div className="border-start border-start-4 border-start-primary py-1 px-3">
                      <div className="text-medium-emphasis small"> {"TODAY'S "}COLLECTION</div>
                      <div className="fs-5 fw-semibold">
                        {summaryDetails?.currency} {summaryDetails?.todays_collections_amount || 0.00}
                      </div>
                      <div className="text-medium-emphasis small">COUNT {summaryDetails?.todays_collections_count || 0}</div>
                    </div>
                  </CCardBody>
              </CCard>

              <CCard className="mb-4">
                  <CCardBody>
                    <div className="border-start border-start-4 border-start-danger py-1 px-3">
                      <div className="text-medium-emphasis small">LAST PAYOUT</div>
                      <div className="fs-5 fw-semibold">
                        {summaryDetails?.currency} {summaryDetails?.last_payout_amount || 0.00}
                      </div>
                      <div className="text-medium-emphasis small">COUNT {summaryDetails?.last_payout_count || 0}</div>
                      <div className="text-medium-emphasis small"> {moment(summaryDetails?.last_payout_date || new Date()).format("MMM Do YYYY") }</div>
                      
                    </div>
                  </CCardBody>
              </CCard>
              <CCard className="mb-4">
                  <CCardBody>
                    <div className="border-start border-start-4 border-start-warning py-1 px-3">
                      <div className="text-medium-emphasis small">NEXT PAYOUT</div>
                      <div className="fs-5 fw-semibold">
                        {summaryDetails?.currency} {summaryDetails?.next_payout_amount || 0.00}
                      </div>
                      <div className="text-medium-emphasis small">COUNT {summaryDetails?.next_payout_count || 0}</div>
                      <div className="text-medium-emphasis small"> {moment(summaryDetails?.next_payout_date || new Date()).format("MMM Do YYYY") }</div>
                    </div>
                  </CCardBody>
              </CCard>

          </div>

          {/* <hr className="mt-0" /> */}
        </CCol>

        {/* <CCol xs>
          <CCard className="mb-4">
            <CCardHeader> {' & '} Sales</CCardHeader>
            <CCardBody>

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                    <CTableHeaderCell>Usage</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last login</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol> */}
      </CRow>
    </>
  )
}

export default Dashboard
