import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CButton } from '@coreui/react'

const SimpleTest = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const testAPI = async () => {
    setLoading(true)
    setError(null)
    console.log('🧪 Iniciando prueba simple de API...')
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/request/contracts`)
      console.log('📡 Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      console.log('✅ Datos recibidos:', result)
      setData(result)
    } catch (error) {
      console.error('❌ Error en prueba:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5>🧪 Prueba Simple de API</h5>
      </CCardHeader>
      <CCardBody>
        <CButton 
          color="primary" 
          onClick={testAPI}
          disabled={loading}
          className="mb-3"
        >
          {loading ? 'Probando...' : 'Probar API Directamente'}
        </CButton>

        {error && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
          </div>
        )}

        {data && (
          <div>
            <h6>Datos recibidos ({data.length} registros):</h6>
            <pre className="bg-light p-3 rounded" style={{ fontSize: '12px', maxHeight: '300px', overflow: 'auto' }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </CCardBody>
    </CCard>
  )
}

export default SimpleTest 