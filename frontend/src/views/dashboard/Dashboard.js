import React from 'react'
import { Chart } from 'react-google-charts'

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
import CIcon from '@coreui/icons-react'
import { CChart } from '@coreui/react-chartjs'

export const dataActiveComputers = [
  ['Active / Inactive Computers', 'Number'],
  ['Active', 11],
  ['Inactive', 2],
]

export const optionsActiveComputers = {
  title: 'Active / Inactive Computers',
  pieHole: 0.4,
  is3D: false,
  backgroundColor: 'transparent',
  titleTextStyle: {
    fontSize: 25,
    bold: true,
  },
}

const Dashboard = () => {
  return (
    <>
      <CRow>
        <CCol md="6">
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={dataActiveComputers}
            options={optionsActiveComputers}
          />
        </CCol>
        <CCol md="6">
          <p>Lorem Ipsum</p>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="6">
          <p>Lorem Ipsum</p>
        </CCol>
        <CCol md="6">
          <p>Lorem Ipsum</p>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
