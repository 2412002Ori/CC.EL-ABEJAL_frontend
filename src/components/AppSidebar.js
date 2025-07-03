import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'

const getFilteredNavigation = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.role === 2) {
    // Mostrar Dashboard, Pagos y Estadísticas
    return navigation.filter(
      (item) =>
        (item.name && (
          item.name.toUpperCase() === 'DASHBOARD' ||
          item.name.toUpperCase() === 'PAGOS' ||
          item.name.toUpperCase().includes('ESTADISITCAS')
        ))
    );
  }
  return navigation;
};

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader>
        <img
          src="/logo.png"
          alt="Logo"
          style={{ display: 'block', margin: '0 auto', maxHeight: unfoldable ? 50 : 200 }}
        />
        
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={getFilteredNavigation()} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

