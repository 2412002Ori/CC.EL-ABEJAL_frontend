import React from 'react'
import { CModal, CModalBody, CButton } from '@coreui/react'

const ConfirmDeleteModal = ({ 
  visible, 
  onCancel, 
  onConfirm, 
  message = '¿Está seguro de que desea eliminar este elemento?',
  userName = null
}) => {
  return (
    <CModal
      visible={visible}
      onClose={onCancel}
      alignment="center"
    >
      <CModalBody className="text-center">
        <h5 className="mb-4" style={{ fontSize: '1.1rem', color: '#666' }}>
          {message}
          {userName && (
            <span style={{ 
              fontWeight: 'bold', 
              fontSize: '1.3rem', 
              color: '#333',
              display: 'block',
              marginTop: '8px'
            }}>
              {userName}
            </span>
          )}
        </h5>
        <div className="d-flex justify-content-center gap-3">
          <CButton color="secondary" onClick={onCancel} style={{ minWidth: '100px' }}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={onConfirm} style={{ minWidth: '100px' }}>
            Eliminar
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default ConfirmDeleteModal 