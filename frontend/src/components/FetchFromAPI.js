import React, { useEffect, useState } from 'react'

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
    title: 'Average Lifetime In Years (Top 5 models)',
    hAxis: {
      title: 'Model',
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

  let finalDataLifetime = [['Model', 'Lifetime']]
  for (let i = 0; i < dataLifetime.length; i++) {
    let brandAndModel = dataLifetime[i].vendor + ' - ' + dataLifetime[i].model
    console.log(dataLifetime[i])
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
    title: 'Top 5 Number of Issues by model',
    hAxis: {
      title: 'Model',
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

  let finalDataIssues = [['Model', 'Issues']]
  for (let i = 0; i < dataIssues.length; i++) {
    let brandAndModel = dataIssues[i].vendor + ' - ' + dataIssues[i].model
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
    title: 'Not Working Models',
    is3D: false,
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 25,
      bold: true,
    },
  }

  let finalDataNotWorking = [['Models', 'Number']]
  for (let i = 0; i < dataNotWorking.length; i++) {
    let brandAndModel = dataNotWorking[i].vendor + ' - ' + dataNotWorking[i].model
    let numberNotWorking = parseInt(dataNotWorking[i].dcount)
    let brandNotWorking = new Array(brandAndModel, numberNotWorking)
    finalDataNotWorking.push(brandNotWorking)
  }
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
      />
    )
  }
}
