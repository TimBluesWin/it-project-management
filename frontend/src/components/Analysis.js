import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import PropTypes from 'prop-types'

export function AnalysisResult({ urlPart, title, finalColumn, selector }) {
  AnalysisResult.propTypes = {
    urlPart: PropTypes.string,
    title: PropTypes.string,
    finalColumn: PropTypes.string,
    selector: PropTypes.string,
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
          setTableData(resultArray)
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
      if (item.vendor.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        console.log(item)
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
      name: 'Brand',
      selector: 'vendor',
    },
    {
      name: finalColumn,
      selector: selector,
    },
  ]

  useEffect(() => {}, [tableData])
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        <input
          type="text"
          placeholder="Filter by brand"
          value={brand}
          onChange={(e) => onChange(e)}
          className="mb-3 form-control"
        />
        <DataTable columns={columns} data={tableData} pagination={20} defaultSortField="model" />
      </>
    )
  }
}
