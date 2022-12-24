import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export function MemoryInput({ handleChange }) {
  MemoryInput.propTypes = {
    handleChange: PropTypes.func,
  }

  // Fetch list of memory
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataMemory, setDataMemory] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/memory')
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataMemory(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

  let options = []

  for (let i = 0; i < dataMemory.length; i++) {
    let option = {}
    option.value = dataMemory[i].memory
    option.label = dataMemory[i].memory
    options.push(option)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return <Select options={options} onChange={handleChange} isMulti name="memory" />
  }
}

export function CPUInput({ handleChange }) {
  CPUInput.propTypes = {
    handleChange: PropTypes.func,
  }

  // Fetch list of memory
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataCpu, setDataCpu] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/cpu')
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataCpu(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

  let options = []

  for (let i = 0; i < dataCpu.length; i++) {
    let option = {}
    option.value = dataCpu[i].processor
    option.label = dataCpu[i].processor
    options.push(option)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return <Select options={options} onChange={handleChange} isMulti name="cpu" />
  }
}
