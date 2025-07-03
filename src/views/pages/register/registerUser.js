import {
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
    formData.password === formData.confirmPassword;

  const addUser = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    fetch(`${import.meta.env.VITE_API_URL}/users`, {
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
      })
      .catch((error) => console.error('Error:', error));
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

        <div className="d-flex gap-2">
          <CButton color="success" className="px-4" type="submit" disabled={!isFormValid}>
            Agregar
          </CButton>
          <CButton color="secondary" className="px-4" type="button" onClick={onClose}>
            Cerrar
          </CButton>
        </div>
      </CForm>

      <CModal visible={showSuccess} onClose={() => setShowSuccess(false)}>
        <CModalBody>
          ¡El usuario ha sido registrado exitosamente!
        </CModalBody>
      </CModal>
    </>
  )
}

const RegisterUserContainer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-end">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4" style={{
                border: '1px solid',
                borderRadius: '1rem',
                boxShadow: '1rem 1rem 1rem rgba(0, 0, 0, 0.75)'
              }}>
                <CCardBody className="d-flex flex-column align-items-center">
                  <CButton color="success" className="mb-4" onClick={() => setShowModal(true)}>
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
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}