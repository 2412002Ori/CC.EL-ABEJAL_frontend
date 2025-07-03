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
import { contractsAPI } from '../../../services/api'

const RegisterPayment = () => {
  const [contracts, setContracts] = useState({})
  const [contractList, setContractList] = useState([])
  const [paymentData, setPaymentData] = useState({
    contractNumber: '',
    tenantName: '',
    tenantId: '',
    localNumber: '',
    amountDue: '',
    amount: '',
    payment_date: '',
    page_month: '',
    year_payment: '',
    description: '',
    paymentType: '',
  })

  // Fetch contracts from the API
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await contractsAPI.getAll();
        const formattedContracts = data.reduce((acc, contract) => {
          acc[contract.contract_number] = {
            tenantName: contract.tenants?.full_name || contract.tenantName || '',
            tenantId: contract.id_number || contract.tenant_id || '',
            localNumber: contract.location_id || '',
            amountDue: parseFloat(contract.rent_amount) || 0,
          }
          return acc
        }, {})
        setContracts(formattedContracts)
        setContractList(data.map(c => c.contract_number))
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
        amount: prevState.paymentType === 'multa' ? (contract.amountDue * 0.005).toFixed(2) : prevState.amount
      }))
    } else if (name === 'paymentType') {
      setPaymentData((prevState) => ({
        ...prevState,
        paymentType: value,
        amount: value === 'multa' ? (prevState.amountDue * 0.005).toFixed(2) : ''
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
    amount: paymentData.amount.toString(),
    payment_date: paymentData.payment_date ? new Date(paymentData.payment_date).toISOString() : '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    page_month: paymentData.page_month,
    year_payment: paymentData.year_payment,
    description: paymentData.description,
    contract_number: paymentData.contractNumber,
  }

  try {
    const response = await fetch('http://localhost:3003/api/payments', {
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
        payment_date: '',
        page_month: '',
        year_payment: '',
        description: '',
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
    <CCard bordered hover style={{ border: '2px solid #ffa600b0', padding: '2.5rem' }}>
      <CCardHeader>
        <h3 className="text-center">Registrar Pago</h3>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-4">
            {/* Tarjeta para los datos del inquilino */}
            <CCol md={6}>
              <CCard className="mb-4" style={{ minHeight: '320px', padding: '1.5rem' }}>
                <CCardHeader>
                  <h5 className="text-center">Datos del Inquilino</h5>
                </CCardHeader>
                <CCardBody>
                  <CRow className="mb-4">
                    <CCol md={4} className="mb-3">
                      <CFormInput
                        type="text"
                        name="contractNumber"
                        value={paymentData.contractNumber}
                        onChange={handleChange}
                        placeholder="Número de Contrato"
                        label="Número de Contrato"
                        list="contractNumbers"
                        required
                      />
                      <datalist id="contractNumbers">
                        {contractList.map((num) => (
                          <option key={num} value={num} />
                        ))}
                      </datalist>
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
            <CCol md={6}>
              <CCard className="mb-4" style={{ minHeight: '320px', padding: '1.5rem' }}>
                <CCardHeader>
                  <h5 className="text-center">Datos del Pago</h5>
                </CCardHeader>
                <CCardBody>
                  <CRow className="mb-4">
                    <CCol md={12} className="mb-3">
                      <CFormInput
                        type="number"
                        name="amount"
                        value={paymentData.amount}
                        placeholder="Monto a Pagar"
                        label="Monto a Pagar"
                        onChange={handleChange}
                        required
                        disabled={paymentData.paymentType === 'multa'}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={12}>
                      <CFormInput
                        type="date"
                        name="payment_date"
                        value={paymentData.payment_date}
                        onChange={handleChange}
                        placeholder="Fecha de Pago"
                        label="Fecha de Pago"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={12}>
                      <CFormSelect
                        name="page_month"
                        value={paymentData.page_month}
                        onChange={handleChange}
                        label="Mes de Pago"
                        required
                      >
                        <option value="">Seleccione el mes</option>
                        <option value="Enero">Enero</option>
                        <option value="Febrero">Febrero</option>
                        <option value="Marzo">Marzo</option>
                        <option value="Abril">Abril</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Junio">Junio</option>
                        <option value="Julio">Julio</option>
                        <option value="Agosto">Agosto</option>
                        <option value="Septiembre">Septiembre</option>
                        <option value="Octubre">Octubre</option>
                        <option value="Noviembre">Noviembre</option>
                        <option value="Diciembre">Diciembre</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={12}>
                      <CFormInput
                        type="text"
                        name="year_payment"
                        value={paymentData.year_payment}
                        onChange={handleChange}
                        placeholder="Año de Pago (ej: 2024)"
                        label="Año de Pago"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={12}>
                      <CFormInput
                        type="text"
                        name="description"
                        value={paymentData.description}
                        onChange={handleChange}
                        placeholder="Descripción"
                        label="Descripción"
                        required
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow className="d-flex justify-content-center mt-4">
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