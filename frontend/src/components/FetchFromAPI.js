import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Chart } from 'react-google-charts'

export function FetchLifecycle() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataActiveComputers, setDataActiveComputers] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/operationalratio')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setDataActiveComputers(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])
  const optionsActiveComputers = {
    title: 'Active / Inactive Computers',
    pieHole: 0.4,
    is3D: false,
    backgroundColor: 'transparent',
    pieSliceText: 'value',
    titleTextStyle: {
      fontSize: 25,
      bold: true,
    },
  }

  let finalDataActiveComputers = [
    ['Active / Inactive Computers', 'Number'],
    ['Active', dataActiveComputers.active],
    ['Inactive', dataActiveComputers.inactive],
  ]
  const navigate = useNavigate()
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={finalDataActiveComputers}
        options={optionsActiveComputers}
        chartEvents={[
          {
            eventName: 'select',
            callback: () => {
              let path = '/details/detail-inactive-computers'
              navigate(path)
            },
          },
        ]}
      />
    )
  }
}

export function FetchLifetime() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataLifetime, setDataLifetime] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/lifetime-top-five')
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataLifetime(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])
  const optionsAverageLifetime = {
    title: 'Average Lifetime In Years (Top 5 brands)',
    hAxis: {
      title: 'Brand',
    },
    vAxis: {
      title: 'Lifetime (years)',
      minValue: 0,
      gridlines: {
        multiple: 1,
      },
    },
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 25,
      bold: true,
    },
  }

  const navigate = useNavigate()

  let finalDataLifetime = [['Model', 'Lifetime']]
  for (let i = 0; i < dataLifetime.length; i++) {
    let brandAndModel = dataLifetime[i].vendor
    let averageLifetime = parseInt(dataLifetime[i].avg_life)
    let brandLifetime = new Array(brandAndModel, averageLifetime)
    finalDataLifetime.push(brandLifetime)
  }
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={finalDataLifetime}
        options={optionsAverageLifetime}
        chartEvents={[
          {
            eventName: 'select',
            callback: () => {
              let path = '/details/detail-lifetime'
              navigate(path)
            },
          },
        ]}
      />
    )
  }
}

export function FetchIssues() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataIssues, setDataIssues] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/most-incident')
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataIssues(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])
  const optionsModelIssues = {
    title: 'Top 5 Number of Issues by Brand',
    hAxis: {
      title: 'Brand',
    },
    vAxis: {
      title: 'Number of Issues',
    },
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 25,
      bold: true,
    },
  }

  const navigate = useNavigate()

  let finalDataIssues = [['Model', 'Issues']]
  for (let i = 0; i < dataIssues.length; i++) {
    let brandAndModel = dataIssues[i].vendor
    let issues = parseInt(dataIssues[i].dcount)
    let brandIssues = new Array(brandAndModel, issues)
    finalDataIssues.push(brandIssues)
  }
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={finalDataIssues}
        options={optionsModelIssues}
        chartEvents={[
          {
            eventName: 'select',
            callback: () => {
              let path = '/details/detail-inactive-computers'
              navigate(path)
            },
          },
        ]}
      />
    )
  }
}

export function FetchNotWorking() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataNotWorking, setDataNotWorking] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/not-working')
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataNotWorking(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])
  const optionsNotWorkingModels = {
    title: 'Not Working Brands',
    is3D: false,
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 25,
      bold: true,
    },
  }

  let finalDataNotWorking = [['Models', 'Number']]
  for (let i = 0; i < dataNotWorking.length; i++) {
    let brandAndModel = dataNotWorking[i].vendor
    let numberNotWorking = parseInt(dataNotWorking[i].dcount)
    let brandNotWorking = new Array(brandAndModel, numberNotWorking)
    finalDataNotWorking.push(brandNotWorking)
  }

  const navigate = useNavigate()

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={finalDataNotWorking}
        options={optionsNotWorkingModels}
        chartEvents={[
          {
            eventName: 'select',
            callback: () => {
              let path = '/details/detail-not-working'
              navigate(path)
            },
          },
        ]}
      />
    )
  }
}

export function FetchEnergy() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataEnergy, setDataEnergy] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/avg-energy-consumption')
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataEnergy(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])
  const optionsModelEnergy = {
    title: 'Energy consumption by brand (KwH)',
    hAxis: {
      title: 'Brand',
    },
    vAxis: {
      title: 'Energy consumption',
    },
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 25,
      bold: true,
    },
  }

  const navigate = useNavigate()

  let finalDataEnergy = [['Model', 'Energy']]
  for (let i = 0; i < dataEnergy.length; i++) {
    let brandAndModel = dataEnergy[i].vendor
    let energy = parseFloat(dataEnergy[i].energy_consumption__avg)
    let brandEnergy = new Array(brandAndModel, energy)
    finalDataEnergy.push(brandEnergy)
  }
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={finalDataEnergy}
        options={optionsModelEnergy}
        chartEvents={[
          {
            eventName: 'select',
            callback: () => {
              let path = '/details/detail-energy-consumption'
              navigate(path)
            },
          },
        ]}
      />
    )
  }
}
