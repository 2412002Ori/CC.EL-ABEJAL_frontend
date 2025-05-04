// Importaciones necesarias para el componente de inicio de sesión 
import { Link } from 'react-router-dom' // Para navegación entre páginas, Permite usar <Link> para navegar a otras páginas.
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
  CModalTitle
} from '@coreui/react' 

import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons' 
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import centroArtesanal from '../../../assets/images/centroArtesanal.jpg' 

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

const Login = () => {
  //Estados
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const Credentials = [
    { username: 'cesaradmin', password: 'cesaradmin41'},
    { username: 'orianaadmin', password: '1234'},
    { username: 'gabyveadmin', password: 'gabyveadmin41'}
  ]

  const handleLogin = (e) => {
    e.preventDefault(); 
    setLoading(true);   
    setError('');  //Limpia el error
    
  setTimeout(() => {

    const founduser = Credentials.find (
      user => user.username === username && user.password === password
    )

    if (founduser) {
      localStorage.setItem ('isAuthenticated', 'true')
      localStorage.setItem ('user', JSON.stringify({
        username: founduser.username
      }))
      navigate ('/dashboard')
    } else {
      setError ('Crontraseña Incorrecta')
    }
    setLoading (false)
    }, 1600 )
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center" 
      style={{
      backgroundImage: `url(${centroArtesanal})`, //usando mi imagen importada
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}> 

      {/* Estructura de la Página */}
      <CContainer>
        <CRow className="justify-content-end">
          <CCol md={6}>
            <CCardGroup>

              {/* Tarjeta de Login */}
              <CCard className="p-4" style={{ 
                border: '1px solid',
                borderRadius: '1rem', 
                boxShadow: '1rem 1rem 1rem rgba(0, 0, 0, 0.75)' 
              }}>
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>

                    {/* Campo de Usuario */}
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

                    {/* Campo de Contraseña */}
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

                    {/* Mensaje de error */}
                    { error && ( <div className='mb-3'>
                      <CAlert color="danger">{error}</CAlert>
                    </div>
                    )}
                    
                    {/* Botones de Acción */}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="success" className="px-4" type="submit" disabled={loading}>
                          {loading ? 'Loading...' : 'Login'}
                        </CButton>
                      </CCol>

                      <CCol xs={6} className="text-right" >
                        <div style={{ }}>
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
