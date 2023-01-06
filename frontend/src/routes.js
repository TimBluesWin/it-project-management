import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const MarketAnalyis = React.lazy(() => import('./views/market/MarketAnalysis'))
const Results = React.lazy(() => import('./views/results/Results'))
const DetailLifetime = React.lazy(() => import('./views/details/DetailLifetime'))
const DetailEnergyConsumption = React.lazy(() => import('./views/details/DetailEnergyConsumption'))
const DetailNotWorking = React.lazy(() => import('./views/details/DetailNotWorking'))
const DetailInactiveComputers = React.lazy(() => import('./views/details/DetailInactiveComputers'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/details/detail-lifetime', name: 'Detail of Average Lifetime', element: DetailLifetime },
  {
    path: '/details/detail-energy-consumption',
    name: 'Detail of Computer Energy Consumption',
    element: DetailEnergyConsumption,
  },
  {
    path: '/details/detail-not-working',
    name: 'Detail of Not Working Computers',
    element: DetailNotWorking,
  },
  {
    path: '/details/detail-inactive-computers',
    name: 'Detail of Inactive Computers',
    element: DetailInactiveComputers,
  },
  { path: '/market/market-analysis', name: 'Market Analysis', element: MarketAnalyis },
  {
    path: '/results/results',
    name: 'Results',
    element: Results,
  },
]

export default routes
