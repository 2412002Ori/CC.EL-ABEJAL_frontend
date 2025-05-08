import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CRow,
  CCol,
  CForm,
  CButton,
} from '@coreui/react'

const Application = ({ data = {}, onSave, isEdit = false }) => {
  const [formData, setFormData] = useState({
    id: '',
    id_number: '',
    full_name: '',
    request_date: '',
    activity: '',
    registeredBy: 'Admin Usuario',
  })

  useEffect(() => {
    if (isEdit && data) {
      setFormData(data) // Cargar datos iniciales si es modo edición
    }
  }, [isEdit, data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData) // Llamar a la función de guardar con los datos del formulario
  }

  return (
    <>
      <h3 className="text-center">{isEdit ? 'Editar Solicitud' : 'Nueva Solicitud'}</h3>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-center">
            {/* Columna izquierda: Información de la solicitud */}
            <CCol md={4}>
              <CCard className="mt-3 mb-3">
                <CCardHeader>
                  <h5 className="text-center">Información de la Solicitud</h5>
                </CCardHeader>
                <CCardBody>
                  <CFormInput
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="ID"
                    label="NUMERO DE SOLICITUD"
                    required
                    className="mb-3"
                    disabled={isEdit} 
                  />
                  <CFormInput
                    type="date"
                    name="request_date"
                    value={formData.request_date}
                    onChange={handleChange}
                    label="Fecha de Solicitud"
                    required
                    className="mb-3"
                  />
                  <CFormInput
                    type="text"
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    placeholder="Descripción de la Actividad"
                    label="Actividad"
                    required
                    className="mb-3"
                  />
                </CCardBody>
              </CCard>
            </CCol>

            {/* Columna derecha: Información del inquilino */}
            <CCol md={4}>
              <CCard className="mt-3 mb-3">
                <CCardHeader>
                  <h5 className="text-center">Información del Inquilino</h5>
                </CCardHeader>
                <CCardBody>
                  <CFormInput
                    type="text"
                    name="id_number"
                    value={formData.id_number}
                    onChange={handleChange}
                    placeholder="Número de Identificación"
                    label="Número de Identificación"
                    required
                    className="mb-3"
                  />
                  <CFormInput
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Nombre Completo"
                    label="Nombre Completo"
                    required
                    className="mb-3"
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow className="d-flex justify-content-center mt-3">
            <CCol xs="auto">
              <CButton type="submit" color="primary">
                {isEdit ? 'Guardar Cambios' : 'Generar'}
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}

export default Application