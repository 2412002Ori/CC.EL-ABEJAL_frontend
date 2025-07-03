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
  CFormSelect,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { cilLockLocked, cilUser, cilTrash, cilAddressBook, cilSearch, cilPencil } from '@coreui/icons'

export const EliminarUsuario = ({ id, onDelete }) => {
  const [visible, setVisible] = useState(false)
  return (
    <>      
    <CButton color="danger" variant="ghost" className="ms-2" onClick={() => setVisible(!visible) }>
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
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || '',
    name: user.name || '',
    lastname: user.lastname || '',
    email: user.email || '',
    status: user.status || '',
    role_id: user.role_id ? Number(user.role_id) : '',
    password: ''
  });

  useEffect(() => {
    setFormData({
      username: user.username || '',
      name: user.name || '',
      lastname: user.lastname || '',
      email: user.email || '',
      status: user.status || '',
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleUpdate = async (id) => {
  const token = localStorage.getItem('token');

  const roleId = Number(formData.role_id);

  if (isNaN(roleId) || roleId < 1 || roleId > 3) {
    setErrors({
      role_id: 'El rol debe ser 1, 2 o 3'
    });
    return;
  }

  const payload = {
    username: formData.username,
    name: formData.name,
    lastname: formData.lastname,
    email: formData.email,
    status: formData.status,
    role_id: roleId
  };

  if (formData.password.trim()) {
  payload.password = formData.password;
}

  if (!formData.username || !formData.email || !formData.status || isNaN(Number(formData.role_id))) {
    setErrors({
      general: 'Por favor completa todos los campos correctamente.'
    });
    return;
  }

  console.log('Datos enviados:', payload);

  try {
    const response = await fetch(`http://localhost:3003/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
  let errorData;
  try {
    errorData = await response.json();
  } catch {
    errorData = {};
  }
  console.error('Error del backend:', errorData);

  const fieldErrors = {};

  if (Array.isArray(errorData.errors)) {
    errorData.errors.forEach(err => {
      fieldErrors[err.path[0]] = err.message;
    });

  } else if (errorData.message) {
    if (errorData.message.includes("Contraseña")) {
      fieldErrors.password = errorData.message;
    } else {
      fieldErrors.general = errorData.message;
    }

  } else {
    fieldErrors.general = 'Hubo un problema al actualizar el usuario.';
  }

  setErrors(fieldErrors);
  return;
}

    const updatedUser = await response.json();
    onUpdate(updatedUser); 
    setVisible(false);
    setErrors({}); 

    setShowSuccess(true);
    setTimeout(() => {
    setShowSuccess(false);
  }, 3000);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
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

        {showSuccess && (
          <CAlert color="success" className="mb-3">
            Usuario actualizado correctamente
          </CAlert>
        )}

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
            {errors.username && (
              <small className="text-danger">{errors.username}</small>
            )}
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
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
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
            {errors.lastname && (
              <small className="text-danger">{errors.lastname}</small>
            )}
            <CInputGroup className="mb-3">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </CInputGroup>
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
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
            {errors.status && (
              <small className="text-danger">{errors.status}</small>
            )}
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </CInputGroup>
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
            <CInputGroup className="mb-3">
              <CInputGroupText>Rol</CInputGroupText>
              <CFormSelect name="role_id" value={formData.role_id} onChange={handleInputChange}>
                <option value="">Selecciona un rol</option>
                <option value="1">Administrador</option>
                <option value="2">Finanzas</option>
                <option value="3">Inquilino</option>
              </CFormSelect>
            </CInputGroup>
            {errors.role_id && (
              <small className="text-danger">{errors.role_id}</small>
            )}

          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={() => handleUpdate(user.user_id)}>
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
    confirmPassword: '',
    role_id: '',
    status: 'active'
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [zodErrors, setZodErrors] = useState([]);

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
    formData.password === formData.confirmPassword &&
    formData.role_id &&
    formData.status;

  const addUser = (e) => {
    e.preventDefault();
    setError('');
    setZodErrors([]);
    setShowSuccess(false);

    if (!isFormValid) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const token = localStorage.getItem('token');
    const payload = {
      ...formData,
      role_id: Number(formData.role_id)
    };

    fetch('http://localhost:3003/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }
      if (!response.ok) {
        setShowSuccess(false);

        if (data.errors && Array.isArray(data.errors)) {
          setZodErrors(data.errors.map(err => err.message));
        } else if (typeof data === 'object' && Object.values(data).some(v => Array.isArray(v))) {
          const allErrors = Object.values(data)
            .filter(v => Array.isArray(v))
            .flat()
            .map(err => (typeof err === 'string' ? err : err.message));
          setZodErrors(allErrors);
        } else if (data.mensaje || data.error) {
          setError(data.mensaje || data.error);
        } else if (typeof data === 'string') {
          setError(data);
        } else {
          setError('Error al registrar usuario');
        }
        return;
      }
        setFormData({
          name: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role_id: '',
          status: 'active'
        });
        setError('');
        setZodErrors([]);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      })
      .catch(() => {
        setError('Error de conexión');
        setShowSuccess(false);
        setZodErrors([]);
      });
  };

  return (
    <>
      {error && (
        <CAlert color="danger" className="mb-3" dismissible onClose={() => setError('')}>
          {error}
        </CAlert>
      )}
      {zodErrors.length > 0 && (
        <CAlert color="danger" className="mb-3" dismissible onClose={() => setZodErrors([])}>
          <ul style={{ marginBottom: 0 }}>
            {zodErrors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        </CAlert>
      )}

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
            required
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
            required
          />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>Rol</CInputGroupText>
          <CFormInput
            type="number"
            name="role_id"
            value={formData.role_id}
            onChange={handleInputChange}
            min={1}
            max={3}
            required
          />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>Status</CInputGroupText>
          <CFormInput
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
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
    if (!token) {
    navigate('/pages/no-autorizado/no-autorizado');
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
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3003/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setUsers(users.filter((user) => user.user_id !== id)); 
      })
      .catch((error) => console.error('Error eliminando usuarios:', error));
  };

  const updateUserInList = (updatedUser) => {
    setUsers(users.map(user => user.user_id === updatedUser.user_id ? updatedUser : user));
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
              <CTableRow key={user.user_id}>
                <CTableDataCell>{user.username}</CTableDataCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.lastname}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.status}</CTableDataCell>
                <CTableDataCell>
                  <PermisosUsuario/>
                  <ActualizarUsuario user={user} onUpdate={updateUserInList} />
                  <EliminarUsuario id={user.user_id} onDelete={deleteUser} />
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