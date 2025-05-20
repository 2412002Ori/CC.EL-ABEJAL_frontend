import React, { useState, useEffect } from 'react'; 
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
  CTableRow,
  CTableHead,
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
import { useNavigate } from 'react-router-dom'
import { cilLockLocked, cilUser, cilTrash, cilAddressBook, cilSearch } from '@coreui/icons'
import AlertMessage from './../login/Alerta'

export const EliminarUsuario = ({ id, onDelete }) => {
  const [visible, setVisible] = useState(false)
  return (
    <>      
    <CButton color="danger" variant="ghost" className="ms-2" onClick={() => setVisible(!visible)}>
    <CIcon icon={cilTrash} className="me-2" />Eliminar
    </CButton>

    <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)} aria-labelledby="StaticBackdropExampleLabel">
      <CModalHeader>
        <CModalTitle id="StaticBackdropExampleLabel">Eliminar Usuario</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
      </CModalBody>
      <CModalFooter>
      <CButton color="danger" variant="ghost" className="ms-2" onClick={() => onDelete(id)}><CIcon icon={cilTrash} className="me-2" />Eliminar</CButton>
      </CModalFooter>
    </CModal>
  </>
  )
}

export const ModalRegisterUser = () => {
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addUser = () => {
    if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
      return;
  }

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setVisible(false); 
      })
      .catch((error) => console.error('Error:', error));
  };
  
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
              {error && <AlertMessage message={error} type="danger" />}
              <CForm>
                <h2>Crea tu nueva cuenta</h2>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                  <CFormInput 
                  placeholder="Name" 
                  autoComplete="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                  <CFormInput 
                  placeholder="Lastname" 
                  autoComplete="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput 
                placeholder="email" 
                autoComplete="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                />
              </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="password"
                  autoComplete="new-password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                </CInputGroup>

                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="repeat password"
                    autoComplete="new-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </CInputGroup>

                <div className="d-grid">
                  <CButton color="success" onClick={addUser}>Create Account</CButton>
                </div>
              </CForm>
            </CCol>
          </CRow>
          </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  const filteredUsers = users.filter(user => {
    const searchText = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchText) || 
      user.lastname.toLowerCase().includes(searchText) || 
      user.email.toLowerCase().includes(searchText)
    )}
  );

  const deleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id)); 
      })
      .catch((error) => console.error('Error eliminando usuarios:', error));
  };

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
        <ModalRegisterUser />
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
            <CTableDataCell><EliminarUsuario id={user.id} onDelete={deleteUser} /></CTableDataCell>
          </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>

  )
}

export default Registeruser
