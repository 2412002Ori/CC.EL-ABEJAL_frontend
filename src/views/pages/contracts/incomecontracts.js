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
  // Base de datos local simulada
  const contracts = {
    '001': { tenantName: 'Juan Pérez', tenantId: '12345678', amountDue: 500 },
    '002': { tenantName: 'María López', tenantId: '87654321', amountDue: 700 },
    '003': { tenantName: 'Carlos García', tenantId: '11223344', amountDue: 600 },
    '004': { tenantName: 'Ana Torres', tenantId: '55667788',  amountDue: 800 },
    '005': { tenantName: 'Luis Fernández', tenantId: '99887766', amountDue: 550 },
  }

  // Simulación del usuario actual
  const currentUser = 'Admin Usuario'; // Este valor puede ser dinámico según el sistema

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
    registeredBy: currentUser, // Usuario traído automáticamente
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'contractRequestNumber') {
      const contract = contracts[value] || { tenantName: '', tenantId: '', localNumber: '', amountDue: '' }
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
      registeredBy: currentUser, // Mantener el usuario actual
    })
  }

  return (
    <CCard bordered hover style={{ border: '2px solid #ffa600b0' }}>
      <CCardHeader>
        <h3 className="text-center">CONTRATO</h3>
      </CCardHeader>
      <CCardBody>
            <CForm onSubmit={handleSubmit}>
            
                <h5 className="mb-3">Información de la Solicitud</h5>
                <CRow className="mb-3">
                    <CCol md={3}>
                    <CFormInput
                        type="text"
                        name="contractRequestNumber"
                        value={paymentData.contractRequestNumber}
                        onChange={handleChange}
                        placeholder="Número de Solicitud de Contrato"
                        label="Número de Solicitud de Contrato"
                        required
                    />
                    </CCol>
                    <CCol md={3}>
                    <CFormInput
                        type="text"
                        name="tenantId"
                        value={paymentData.tenantId}
                        placeholder="Cédula del Inquilino"
                        label="Cédula del Inquilino"
                        disabled
                    />
                    </CCol>
                    <CCol md={6}>
                    <CFormInput
                        type="text"
                        name="tenantName"
                        value={paymentData.tenantName}
                        placeholder="Nombre del Inquilino"
                        label="Nombre del Inquilino"
                        disabled
                    />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    
                    <CCol md={3}>
                    <CFormSelect
                        name="paymentMethod"
                        value={paymentData.paymentMethod}
                        onChange={handleChange}
                        label="TIPO DE ACTIVIDAD"
                        required
                    >
                        <option value="">Seleccione</option>
                        <option value="Pintura">PINTURA</option>
                        <option value="Tejidos">TEJIDOS</option>
                        <option value="Carpintería">CARPINTERÍA</option>
                    </CFormSelect>
                    </CCol>
                    <CCol md={4}>
                    <CFormInput
                        type="text"
                        name="activity"
                        value={paymentData.activity}
                        onChange={handleChange}
                        placeholder="Descripción de la actividad"
                        label="Descripción"
                        required
                    />
                    </CCol>
                </CRow>

                <h5 className="mb-3">Información a Completar</h5>
                <CRow className="mb-3">
                    <CCol md={3}>
                    <CFormInput
                        type="text"
                        name="type"
                        value={paymentData.type}
                        onChange={handleChange}
                        placeholder="1234"
                        label="N° de Contrato"
                        required
                    />
                    </CCol>
                    <CCol md={3}>
                    <CFormInput
                        type="text"
                        name="type"
                        value={paymentData.type}
                        onChange={handleChange}
                        placeholder="12"
                        label="N° de local"
                        required
                    />
                    </CCol>
                    
                    <CCol md={3}>
                    <CFormInput
                        type="number"
                        name="amount"
                        value={paymentData.amount}
                        onChange={handleChange}
                        placeholder="500"
                        label="Monto de Renta"
                        required
                    />
                    </CCol>

                </CRow>
                <CRow className="mb-3">
                    <CCol md={6}>
                    <CFormInput
                        type="date"
                        name="date"
                        value={paymentData.date}
                        onChange={handleChange}
                        label="Fecha emisión de contrato"
                        required
                    />
                    </CCol>
                    <CCol md={6}>
                    <CFormInput
                        type="date"
                        name="date"
                        value={paymentData.date}
                        onChange={handleChange}
                        label="Fecha vencimiento de contrato"
                        required
                    />
                    </CCol>
                </CRow>


                <CRow className="d-flex justify-content-center">
                    <CCol xs="auto">
                    <CButton type="submit" color="primary">
                        Generar Contrato
                    </CButton>
                    </CCol>
                </CRow>
            </CForm>

            <CRow className="mb-3">
                <CCol md={12}>
                <CFormInput
                    type="text"
                    name="registeredBy"
                    value={paymentData.registeredBy}
                    placeholder="Usuario que registra"
                    label="Registrado por"
                    disabled
                />
                </CCol>
            </CRow>
        </CCardBody>
    </CCard>
  )
}

export default Cincome