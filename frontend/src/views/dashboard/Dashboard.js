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

export const dataNotWorkingModels = [
  ['Models', 'Number'],
  ['Model 1', 4],
  ['Model 2', 2],
  ['Model 2', 3],
]

export const optionsNotWorkingModels = {
  title: 'Not Working Models',
  is3D: false,
  backgroundColor: 'transparent',
  titleTextStyle: {
    fontSize: 25,
    bold: true,
  },
}

export const dataModelIssues = [
  ['Model', 'Issues'],
  ['Brand 1', 5], // RGB value
  ['Brand 2', 3], // English color name
  ['Brand 3', 6],
]

export const optionsModelIssues = {
  title: 'Number of Issues by model',
  hAxis: {
    title: 'Model',
  },
  vAxis: {
    title: 'Number of Issues',
  },
  backgroundColor: 'transparent',
}

export const dataAverageLifetime = [
  ['Model', 'Lifetime'],
  ['Brand 1', 5], // RGB value
  ['Brand 2', 3], // English color name
  ['Brand 3', 6],
]

export const optionsAverageLifetime = {
  title: 'Average Lifetime In Years',
  hAxis: {
    title: 'Model',
  },
  vAxis: {
    title: 'Lifetime (years)',
  },
  backgroundColor: 'transparent',
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
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={dataNotWorkingModels}
            options={optionsNotWorkingModels}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="6">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={dataModelIssues}
            options={optionsModelIssues}
          />
        </CCol>
        <CCol md="6">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={dataAverageLifetime}
            options={optionsAverageLifetime}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
