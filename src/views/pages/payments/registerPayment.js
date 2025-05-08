import React, { useState, useEffect } from 'react'
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
  const [contracts, setContracts] = useState({})
  const [paymentData, setPaymentData] = useState({
    contractNumber: '',
    tenantName: '',
    tenantId: '',
    localNumber: '',
    amountDue: '',
    amount: '',
    date: '',
    paymentMethod: '',
    paymentType: '',
  })

  // Fetch contracts from the API
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch('http://localhost:3001/contracts')
        if (response.ok) {
          const data = await response.json()
          const formattedContracts = data.reduce((acc, contract) => {
            acc[contract.contract_number] = {
              tenantName: contract.tenantName || '',
              tenantId: contract.tenant_id || '',
              localNumber: contract.location_id || '',
              amountDue: parseFloat(contract.rent_amount) || 0,
            }
            return acc
          }, {})
          setContracts(formattedContracts)
        } else {
          console.error('Error fetching contracts:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching contracts:', error)
      }
    }

    fetchContracts()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'contractNumber') {
      const contract = contracts[value] || { tenantId: '', localNumber: '', amountDue: '' }
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

 const handleSubmit = async (e) => {
  e.preventDefault()

  const payload = {
    contract_number: paymentData.contractNumber, // Cambiado de contract_id a contract_number
    amount: parseFloat(paymentData.amount),
    rent_amount: parseFloat(paymentData.amountDue),
    "type page ": paymentData.paymentType,
    payment_method: paymentData.paymentMethod,
    payment_date: paymentData.date,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  try {
    const response = await fetch('http://localhost:3001/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
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
        paymentType: '',
      })
    } else {
      alert('Error al registrar el pago')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error al conectar con el servidor')
  }
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
                    <CCol md={4}>
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
                    <CCol md={4}>
                      <CFormInput
                        type="text"
                        name="tenantId"
                        value={paymentData.tenantId}
                        placeholder="Cédula del Inquilino"
                        label="Cédula del Inquilino"
                        disabled
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormInput
                        type="text"
                        name="localNumber"
                        value={paymentData.localNumber}
                        placeholder="Número del Local"
                        label="Número del Local"
                        disabled
                      />
                    </CCol>
                    <CCol md={4}>
                      <CFormInput
                        type="number"
                        name="amountDue"
                        value={paymentData.amountDue}
                        placeholder="Monto que Debe"
                        label="Monto que Debe"
                        disabled
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        name="paymentType"
                        value={paymentData.paymentType}
                        onChange={handleChange}
                        label="Tipo de Pago"
                        required
                      >
                        <option value="">Seleccione el tipo de pago</option>
                        <option value="alquiler">Alquiler</option>
                        <option value="servicio">Servicio</option>
                        <option value="multa">Multa</option>
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