import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUserPlus } from '@coreui/icons'
import Register from './register'

function TenantsList() {
  const [modalVisible, setModalVisible] = useState(false)
  const [searchCedula, setSearchCedula] = useState('') // Estado para el filtro de búsqueda

  const headers = [
    'CEDULA',
    'RIF',
    'NOMBRE Y APELLIDO',
    'DIRECCION',
    'TELEFONO',
    'CORREO',
    'HORARIO ENTRADA',
    'HORARIO SALIDA',
    'DIAS DE TRABAJO',
  ]

  const [rows] = useState([
    {
      cedula: '12345678',
      rif: 'J-12345678-9',
      nombreApellido: 'Juan Pérez',
      direccion: 'Calle 123, Caracas',
      telefono: '0414-1234567',
      correo: 'juan.perez@example.com',
      horarioEntrada: '08:00 AM',
      horarioSalida: '05:00 PM',
      diasTrabajo: 'Lunes a Viernes',
    },
    {
      cedula: '87654321',
      rif: 'J-87654321-0',
      nombreApellido: 'María López',
      direccion: 'Av. Principal, Valencia',
      telefono: '0416-7654321',
      correo: 'maria.lopez@example.com',
      horarioEntrada: '09:00 AM',
      horarioSalida: '06:00 PM',
      diasTrabajo: 'Lunes a Sábado',
    },
    {
      cedula: '11223344',
      rif: 'J-11223344-5',
      nombreApellido: 'Carlos García',
      direccion: 'Sector Centro, Maracaibo',
      telefono: '0424-1122334',
      correo: 'carlos.garcia@example.com',
      horarioEntrada: '07:00 AM',
      horarioSalida: '04:00 PM',
      diasTrabajo: 'Lunes a Viernes',
    },
  ])

  // Filtrar las filas según el valor de búsqueda
  const filteredRows = rows.filter((row) =>
    row.cedula.toLowerCase().includes(searchCedula.toLowerCase())
  )

  return (
    <div className="informe-mensual">
      {/* Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="xl">
        <CModalHeader closeButton>
          <h5>Registrar nuevo inquilino</h5>
        </CModalHeader>
        <CModalBody>
          <Register />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

         <CRow className="mb-3 align-items-center">
      <CCol md="auto">
        <CButton
          className="rounded-circle"
          color="primary"
          style={{ width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => setModalVisible(true)}
        >
          <CIcon icon={cilUserPlus} size="lg" />
        </CButton>
      </CCol>
      <CCol md={4}>
        <CFormInput
          type="text"
          placeholder="Buscar por cédula"
          value={searchCedula}
          onChange={(e) => setSearchCedula(e.target.value)}
          
        />
      </CCol>
    </CRow>
  

      {/* Tabla de inquilinos */}
      <CCard bordered hover style={{ border: '2px solid #ffa600b0' }}>
        <CCardHeader>
          <CRow>
            <CCol>
              <h3>LISTA DE INQUILINOS ACTIVOS</h3>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable responsive bordered hover>
            <CTableHead>
              <CTableRow>
                {headers.map((header, index) => (
                  <CTableHeaderCell key={index} className="text-center">
                    {header}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredRows.map((row, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">{row.cedula}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.rif}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.nombreApellido}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.direccion}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.telefono}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.correo}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.horarioEntrada}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.horarioSalida}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.diasTrabajo}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default TenantsList