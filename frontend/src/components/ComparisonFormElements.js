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

export function DisplayInput({ handleChange }) {
  DisplayInput.propTypes = {
    handleChange: PropTypes.func,
  }

  // Fetch list of memory
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataDisplay, setDataDisplay] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/display')
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataDisplay(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

  let options = []

  for (let i = 0; i < dataDisplay.length; i++) {
    let option = {}
    option.value = dataDisplay[i].display
    option.label = dataDisplay[i].display
    options.push(option)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return <Select options={options} onChange={handleChange} isMulti name="display" />
  }
}

export function GraphicsInput({ handleChange }) {
  GraphicsInput.propTypes = {
    handleChange: PropTypes.func,
  }

  // Fetch list of memory
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataGraphics, setDataGraphics] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/graphics')
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataGraphics(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

  let options = []

  for (let i = 0; i < dataGraphics.length; i++) {
    let option = {}
    option.value = dataGraphics[i].graphics
    option.label = dataGraphics[i].graphics
    options.push(option)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return <Select options={options} onChange={handleChange} isMulti name="graphics" />
  }
}

export function StorageInput({ handleChange }) {
  StorageInput.propTypes = {
    handleChange: PropTypes.func,
  }

  // Fetch list of memory
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataStorage, setDataStorage] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/storage')
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataStorage(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

  let options = []

  for (let i = 0; i < dataStorage.length; i++) {
    let option = {}
    option.value = dataStorage[i].storage
    option.label = dataStorage[i].storage
    options.push(option)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return <Select options={options} onChange={handleChange} isMulti name="storage" />
  }
}

export function OperatingSystemInput({ handleChange }) {
  OperatingSystemInput.propTypes = {
    handleChange: PropTypes.func,
  }

  // Fetch list of memory
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataOS, setDataOS] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/operating_system')
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataOS(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

  let options = []

  for (let i = 0; i < dataOS.length; i++) {
    let option = {}
    if (dataOS[i].operating_system === null) {
      option.value = '-'
      option.label = '-'
    } else {
      option.value = dataOS[i].operating_system
      option.label = dataOS[i].operating_system
    }
    options.push(option)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return <Select options={options} onChange={handleChange} isMulti name="operating-system" />
  }
}
