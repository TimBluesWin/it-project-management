import React, { useState } from 'react'

import { CCol, CRow } from '@coreui/react'

import { useNavigate } from 'react-router-dom'

import {
  MemoryInput,
  CPUInput,
  DisplayInput,
  GraphicsInput,
  StorageInput,
  OperatingSystemInput,
  PriceInput,
} from 'src/components/ComparisonFormElements'

const MarketAnalysis = () => {
  const [formInputData, setFormInputData] = useState({
    memory: [],
    processor: [],
    display: [],
    graphics: [],
    storage: [],
    os: [],
    minPrice: '',
    maxPrice: '',
  })

  const navigate = useNavigate()

  function handleMemoryChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    const newValues = newValuesArr.join('|')
    setFormInputData({ ...formInputData, memory: newValues })
  }

  function handleCpuChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    const newValues = newValuesArr.join('|')
    setFormInputData({ ...formInputData, processor: newValues })
  }

  function handleDisplayChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    const newValues = newValuesArr.join('|')
    setFormInputData({ ...formInputData, display: newValues })
  }

  function handleGraphicsChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    const newValues = newValuesArr.join('|')
    setFormInputData({ ...formInputData, graphics: newValues })
  }

  function handleStorageChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    const newValues = newValuesArr.join('|')
    setFormInputData({ ...formInputData, storage: newValues })
  }

  function handleOSChange(newValue, actionMeta) {
    const newValuesArr = newValue ? newValue.map((item) => item.value) : []
    const newValues = newValuesArr.join('|')
    setFormInputData({ ...formInputData, os: newValues })
  }

  function handleMinPriceChange(evnt) {
    const inputValue = evnt.target.value
    setFormInputData({ ...formInputData, minPrice: inputValue })
  }

  function handleMaxPriceChange(evnt) {
    const inputValue = evnt.target.value
    setFormInputData({ ...formInputData, maxPrice: inputValue })
  }

  const handleFormSubmit = (evnt) => {
    evnt.preventDefault()
    let baseURL = 'http://localhost:3000/results/results'
    let currentURL = baseURL
    let iterator = 1
    for (const property in formInputData) {
      if (formInputData[property].length > 0) {
        if (iterator === 1) {
          currentURL = currentURL + '?'
        } else {
          currentURL = currentURL + '&'
        }
        currentURL = currentURL + property + '=' + formInputData[property]
        iterator = iterator + 1
      }
    }
    console.log(encodeURI(currentURL))
    navigate('/results/results', { state: formInputData })
  }

  return (
    <>
      <CRow>
        <CCol md="12">
          <form className="card p-3 bg-white">
            <div className="mb-3 row">
              <PriceInput
                handleMinPriceChange={handleMinPriceChange}
                handleMaxPriceChange={handleMaxPriceChange}
              />
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
