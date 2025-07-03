import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import { contractsAPI } from '../../../services/api'

const RegisterFinePayment = () => {
  const [contracts, setContracts] = useState([])
  const [fineData, setFineData] = useState({
    contractId: '',
    amount: '',
    payment_date: '',
    reason: '',
  })

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await contractsAPI.getAll();
        setContracts(data)
      } catch (error) {
        console.error('Error fetching contracts:', error)
      }
    }
    fetchContracts()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFineData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      contract_id: parseInt(fineData.contractId),
      amount: fineData.amount,
      payment_date: fineData.payment_date ? new Date(fineData.payment_date).toISOString() : '',
      reason: fineData.reason,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    try {
      const response = await fetch('http://localhost:3003/api/fines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        alert('Multa registrada con éxito')
        setFineData({ contractId: '', amount: '', payment_date: '', reason: '' })
      } else {
        alert('Error al registrar la multa')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al conectar con el servidor')
    }
  }

  return (
    <CCard bordered hover style={{ border: '2px solid #fff' }}>
      <CCardHeader>
        <h3 className="text-center">Registrar Pago de Multa</h3>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="contractId"
                value={fineData.contractId}
                onChange={handleChange}
                placeholder="ID del Contrato"
                label="ID del Contrato"
                list="contractIds"
                required
              />
              <datalist id="contractIds">
                {contracts.map((c) => (
                  <option key={c.contract_id} value={c.contract_id} />
                ))}
              </datalist>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                name="amount"
                value={fineData.amount}
                onChange={handleChange}
                placeholder="Monto de la Multa"
                label="Monto de la Multa"
                required
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CFormInput
                type="date"
                name="payment_date"
                value={fineData.payment_date}
                onChange={handleChange}
                placeholder="Fecha de Pago"
                label="Fecha de Pago"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="reason"
                value={fineData.reason}
                onChange={handleChange}
                placeholder="Motivo de la Multa"
                label="Motivo de la Multa"
                required
              />
            </CCol>
          </CRow>
          <CRow className="d-flex justify-content-center mt-3">
            <CCol xs="auto">
              <CButton type="submit" color="primary">
                Registrar Multa
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default RegisterFinePayment 