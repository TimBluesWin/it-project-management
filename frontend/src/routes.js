import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const DeploymentHistory = React.lazy(() => import('./views/details/DeploymentHistory'))
const OldestDevices = React.lazy(() => import('./views/details/OldestDevices'))
const MarketAnalyis = React.lazy(() => import('./views/details/MarketAnalysis'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/deployment-history', name: 'DeploymentHistory', element: DeploymentHistory },
  { path: '/oldest-devices', name: 'OldestDevices', element: OldestDevices },
  { path: '/market-analysis', name: 'MarketAnalyis', element: MarketAnalyis },
]

export default routes
