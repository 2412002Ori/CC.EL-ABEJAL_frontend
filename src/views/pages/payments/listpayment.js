import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CRow,
  CCol,
} from '@coreui/react'

const ListPayment = () => {
  // Datos simulados de pagos registrados
  const payments = [
    { id: 1, tenantName: 'Juan Pérez', localNumber: 'A-101', amount: 500, date: '2023-04-01', method: 'Efectivo' },
    { id: 2, tenantName: 'María López', localNumber: 'B-202', amount: 700, date: '2023-04-02', method: 'Transferencia' },
    { id: 3, tenantName: 'Carlos García', localNumber: 'C-303', amount: 600, date: '2023-04-03', method: 'Tarjeta' },
    { id: 4, tenantName: 'Ana Torres', localNumber: 'D-404', amount: 800, date: '2023-04-04', method: 'Efectivo' },
    { id: 5, tenantName: 'Luis Fernández', localNumber: 'E-505', amount: 550, date: '2023-04-05', method: 'Transferencia' },
  ]

  const [searchTerm, setSearchTerm] = useState({
    tenantName: '',
    localNumber: '',
  })

  // Filtrar pagos según los términos de búsqueda
  const filteredPayments = payments.filter(
    (payment) =>
      payment.tenantName.toLowerCase().includes(searchTerm.tenantName.toLowerCase()) &&
      payment.localNumber.toLowerCase().includes(searchTerm.localNumber.toLowerCase())
  )

  const handleSearch = (e) => {
    const { name, value } = e.target
    setSearchTerm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <CCard bordered hover style={{ border: '2px solid #ffa600b0' }} >
      <CCardHeader>
        <h3 className="text-center" > Listado de Pagos Registrados</h3>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
        <CCol md={1}>
            <CFormInput
              type="text"
              name="localNumber"
              placeholder=" "
              value={searchTerm.localNumber}
              onChange={handleSearch}
              label="N Local"
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              type="text"
              name="tenantName"
              placeholder=""
              value={searchTerm.tenantName}
              onChange={handleSearch}
              label="Nombre del Inquilino"
            />
          </CCol>
          
        </CRow>
        <CTable >
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className="text-center">N PAGO</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Nombre del Inquilino</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Número de Local</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Monto</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Fecha</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Método de Pago</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredPayments.map((payment) => (
              <CTableRow key={payment.id}>
                <CTableDataCell className="text-center">{payment.id}</CTableDataCell>
                <CTableDataCell className="text-center">{payment.tenantName}</CTableDataCell>
                <CTableDataCell className="text-center">{payment.localNumber}</CTableDataCell>
                <CTableDataCell className="text-center">{`$${payment.amount}`}</CTableDataCell>
                <CTableDataCell className="text-center">{payment.date}</CTableDataCell>
                <CTableDataCell className="text-center">{payment.method}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        {filteredPayments.length === 0 && (
          <p className="text-center mt-3">No se encontraron resultados para la búsqueda.</p>
        )}
      </CCardBody>
    </CCard>
  )
}

export default ListPayment