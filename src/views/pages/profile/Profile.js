import React, { useState } from 'react'; 
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CHeader,
    CInputGroup,
    CInputGroupText,
    CRow,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCardHeader,
    CAvatar,
    CCardGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { cilUser, cilPencil } from '@coreui/icons'
import avatar8 from './../../../assets/images/avatars/8.jpg'
// import { Alert } from './pages/login/Login'

export const Modal = () => {
const [visible, setVisible] = useState(false)
return (
<>
    <CButton color="success" variant="ghost" className="ms-3" onClick={() => setVisible(!visible)}><CIcon icon={cilPencil} className="me-2" />Actualizar</CButton>

    <CModal
    alignment="center"
    scrollable
    visible={visible}
    onClose={() => setVisible(false)}
    aria-labelledby="VerticallyCenteredScrollableExample2"
    >
    <CModalHeader>
        <CModalTitle id="VerticallyCenteredScrollableExample2">Actualizar Usuario</CModalTitle>
    </CModalHeader>

        <CModalBody>
        <h2>Actualiza tus datos</h2>
            <CInputGroup className="mb-3">
                <CInputGroupText>
                    <CIcon icon={cilUser} />
                </CInputGroupText>
                    <CFormInput placeholder="Name" autoComplete="name" />
                </CInputGroup>

                <CInputGroup className="mb-3">
                <CInputGroupText>
                    <CIcon icon={cilUser} />
                </CInputGroupText>
                    <CFormInput placeholder="Lastname" autoComplete="lastname" />
                </CInputGroup>

                <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput placeholder="Email" autoComplete="email" />
                </CInputGroup>

                <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput placeholder="Password" autoComplete="password" />
                </CInputGroup>
        </CModalBody>

    <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
        Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
    </CModalFooter>
    </CModal>
</>
)
}

const Registeruser = () => {
    return (
    
    <CContainer>
        <CRow className="justify-content-center">
            <CCol md={7}>
                <CCard>
                    <CCardHeader>
                        <CRow>
                            <CCol>
                                <h2>Perfil de Usuario</h2>
                            </CCol>
                            <CCol>
                                <CAvatar src={avatar8} size="xl" />   
                            </CCol>
                        </CRow>
                    </CCardHeader>
                        
                    <CCardBody>
                        <CRow className="mb-3">
                            <CCol>
                                <h5>Nombres:</h5>
                                <h6>Cesar Daniel</h6>
                                {/* <Alert/> */}
                            </CCol>
                            <CCol>
                                <h5>Apellidos:</h5>
                                <h6>Rosales Colmenares</h6>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <h5>Email:</h5>
                                <h6>cesardanielrc41@gmail.com</h6>
                            </CCol>
                            <CCol>
                                <h5>Contraseña:</h5>
                                <h6>************</h6>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <Modal/>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </CContainer>
    )
}

export default Registeruser