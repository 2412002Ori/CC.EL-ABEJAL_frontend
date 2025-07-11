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
  cilUser,
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
        to: '/pages/contracts/acepted',
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
        name: 'LISTA REHUBICACIONES',
        to: '/pages/tenants/relocationList',
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
      {
        component: CNavItem,
        name: 'LISTADO MULTAS',
        to: '/pages/payments/listfines',
      },
      {
        component: CNavItem,
        name: 'REGISTRAR MULTA',
        to: '/pages/payments/registerfinepayment',
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
        to: '/pages/register/Register',
      }, 
    ],
  },
  
]

export default _nav
