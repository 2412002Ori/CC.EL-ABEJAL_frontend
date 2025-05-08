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
  CModalBody,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUserPlus, cilTrash, cilPencil } from '@coreui/icons'
import Register from './register'

function TenantsList() {
  const [modalVisible, setModalVisible] = useState(false) // Modal para crear
  const [modal1Visible, setModal1Visible] = useState(false) // Modal para editar
  const [searchCedula, setSearchCedula] = useState('')
  const [rows, setRows] = useState([]) // Lista de inquilinos
  const [selectedRow, setSelectedRow] = useState(null) // Fila seleccionada para editar

  const headers = [
    'Cédula',
    'RIF',
    'Nombre y Apellido',
    'Dirección',
    'Teléfono',
    'Correo',
    'Acciones',
  ]

  useEffect(() => {
    // Obtener la lista de inquilinos al cargar el componente
    const fetchTenants = async () => {
      try {
        const response = await fetch('http://localhost:3001/tenants')
        if (response.ok) {
          const data = await response.json()
          setRows(data)
        } else {
          console.error('Error al obtener los inquilinos:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchTenants()
  }, [])

  const filteredRows = rows.filter((row) =>
    row.id_number?.toString().toLowerCase().includes(searchCedula.toLowerCase())
  )

  const handleEdit = (row) => {
    setSelectedRow(row) 
    setModal1Visible(true) 
  }

  const handleSave = (updatedRow) => {
    fetch(`http://localhost:3001/tenants/${updatedRow.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRow),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error al actualizar la solicitud: ${text}`)
          })
        }
        return response.json()
      })
      .then(() => {
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
        )
        setModal1Visible(false) // Cerrar el modal de edición
      })
      .catch((error) => console.error('Error al actualizar la solicitud:', error))
  }

    const handleDelete = (id) => {
    console.log(`Intentando eliminar el inquilino con ID: ${id}`); // Debugging
    fetch(`http://localhost:3001/tenants/${id}`, {
      method: 'DELETE',
    })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error al eliminar la solicitud: ${response.statusText}`);
            }
            console.log(`Inquilino con ID ${id} eliminado correctamente`); // Debugging
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          })
          .catch((error) => console.error('Error al eliminar la solicitud:', error));
      };

  return (
    <div className="informe-mensual">
      {/* Modal para crear */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg">
        <CModalBody>
          <Register
            onSave={(newTenant) => {
              setRows((prevRows) => [...prevRows, newTenant])
              setModalVisible(false)
            }}
            isEdit={false}
          />
        </CModalBody>
      </CModal>

      {/* Modal para editar */}
            <CModal visible={modal1Visible} onClose={() => setModal1Visible(false)} size="lg">
        <CModalBody>
          <Register
            data={selectedRow} // Pasa los datos del usuario seleccionado
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
            style={{
              width: '60px',
              height: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
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
                  <CTableDataCell className="text-center">{row.id_number}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.rif}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.full_name}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.address}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.phone}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.email}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                      <CButton color="warning" size="sm" onClick={() => handleEdit(row)}>
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => handleDelete(row.id)}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </div>
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

export default TenantsList