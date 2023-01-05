import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardSubtitle,
  CCardTitle,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'

import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

export function RecommendedLaptop({ url, title }) {
  RecommendedLaptop.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
  }
  console.log(url)
  // Fetch recommended laptop
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataRecommended, setDataRecommended] = useState([])

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          let resultArray = JSON.parse(result)
          setIsLoaded(true)
          setDataRecommended(resultArray)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    if (dataRecommended.length > 0) {
      let recommendedLaptop = dataRecommended[0]
      return (
        <>
          <CCard>
            <CCardHeader>{title}</CCardHeader>
            <CCardImage orientation="top" src={recommendedLaptop.image}></CCardImage>
            <CCardBody>
              <CCardTitle>{recommendedLaptop.name}</CCardTitle>
              <CCardSubtitle>Price: {recommendedLaptop.price}</CCardSubtitle>
              <CListGroup flush>
                <CListGroupItem>
                  Processor:
                  {recommendedLaptop.processor !== null ? recommendedLaptop.processor : '-'}
                </CListGroupItem>
                <CListGroupItem>
                  Operating System:
                  {recommendedLaptop.operating_system !== null
                    ? recommendedLaptop.operating_system
                    : '-'}
                </CListGroupItem>
                <CListGroupItem>
                  Graphics Card:
                  {recommendedLaptop.graphics !== null ? recommendedLaptop.graphics : '-'}
                </CListGroupItem>
                <CListGroupItem>
                  Memory: {recommendedLaptop.memory !== null ? recommendedLaptop.memory : '-'}
                </CListGroupItem>
                <CListGroupItem>
                  Storage: {recommendedLaptop.storage !== null ? recommendedLaptop.storage : '-'}
                </CListGroupItem>
                <CListGroupItem>
                  Display: {recommendedLaptop.display !== null ? recommendedLaptop.display : '-'}
                </CListGroupItem>
                <CListGroupItem>
                  Energy Consumption:
                  {recommendedLaptop.energy_consumption !== null
                    ? recommendedLaptop.energy_consumption
                    : '-'}
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </>
      )
    } else {
      return (
        <>
          <CCard>
            <CCardHeader>{title}</CCardHeader>
            <CCardBody>
              <CCardTitle>Sorry, no suitable laptop is found.</CCardTitle>
            </CCardBody>
          </CCard>
        </>
      )
    }
  }
}
