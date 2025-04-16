import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CForm,
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CRow,
  CCol, 
  CCardBody,
  
} from '@coreui/react'

const Application = () => {
  const [options1, setOptions] = useState([])
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState({
    orderId: '',
    fecha: '',
  })

  const [disabled, setDisabled] = useState(false)
  const [patientData, setPatientData] = useState({
    tipoE: '',
    cedula: '',
    nombres: '',
    sexo: '',
    edad: '',
    telf: '',
    correo: '',
    direccion: '',
  })

  useEffect(() => {
    // Simulación de obtener opciones (puedes reemplazar con tu API)
    setOptions([
      { value: 'opcion1', label: 'Opción 1' },
      { value: 'opcion2', label: 'Opción 2' },
    ])
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPatientData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChange2 = (e) => {
    const { name, value } = e.target
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Patient Data:', patientData)
    console.log('Order:', order)
    console.log('Orders:', orders)
  }

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CCard>
          <CCardHeader>
          <h3 className="text-center" >  SOLUCITUDES PARA CONTRATOS </h3>
          </CCardHeader>
          <CCard className="mb-4" bordered hover style={{ border: '2px solid #ffa600b0' }}>
            <CCardHeader>Agregar solicitud</CCardHeader>
            <CInputGroup className="d-flex pb-2">
              <CInputGroupText>Nro de solicitud</CInputGroupText>
              <CFormInput
                name="orderId"
                value={order.orderId}
                onChange={handleChange2}
                type="number"
                placeholder="Ej. 12345"
              />
              <CInputGroupText>Fecha</CInputGroupText>
              <CFormInput
                name="fecha"
                value={order.fecha}
                onChange={handleChange2}
                type="date"
              />
            </CInputGroup>
            <br />
            
          </CCard>

          <CCard className="mb-4" bordered hover style={{ border: '2px solid #ffa600b0' }}>
            <CCardHeader>Información del inquilino</CCardHeader>
            <CInputGroup>
              <CInputGroupText>N° Documento:</CInputGroupText>
              <CFormInput
                name="cedula"
                value={patientData.cedula}
                onChange={handleChange}
                type="number"
                placeholder="Ej. 12345678"
              />
            </CInputGroup>
            <br />
            <CInputGroup>
              <CInputGroupText>Nombre:</CInputGroupText>
              <CFormInput
                name="nombres"
                value={patientData.nombres}
                onChange={handleChange}
                type="text"
                placeholder="Ej. Juan Pérez"
                autoComplete="name"
                disabled={disabled}
              />
              <CInputGroupText>Apellidos</CInputGroupText>
              <CFormInput
                name="apellidos"
                value={patientData.nombres}
                onChange={handleChange}
                type="text"
                placeholder="Ej. Juan Pérez"
                autoComplete="name"
                disabled={disabled}
              />

            </CInputGroup>
            
          </CCard>

          <CCard className="mb-4" bordered hover style={{ border: '2px solid #ffa600b0' }}>
            <CCardHeader>Actividad a realizar </CCardHeader>
          
            <br />
            <CInputGroup>
              <CInputGroupText>tipo de actividad:</CInputGroupText>
              <CFormInput
                name="nombres"
                value={patientData.nombres}
                onChange={handleChange}
                type="text"
                placeholder="Marroquineria"
                autoComplete="name"
                disabled={disabled}
              />
              <CInputGroupText>descripcion </CInputGroupText>
              <CFormInput
                name="apellidos"
                value={patientData.nombres}
                onChange={handleChange}
                type="text"
                placeholder="Con arcilla y arenisca"
                autoComplete="name"
                disabled={disabled}
              />

            </CInputGroup>
            
          </CCard>
        </CCard>

                    <CRow className="d-flex justify-content-center mt-3">
            <CCol xs="auto">
              <CButton
                type="submit"
                style={{
                  backgroundColor: '#ffa600b0',
                  borderColor: '#ffa600b0',
                  color: '#fff',
                  marginTop: '20px',
                }}
              >
                Guardar
              </CButton>
            </CCol>
          </CRow>
      </CForm>
    </>
  )
}

export default Application