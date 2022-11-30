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
    title: 'Average Lifetime In Years',
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
