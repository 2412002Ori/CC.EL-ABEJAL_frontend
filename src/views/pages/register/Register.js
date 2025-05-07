import React, { useState } from 'react'; 
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
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
import { cilLockLocked, cilUser, cilTrash, cilAddressBook, cilSearch } from '@coreui/icons'
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
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState([
    { id: 1, name: 'Juan', lastname: 'Perez', email: 'juan.perez@gmail.com' },
    { id: 2, name: 'Gabriela', lastname: 'Rosales', email: 'gabyve05@gmail.com' },
    { id: 3, name: 'Cesar', lastname: 'Rosales', email: 'cesardaniel@gmail.com' },
    { id: 4, name: 'Oriana', lastname: 'Duran', email: 'ori.duran0304@gmail.com' },
    { id: 5, name: 'Jenny', lastname: 'Elizabeth', email: 'elizabeth3@gmail.com' },
    { id: 6, name: 'William', lastname: 'Chaparro', email: 'ChaparroLobo@gmail.com' },
    { id: 7, name: 'Daniela', lastname: 'Colmenares', email: 'Nala15@gmail.com' },
    { id: 8, name: 'Kevin', lastname: 'Zanabria', email: 'zanabria$@gmail.com' },
    { id: 9, name: 'Jesus', lastname: 'Lozada', email: 'luismiguel@gmail.com' },
  ]);

  const filteredUsers = users.filter(user => {
    const searchText = searchTerm.toLowerCase();
    return (
    user.name.toLowerCase().includes(searchText) || 
    user.lastname.toLowerCase().includes(searchText) || 
    user.email.toLowerCase().includes(searchText)
  )}
)

  return (
  <CCard className="mb-3">
      <CHeader>
        <h2>Usuarios</h2>
          <CInputGroup style={{ width: '600px' }}>
            <CInputGroupText>
              <CIcon icon={cilSearch} /> 
            </CInputGroupText>
            <CFormInput
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CInputGroup>
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
        {filteredUsers.map(user => (
          <CTableRow key={user.id}>
            <CTableDataCell>{user.name}</CTableDataCell>
            <CTableDataCell>{user.lastname}</CTableDataCell>
            <CTableDataCell>{user.email}</CTableDataCell>
            <CTableDataCell><PermisosUsuario/></CTableDataCell>
            <CTableDataCell><EliminarUsuario/></CTableDataCell>
          </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>

  )
}

export default Registeruser
