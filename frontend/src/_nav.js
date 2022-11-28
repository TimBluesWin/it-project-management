import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilHistory, cilDevices, cilGraph } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Deployment State History',
    to: '/deployment-state-history',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Oldest Devices',
    to: '/oldest-devices',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Market Analysis',
    to: '/market-analysis',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
  },
]

export default _nav
