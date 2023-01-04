import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { CCol, CRow } from '@coreui/react'

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
    </>
  )
}

export default Results
