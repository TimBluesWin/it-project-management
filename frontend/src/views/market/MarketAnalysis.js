import React from 'react'

import { CCol, CRow } from '@coreui/react'

import { MemoryInput, CPUInput } from 'src/components/ComparisonFormElements'

const MarketAnalysis = () => {
  return (
    <>
      <CRow>
        <CCol md="12">
          <form>
            <label>Memory:</label>
            <MemoryInput />
            <br></br>
            <label>CPU:</label>
            <CPUInput />
            <br></br>
            <p>Price range:</p>
            <button type="submit" className="btn btn-success">
              Go green!
            </button>
          </form>
        </CCol>
      </CRow>
    </>
  )
}

export default MarketAnalysis
