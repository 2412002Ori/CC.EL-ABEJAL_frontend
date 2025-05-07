import React, { useState } from 'react'; 
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CHeader,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { cilLockLocked, cilUser, cilPencil, cilTrash, cilAddressBook } from '@coreui/icons'
import AlertMessage from './../login/Alerta'

export const ModalScrollingLongContent2Example = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Registrarse
      </CButton>

      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredScrollableExample2"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">Registro</CModalTitle>
        </CModalHeader>

          <CModalBody>
          <CRow className="justify-content-center">
            <CCol>
              <CForm>
                <h2>Crea tu nueva cuenta</h2>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                  <CFormInput placeholder="Name" autoComplete="name" />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                  <CFormInput placeholder="Lastname" autoComplete="lastname" />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput placeholder="Email" autoComplete="email" />
              </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
              </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Repeat password"
                    autoComplete="new-password"
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton color="success">Create Account</CButton>
                </div>
              </CForm>
            </CCol>
          </CRow>
          </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export const EliminarUsuario = () => {
  return (
    <>
    <CButton color="danger" variant="ghost" className="ms-2" ><CIcon icon={cilTrash} className="me-2" />Eliminar</CButton>
    </>
  )
}

export const PermisosUsuario = () => {
  const navigate = useNavigate();
  return (
    <>
    <CButton color="info" variant="ghost" className="ms-2" onClick={() => navigate('/pages/register/Permissions') }><CIcon icon={cilAddressBook} className="me-2" />Permisos</CButton>
    </>
  )
}

const Registeruser = () => {
  return (
    <CCard>
      <CHeader>
        <h2>Usuarios</h2>
        <ModalScrollingLongContent2Example />
      </CHeader>

    <CCardBody>
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Nombre</CTableHeaderCell>  
            <CTableHeaderCell>Apellido</CTableHeaderCell> 
            <CTableHeaderCell>Email</CTableHeaderCell>  
            <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>  
          </CTableRow>
        </CTableHead>

        <CTableBody>
          <CTableRow>
            <CTableDataCell>Juan</CTableDataCell>
            <CTableDataCell>Perez</CTableDataCell>
            <CTableDataCell>juan.perez@gmail.com </CTableDataCell>
            <CTableDataCell><PermisosUsuario/></CTableDataCell>
            <CTableDataCell><EliminarUsuario/></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Gabriela</CTableDataCell>
            <CTableDataCell>Rosales</CTableDataCell>
            <CTableDataCell>gabyve05@gmail.com </CTableDataCell>
            <CTableDataCell><PermisosUsuario/></CTableDataCell>
            <CTableDataCell><EliminarUsuario/></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Cesar</CTableDataCell>
            <CTableDataCell>Rosales</CTableDataCell>
            <CTableDataCell>cesardaniel@gmail.com</CTableDataCell>
            <CTableDataCell><PermisosUsuario/></CTableDataCell>
            <CTableDataCell><EliminarUsuario/></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Oriana</CTableDataCell>
            <CTableDataCell>Duran</CTableDataCell>
            <CTableDataCell>ori.duran0304@gmail.com</CTableDataCell>
            <CTableDataCell><PermisosUsuario/></CTableDataCell>
            <CTableDataCell><EliminarUsuario/></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Jenny</CTableDataCell>
            <CTableDataCell>Elizabeth</CTableDataCell>
            <CTableDataCell>elizabeth3@gmail.com</CTableDataCell>
            <CTableDataCell><PermisosUsuario/></CTableDataCell>
            <CTableDataCell><EliminarUsuario/></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>William</CTableDataCell>
            <CTableDataCell>Chaparro</CTableDataCell>
            <CTableDataCell>ChaparroLobo@gmail.com</CTableDataCell>
            <CTableDataCell><PermisosUsuario/></CTableDataCell>
            <CTableDataCell><EliminarUsuario/></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Daniela</CTableDataCell>
            <CTableDataCell>Colmenares</CTableDataCell>
            <CTableDataCell>Nala15@gmail.com</CTableDataCell>
            <CTableDataCell><PermisosUsuario/></CTableDataCell>
            <CTableDataCell><EliminarUsuario/></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Kevin</CTableDataCell>
            <CTableDataCell>Zanabria</CTableDataCell>
            <CTableDataCell>zanabria$@gmail.com</CTableDataCell>
            <CTableDataCell><PermisosUsuario/></CTableDataCell>
            <CTableDataCell><EliminarUsuario/></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Jesus</CTableDataCell>
            <CTableDataCell>Lozada</CTableDataCell>
            <CTableDataCell>luismiguel@gmail.com</CTableDataCell>
            <CTableDataCell><PermisosUsuario/></CTableDataCell>
            <CTableDataCell><EliminarUsuario/></CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
    </CCard>
  )
}

export default Registeruser
