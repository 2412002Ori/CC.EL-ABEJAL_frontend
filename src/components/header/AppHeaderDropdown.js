import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {cilBell, cilEnvelopeOpen, cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

import avatar8 from './../../assets/images/avatars/8.jpg'
import '../../../node_modules/@coreui/react/dist/esm/components/dropdown/CDropdownMenu';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  return (
    <CDropdown variant="nav-item"  className="pt-0 custom-dropdown-menu" placement="bottom-end">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>

        <CDropdownItem onClick={() => navigate('/pages/profile/Profile')}>
          <CIcon icon={cilBell} className="me-2"/>
          Perfil
          <CBadge color="info" className="ms-2">
            1
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Mensajes
          <CBadge color="success" className="ms-2">
            2
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={() => navigate('/login')}>
          <CIcon icon={cilLockLocked} className="me-2" />
          salir
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
