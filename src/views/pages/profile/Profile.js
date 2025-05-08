// import React, { useState, useEffect } from 'react'; 
// import {
//     CButton,
//     CCard,
//     CCardBody,
//     CCol,
//     CContainer,
//     CFormInput,
//     CInputGroup,
//     CInputGroupText,
//     CRow,
//     CModal,
//     CModalBody,
//     CModalFooter,
//     CModalHeader,
//     CModalTitle,
//     CCardHeader,
//     CAvatar,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { useNavigate } from 'react-router-dom'
// import { cilUser, cilPencil } from '@coreui/icons'
// import avatar8 from './../../../assets/images/avatars/8.jpg'
// import AlertMessage from './../login/Alerta'

// export const Modal = () => {
// const [visible, setVisible] = useState(false);
// const [formData, setFormData] = useState({
//     name: user?.name || '',
//     lastname: user?.lastname || '',
//     email: user?.email || '',
//     password: ''
// });

// const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
// };

// const handleUpdate = () => {
//     fetch(`http://localhost:5000/users2/1/${user.id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(formData)
//     })
//     .then(response => response.json())
//     .then(updatedUser => {
//         setUser(updatedUser);
//         setVisible(false);
//     });
// };

// return (
// <>
//     <CButton color="success" variant="ghost" className="ms-3" onClick={() => setVisible(!visible)}><CIcon icon={cilPencil} className="me-2" />Actualizar</CButton>

//     <CModal
//     alignment="center"
//     scrollable
//     visible={visible}
//     onClose={() => setVisible(false)}
//     aria-labelledby="VerticallyCenteredScrollableExample2"
//     >
//     <CModalHeader>
//         <CModalTitle id="VerticallyCenteredScrollableExample2">Actualizar Usuario</CModalTitle>
//     </CModalHeader>

//         <CModalBody>
//         <h2>Actualiza tus datos</h2>
//             <CInputGroup className="mb-3">
//                 <CInputGroupText>
//                     <CIcon icon={cilUser} />
//                 </CInputGroupText>
//                     <CFormInput 
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Nombre" 
//                     />
//                 </CInputGroup>

//                 <CInputGroup className="mb-3">
//                 <CInputGroupText>
//                     <CIcon icon={cilUser} />
//                 </CInputGroupText>
//                     <CFormInput 
//                     name="lastname"
//                     value={formData.lastname}
//                     onChange={handleInputChange}
//                     placeholder="Apellido"
//                     />
//                 </CInputGroup>

//                 <CInputGroup className="mb-3">
//                 <CInputGroupText>@</CInputGroupText>
//                 <CFormInput 
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="email" 
//                 />
//                 </CInputGroup>

//                 <CInputGroup className="mb-3">
//                 <CInputGroupText>@</CInputGroupText>
//                 <CFormInput placeholder="Password" autoComplete="password" />
//                 </CInputGroup>
//         </CModalBody>

//     <CModalFooter>
//         <CButton color="secondary" onClick={() => setVisible(false)}>
//         Close
//         </CButton>
//         <CButton color="primary" onClick={handleUpdate}>Save changes</CButton>
//     </CModalFooter>
//     </CModal>
// </>
// )
// }

// const Registeruser = () => {
// const [user, setUser] = useState(null);
// const [loading, setLoading] = useState(true);

// useEffect(() => {
// // Para obtener un usuario específico (ej. ID 1)
// fetch('http://localhost:5000/users2/1')
//     .then(response => {
//     if (!response.ok) throw new Error('Usuario no encontrado');
//     return response.json();
//     })
//     .then(data => {
//     setUser(data);
//     setLoading(false);
//     })
//     .catch(error => {
//     console.error('Error:', error);
//     setLoading(false);
//     });
// }, []);

// if (loading) return <div>Cargando...</div>;
// if (!user) return <div>No se encontró el usuario</div>;

//     return (
//     <CContainer style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '60vh'
//     }}>
//         <CRow className="w-100 justify-content-center">
//             <CCol md={7}>
//                 <CCard>
//                     <CCardHeader>
//                         <CRow>
//                             <CCol>
//                                 <h2>Perfil de Usuario</h2>
//                             </CCol>
//                             <CCol>
//                                 <CAvatar src={avatar8} size="xl" />   
//                             </CCol>
//                         </CRow>
//                     </CCardHeader>
                        
//                     <CCardBody>
//                         <CRow className="mb-3">
//                             <CCol>
//                                 <h5>Nombres:</h5>
//                                 <h6>{user.name}</h6>
//                                 {/* <Alert/> */}
//                             </CCol>
//                             <CCol>
//                                 <h5>Apellidos:</h5>
//                                 <h6>{user.lastname}</h6>
//                             </CCol>
//                         </CRow>
//                         <CRow className="mb-3">
//                             <CCol>
//                                 <h5>Email:</h5>
//                                 <h6>{user.email}</h6>
//                             </CCol>
//                             <CCol>
//                                 <h5>Contraseña:</h5>
//                                 <h6>*******</h6>
//                             </CCol>
//                         </CRow>
//                         <CRow>
//                             <CCol>
//                                 <Modal user={user} setUser={setUser}/>
//                             </CCol>
//                         </CRow>
//                     </CCardBody>
//                 </CCard>
//             </CCol>
//         </CRow>
//     </CContainer>
//     )
// }

// export default Registeruser

import React, { useState } from 'react'; 
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CFormInput,
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { cilUser, cilPencil } from '@coreui/icons'
import avatar8 from './../../../assets/images/avatars/8.jpg'
import AlertMessage from './../login/Alerta'

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
    <CContainer style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh'
    }}>
        <CRow className="w-100 justify-content-center">
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
                                <h6>cesar</h6>
                                {/* <Alert/> */}
                            </CCol>
                            <CCol>
                                <h5>Apellidos:</h5>
                                <h6>rosales</h6>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <h5>Email:</h5>
                                <h6>cesar@gmail.com</h6>
                            </CCol>
                            <CCol>
                                <h5>Contraseña:</h5>
                                <h6>*******</h6>
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