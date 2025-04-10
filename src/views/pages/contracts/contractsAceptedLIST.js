import React, { useState } from 'react'
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
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cibWhatsapp, cibGmail } from '@coreui/icons'

function ContractsAceptedList() {
  const headers = [
    'N° CONTRATO',
    'N° LOCAL',
    'CI',
    'NOMBRE Y APELLIDO',
    'ACTIVIDAD',
    'MONTO RENTA',
    'FECHA INICIO',
    'FECHA FIN',
  ]

  // Información de muestra para la tabla
  const [rows] = useState([
    {
      nContrato: '001',
      nLocal: 'A-101',
      ci: '12345678',
      nombre: 'Juan Pérez',
      actividad: 'Venta de Ropa',
      monto: '$500',
      fechai: '2023-01-01',
      fechaf: '2023-12-31',
    },
    {
      nContrato: '002',
      nLocal: 'B-202',
      ci: '87654321',
      nombre: 'María López',
      actividad: 'Comida Rápida',
      monto: '$700',
      fechai: '2023-02-01',
      fechaf: '2023-11-30',
    },
    {
      nContrato: '003',
      nLocal: 'C-303',
      ci: '11223344',
      nombre: 'Carlos García',
      actividad: 'Electrónica',
      monto: '$600',
      fechai: '2023-03-01',
      fechaf: '2023-10-31',
    },
    {
      nContrato: '004',
      nLocal: 'D-404',
      ci: '55667788',
      nombre: 'Ana Torres',
      actividad: 'Joyería',
      monto: '$800',
      fechai: '2023-04-01',
      fechaf: '2023-09-30',
    },
    {
      nContrato: '005',
      nLocal: 'E-505',
      ci: '99887766',
      nombre: 'Luis Fernández',
      actividad: 'Zapatería',
      monto: '$550',
      fechai: '2023-05-01',
      fechaf: '2023-08-31',
    },
  ])

  return (
    <div className="informe-mensual">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <h3>CONTRATOS ACTIVOS</h3>
            </CCol>
            <CCol style={{ marginBottom: '2px', marginTop: '10px' }}>
              <CButton color="primary" className="float-end" style={{ padding: '10px', marginInline: '20px' }}>
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButton color="primary" className="float-end" style={{ padding: '10px', marginInline: '20px' }}>
                <CIcon icon={cibWhatsapp} />
              </CButton>
              <CButton color="primary" className="float-end" style={{ padding: '10px', marginInline: '20px' }}>
                <CIcon icon={cibGmail} />
              </CButton>
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
              {rows.map((row, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">{row.nContrato}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.nLocal}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.ci}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.nombre}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.actividad}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.monto}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.fechai}</CTableDataCell>
                  <CTableDataCell className="text-center">{row.fechaf}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ContractsAceptedList