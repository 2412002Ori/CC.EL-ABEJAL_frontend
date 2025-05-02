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
  CFormCheck,
} from '@coreui/react'

const RegistrerTenant = () => {
  const [formData, setFormData] = useState({
    cedula: '',
    rif: '',
    nombreApellido: '',
    direccion: '',
    telefono: '',
    correo: '',
    horarioEntrada: '',
    horarioSalida: '',
    diasTrabajo: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setFormData((prevState) => {
      const diasTrabajo = checked
        ? [...prevState.diasTrabajo, value]
        : prevState.diasTrabajo.filter((dia) => dia !== value)
      return { ...prevState, diasTrabajo }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    alert('Formulario enviado con éxito')
    setFormData({
      cedula: '',
      rif: '',
      nombreApellido: '',
      direccion: '',
      telefono: '',
      correo: '',
      horarioEntrada: '',
      horarioSalida: '',
      diasTrabajo: [],
    })
  }

  return (
         <CCard bordered hover style={{ border: '2px solid #ffa600b0' }}>
      <CCardHeader>
        <h3 className="text-center">Registro de Inquilino</h3>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-center mb-3">
            <CCol md={2}>
              <CFormInput
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="Número de Cédula"
                label="Cédula"
                required
              />
            </CCol>
            <CCol md={2}>
              <CFormInput
                type="text"
                name="rif"
                value={formData.rif}
                onChange={handleChange}
                placeholder="RIF"
                label="RIF"
                required
              />
            </CCol>
            <CCol md={5}>
              <CFormInput
                type="text"
                name="nombreApellido"
                value={formData.nombreApellido}
                onChange={handleChange}
                placeholder="Nombre y Apellido"
                label="Nombre y Apellido"
                required
              />
            </CCol>
          </CRow>
    
          <CRow className="justify-content-center mb-3">
            <CCol md={2}>
              <CFormInput
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                label="Teléfono"
                required
              />
            </CCol>
            <CCol md={2}>
              <CFormInput
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                label="Correo Electrónico"
                required
              />
            </CCol>
            <CCol md={5}>
              <CFormInput
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Dirección"
                label="Dirección"
                required
              />
            </CCol>
          </CRow>
    
          <CRow className="justify-content-center mb-3">
            <CCol md={2}>
              <CFormInput
                type="time"
                name="horarioEntrada"
                value={formData.horarioEntrada}
                onChange={handleChange}
                placeholder="Horario de Entrada"
                label="Hora de Entrada"
                required
              />
            </CCol>
            <CCol md={2}>
              <CFormInput
                type="time"
                name="horarioSalida"
                value={formData.horarioSalida}
                onChange={handleChange}
                placeholder="Horario de Salida"
                label="Hora de Salida"
                required
              />
            </CCol>
            <CCol md={7}>
              <label className="form-label">Días de Trabajo</label>
              <div className="text-center">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(
                  (dia) => (
                    <CFormCheck
                      key={dia}
                      inline
                      label={dia}
                      value={dia}
                      onChange={handleCheckboxChange}
                      checked={formData.diasTrabajo.includes(dia)}
                    />
                  ),
                )}
              </div>
            </CCol>
          </CRow>
    
          <CRow className="justify-content-center">
            <CCol xs="auto">
              <CButton type="submit" color="primary">
                Registrar
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default RegistrerTenant