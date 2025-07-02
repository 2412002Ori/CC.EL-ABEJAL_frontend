import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CRow,
  CCol,
  CForm,
  CFormCheck,
  CButton,
  CAlert,
} from '@coreui/react'
import { requestContractsAPI, contractsAPI, locationsAPI } from '../../../services/api'

const Cincome = () => {
  const currentUser = 'Admin Usuario'

  const [contractData, setContractData] = useState({
    contract_number: '',
    tenant_id: '',
    location_id: '',
    rent_amount: '',
    activity: '',
    duration_description: '',
    init_date: '',
    end_date: '',
    business_name: '',
    entry_time: '',
    exit_time: '',
    workdays: [],
    user_registered: currentUser,
    request_id: '',
  })

  const [contractRequests, setContractRequests] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Cargar solicitudes de contratos
  useEffect(() => {
    const fetchContractRequests = async () => {
      try {
        setLoading(true)
        const data = await requestContractsAPI.getAll()
        setContractRequests(data)
      } catch (error) {
        console.error('Error al obtener las solicitudes de contrato:', error)
        setError('Error al cargar las solicitudes de contratos')
      } finally {
        setLoading(false)
      }
    }

    const fetchLocations = async () => {
      try {
        const data = await locationsAPI.getAll()
        setLocations(data)
      } catch (error) {
        console.error('Error al obtener los locales:', error)
        setError('Error al cargar los locales')
      }
    }

    fetchContractRequests()
    fetchLocations()
  }, [])

  // Buscar solicitud por cédula del solicitante
  const handleSearchRequest = () => {
    const request = contractRequests.find(req => req.id_number.toString() === contractData.tenant_id)
    
    if (request) {
      setSelectedRequest(request)
      setContractData(prev => ({
        ...prev,
        request_id: request.request_id || '',
        activity: request.activity || '',
        business_name: request.full_name || '',
      }))
      setError(null)
    } else {
      setSelectedRequest(null)
      setError('No se encontró una solicitud con esa cédula')
      // Limpiar campos
      setContractData(prev => ({
        ...prev,
        request_id: '',
        activity: '',
        business_name: '',
      }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setContractData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedRequest) {
      setError('Debe buscar y seleccionar una solicitud válida por cédula')
      return
    }

    // Validar formato del número de contrato
    if (!contractData.contract_number.match(/^CNT-\d+$/)) {
      setError('El número de contrato debe tener el formato: CNT-### (ejemplo: CNT-001)')
      return
    }

    // Validar que todos los campos requeridos estén llenos
    console.log('Validando campos:', {
      location_id: contractData.location_id,
      rent_amount: contractData.rent_amount,
      init_date: contractData.init_date,
      end_date: contractData.end_date,
      entry_time: contractData.entry_time,
      exit_time: contractData.exit_time,
      duration_description: contractData.duration_description
    })
    
    const missingFields = []
    if (!contractData.location_id) missingFields.push('Local')
    if (!contractData.rent_amount) missingFields.push('Monto de renta')
    if (!contractData.init_date) missingFields.push('Fecha de inicio')
    if (!contractData.end_date) missingFields.push('Fecha de fin')
    if (!contractData.entry_time) missingFields.push('Hora de entrada')
    if (!contractData.exit_time) missingFields.push('Hora de salida')
    if (!contractData.duration_description) missingFields.push('Descripción de duración')
    
    if (missingFields.length > 0) {
      setError(`Campos faltantes: ${missingFields.join(', ')}`)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // Preparar datos del contrato según el esquema del backend
      const contractToSubmit = {
        registered_user: 1, // ID del usuario registrado (requerido)
        contract_number: contractData.contract_number, // Debe tener formato CNT-###
        location_id: parseInt(contractData.location_id), // Debe ser número
        rent_amount: parseFloat(contractData.rent_amount).toFixed(2), // Formato 1700.00
        activity: contractData.activity,
        duration_description: contractData.duration_description || 'Sin descripción',
        init_date: new Date(contractData.init_date).toISOString(), // Formato ISO
        end_date: new Date(contractData.end_date).toISOString(), // Formato ISO
        business_name: contractData.business_name,
        entry_time: contractData.entry_time + ':00', // Agregar segundos HH:mm:ss
        exit_time: contractData.exit_time + ':00', // Agregar segundos HH:mm:ss
        id_number: selectedRequest.id_number, // Cédula del inquilino
        daysWork: contractData.workdays, // Días de trabajo
      }

      console.log('Enviando contrato:', contractToSubmit)
      const result = await contractsAPI.create(contractToSubmit)
      console.log('Contrato registrado:', result)
      
      setSuccess(`Contrato registrado con éxito por: ${currentUser}`)
      
      // Limpiar formulario
      setContractData({
        contract_number: '',
        tenant_id: '',
        location_id: '',
        rent_amount: '',
        activity: '',
        duration_description: '',
        init_date: '',
        end_date: '',
        business_name: '',
        entry_time: '',
        exit_time: '',
        workdays: [],
        user_registered: currentUser,
        request_id: '',
      })
      setSelectedRequest(null)
      
    } catch (error) {
      console.error('Error al registrar el contrato:', error)
      setError('Hubo un error al registrar el contrato: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setContractData(prev => {
      const workdays = checked
        ? [...(prev.workdays || []), value]
        : (prev.workdays || []).filter(day => day !== value)
      return { ...prev, workdays }
    })
  }

  return (
    <>
      <h3 className="text-center">GENERAR CONTRATO</h3>

      {/* Alertas */}
      {error && (
        <CAlert color="danger" dismissible onClose={() => setError(null)}>
          {error}
        </CAlert>
      )}
      
      {success && (
        <CAlert color="success" dismissible onClose={() => setSuccess(null)}>
          {success}
        </CAlert>
      )}

      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          {/* Información de la solicitud */}
          <CCard className="mt-3 mb-3">
            <CCardHeader>
              <h5 className="text-center">Información de la Solicitud</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={3}>
                  <CFormInput
                    type="text"
                    name="tenant_id"
                    value={contractData.tenant_id}
                    onChange={handleChange}
                    placeholder="Cédula del solicitante"
                    label="Cédula del solicitante"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={3} className="d-flex align-items-end">
                  <CButton 
                    color="info" 
                    onClick={handleSearchRequest}
                    disabled={!contractData.tenant_id || loading}
                    className="mb-3"
                  >
                    {loading ? 'Buscando...' : 'Buscar Solicitud'}
                  </CButton>
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    type="text"
                    name="business_name"
                    value={contractData.business_name}
                    placeholder="Nombre del solicitante"
                    label="Nombre del solicitante"
                    disabled
                    className="mb-3"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="activity"
                    value={contractData.activity}
                    placeholder="Actividad de la solicitud"
                    label="Actividad"
                    disabled
                    className="mb-3"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="duration_description"
                    value={contractData.duration_description}
                    onChange={handleChange}
                    placeholder="Descripción de la duración"
                    label="Descripción de la duración"
                    required
                    className="mb-3"
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          {/* Detalles del Contrato */}
          <CCard>
            <CCardHeader>
              <h5 className="text-center">Detalles del Contrato</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={3}>
                  <CFormInput
                    type="text"
                    name="contract_number"
                    value={contractData.contract_number}
                    onChange={handleChange}
                    placeholder="CNT-001"
                    label="N° de Contrato"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={3}>
                  <label htmlFor="location_id" className="form-label">
                    Número de Local
                  </label>
                  <select
                    id="location_id"
                    name="location_id"
                    value={contractData.location_id}
                    onChange={handleChange}
                    className="form-select mb-3"
                    required
                  >
                    <option value="">Seleccione un local</option>
                    {locations.map((location) => (
                      <option key={location.location_id} value={location.location_id}>
                        {location.location_id} - {location.description || 'Sin descripción'}
                      </option>
                    ))}
                  </select>
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    type="number"
                    name="rent_amount"
                    value={contractData.rent_amount}
                    onChange={handleChange}
                    placeholder="500"
                    label="Monto de Renta"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    type="date"
                    name="init_date" 
                    value={contractData.init_date}
                    onChange={handleChange} 
                    label="Fecha de inicio"
                    required
                    className="mb-3"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={3}>
                  <CFormInput
                    type="date"
                    name="end_date" 
                    value={contractData.end_date}
                    onChange={handleChange} 
                    label="Fecha de vencimiento"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    type="time"
                    name="entry_time" 
                    value={contractData.entry_time}
                    onChange={handleChange} 
                    placeholder="08:00"
                    label="Hora de entrada"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    type="time"
                    name="exit_time" 
                    value={contractData.exit_time}
                    onChange={handleChange} 
                    placeholder="18:00"
                    label="Hora de salida"
                    required
                    className="mb-3"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={12}>
                  <label className="form-label">Días de Trabajo</label>
                  <div className="text-center">
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(
                      (day) => (
                        <CFormCheck
                          key={day}
                          inline
                          label={day}
                          value={day}
                          onChange={handleCheckboxChange}
                          checked={contractData.workdays.includes(day)}
                        />
                      ),
                    )}
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          {/* Botón para generar contrato */}
          <CRow className="d-flex justify-content-center mt-3">
            <CCol xs="auto">
              <CButton 
                type="submit" 
                color="primary"
                disabled={!selectedRequest || loading}
              >
                {loading ? 'Generando...' : 'Generar Contrato'}
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}

export default Cincome