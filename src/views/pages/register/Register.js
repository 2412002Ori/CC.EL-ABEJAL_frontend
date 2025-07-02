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
  CFormInput,
  CAlert
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

const RegisterUserForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.lastname.trim() !== '' &&
    formData.username.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.confirmPassword.trim() !== '' &&
    formData.password === formData.confirmPassword;

  const addUser = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          name: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <>
      <CForm onSubmit={addUser}>
        <h1>Registro</h1>
        <p className="text-body-secondary">Crea tu nueva cuenta</p>

        {showSuccess && (
          <CAlert color="success" className="mb-3">
            ¡El usuario ha sido registrado exitosamente!
          </CAlert>
        )}

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
            required
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
            required
          />
        </CInputGroup>

        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilUser} />
          </CInputGroupText>
          <CFormInput
            placeholder="Username"
            autoComplete="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
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
            required
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

        <div className="d-flex gap-2">
          <CButton color="success" className="px-4" type="submit" disabled={!isFormValid}>
            Agregar
          </CButton>
          <CButton color="secondary" className="px-4" type="button" onClick={onClose}>
            Cerrar
          </CButton>
        </div>
      </CForm>

      {showSuccess && (
        <CAlert color="success" className="mb-3" dismissible onClose={() => setShowSuccess(false)}>
          ¡El usuario ha sido registrado exitosamente!
        </CAlert>
      )}
    </>
  )
}

const RegisterUserModal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <CButton color="success" className="ms-3" onClick={() => setShowModal(true)}>
        Registrar Usuario
      </CButton>
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Registro de Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <RegisterUserForm onClose={() => setShowModal(false)} />
        </CModalBody>
      </CModal>
    </>
  );
};

const Registeruser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null' || token.trim() === '') {
    navigate('/no-autorizado');
    return;
  }
    fetch('http://localhost:3003/api/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
      if (response.status === 401) {
        navigate('/no-autorizado');
        throw new Error('No autorizado para este módulo.');
      }
      return response.json();
    })
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, [navigate]);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
          <RegisterUserModal />
        </div>
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