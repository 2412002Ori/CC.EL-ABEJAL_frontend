import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CRow,
  CCol,
  CForm,
  CButton,
} from '@coreui/react'
import { relocationAPI, contractsAPI } from '../../../services/api'

const Relocation = () => {
  const [relocationData, setRelocationData] = useState({
    id_number: '',
    old_contract: '',
    new_contract: '',
    reason: '',
    transfer_date: '',
  })

  const [locations, setLocations] = useState([]) // Estado para almacenar los locales
  const [contracts, setContracts] = useState([]) // Estado para almacenar los contratos activos

  const handleChange = (e) => {
    const { name, value } = e.target
    setRelocationData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Relocation Data:', relocationData)

    try {
      await relocationAPI.create(relocationData)
      alert('Traslado registrado con éxito')
      setRelocationData({
        id_number: '',
        old_contract: '',
        new_contract: '',
        reason: '',
        transfer_date: '',
      })
    } catch (error) {
      console.error('Error al registrar el traslado:', error)
      alert('Hubo un error al registrar el traslado')
    }
  }

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:3001/locations')
        if (response.ok) {
          const data = await response.json()
          setLocations(data) // Guardar los locales en el estado
        } else {
          console.error('Error al obtener los locales:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchLocations()
  }, [])

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const allContracts = await contractsAPI.getAll();
        // Filtrar contratos activos (end_date > hoy)
        const today = new Date();
        const activeContracts = allContracts.filter(c => c.end_date && new Date(c.end_date) > today);
        setContracts(activeContracts);
      } catch (error) {
        console.error('Error al obtener contratos:', error);
      }
    };
    fetchContracts();
  }, []);

  // Filtrar contratos activos por cédula
  const filteredContracts = contracts.filter(
    c => c.id_number && c.id_number.toString() === relocationData.id_number.toString()
  );

  return (
    <>
      <h3 className="text-center">TRASLADO DE INQUILINO</h3>

      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-center">
            {/* Información del inquilino */}
            <CCol md={4}>
              <CCard className="mt-3 mb-3">
                <CCardHeader>
                  <h5 className="text-center">Información del Inquilino</h5>
                </CCardHeader>
                <CCardBody>
                  <CFormInput
                    type="text"
                    name="id_number"
                    value={relocationData.id_number}
                    onChange={handleChange}
                    placeholder="Cédula del Inquilino"
                    label="Cédula del Inquilino"
                    required
                    className="mb-3"
                  />
                  <CFormInput
                    type="text"
                    name="reason"
                    value={relocationData.reason}
                    onChange={handleChange}
                    placeholder="Razón del Traslado"
                    label="Razón del Traslado"
                    required
                    className="mb-3"
                  />
                </CCardBody>
              </CCard>
            </CCol>

            {/* Información del local */}
            <CCol md={4}>
              <CCard className="mt-3 mb-3">
                <CCardHeader>
                  <h5 className="text-center">Fecha del Traslado</h5>
                </CCardHeader>
                <CCardBody>
                  <CFormInput
                    type="date"
                    name="transfer_date"
                    value={relocationData.transfer_date}
                    onChange={handleChange}
                    placeholder="Fecha del Traslado"
                    label="Fecha del Traslado"
                    required
                    className="mb-3"
                  />
                </CCardBody>
              </CCard>
            </CCol>

            {/* Información de los contratos */}
            <CCol md={4}>
              <CCard className="mt-3 mb-3">
                <CCardHeader>
                  <h5 className="text-center">Información de los Contratos</h5>
                </CCardHeader>
                <CCardBody>
                  <label htmlFor="old_contract" className="form-label">
                    Número del Contrato Anterior
                  </label>
                  <select
                    id="old_contract"
                    name="old_contract"
                    value={relocationData.old_contract}
                    onChange={handleChange}
                    className="form-select mb-3"
                    required
                  >
                    <option value="">Seleccione un contrato</option>
                    {filteredContracts.map((contract) => (
                      <option key={contract.contract_number} value={contract.contract_number}>
                        {contract.contract_number} - {contract.locations?.description || 'Sin local'}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="new_contract" className="form-label">
                    Número del Nuevo Contrato
                  </label>
                  <select
                    id="new_contract"
                    name="new_contract"
                    value={relocationData.new_contract}
                    onChange={handleChange}
                    className="form-select mb-3"
                    required
                  >
                    <option value="">Seleccione un contrato</option>
                    {filteredContracts.map((contract) => (
                      <option key={contract.contract_number} value={contract.contract_number}>
                        {contract.contract_number} - {contract.locations?.description || 'Sin local'}
                      </option>
                    ))}
                  </select>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow className="d-flex justify-content-center mt-3">
            <CCol xs="auto">
              <CButton type="submit" color="primary">
                Registrar Traslado
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}

export default Relocation