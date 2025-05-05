import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CRow,
  CCol,
  CForm,
  CButton,
  CAlert,
} from '@coreui/react'
import { CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'  


const Relocation = () => {
  const contracts = {
    '12345678': { tenantName: 'Juan Pérez', tenantId: '12345678', currentLocal: 'A-101', currentLocalName: 'Tienda de Ropa', hasDebt: true },
    '87654321': { tenantName: 'María López', tenantId: '87654321', currentLocal: 'B-202', currentLocalName: 'Cafetería', hasDebt: false },
    '11223344': { tenantName: 'Carlos García', tenantId: '11223344', currentLocal: 'C-303', currentLocalName: 'Electrónica', hasDebt: true },
    '55667788': { tenantName: 'Ana Torres', tenantId: '55667788', currentLocal: 'D-404', currentLocalName: 'Joyería', hasDebt: false },
    '99887766': { tenantName: 'Luis Fernández', tenantId: '99887766', currentLocal: 'E-505', currentLocalName: 'Zapatería', hasDebt: false },
  }

  const [relocationData, setRelocationData] = useState({
    tenantId: '',
    tenantName: '',
    currentLocal: '',
    currentLocalName: '',
    newLocal: '',
    newLocalName: '',
    hasDebt: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'tenantId') {
      const contract = contracts[value] || { tenantName: '', tenantId: '', currentLocal: '', currentLocalName: '', hasDebt: false }
      setRelocationData((prevState) => ({
        ...prevState,
        tenantId: value,
        tenantName: contract.tenantName,
        currentLocal: contract.currentLocal,
        currentLocalName: contract.currentLocalName,
        hasDebt: contract.hasDebt,
      }))
    } else {
      setRelocationData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Relocation Data:', relocationData)
    alert(`Traslado registrado con éxito para el inquilino: ${relocationData.tenantName}`)
    setRelocationData({
      tenantId: '',
      tenantName: '',
      currentLocal: '',
      currentLocalName: '',
      newLocal: '',
      newLocalName: '',
      hasDebt: false,
    })
  }

  return (
    <>
       
      <h3 className="text-center">TRASLADO DE INQUILINO</h3>

      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-center">
            {/* Información del inquilino */}
            <CCol md={4}>
              <CCard className="mt-3 mb-3">
                <CCardHeader>
                  <h5 className="text-center">Información del Inquilino</h5>
                </CCardHeader>
                <CCardBody>
                  <CFormInput
                    type="text"
                    name="tenantId"
                    value={relocationData.tenantId}
                    onChange={handleChange}
                    placeholder="Cédula del Inquilino"
                    label="Cédula del Inquilino"
                    required
                    className="mb-3"
                  />
                  <CFormInput
                    type="text"
                    name="tenantName"
                    value={relocationData.tenantName}
                    placeholder="Nombre del Inquilino"
                    label="Nombre del Inquilino"
                    disabled
                    className="mb-3"
                  />
                 {relocationData.tenantId && (
                  relocationData.hasDebt ? (
                    <CAlert color="danger" className="text-center">
                      El inquilino tiene deudas activas
                    </CAlert>
                  ) : (
                    <CAlert color="success" className="text-center">
                      El inquilino no tiene deudas activas
                    </CAlert>
                  )
                )}
                </CCardBody>
              </CCard>
            </CCol>

            {/* Información del local */}
            <CCol md={4}>
              <CCard className="mt-3 mb-3">
                <CCardHeader>
                  <h5 className="text-center">Información del Local</h5>
                </CCardHeader>
                <CCardBody>
                  <CFormInput
                    type="text"
                    name="currentLocal"
                    value={relocationData.currentLocal}
                    placeholder="Local Actual"
                    label="Local Actual"
                    disabled
                    className="mb-3"
                  />
                  <CFormInput
                    type="text"
                    name="currentLocalName"
                    value={relocationData.currentLocalName}
                    placeholder="Nombre del Local Actual"
                    label="Nombre del Local Actual"
                    disabled
                    className="mb-3"
                  />
                  <CFormInput
                    type="text"
                    name="newLocal"
                    value={relocationData.newLocal}
                    onChange={handleChange}
                    placeholder="Nuevo Local"
                    label="Nuevo Local"
                    required
                    className="mb-3"
                  />
                  <CFormInput
                    type="text"
                    name="newLocalName"
                    value={relocationData.newLocalName}
                    onChange={handleChange}
                    placeholder="Nombre del Nuevo Local"
                    label="Nombre del Nuevo Local"
                    className="mb-3"
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow className="d-flex justify-content-center mt-3">
            <CCol xs="auto">
              <CButton type="submit" color="primary">
                Registrar Traslado
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}

export default Relocation