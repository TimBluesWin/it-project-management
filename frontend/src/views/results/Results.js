import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'

const Results = () => {
  const search = useLocation()
  const states = search.state
  let baseURLCheapest = 'localhost:8000/api/cheapest_laptop'
  let baseURLGreenest = 'localhost:8000/api/best_green_laptop'
  let baseURLBoth = 'localhost:8000/api/best_overall_laptop'
  console.log(states)
  let iterator = 1
  for (const [key, value] of Object.entries(states)) {
    if (value.length > 0) {
      if (iterator === 1) {
        baseURLCheapest = baseURLCheapest + '?' + key + '=' + value
        baseURLGreenest = baseURLGreenest + '?' + key + '=' + value
        baseURLBoth = baseURLBoth + '?' + key + '=' + value
      } else {
        baseURLCheapest = baseURLCheapest + '&' + key + '=' + value
        baseURLGreenest = baseURLGreenest + '&' + key + '=' + value
        baseURLBoth = baseURLBoth + '&' + key + '=' + value
      }
      iterator = iterator + 1
    }
  }

  console.log(baseURLCheapest)

  return (
    <>
      <p>I need to wait for Alberto to finalize the API.</p>
    </>
  )
}

export default Results
