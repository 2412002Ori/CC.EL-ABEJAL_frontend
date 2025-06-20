import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  
  },

  {
    component: CNavGroup,
    name: 'CONTRATOS',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' SOLICITUD ',
        to: 'pages/aplication/list',
      },
      {
        component: CNavItem,
        name: 'INGRESO',
        to: '/pages/contracts/income',
      },
      {
        component: CNavItem,
        name: ' LISTA CONTRATOS ',
        to: '/pages/contracts/menu',
      },
      
    
    ],
  },
  
  {
    component: CNavGroup,
    name: 'INQUILINOS',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      
    
      {
        component: CNavItem,
        name: 'REGISTRO',
        to: '/pages/tenants/list',
      },

      {
        component: CNavItem,
        name: 'REHUBICACIONES',
        to: '/pages/tenants/relocation',
      },

      
    ],
  },

  {
    component: CNavGroup,
    name: 'PAGOS',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' REGISTRO DE PAGOS',
        to: '/pages/RegisterPayment',
      },
      {
        component: CNavItem,
        name: ' LISTADOS',
        to: '/pages/Payments/menu',
      },
      
    ],
  },
  /*{
    component: CNavGroup,
    name: 'INVENTARIO',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'REGISTRO Y LISTADO',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: ' PEDIDOS ',
        to: '/forms/select',
      },
    ],
  },*/

  {
    component: CNavGroup,
    name: 'ESTADISITCAS',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'REGISTRO DE PAGOS',
        to: '/page/statistics',
      },
  

      
    ],
  },
  {
    component: CNavGroup,
    name: 'USERS',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'LISTA USUARIOS',
        to: '/pages/register/user',
      }, 
    ],
  },
]

export default _nav
