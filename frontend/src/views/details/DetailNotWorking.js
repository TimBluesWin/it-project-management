import React from 'react'

import { AnalysisResult } from 'src/components/Analysis'

const DetailNotWorking = () => {
  return (
    <>
      <AnalysisResult
        urlPart="not-working-model"
        title="Not Working Models by Model"
        finalColumn="Count"
        selector="dcount"
      ></AnalysisResult>
    </>
  )
}

export default DetailNotWorking
