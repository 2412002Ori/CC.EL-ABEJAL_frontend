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
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
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
        to: '/pages/RegisterPayment',
      },
      {
        component: CNavItem,
        name: ' listado de pagos',
        to: '/pages/ListPayment',
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
        name: 'REGISTRO',
        to: '/pages/register/Register',
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
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
