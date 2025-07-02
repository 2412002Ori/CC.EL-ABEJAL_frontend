import React from 'react'
import { CContainer, CRow, CCol, CAlert } from '@coreui/react'

const NoAutorizado = () => (
    <CContainer className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <CRow>
        <CCol>
            <CAlert color="danger" className="text-center p-4" style={{ fontSize: '1.3rem' }}>
            <strong>Acceso denegado</strong><br />
            Token no proporcionado o token inválido para este módulo.
            </CAlert>
        </CCol>
        </CRow>
    </CContainer>
)

export default NoAutorizado