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
import { relocationAPI } from '../../../services/api'

const Relocation = () => {
  const [relocationData, setRelocationData] = useState({
    tenant_id: '',
    old_contract_id: '',
    new_contract_id: '',
    reason: '',
    transfer_date: '',
    number_local_new: '',
    number_local_old: '',
  })

  const [locations, setLocations] = useState([]) // Estado para almacenar los locales

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
        tenant_id: '',
        old_contract_id: '',
        new_contract_id: '',
        reason: '',
        transfer_date: '',
        number_local_new: '',
        number_local_old: '',
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
                    name="tenant_id"
                    value={relocationData.tenant_id}
                    onChange={handleChange}
                    placeholder="ID del Inquilino"
                    label="ID del Inquilino"
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
                  <h5 className="text-center">Información del Local</h5>
                </CCardHeader>
                <CCardBody>
                  <label htmlFor="number_local_old" className="form-label">
                    Local Actual
                  </label>
                  <select
                    id="number_local_old"
                    name="number_local_old"
                    value={relocationData.number_local_old}
                    onChange={handleChange}
                    className="form-select mb-3"
                    required
                  >
                    <option value="">Seleccione un local</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.id} - {location.description}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="number_local_new" className="form-label">
                    Nuevo Local
                  </label>
                  <select
                    id="number_local_new"
                    name="number_local_new"
                    value={relocationData.number_local_new}
                    onChange={handleChange}
                    className="form-select mb-3"
                    required
                  >
                    <option value="">Seleccione un local</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.id} - {location.description}
                      </option>
                    ))}
                  </select>

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
                  <CFormInput
                    type="text"
                    name="old_contract_id"
                    value={relocationData.old_contract_id}
                    onChange={handleChange}
                    placeholder="ID del Contrato Anterior"
                    label="ID del Contrato Anterior"
                    required
                    className="mb-3"
                  />
                  <CFormInput
                    type="text"
                    name="new_contract_id"
                    value={relocationData.new_contract_id}
                    onChange={handleChange}
                    placeholder="ID del Nuevo Contrato"
                    label="ID del Nuevo Contrato"
                    required
                    className="mb-3"
                  />
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