import React from 'react'

import { AnalysisResult } from 'src/components/Analysis'

const DetailLifetime = () => {
  return (
    <>
      <AnalysisResult
        urlPart="lifetime-model"
        title="Average Lifetime by Model"
        finalColumn="Average Lifetime (Years)"
        selector="avg_life"
      ></AnalysisResult>
    </>
  )
}

export default DetailLifetime
