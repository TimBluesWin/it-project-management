import React from 'react'

import { AnalysisResult } from 'src/components/Analysis'

const DetailInactiveComputers = () => {
  return (
    <>
      <AnalysisResult
        urlPart="inactive-model"
        title="Inactive Models"
        finalColumn="Count"
        selector="count"
      ></AnalysisResult>
    </>
  )
}

export default DetailInactiveComputers
