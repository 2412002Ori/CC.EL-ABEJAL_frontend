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
  CModalTitle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

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
                <h2>Create your account</h2>
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
          </CTableRow>
        </CTableHead>

        <CTableBody>
          <CTableRow>
            <CTableDataCell>Juan</CTableDataCell>
            <CTableDataCell>Perez</CTableDataCell>
            <CTableDataCell>juan.perez@gmail.com</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Gabriela</CTableDataCell>
            <CTableDataCell>Rosales</CTableDataCell>
            <CTableDataCell>gabyve05@gmail.com</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Cesar</CTableDataCell>
            <CTableDataCell>Rosales</CTableDataCell>
            <CTableDataCell>cesardaniel@gmail.com</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Oriana</CTableDataCell>
            <CTableDataCell>Duran</CTableDataCell>
            <CTableDataCell>ori.duran0304@gmail.com</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Jenny</CTableDataCell>
            <CTableDataCell>Elizabeth</CTableDataCell>
            <CTableDataCell>elizabeth3@gmail.com</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
    </CCard>
  )
}

export default Registeruser
