import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

import Relocation from './relocation'
import { relocationAPI } from '../../../services/api'

const RelocationList = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [transfers, setTransfers] = useState([]) // Estado para almacenar los traslados

  // Cargar los datos desde el servidor
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const data = await relocationAPI.getAll();
        setTransfers(data);
      } catch (error) {
        console.error('Error al obtener los traslados:', error);
      }
    }
    fetchTransfers();
  }, []);

  return (
    <>
      <CButton
        className="mb-3 rounded-circle"
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
        <CIcon icon={cilPlus} size="lg" />
      </CButton>

      <CCard>
        {/* Modal para registrar nuevo traslado */}
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="xl">
          <CModalHeader closeButton>
            <h5>Registrar Nuevo Traslado</h5>
          </CModalHeader>
          <CModalBody>
            <Relocation />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>

        <CCardHeader>
          <h3 className="text-center">Lista de Traslados</h3>
        </CCardHeader>
        <CCardBody>
          <CTable responsive bordered hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="text-center">Cédula</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Contrato Anterior</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Contrato Nuevo</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Razón</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Fecha de Traslado</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {transfers.map((transfer) => (
                <CTableRow key={transfer.id}>
                  <CTableDataCell className="text-center">{transfer.tenant_id || transfer.id_number || 'No especificado'}</CTableDataCell>
                  <CTableDataCell className="text-center">{transfer.old_contract_id || transfer.old_contract || 'No especificado'}</CTableDataCell>
                  <CTableDataCell className="text-center">{transfer.new_contract_id || transfer.new_contract || 'No especificado'}</CTableDataCell>
                  <CTableDataCell className="text-center">{transfer.reason || 'No especificado'}</CTableDataCell>
                  <CTableDataCell className="text-center">{transfer.transfer_date ? new Date(transfer.transfer_date).toLocaleDateString() : 'No especificado'}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default RelocationList