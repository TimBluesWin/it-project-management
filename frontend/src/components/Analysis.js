import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import PropTypes from 'prop-types'

export function AnalysisResult({ urlPart, title }) {
  AnalysisResult.propTypes = {
    urlPart: PropTypes.string,
    title: PropTypes.string,
  }

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataAnalysis, setDataAnalysis] = useState([])
  const [brand, setBrand] = useState('')
  const [tableData, setTableData] = useState([])

  let url = 'http://localhost:8000/api/' + urlPart

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataAnalysis(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

  const onChange = async (e) => {
    setBrand(e.target.value)
    console.log(e)
    let searchData = dataAnalysis.filter((item) => {
      if (item.brand.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        return item
      }
    })
    setTableData(searchData)
  }

  const columns = [
    {
      name: 'Model',
      selector: 'model',
    },
    {
      name: (
        <div>
          Brand
          <input
            type="text"
            placeholder="Filter by brand"
            value={brand}
            onChange={(e) => onChange(e)}
            style={{ width: '80%' }}
          />
        </div>
      ),
      selector: 'brand',
    },
    {
      name: 'Count',
      selector: 'count',
    },
  ]

  let data = []
  for (let i = 0; i < dataAnalysis.length; i++) {
    let datum = new Object()
    datum.model = dataAnalysis[i].model
    datum.brand = dataAnalysis[i].vendor
    datum.count = dataAnalysis[i].count
    data.push(datum)
  }

  useEffect(() => {}, [tableData])
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return <DataTable columns={columns} data={data} pagination={20} defaultSortField="model" />
  }
}
