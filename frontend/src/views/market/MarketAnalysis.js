import React, { useState } from 'react'

import { CCol, CRow } from '@coreui/react'

import {
  MemoryInput,
  CPUInput,
  DisplayInput,
  GraphicsInput,
  StorageInput,
  OperatingSystemInput,
} from 'src/components/ComparisonFormElements'

const MarketAnalysis = () => {
  const [formInputData, setFormInputData] = useState({
    memory: [],
    cpu: [],
    display: [],
    graphics: [],
    storage: [],
    os: [],
  })

  function handleMemoryChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    setFormInputData({ ...formInputData, memory: newValuesArr })
  }

  function handleCpuChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    setFormInputData({ ...formInputData, cpu: newValuesArr })
  }

  function handleDisplayChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    setFormInputData({ ...formInputData, display: newValuesArr })
  }

  function handleGraphicsChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    setFormInputData({ ...formInputData, graphics: newValuesArr })
  }

  function handleStorageChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    setFormInputData({ ...formInputData, storage: newValuesArr })
  }

  function handleOSChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    setFormInputData({ ...formInputData, os: newValuesArr })
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
          <form className="card p-3 bg-white">
            <div className="mb-3">
              <p>Price range:</p>
            </div>
            <div className="mb-3">
              <label htmlFor="memory-label" className="form-label">
                Memory:
              </label>
              <MemoryInput handleChange={handleMemoryChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="cpu-label" className="form-label">
                CPU:
              </label>
              <CPUInput handleChange={handleCpuChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="graphics-label" className="form-label">
                Graphics:
              </label>
              <GraphicsInput handleChange={handleGraphicsChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="display-label" className="form-label">
                Display:
              </label>
              <DisplayInput handleChange={handleDisplayChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="storage-label" className="form-label">
                Storage:
              </label>
              <StorageInput handleChange={handleStorageChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="os-label" className="form-label">
                Operating System
              </label>
              <OperatingSystemInput handleChange={handleOSChange} />
            </div>
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
