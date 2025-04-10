import react, {useState} from "react";
import {
    CCard, //Para crear una tarjeta con título y contenido.
    CCardBody,
    CCardHeader,
    CCol, //Sistema de rejilla (grid) para centrar el formulario. CRow filas CCol columnas
    CRow,
    CForm, // Para el formulario
    CFormInput, //campo de entrada
    CButton, // Botón 
    CAlert //Para mostrar mensajes de error/éxito.
} from '@coreui/react' // Componentes de CoreUI, Proporciona componentes estilizados (botones, tarjetas, formularios, etc.)

const ForgotPassword = () => {
    // Hook de estado useState, este permite añadir estados a componentes funcionales 
    const [email, setEmail] = useState(''); //useState ss una función de React que crea un estado
    const [error, setError] = useState(''); //estado para errores, para manejar mensajes de error
    const [success, setSuccess] = useState(false); // Estado para éxito

//Estructura del componente
    return (
        <CContainer>
            <CRow className="justify-content-center"> {/* Me centra horizontalmente */}
                <CCol md = {6} > {/* Esto ocupa 6 columnas en pantallas medianas o grandes */}
                    <CCard> {/* Esto es una tarjeta que envuelve el formulario */}
                        <CCardHeader>
                            <h1>Recupera tu contraseña</h1>
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default ForgotPassword;
