// Importaciones necesarias para el componente de inicio de sesión 
import { Link } from 'react-router-dom' // Para navegación entre páginas, Permite usar <Link> para navegar a otras páginas (ej: /register).
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
} from '@coreui/react' // Componentes de CoreUI, Proporciona componentes estilizados (botones, tarjetas, formularios, etc.)

import CIcon from '@coreui/icons-react' // Para íconos
import { cilLockLocked, cilUser } from '@coreui/icons' // Íconos específicos (candado y usuario)
import React, { useState } from 'react'; // Usar el hook de estado (useStage) en mis componentes, ademas importo react
import { useNavigate } from 'react-router-dom'; // Usar el hook useNavigate de la libreria react-router-dom, la cual es el paquete para manejar rutas en react, para navegar programaticamente sin usar componentes como link 
import centroArtesanal from '../../../assets/images/centroArtesanal.jpeg' // Importar una imagen para usarla como fondo, la imagen se encuentra en la carpeta assets/images;

const Login = () => {
  //Estados
  const [username, setUsername] = useState(''); //username:variable que guarda el nombre, setUsername:funcion que actualiza el valor de username, useState(''):inicializa el estado con un string vacio
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); //inicializamos el hokk usesNavigate y lo asignamos a la variable llamada navigate

  // Credenciales simuladas que voy a usar
  const validCredentials = {
    username: 'cesaradmin',
    password: 'cesaradmin41',
    username: 'orianaadmin',
    password: 'orianaadmin12',
  };

  const handleLogin = (e) => {
      e.preventDefault(); //Detiene el comportamiento normal del formulario, permanece en la pag sin recargar
      setLoading(true);   //Activa el estado de "cargando"
      setError('');       //Limpia cualquier error previo
    

  // Simulamos una petición HTTP con setTimeout
  setTimeout(() => {
    if (username === validCredentials.username && password === validCredentials.password) {
      localStorage.setItem('isAuthenticated', 'true'); //Guardamos en localStorage para simular sesión, guarda los datos en el almacenamiento local del navegador
      localStorage.setItem('user', username);
      navigate('/dashboard'); // Redirigimos al dashboard
    } else {
      setError('Datos incorrectos');
    }
    setLoading(false);
    }, 1500); //son los 1.5 segundos de delay para simular petición HTTP
  };

  return (
    // función que devuelve la interfaz de usuario
    // bg-body-tertiary: Fondo gris claro, min-vh-100: Altura mínima del 100% del viewport (toda la pantalla), d-flex flex-row align-items-center: Diseño flexible (flexbox) centrado verticalmente.
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center" 
    style={{
    backgroundImage: `url(${centroArtesanal})`, //usando mi imagen importada
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
    }}
    > 

      {/* Estructura de la Página */}
      {/* CContainer: Contenedor principal de CoreUI, CRow y CCol: Sistema de rejilla (grid) para organizar el contenido, CCardGroup: Agrupa tarjetas (CCard) para que tengan el mismo alto. */}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>

              {/* Tarjeta de Login */}
              {/* <CCard className="p-4">: Tarjeta con relleno (padding) de 4 unidades, <CCardBody>: Cuerpo de la tarjeta, <CForm>: Formulario. */}
              <CCard className="p-4"> 
                <CCardBody>
                {/* onSubmit:es un evento que se disparacuando el formulario es enviado, handleLogin:funcion definida para manejar el envio del formulario  */}
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>

                    {/* Campo de Usuario */}
                    {/* <CInputGroup className="mb-3">: Grupo de entrada con margen inferior, <CInputGroupText>: Texto/ícono del campo, <CIcon icon={cilUser}/>: Ícono de usuario, <CFormInput placeholder="Username" autoComplete="username" />: Input de texto. */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      {/*placeholder="Username":muestra el texto username en gris cuando el campo este vacio, autoComplete="username":ayuda a los navegadores a identificar que este campo es para usurio y sugiere autocompletado, value={username}:conecta el input con la variable de estado username y muestra el valor actual en username definido antes en useState, onChange={(e) => setUsername(e.target.value)}:maneja cambios en el input ("e":es el evento de cambio, e.target.value:contiene el nuevo valor escrito, setUsername:actualiza el estado con el nuevo valor), required:atributo estandar en HTML haciendo que el campo sea obligatorio.*/}
                      <CFormInput 
                      placeholder="Username" 
                      autoComplete="username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      required 
                      />
                    </CInputGroup>

                    {/* Campo de Contraseña */}
                    {/* <CIcon icon={cilLockLocked} />: Ícono de candado. */}
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
                    {/* error &&: si error existe(no es una cadena vacia, null, undefined) muestra lo demas, <div className="mb-3">:contenedor div con una clase bootstrap y el mb-3 es margin-bottom: 1rem, <CAlert color="danger">:alerta de error con color rojo, {error}: muestra el mensaje de error. */}
                    { error && ( <div className='mb-3'>
                      <CAlert color="danger">{error}</CAlert>
                    </div>
                    )}
                    
                    {/* Botones de Acción */}
                    {/* <CCol xs={6}>: Columna de 6 en móviles, <CButton color="primary" className="px-4">: Botón azul, <CCol xs={6} className="text-right">: Alineado a la derecha, <CButton color="link" className="px-0">: Botón tipo enlace. */}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="dark" className="px-4" type="submit" disabled={loading}>
                          {loading ? 'Loading...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                      <Link to="/forgotPassword">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              {/* Tarjeta de Registro (Lateral) */}
              {/* <Link to="/register">: Enlace a la página de registro, bg-primary: Fondo azul (color primario de CoreUI), py-5: Relleno vertical grande. */}
              <CCard className="text-white bg-secondary py-5" style={{ width: '45%' }}>
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
              </CCard>
              
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
