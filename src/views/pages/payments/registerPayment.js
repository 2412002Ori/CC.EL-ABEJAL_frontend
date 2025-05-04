import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'

const RegisterPayment = () => {
  // Base de datos local simulada
  const contracts = {
    '001': { tenantName: 'Juan Pérez', tenantId: '12345678', localNumber: 'A-101', amountDue: 500 },
    '002': { tenantName: 'María López', tenantId: '87654321', localNumber: 'B-202', amountDue: 700 },
    '003': { tenantName: 'Carlos García', tenantId: '11223344', localNumber: 'C-303', amountDue: 600 },
    '004': { tenantName: 'Ana Torres', tenantId: '55667788', localNumber: 'D-404', amountDue: 800 },
    '005': { tenantName: 'Luis Fernández', tenantId: '99887766', localNumber: 'E-505', amountDue: 550 },
  }

  const [paymentData, setPaymentData] = useState({
    contractNumber: '',
    tenantName: '',
    tenantId: '',
    localNumber: '',
    amountDue: '',
    amount: '',
    date: '',
    paymentMethod: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    
    if (name === 'contractNumber') {
      const contract = contracts[value] || { tenantName: '', tenantId: '', localNumber: '', amountDue: '' }
      setPaymentData((prevState) => ({
        ...prevState,
        contractNumber: value,
        tenantName: contract.tenantName,
        tenantId: contract.tenantId,
        localNumber: contract.localNumber,
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
    alert('Pago registrado con éxito')
    setPaymentData({
      contractNumber: '',
      tenantName: '',
      tenantId: '',
      localNumber: '',
      amountDue: '',
      amount: '',
      date: '',
      paymentMethod: '',
    })
  }


  return (
        <CCard bordered hover style={{ border: '2px solid #ffa600b0' }}>
      <CCardHeader>
        <h3 className="text-center">Registrar Pago</h3>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            {/* Tarjeta para los datos del inquilino */}
            <CCol md={6}>
              <CCard className="mb-4">
                <CCardHeader>
                  <h5 className="text-center">Datos del Inquilino</h5>
                </CCardHeader>
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol md={12}>
                      <CFormInput
                        type="text"
                        name="contractNumber"
                        value={paymentData.contractNumber}
                        onChange={handleChange}
                        placeholder="Número de Contrato"
                        label="Número de Contrato"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        name="tenantName"
                        value={paymentData.tenantName}
                        onChange={handleChange}
                        placeholder="Nombre del Inquilino"
                        label="Nombre del Inquilino"
                        disabled
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        name="tenantId"
                        value={paymentData.tenantId}
                        onChange={handleChange}
                        placeholder="Cédula del Inquilino"
                        label="Cédula del Inquilino"
                        disabled
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={12}>
                      <CFormInput
                        type="text"
                        name="localNumber"
                        value={paymentData.localNumber}
                        onChange={handleChange}
                        placeholder="Número del Local"
                        label="Número del Local"
                        disabled
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={12}>
                      <CFormSelect
                        name="paymentType"
                        value={paymentData.paymentType}
                        onChange={handleChange}
                        label="Tipo de Pago"
                        required
                      >
                        <option value="">Seleccione el tipo de pago</option>
                        <option value="Condominio">Condominio</option>
                        <option value="Servicio">Servicio</option>
                        <option value="Multas">Multas</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
    
            {/* Tarjeta para los datos del pago */}
            <CCol md={6}>
              <CCard className="mb-4">
                <CCardHeader>
                  <h5 className="text-center">Datos del Pago</h5>
                </CCardHeader>
                <CCardBody>
                  
                  <CRow className="mb-3">
                    <CCol md={6}>
                      <CFormInput
                        type="number"
                        name="amountDue"
                        value={paymentData.amountDue}
                        onChange={handleChange}
                        placeholder="Monto que Debe"
                        label="Monto que Debe"
                        disabled
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="number"
                        name="amount"
                        value={paymentData.amount}
                        onChange={handleChange}
                        placeholder="Monto a Pagar"
                        label="Monto a Pagar"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={12}>
                      <CFormInput
                        type="date"
                        name="date"
                        value={paymentData.date}
                        onChange={handleChange}
                        label="Fecha de Pago"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={12}>
                      <CFormSelect
                        name="paymentMethod"
                        value={paymentData.paymentMethod}
                        onChange={handleChange}
                        label="Método de Pago"
                        required
                      >
                        <option value="">Seleccione un método</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Tarjeta">Tarjeta</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
    
          {/* Botón para registrar el pago */}
          <CRow className="d-flex justify-content-center">
            <CCol xs="auto">
              <CButton type="submit" color="primary">
                Registrar Pago
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default RegisterPayment