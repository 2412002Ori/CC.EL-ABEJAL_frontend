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
} from '@coreui/react'

const ListPayment = () => {
  const [fines, setFines] = useState([])
  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/fines`)
        const data = await response.json()
        setFines(Array.isArray(data) ? data : data.rows || [])
      } catch (error) {
        console.error('Error fetching fines:', error)
      }
    }
    fetchFines()
  }, [])

  const [searchTerm, setSearchTerm] = useState({
    tenantName: '',
    localNumber: '',
  })

  const filteredFines = fines.filter(
    (fine) =>
      (fine.tenantName?.toLowerCase() || '').includes(searchTerm.tenantName.toLowerCase()) &&
      (fine.localNumber?.toLowerCase() || '').includes(searchTerm.localNumber.toLowerCase())
  )

  const handleSearch = (e) => {
    const { name, value } = e.target
    setSearchTerm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <>
    <CCard bordered hover style={{ border: '2px solid #fff' }} >
      <CCardHeader>
        <h3 className="text-center" > Listado de pago de multas</h3>
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
        <CTable responsive >
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
            {filteredFines.map((fine) => (
              <CTableRow key={fine.fine_id || fine.id}>
                <CTableDataCell className="text-center">{fine.fine_id || fine.id}</CTableDataCell>
                <CTableDataCell className="text-center">{fine.tenantName || fine.tenant_name || ''}</CTableDataCell>
                <CTableDataCell className="text-center">{fine.localNumber || fine.local_number || ''}</CTableDataCell>
                <CTableDataCell className="text-center">{`$${fine.amount}`}</CTableDataCell>
                <CTableDataCell className="text-center">{fine.payment_date ? new Date(fine.payment_date).toLocaleDateString() : fine.date || ''}</CTableDataCell>
                <CTableDataCell className="text-center">{fine.method || fine.payment_method || ''}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        {filteredFines.length === 0 && (
          <p className="text-center mt-3">No se encontraron resultados para la búsqueda.</p>
        )}
      </CCardBody>
    </CCard>
    </>
  )
}

export default ListPayment