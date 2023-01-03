import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'

const Results = () => {
  const search = useLocation()
  const states = search.state
  let baseURLCheapest = 'localhost:3000/api/cheapest_laptop'
  let baseURLGreenest = 'localhost:3000/api/best_green_laptop'
  let baseURLBoth = ''
  console.log(states)
  let iterator = 1
  for (const [key, value] of Object.entries(states)) {
    if (value.length > 0) {
      // Timmy: I don't want to encode the '|', so I have to encode them separately.
      let valueArray = value.split('|')
      let newValueArray = []
      for (let aValue in valueArray) {
        newValueArray.push(encodeURI(valueArray[aValue]))
      }
      let newValue = newValueArray.join('|')
      if (iterator === 1) {
        baseURLCheapest = baseURLCheapest + '?' + key + '=' + newValue
        baseURLGreenest = baseURLGreenest + '?' + key + '=' + newValue
      } else {
        baseURLCheapest = baseURLCheapest + '&' + key + '=' + newValue
        baseURLGreenest = baseURLGreenest + '&' + key + '=' + newValue
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
