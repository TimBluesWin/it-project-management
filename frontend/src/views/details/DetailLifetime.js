import React from 'react'

import { CCol, CRow } from '@coreui/react'

import {
  FetchLifecycle,
  FetchLifetime,
  FetchNotWorking,
  FetchIssues,
} from 'src/components/FetchFromAPI'

const DetailLifetime = () => {
  return (
    <>
      <CRow>
        <CCol md="6">
          <FetchLifecycle />
        </CCol>
        <CCol md="6">
          <FetchNotWorking />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="6">
          <FetchIssues />
        </CCol>
        <CCol md="6">
          <FetchLifetime />
        </CCol>
      </CRow>
    </>
  )
}

export default DetailLifetime
