import { useState, useEffect } from 'react'
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
  CModalBody,
  CFormInput,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilUserPlus } from '@coreui/icons'
import { cilTrash, cilPencil } from '@coreui/icons'
import Application from './application'
import { requestContractsAPI } from '../../../services/api'
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal'

function Applicationlist() {
  const [modalVisible, setModalVisible] = useState(false)
  const [modal1Visible, setModal1Visible] = useState(false)
  const [searchCedula, setSearchCedula] = useState('')
  const [rows, setRows] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const headers = [
    'Cédula',
    'Nombre Completo',
    'Fecha de Solicitud',
    'Actividad',
    'Email',
    'Teléfono',
    'Acciones',
  ]

  useEffect(() => {
    const loadData = async () => {
      console.log('Cargando datos...')
      setLoading(true)
      setError(null)
      try {
        const data = await requestContractsAPI.getAll()
        console.log('Datos recibidos:', data)
        console.log('Primera fila:', data[0])
        setRows(data)
      } catch (error) {
        console.error('Error:', error)
        setError('Error al cargar las solicitudes de contratos')
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  const filteredRows = rows.filter((row) =>
    row.id_number?.toString().toLowerCase().includes(searchCedula.toLowerCase())
  )

  const handleEdit = (row) => {
    console.log('Editar:', row)
    setSelectedRow(row)
    setModal1Visible(true)
  }

  const handleSave = async (updatedRow) => {
    try {
      console.log('Datos enviados para actualizar:', updatedRow)
      const data = await requestContractsAPI.update(updatedRow.request_id, updatedRow)
      console.log('Datos actualizados en el servidor:', data)
      setRows((prevRows) =>
        prevRows.map((row) => (row.request_id === updatedRow.request_id ? data : row))
      )
      setModal1Visible(false)
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error)
      alert('Error al actualizar la solicitud: ' + error.message)
    }
  }

  const handleCreate = async (newRow) => {
    try {
      console.log('Datos enviados para crear:', newRow)
      const data = await requestContractsAPI.create(newRow)
      console.log('Datos creados en el servidor:', data)
      setRows((prevRows) => [...prevRows, data])
      setModalVisible(false)
    } catch (error) {
      console.error('Error al crear la solicitud:', error)
      alert('Error al crear la solicitud: ' + error.message)
    }
  }

  const handleDelete = async (row) => {
    console.log('handleDelete llamado con:', row)
    setItemToDelete(row)
    setDeleteModalVisible(true)
    console.log('deleteModalVisible establecido en:', true)
  }

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        await requestContractsAPI.delete(itemToDelete.request_id)
        setRows((prevRows) => prevRows.filter((row) => row.request_id !== itemToDelete.request_id))
        setDeleteModalVisible(false)
        setItemToDelete(null)
      } catch (error) {
        console.error('Error al eliminar la solicitud:', error)
        alert('Error al eliminar la solicitud: ' + error.message)
      }
    }
  }

  return (
    <div className="informe-mensual">
      {/* Modal para crear */}
      <CModal
        alignment="center"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        size="lg"
      >
        <CModalBody>
          <Application
            onSave={handleCreate}
            isEdit={false}
          />
        </CModalBody>
      </CModal>

      {/* Modal para editar */}
      <CModal
        visible={modal1Visible}
        onClose={() => setModal1Visible(false)}
        size="lg"
      >
        <CModalBody>
          <Application
            data={selectedRow}
            onSave={handleSave}
            isEdit={true}
          />
        </CModalBody>
      </CModal>

      <CRow className="mb-3 align-items-center">
        <CCol md={4}  >
          <CFormInput
            type="text"
            placeholder="Buscar por cédula"
            value={searchCedula}
            onChange={(e) => setSearchCedula(e.target.value)}
          />
        </CCol>
        <CCol md="auto" style={{ marginLeft: 'auto' }}>
          <CButton
            className="rounded-circle"
            color="primary"
            style={{ width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={() => setModalVisible(true)}
          >
            <CIcon icon={cilUserPlus} size="lg" />
          </CButton>
        </CCol>
      </CRow>

      {/* Indicadores de estado */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {/* Tabla de solicitudes */}
      <CCard style={{ border: '2px solid #fff' }}>
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
                  <CTableDataCell className="text-center">
                    <strong>{row.id_number || 'No especificado'}</strong>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {row.full_name || 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {row.request_date ? new Date(row.request_date).toLocaleDateString() : 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {row.activity || 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {row.email || 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {row.phone || 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton
                      color="warning"
                      onClick={() => handleEdit(row)}
                      className="me-2"
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={() => handleDelete(row)}
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

      <ConfirmDeleteModal
        visible={deleteModalVisible}
        onCancel={() => {
          setDeleteModalVisible(false)
          setItemToDelete(null)
        }}
        onConfirm={handleConfirmDelete}
        message="¿Está seguro de que desea eliminar la siguiente solicitud?"
        userName={itemToDelete?.full_name || null}
      />
      
      {/* Debug info */}
      {console.log('Estado del modal:', { deleteModalVisible, itemToDelete })}
    </div>
  )
}

export default Applicationlist