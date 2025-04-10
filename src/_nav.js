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
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  

  {
    component: CNavTitle,
    name: 'Components',
  },

  {
    component: CNavGroup,
    name: 'CONTRATOS',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' SOLICITUD ',
        to: '/pages/aplication',
      },
      {
        component: CNavItem,
        name: 'INGRESO',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: ' CONTRATOS ACTIVOS ',
        to: '/pages/contractsAcepted',
      },
      {
        component: CNavItem,
        name: 'CONTRATOS VENCIDOS',
        to: '/pages/ContractsDefeated',
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
        name: 'INCRIPCIÓN',
        to: '/forms',
      },
      {
        component: CNavItem,
        name: 'listado ',
        to: '/forms',
      },

      {
        component: CNavItem,
        name: 'REHUBICACIONES',
        to: '/forms',
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
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: ' listado de pagos',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: ' listado DE MULTAS',
        to: '/forms/select',
      },
    ],
  },
  {
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
  },

  {
    component: CNavGroup,
    name: 'ESTADISITCAS',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'PAGOS X LOCAL',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'INGRESOS',
        to: '/forms/form-control',
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
        name: 'REGITRO',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'PERFILES',
        to: '/forms/select',
      },  
      {
        component: CNavItem,
        name: 'PERMISOS',
        to: '/forms/select',
      },
      
    ],
  },

  
  
]

export default _nav
