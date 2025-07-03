import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CAlert } from '@coreui/react'
import { requestContractsAPI } from '../services/api'

const ConnectionTest = () => {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [data, setData] = useState(null)

  const testConnection = async () => {
    setStatus('testing')
    setMessage('Probando conexión...')
    
    try {
      const result = await requestContractsAPI.getAll()
      setStatus('success')
      setMessage('✅ Conexión exitosa! Backend respondiendo correctamente.')
      setData(result)
    } catch (error) {
      setStatus('error')
      setMessage(`❌ Error de conexión: ${error.message}`)
      console.error('Error de conexión:', error)
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'success'
      case 'error': return 'danger'
      case 'testing': return 'warning'
      default: return 'info'
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4>Prueba de Conexión Frontend-Backend</h4>
      </CCardHeader>
      <CCardBody>
        <CButton 
          color="primary" 
          onClick={testConnection}
          disabled={status === 'testing'}
          className="mb-3"
        >
          {status === 'testing' ? 'Probando...' : 'Probar Conexión'}
        </CButton>

        {message && (
          <CAlert color={getStatusColor()} className="mb-3">
            {message}
          </CAlert>
        )}

        {data && (
          <div>
            <h5>Datos recibidos del backend:</h5>
            <pre className="bg-light p-3 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-3">
          <h6>Información de configuración:</h6>
          <ul>
            <li><strong>Backend URL:</strong> {import.meta.env.VITE_API_URL}/api</li>
            <li><strong>Endpoint probado:</strong> /request/contracts</li>
            <li><strong>Método:</strong> GET</li>
          </ul>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default ConnectionTest 