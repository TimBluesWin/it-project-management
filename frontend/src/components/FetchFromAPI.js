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
          console.log(result)
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
