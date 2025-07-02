import React, { useState, useEffect } from 'react'; 
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
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
  CModalTitle,
  CFormInput
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { cilLockLocked, cilUser, cilTrash, cilAddressBook, cilSearch, cilPencil } from '@coreui/icons'

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
        <CButton color="danger" variant="ghost" className="ms-2" onClick={() => onDelete(id)}>
          <CIcon icon={cilTrash} className="me-2" />Eliminar
        </CButton>
      </CModalFooter>
    </CModal>
    </>
  )
}

export const ActualizarUsuario = ({ user, onUpdate }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || '',
    name: user.name || '',
    lastname: user.lastname || '',
    email: user.email || '',
    status: user.status || ''
  });

  useEffect(() => {
    setFormData({
      username: user.username || '',
      name: user.name || '',
      lastname: user.lastname || '',
      email: user.email || '',
      status: user.status || ''
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user, ...formData }),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        onUpdate(updatedUser);
        setVisible(false);
      })
      .catch((error) => console.error('Error actualizando usuario:', error));
  };

  return (
    <>
      <CButton color="success" variant="ghost" className="ms-2" onClick={() => setVisible(true)}>
        <CIcon icon={cilPencil} className="me-2" />Actualizar
      </CButton>
      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="ActualizarUsuarioModal"
      >
        <CModalHeader>
          <CModalTitle id="ActualizarUsuarioModal">Actualizar Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="Nombre"
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
                placeholder="Apellido"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              />
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleUpdate}>
            Guardar cambios
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export const PermisosUsuario = () => {
  const navigate = useNavigate();
  return (
    <>
      <CButton color="info" variant="ghost" className="ms-2" onClick={() => navigate('/pages/register/Permissions')}>
        <CIcon icon={cilAddressBook} className="me-2" />Permisos
      </CButton>
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
      (user.username?.toLowerCase() || '').includes(searchText) ||
      (user.name?.toLowerCase() || '').includes(searchText) || 
      (user.lastname?.toLowerCase() || '').includes(searchText) || 
      (user.email?.toLowerCase() || '').includes(searchText) ||
      (user.status?.toLowerCase() || '').includes(searchText)
    );
  });

  const deleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id)); 
      })
      .catch((error) => console.error('Error eliminando usuarios:', error));
  };

  const updateUserInList = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
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
      </CHeader>

      <CCardBody>
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Username</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>  
              <CTableHeaderCell>Apellido</CTableHeaderCell> 
              <CTableHeaderCell>Email</CTableHeaderCell>  
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>  
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {filteredUsers.map(user => (
              <CTableRow key={user.id}>
                <CTableDataCell>{user.username}</CTableDataCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.lastname}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.status}</CTableDataCell>
                <CTableDataCell>
                  <PermisosUsuario/>
                  <ActualizarUsuario user={user} onUpdate={updateUserInList} />
                  <EliminarUsuario id={user.id} onDelete={deleteUser} />
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Registeruser