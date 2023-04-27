import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../../context/appContext'
import { useParams } from 'react-router-dom'
import Trend from './Trend'
import './tabs.css'
import uuid from 'react-uuid'

function Tabs() {
  const { trends, getTrends } = useAppContext()
  const { category: urlCategory } = useParams()

  async function fetchData() {
    await getTrends(urlCategory || 'educational')
  }

  useEffect(() => {
    fetchData()
  }, [urlCategory])

  return (
    <>
      {trends && trends.hashtags ? (
        <div className="tabs-container">
          {trends.hashtags.map((trend) => {
            return <Trend key={uuid()} {...trend} />
          })}
        </div>
      ) : (
        <div className="not-found">no trend found</div>
      )}
    </>
  )
}

export default Tabs
