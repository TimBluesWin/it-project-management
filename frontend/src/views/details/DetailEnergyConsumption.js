import React from 'react'

import { AnalysisResult } from 'src/components/Analysis'

const DetailEnergyConsumption = () => {
  return (
    <>
      <AnalysisResult
        urlPart="avg-energy-consumption-model"
        title="Average Energy Consumption by Model"
        finalColumn="Average Energy Consumption (kWh)"
        selector="energy_consumption__avg"
      ></AnalysisResult>
    </>
  )
}

export default DetailEnergyConsumption
