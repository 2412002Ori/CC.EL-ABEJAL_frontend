import React, { useState, useEffect } from 'react'
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
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFile } from '@coreui/icons'

const ListPayment = () => {
  const [payments, setPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState({
    tenantName: '',
    localNumber: '',
  })

    useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/payments')
        const data = await response.json()
        console.log('Datos obtenidos:', data) // Verifica los datos aquí
        setPayments(Array.isArray(data) ? data : data.rows || [])
      } catch (error) {
        console.error('Error fetching payments:', error)
      }
    }
  
    fetchPayments()
  }, [])

  const filteredPayments = payments.filter(
    (payment) =>
      (payment.contract_number?.toString() || '').includes(searchTerm.localNumber) &&
      (payment["type_page "]?.toLowerCase() || '').includes(searchTerm.tenantName.toLowerCase())
  )

  const handleSearch = (e) => {
    const { name, value } = e.target
    setSearchTerm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileAction = (payment) => {
    console.log('Archivo generado para:', payment)
    alert(`Generar archivo para el pago con ID ${payment.id}`)
    // Aquí puedes implementar la lógica para generar o descargar un archivo
  }

  return (
    <CCard bordered hover style={{ border: '2px solid #ffa600b0' }}>
      <CCardHeader>
        <h3 className="text-center">Listado de Pagos Registrados</h3>
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
              label="N Contrato"
            />
          </CCol>
        </CRow>
        <CTable responsive>
          <CTableHead>
            <CTableRow>
             
              <CTableHeaderCell className="text-center">Número de Contrato</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Monto</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Descripcion</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Mes de Pago</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Fecha de Pago</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Factura</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredPayments.map((payment) => (
              <CTableRow key={payment.payment_id}>
               
                <CTableDataCell className="text-center">{payment.contract_number}</CTableDataCell>
                <CTableDataCell className="text-center">{`$${payment.amount}`}</CTableDataCell>
                <CTableDataCell className="text-center">{payment.description}</CTableDataCell>
                <CTableDataCell className="text-center">{payment.page_month}</CTableDataCell>
                <CTableDataCell className="text-center">{payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : ''}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => handleFileAction(payment)}
                  >
                    <CIcon icon={cilFile} /> 
                  </CButton>
                </CTableDataCell>
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