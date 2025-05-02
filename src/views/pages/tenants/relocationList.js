import React, { useState } from 'react'
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

const RelocationList = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const contracts = {
    '12345678': {
      tenantName: 'Juan Pérez',
      tenantId: '12345678',
      currentLocal: 'A-101',
      currentLocalName: 'Tienda de Ropa',
      newLocal: 'B-102',
      newLocalName: 'Boutique de Moda',
      hasDebt: true,
    },
    '87654321': {
      tenantName: 'María López',
      tenantId: '87654321',
      currentLocal: 'B-202',
      currentLocalName: 'Cafetería',
      newLocal: 'C-203',
      newLocalName: 'Restaurante Gourmet',
      hasDebt: false,
    },
    '11223344': {
      tenantName: 'Carlos García',
      tenantId: '11223344',
      currentLocal: 'C-303',
      currentLocalName: 'Electrónica',
      newLocal: 'D-304',
      newLocalName: 'Tienda de Tecnología',
      hasDebt: true,
    },
    '55667788': {
      tenantName: 'Ana Torres',
      tenantId: '55667788',
      currentLocal: 'D-404',
      currentLocalName: 'Joyería',
      newLocal: 'E-405',
      newLocalName: 'Galería de Arte',
      hasDebt: false,
    },
    '99887766': {
      tenantName: 'Luis Fernández',
      tenantId: '99887766',
      currentLocal: 'E-505',
      currentLocalName: 'Zapatería',
      newLocal: 'F-506',
      newLocalName: 'Tienda de Accesorios',
      hasDebt: false,
    },
  }

  return (
    <>
    
    <CButton
    className="mb-3 rounded-circle"
    color="primary"
    style={{ width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    onClick={() => setModalVisible(true)}
    >
     <CIcon icon={cilPlus} size="lg" />
    </CButton>


    <CCard>
      {/* Modal para registrar nuevo inquilino */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="xl">
        <CModalHeader closeButton>
          <h5>Registrar Nuevo Inquilino</h5>
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
              <CTableHeaderCell className="text-center">Nombre del Inquilino</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Local Actual</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Nombre del Local Actual</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Nuevo Local</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Nombre del Nuevo Local</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {Object.values(contracts).map((contract, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">{contract.tenantId}</CTableDataCell>
                <CTableDataCell className="text-center">{contract.tenantName}</CTableDataCell>
                <CTableDataCell className="text-center">{contract.currentLocal}</CTableDataCell>
                <CTableDataCell className="text-center">{contract.currentLocalName}</CTableDataCell>
                <CTableDataCell className="text-center">{contract.newLocal}</CTableDataCell>
                <CTableDataCell className="text-center">{contract.newLocalName}</CTableDataCell>
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