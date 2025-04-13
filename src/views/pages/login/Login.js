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
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import centroArtesanal from '../../../assets/images/centroArtesanal.jpeg' 


export const ModalStaticBackdropExample = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>      
    <CButton color="dark" onClick={() => setVisible(!visible)}>
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
        <CButton color="dark">Enviar</CButton>
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
  const navigate = useNavigate(); //inicializamos el hook usesNavigate y lo asignamos a la variable llamada navigate

  const validCredentials = { username: 'cesaradmin', password: 'cesaradmin41'}
  
  const handleLogin = (e) => {
      e.preventDefault(); 
      setLoading(true);   
      setError('');  //Limpia cualquier error previo
    
  // Simulamos una petición HTTP con setTimeout
  setTimeout(() => {
    if (username === validCredentials.username && password === validCredentials.password) {
      localStorage.setItem('isAuthenticated', 'true'); 
      localStorage.setItem('user', username);
      navigate('/dashboard'); // Redirigimos al dashboard
    } else {
      setError('Datos incorrectos');
    }
    setLoading(false);
    }, 1500); 
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
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>

              {/* Tarjeta de Login */}
              <CCard className="p-4"> 
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
                        <CButton color="dark" className="px-4" type="submit" disabled={loading}>
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

             {/* Tarjeta de Registro (Lateral) */}
              {/* <CCard className="text-white bg-secondary py-5" style={{ width: '45%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Create your account to start using our services.
                    </p>
                    <Link to="/register">
                      <CButton color="dark" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
              
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

// Exportación del Componente
// Permite que este componente se use en otras partes de la aplicación
export default Login
