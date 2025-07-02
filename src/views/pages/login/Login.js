// Importaciones que necesito para el componente de inicio de sesión 
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner
} from '@coreui/react' 

import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons' 
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import centroArtesanal from '../../../assets/images/centroArtesanal.jpg' 
import AlertMessage from './Alerta'

export const ModalStaticBackdropExample = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>      
    <CButton color="success" onClick={() => setVisible(!visible)}>
      Recuperar Contraseña
    </CButton>

    <CModal
      backdrop="static"
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="StaticBackdropExampleLabel"
    >
      <CModalHeader>
        <CModalTitle id="StaticBackdropExampleLabel">Recuperar Contraseña</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput 
        type='email'
        placeholder='Ingrese su correo electrónico'
        autoComplete='email'
        required
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cerrar
        </CButton>
        <CButton color="success">Enviar</CButton>
      </CModalFooter>
    </CModal>
  </>
  )
}

export const SpinnerGrowExample = () => {
  return <CSpinner as="span" className="me-2" size="sm" variant="grow" aria-hidden="true" />
}

const RegisterUserForm = ({ onClose, clearLoginFields }) => {
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
        // Limpiar campos del login al cerrar la modal de registro
        if (clearLoginFields) clearLoginFields();
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleClose = () => {
    setShowSuccess(false);
    if (onClose) onClose();
    if (clearLoginFields) clearLoginFields();
  };

  return (
    <>
      <CForm onSubmit={addUser}>
        <h1>Registro</h1>
        <p className="text-body-secondary">Crea tu nueva cuenta</p>
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

        {showSuccess && (
          <CAlert color="success" className="mb-3">
            ¡El usuario ha sido registrado exitosamente!
          </CAlert>
        )}

        <div className="d-flex gap-2">
          <CButton color="primary" className="px-4" type="submit" disabled={!isFormValid}>
            Agregar
          </CButton>
          <CButton color="secondary" className="px-4" type="button" onClick={handleClose}>
            Cerrar
          </CButton>
        </div>
      </CForm>
    </>
  )
}

const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate(); 

  // Esta función limpia los campos del login
  const clearLoginFields = () => {
    setUsername('');
    setPassword('');
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
    clearLoginFields();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    fetch('http://localhost:5000/users?username=' + username + '&password=' + password)
      .then(res => res.json())
      .then(users => {
        if (users.length > 0) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify({ username: users[0].username }));
          navigate('/dashboard');
        } else {
          setError('Contraseña Incorrecta');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error de conexión');
        setLoading(false);
      });
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center" 
      style={{
      backgroundImage: `url(${centroArtesanal})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}> 

      <CContainer>
        <CRow className="justify-content-end">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4" style={{ 
                border: '1px solid',
                borderRadius: '1rem', 
                boxShadow: '1rem 1rem 1rem rgba(0, 0, 0, 0.75)' 
              }}>
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Username" 
                        autoComplete="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    { error && (<AlertMessage/>) }
                    
                    <CRow>
                      <CCol xs={6}>
                        <div className="d-flex gap-2">
                          <CButton color="success" className="px-4" type="submit" disabled={loading}>
                            {loading ? <SpinnerGrowExample /> : null}
                            {loading ? 'Loading...' : 'Login'}
                          </CButton>
                          <CButton color="success" className="px-4" type="button" onClick={() => setShowRegister(true)}>
                            Registro
                          </CButton>
                        </div>
                        <CModal visible={showRegister} onClose={handleCloseRegister}>
                          <CModalHeader>
                            <CModalTitle>Registro de Usuario</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <RegisterUserForm onClose={handleCloseRegister} clearLoginFields={clearLoginFields} />
                          </CModalBody>
                        </CModal>
                      </CCol>

                      <CCol xs={6} className="text-right" >
                        <div>
                          <ModalStaticBackdropExample />
                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login