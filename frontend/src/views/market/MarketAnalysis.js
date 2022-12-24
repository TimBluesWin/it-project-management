import React, { useState } from 'react'

import { CCol, CRow } from '@coreui/react'

import { MemoryInput, CPUInput } from 'src/components/ComparisonFormElements'
import PropTypes from 'prop-types'

const MarketAnalysis = () => {
  const [formInputData, setFormInputData] = useState({
    memory: [],
    cpu: [],
  })

  function handleMemoryChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    setFormInputData({ memory: newValuesArr })
  }

  function handleCpuChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    setFormInputData({ cpu: newValuesArr })
  }

  const handleFormSubmit = (evnt) => {
    evnt.preventDefault()
    const checkEmptyInput = !Object.values(formInputData).every((res) => res === '')
    if (checkEmptyInput) {
      console.log(formInputData)
    }
    // -- Timmy --
    // Generate URL for the next page. 
    // Technically we can use DangerouslySetInnerHTML, but it's unsafe.
    // So decide to just use separate page to show the recommendations.
  }

  return (
    <>
      <CRow>
        <CCol md="12">
          <form>
            <label>Memory:</label>
            <MemoryInput handleChange={handleMemoryChange} />
            <br></br>
            <label>CPU:</label>
            <CPUInput />
            <br></br>
            <p>Price range:</p>
            <button type="submit" onClick={handleFormSubmit} className="btn btn-success">
              Go green!
            </button>
          </form>
        </CCol>
      </CRow>
    </>
  )
}

export default MarketAnalysis
