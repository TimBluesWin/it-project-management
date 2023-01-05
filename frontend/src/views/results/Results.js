import React, { useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { CCol, CRow, CButton } from '@coreui/react'

import { RecommendedLaptop } from 'src/components/RecommendedLaptop'

const Results = () => {
  const search = useLocation()
  const states = search.state
  let baseURLCheapest = 'http://localhost:8000/api/cheapest_laptop'
  let baseURLGreenest = 'http://localhost:8000/api/best_green_laptop'
  let baseURLBoth = 'http://localhost:8000/api/best_overall_laptop'
  let iterator = 1
  for (const [key, value] of Object.entries(states)) {
    if (value.length > 0) {
      let newValue = value.split('|')
      for (let i in newValue) {
        if (iterator === 1) {
          baseURLCheapest = baseURLCheapest + '?' + key + '=' + newValue[i]
          baseURLGreenest = baseURLGreenest + '?' + key + '=' + newValue[i]
          baseURLBoth = baseURLBoth + '?' + key + '=' + newValue[i]
        } else {
          baseURLCheapest = baseURLCheapest + '&' + key + '=' + newValue[i]
          baseURLGreenest = baseURLGreenest + '&' + key + '=' + newValue[i]
          baseURLBoth = baseURLBoth + '&' + key + '=' + newValue[i]
        }
        iterator = iterator + 1
      }
    }
  }

  const navigate = useNavigate()
  const routeChange = () => {
    let path = '/market/market-analysis'
    navigate(path)
  }

  return (
    <>
      <CRow>
        <CCol md="4">
          <RecommendedLaptop url={baseURLCheapest} title="BEST CHEAPEST LAPTOP"></RecommendedLaptop>
        </CCol>
        <CCol md="4">
          <RecommendedLaptop url={baseURLGreenest} title="BEST GREENEST LAPTOP"></RecommendedLaptop>
        </CCol>
        <CCol md="4">
          <RecommendedLaptop url={baseURLBoth} title="BEST OVERALL LAPTOP"></RecommendedLaptop>
        </CCol>
      </CRow>
      <div className="d-grid gap-2 mt-3 mb-3">
        <CButton color="success" onClick={routeChange}>
          Search again!
        </CButton>
      </div>
    </>
  )
}

export default Results
