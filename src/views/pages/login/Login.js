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

const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(async res => {
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(data.mensaje || 'Error de autenticación');
        setLoading(false);
        return;
      }
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(data.usuario));
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
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
                        </div>
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