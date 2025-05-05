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
import { cilTrash, cilPencil } from '@coreui/icons'
import Application from './application'


function Applicationlist() {
  const [modalVisible, setModalVisible] = useState(false)
  const [searchCedula, setSearchCedula] = useState('') // Estado para el filtro de búsqueda
  const [rows, setRows] = useState([
    {
      contractRequestNumber: '001',
      tenantId: '12345678',
      tenantName: 'Juan Pérez',
      date: '2023-05-01',
      activity: 'Pintura',
      type: 'Comercial',
    },
    {
      contractRequestNumber: '002',
      tenantId: '87654321',
      tenantName: 'María López',
      date: '2023-05-02',
      activity: 'Tejidos',
      type: 'Residencial',
    },
    {
      contractRequestNumber: '003',
      tenantId: '11223344',
      tenantName: 'Carlos García',
      date: '2023-05-03',
      activity: 'Carpintería',
      type: 'Industrial',
    },
  ])

  const headers = [
    'Número de Solicitud',
    'Cédula del Inquilino',
    'Nombre del Inquilino',
    'Fecha',
    'Actividad',
    'Tipo',
    '', 
  ] 

  const filteredRows = rows.filter((row) =>
    row.tenantId.toLowerCase().includes(searchCedula.toLowerCase())
  )


 
  const handleEdit = (row) => {
    console.log('Editar:', row)
   
  }


  const handleDelete = (contractRequestNumber) => {
    setRows((prevRows) => prevRows.filter((row) => row.contractRequestNumber !== contractRequestNumber))
    
  }

  return (
    <div className="informe-mensual">
      {/* Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="xl">
        <CModalHeader closeButton>
          <h5>Registrar nueva solicitud</h5>
        </CModalHeader>
        <CModalBody>
          <Application />
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

      {/* Tabla de solicitudes */}
      <CCard bordered hover style={{ border: '2px solid #ffa600b0' }}>
        <CCardHeader>
          <CRow>
            <CCol>
              <h3>LISTA DE SOLICITUDES</h3>
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
                  <CTableDataCell className="text-center">{row.contractRequestNumber}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.tenantId}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.tenantName}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.date}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.activity}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.type}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton
                      color="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(row)}
                    >
                      <CIcon icon={cilPencil} /> {/* Ícono para editar */}
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(row.contractRequestNumber)}
                    >
                      <CIcon icon={cilTrash} /> {/* Ícono para eliminar */}
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Applicationlist