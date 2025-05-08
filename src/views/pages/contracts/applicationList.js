import React, { useState, useEffect } from 'react'
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
  const [modalVisible, setModalVisible] = useState(false) // Modal para crear
  const [modal1Visible, setModal1Visible] = useState(false) // Modal para editar
  const [searchCedula, setSearchCedula] = useState('')
  const [rows, setRows] = useState([]) 
  const [selectedRow, setSelectedRow] = useState(null) 

  const headers = [
    'Número de Solicitud',
    'Cédula del Inquilino',
    'Nombre del Inquilino',
    'Fecha',
    'Actividad',
    'Tipo',
    '', 
  ] 

  useEffect(() => {
    console.log('Cargando datos desde JSON Server...')
    fetch('http://localhost:3001/contract_requests')
      .then((response) => {
        console.log('Respuesta del servidor:', response)
        if (!response.ok) {
          throw new Error('Error al cargar los datos')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Datos cargados:', data)
        setRows(data)
      })
      .catch((error) => console.error('Error al cargar los datos:', error))
  }, [])

  const filteredRows = rows.filter((row) =>
    row.id_number?.toString().toLowerCase().includes(searchCedula.toLowerCase())
  )

  const handleEdit = (row) => {
    console.log('Editar:', row)
    setSelectedRow(row) 
    setModal1Visible(true) 
  }

  const handleSave = (updatedRow) => {
    console.log('Datos enviados para actualizar:', updatedRow) // Depuración
    fetch(`http://localhost:3001/contract_requests/${updatedRow.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRow), // Enviar los datos actualizados
    })
      .then((response) => {
        console.log('Respuesta del servidor:', response) // Depuración
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error al actualizar la solicitud: ${text}`)
          })
        }
        return response.json()
      })
      .then((data) => {
        console.log('Datos actualizados en el servidor:', data) // Depuración
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
        )
        setModal1Visible(false) // Cerrar el modal de edición
      })
      .catch((error) => console.error('Error al actualizar la solicitud:', error))
  }

  const handleCreate = (newRow) => {
    console.log('Datos enviados para crear:', newRow) // Depuración
    fetch('http://localhost:3001/contract_requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRow), // Enviar los datos nuevos
    })
      .then((response) => {
        console.log('Respuesta del servidor:', response) // Depuración
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error al crear la solicitud: ${text}`)
          })
        }
        return response.json()
      })
      .then((data) => {
        console.log('Datos creados en el servidor:', data) // Depuración
        setRows((prevRows) => [...prevRows, data])
        setModalVisible(false) // Cerrar el modal de creación
      })
      .catch((error) => console.error('Error al crear la solicitud:', error))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/contract_requests/${id}`, { 
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar la solicitud')
        }
        setRows((prevRows) => prevRows.filter((row) => row.id !== id))
      })
      .catch((error) => console.error('Error al eliminar la solicitud:', error))
  }

  return (
    <div className="informe-mensual">
      {/* Modal para crear */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg">
        <CModalBody>
          <Application
            onSave={handleCreate} 
            isEdit={false} 
          />
        </CModalBody>
      </CModal>

      {/* Modal para editar */}
      <CModal visible={modal1Visible} onClose={() => setModal1Visible(false)} size="lg">
        <CModalBody>
          <Application
            data={selectedRow} 
            onSave={handleSave} 
            isEdit={true} 
          />
        </CModalBody>
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
                  <CTableDataCell className="text-center">{row.id}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.id_number}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.full_name}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.request_date}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.activity}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.type}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton
                      color="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(row)}
                    >
                      <CIcon icon={cilPencil} /> 
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(row.id)}
                    >
                      <CIcon icon={cilTrash} /> 
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