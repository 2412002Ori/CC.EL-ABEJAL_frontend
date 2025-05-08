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
  ]

  const [contracts, setContracts] = useState([])

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const response = await fetch('http://localhost:3001/contracts')
        if (response.ok) {
          const data = await response.json()
          setContracts(data)
        } else {
          console.error('Error al obtener los contratos:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchContractData()
  }, [])

  return (
    <div className="informe-mensual">
      <CCard bordered hover style={{ border: '2px solid #ffa600b0' }}>
        <CCardHeader>
          <CRow>
            <CCol>
              <h3>CONTRATOS ACTIVOS</h3>
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
              {contracts.map((contract, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">{contract.contract_number}</CTableDataCell>
                  <CTableDataCell className="text-center">{contract.tenant_id}</CTableDataCell>
                  <CTableDataCell className="text-center">{contract.location_id}</CTableDataCell>
                  <CTableDataCell className="text-center">{contract.rent_amount}</CTableDataCell>
                  <CTableDataCell className="text-center">{contract.init_date}</CTableDataCell>
                  <CTableDataCell className="text-center">{contract.end_date}</CTableDataCell>
                  <CTableDataCell className="text-center">{contract.business_name}</CTableDataCell>
                  <CTableDataCell className="text-center">{contract.entry_time}</CTableDataCell>
                  <CTableDataCell className="text-center">{contract.exit_time}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {contract.diasTrabajo.join(', ')}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{contract.user_registered}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <CButton color="primary" onClick={() => toPDF()}>
            Descargar PDF
          </CButton>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ContractsAceptedList