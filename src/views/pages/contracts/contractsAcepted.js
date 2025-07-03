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
} from '@coreui/react'
import html2pdf from 'html2pdf.js';
import { contractsAPI } from '../../../services/api'

function ContractsAceptedList() {
  const headers = [
    'N° Contrato',
    'CI Inquilino',
    'N° Local',
    'Renta',
    'Expedición',
    'Vencimiento',
    'Nombre Local',
    'Hora Entrada',
    'Hora Salida',
    'Días de Trabajo',
    'Usuario',
    'Estado',
  ]

  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Función para determinar el estado del contrato
  const getContractStatus = (endDate) => {
    if (!endDate) return 'No especificado'
    
    const today = new Date()
    const endDateObj = new Date(endDate)
    
    // Resetear las horas para comparar solo fechas
    today.setHours(0, 0, 0, 0)
    endDateObj.setHours(0, 0, 0, 0)
    
    if (endDateObj > today) {
      return 'Activo'
    } else {
      return 'Vencido'
    }
  }

  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return 'success'
      case 'Vencido':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  useEffect(() => {
    const fetchContractData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await contractsAPI.getAll()
        console.log('Contratos recibidos:', data)
        if (data.length > 0) {
          console.log('Primer contrato:', data[0])
        }
        setContracts(data)
      } catch (error) {
        console.error('Error al obtener los contratos:', error)
        setError('Error al cargar los contratos')
      } finally {
        setLoading(false)
      }
    }

    fetchContractData()
  }, [])


  const toPDF = () => {
  const element = document.getElementById('contratos-table');
  const opt = {
    margin:       1,
    filename:     'contratos.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
  };

  html2pdf().set(opt).from(element).save();
};

  return (
    <div className="informe-mensual">
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

      <CCard style={{ border: '2px solid #fff' }}>
        <CCardHeader>
          <CRow>
            <CCol>
              <h3>CONTRATOS</h3>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable responsive bordered hover id="contratos-table">
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
              {contracts.map((contract, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">
                    <strong>{contract.contract_number || 'No especificado'}</strong>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <strong>{contract.id_number || 'No especificado'}</strong>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {contract.location_id || 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {contract.rent_amount ? `$${parseFloat(contract.rent_amount).toLocaleString()}` : 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {contract.init_date ? new Date(contract.init_date).toLocaleDateString() : 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {contract.end_date ? new Date(contract.end_date).toLocaleDateString() : 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {contract.business_name || 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {contract.entry_time ? new Date(contract.entry_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {contract.exit_time ? new Date(contract.exit_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {contract.daysWork ? (
                      Array.isArray(contract.daysWork) 
                        ? contract.daysWork.join(', ') 
                        : typeof contract.daysWork === 'object' 
                          ? Object.keys(contract.daysWork).filter(day => contract.daysWork[day]).join(', ')
                          : String(contract.daysWork)
                    ) : 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {contract.registered_user ? `Usuario ${contract.registered_user}` : 'No especificado'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <span className={`badge bg-${getStatusColor(getContractStatus(contract.end_date))}`}>
                      {getContractStatus(contract.end_date)}
                    </span>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <CButton color="primary" onClick={toPDF}>
            Descargar PDF
          </CButton>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ContractsAceptedList