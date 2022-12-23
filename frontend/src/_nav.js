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
    name: 'Details Lifetime',
    to: '/details/detail-lifetime',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Market Analysis',
    to: '/market/market-analysis',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
  },
]

export default _nav
