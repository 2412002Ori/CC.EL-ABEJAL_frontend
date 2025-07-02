import  { useState, useEffect } from 'react'
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
import { cibEmlakjet } from '@coreui/icons'

const Application = ({ data = {}, onSave, isEdit = false }) => {
  const [formData, setFormData] = useState({
    id_number: '',
    full_name: '',
    request_date: '',
    activity: '',
    email: '',
    phone: '',
    registeredBy: 'Admin Usuario',
  })

  useEffect(() => {
    if (isEdit && data) {
      setFormData(prev => ({ ...prev, ...data }))
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
    onSave(formData) 
  }

  return (
    <>
      <style>
{`
/* Estilos generales del formulario */
.application-form {
  padding: 20px;
}

/* Estilos para las columnas del formulario */
.form-col {
  margin-bottom: 20px;
}

/* Estilos para las tarjetas (CCard) */
.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

/* Estilos para los encabezados de las tarjetas (CCardHeader) */
.card-header {
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.card-header h5 {
  margin-bottom: 0;
}

/* Estilos para los cuerpos de las tarjetas (CCardBody) */
.card-body {
  padding: 1.25rem;
}

/* Estilos para los inputs del formulario (CFormInput) */
.form-input {
  margin-bottom: 15px;
}

/* Estilos para el botón de enviar (CButton) */
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
`}
      </style>
      <h3 className="text-center">{isEdit ? 'Editar Solicitud' : 'Nueva Solicitud'}</h3>
      <CCardBody className="application-form">
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-center">
            {/* Columna izquierda: Información de la solicitud */}
            <CCol md={6} className="form-col">
              <CCard className="mt-3 mb-3 card">
                <CCardHeader className="card-header">
                  <h5 className="text-center">Información de la Solicitud</h5>
                </CCardHeader>
                <CCardBody className="card-body">
                  <CFormInput
                    type="date"
                    name="request_date"
                    value={formData.request_date}
                    onChange={handleChange}
                    label="Fecha de Solicitud"
                    required
                    className="mb-3 form-input"
                  />
                  <CFormInput
                    type="text"
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    placeholder="Descripción de la Actividad"
                    label="Actividad"
                    required
                    className="mb-3 form-input"
                  />
                </CCardBody>
              </CCard>
            </CCol>

            {/* Columna derecha: Información del inquilino */}
            <CCol md={6} className="form-col">
              <CCard className="mt-3 mb-3 card">
                <CCardHeader className="card-header">
                  <h5 className="text-center">Información del Inquilino</h5>
                </CCardHeader>
                <CCardBody className="card-body">
                  <CFormInput
                    type="text"
                    name="id_number"
                    value={formData.id_number}
                    onChange={handleChange}
                    placeholder="Número de Identificación"
                    label="Número de Identificación"
                    required
                    className="mb-3 form-input"
                  />
                  <CFormInput
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Nombre Completo"
                    label="Nombre Completo"
                    required
                    className="mb-3 form-input"
                  />
                   <CFormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo Electrónico"
                    label="Correo Electrónico"
                    className="mb-3 form-input"
                  />
                  <CFormInput
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Número de Teléfono"
                    label="Número de Teléfono"
                    className="mb-3 form-input"
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow className="d-flex justify-content-center mt-3">
            <CCol xs="auto">
              <CButton type="submit" color="primary" className="btn-primary">
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