import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CRow,
  CCol,
  CForm,
  CFormSelect,
  CButton,
} from '@coreui/react'

const Cincome = () => {
  const contracts = {
    '001': { tenantName: 'Juan Pérez', tenantId: '12345678', amountDue: 500 },
    '002': { tenantName: 'María López', tenantId: '87654321', amountDue: 700 },
    '003': { tenantName: 'Carlos García', tenantId: '11223344', amountDue: 600 },
    '004': { tenantName: 'Ana Torres', tenantId: '55667788', amountDue: 800 },
    '005': { tenantName: 'Luis Fernández', tenantId: '99887766', amountDue: 550 },
  }

  const currentUser = 'Admin Usuario'

  const [paymentData, setPaymentData] = useState({
    contractRequestNumber: '',
    tenantId: '',
    tenantName: '',
    amountDue: '',
    amount: '',
    date: '',
    paymentMethod: '',
    activity: '',
    type: '',
    registeredBy: currentUser,
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'contractRequestNumber') {
      const contract = contracts[value] || { tenantName: '', tenantId: '', amountDue: '' }
      setPaymentData((prevState) => ({
        ...prevState,
        contractRequestNumber: value,
        tenantName: contract.tenantName,
        tenantId: contract.tenantId,
        amountDue: contract.amountDue,
      }))
    } else {
      setPaymentData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Payment Data:', paymentData)
    alert(`Contrato registrado con éxito por: ${paymentData.registeredBy}`)
    setPaymentData({
      contractRequestNumber: '',
      tenantId: '',
      tenantName: '',
      amountDue: '',
      amount: '',
      date: '',
      paymentMethod: '',
      activity: '',
      type: '',
      registeredBy: currentUser,
    })
  }

  return (
    <>
       <h3 className="text-center">CONTRATO</h3>
     
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
        <CRow>
          {/* Columna izquierda: Información de la solicitud */}
          <CCol md={6} >
            <CCard className='mt-3 mb-3'>
              <CCardHeader>
                <h5 className="text-center">Información de la Solicitud</h5>
              </CCardHeader>
              <CCardBody>
                <CFormInput
                  type="text"
                  name="contractRequestNumber"
                  value={paymentData.contractRequestNumber}
                  onChange={handleChange}
                  placeholder="Número de Solicitud de Contrato"
                  label="Número de Solicitud de Contrato"
                  required
                  className="mb-3"
                />
                <CFormSelect
                  name="paymentMethod"
                  value={paymentData.paymentMethod}
                  onChange={handleChange}
                  label="Tipo de Actividad"
                  required
                  className="mb-3"
                >
                  <option value="">Seleccione</option>
                  <option value="Pintura">Pintura</option>
                  <option value="Tejidos">Tejidos</option>
                  <option value="Carpintería">Carpintería</option>
                </CFormSelect>
                <CFormInput
                  type="text"
                  name="activity"
                  value={paymentData.activity}
                  onChange={handleChange}
                  placeholder="Descripción de la actividad"
                  label="Descripción"
                  required
                  className="mb-3"
                />
              </CCardBody>
            </CCard>
          </CCol>
        
          {/* Columna derecha: Información del inquilino */}
          <CCol md={6}>
            <CCard className='mt-3 mb-3'>
              <CCardHeader>
                <h5 className="text-center">Información del Inquilino</h5>
              </CCardHeader>
              <CCardBody>
                <CFormInput
                  type="text"
                  name="tenantId"
                  value={paymentData.tenantId}
                  placeholder="Cédula del Inquilino"
                  label="Cédula del Inquilino"
                  disabled
                  className="mb-3"
                />
                <CFormInput
                  type="text"
                  name="tenantName"
                  value={paymentData.tenantName}
                  placeholder="Nombre del Inquilino"
                  label="Nombre del Inquilino"
                  disabled
                  className="mb-3"
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

          <CCard>
            <CCardHeader>
              <h5 className="text-center">Detalles del Contrato</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={2}>
                  <CFormInput
                    type="text"
                    name="type"
                    value={paymentData.type}
                    onChange={handleChange}
                    placeholder="1234"
                    label="N° de Contrato"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={2}>
                  <CFormInput
                    type="number"
                    name="amount"
                    value={paymentData.amount}
                    onChange={handleChange}
                    placeholder="500"
                    label="Monto de Renta"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormInput
                    type="text"
                    name="tenantName"
                    placeholder="Arte Contemporaneo"
                    label="Nombre del negocio"
                    className="mb-3"
                  />
                </CCol>
                <CCol md={2}>
                  <CFormInput
                    type="date"
                    name="date"
                    value={paymentData.date}
                    onChange={handleChange}
                    label="Fecha emisión "
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={2}>
                  <CFormInput
                    type="date"
                    name="date"
                    value={paymentData.date}
                    onChange={handleChange}
                    label="Fecha vencimiento "
                    required
                    className="mb-3"
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
            
          <CRow className="d-flex justify-content-center mt-3">
            <CCol xs="auto">
              <CButton type="submit" color="primary">
                Generar Contrato
              </CButton>
            </CCol>
          </CRow>
          

          <CRow className="mb-3">
            <CCol md={6} className="offset-md-3">
              <CFormInput
                type="text"
                name="registeredBy"
                value={paymentData.registeredBy}
                placeholder="Usuario que registra"
                label="Registrado por"
                disabled
                className="mb-3"
              />
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}

export default Cincome