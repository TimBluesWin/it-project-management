import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'

const Results = () => {
  const search = useLocation()
  const states = search.state
  let baseURLCheapest = 'localhost:3000'
  let baseURLGreenest = ''
  let baseURLBoth = ''
  console.log(states)

  return (
    <>
      <p>I need to wait for Alberto to finalize the API.</p>
    </>
  )
}

export default Results
