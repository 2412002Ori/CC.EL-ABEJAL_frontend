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
} from '@coreui/react'

const Cincome = () => {

  const currentUser = 'Admin Usuario'

  const [ContractData, setContractData] = useState({
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
    diasTrabajo: [],
    user_registered: currentUser,
    numero_de_solicitud: '',
  })

  const [contractRequests, setContractRequests] = useState([])
  const [locations, setLocations] = useState([])

  //contratos 
  useEffect(() => {
    const fetchContractRequests = async () => {
      try {
        const response = await fetch('http://localhost:3001/contract_requests')
        if (response.ok) {
          const data = await response.json()
          setContractRequests(data)
        } else {
          console.error('Error al obtener las solicitudes de contrato:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    

  //locales
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

  fetchContractRequests()
  fetchLocations()
}, [])

  const handleChange = (e) => {
    const { name, value } = e.target

      setContractData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    const handleChange = (e) => {
      const { name, value } = e.target
  
      if (name === 'contractRequestNumber') {
        const contract = contracts[value] || { tenantName: '', tenantId: '', amountDue: '' }
        setPaymentData((prevState) => ({
          ...prevState,
          contractRequestNumber: value,
          tenantName: contract.tenantName,
          tenantId: contract.tenantId,
          amountDue: contract.amountDue,
        }))
      } else {
        setPaymentData((prevState) => ({
          ...prevState,
          [name]: value,
        }))
      }
    }
    
  
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3001/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ContractData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Contrato registrado:', result)
        alert(`Contrato registrado con éxito por: ${currentUser}`)

        setContractData({
          registered_user: '',
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
          diasTrabajo: [],
          numero_de_solicitud: '',
        })
      } else {
        console.error('Error al registrar el contrato:', response.statusText)
        alert('Hubo un error al registrar el contrato.')
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
      alert('Hubo un error al registrar el contrato.')
    }
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setContractData((prevState) => {
      const diasTrabajo = checked
        ? [...(prevState.diasTrabajo || []), value]
        : (prevState.diasTrabajo || []).filter((dia) => dia !== value)
      return { ...prevState, diasTrabajo }
    })
  }

  return (
    <>
      <h3 className="text-center">CONTRATO</h3>

      <CCardBody>
        <CForm onSubmit={handleSubmit}>

            {/* Columna derecha: Información del inquilino */}
            
              <CCard className="mt-3 mb-3">
                <CCardHeader>
                  <h5 className="text-center">Información de la solicitud </h5>
                </CCardHeader>
                <CCardBody>
                <CRow>
                <CCol md={2}>
                  <CFormInput
                      type="text"
                      name="numero_de_solicitud"
                      value={ContractData.numero}
                      onChange={handleChange}
                      placeholder="Número de solicitud"
                      label="Número de solicitud"
                      required
                      className="mb-3"
                  />
                </CCol>
                <CCol md={2}>
                  <CFormInput
                      type="text"
                      name="tenantName"
                      value={ContractData.tenantName}
                      placeholder="Nombre del Inquilino"      
                      label="Nombre del Inquilino"
                      disabled
                      className="mb-3"
                  />
                </CCol>
                 
                <CCol md={2}> 
                <CFormInput
                      type="text"
                      name="tenant_id"
                      value={ContractData.tenant_id}
                      placeholder="Cédula del Inquilino"
                      label="Cédula del Inquilino"
                      disabled
                      className="mb-3"
                />
                </CCol>
                <CCol md={2}> 
                  <CFormInput
                      type="text"
                      name="activity"
                      value={ContractData.activity}
                      placeholder="Descripción de la Actividad"
                      label="Actividad"
                      disabled
                      className="mb-3"
                    />
                </CCol>

                <CCol md={3}> 
                  <CFormInput
                      type="text"
                      name="duration_description"
                      value={ContractData.duration_description}
                      placeholder="Descripción de la Actividad"
                      label="Actividad"

                      className="mb-3"
                    />
                </CCol>
               
                </CRow>
                </CCardBody>
              </CCard>


              <CCard>
                <CCardHeader>
                  <h5 className="text-center">Detalles del Contrato</h5>
                </CCardHeader>
                <CCardBody>
                <CRow>
                 <CCol md={2}>
                  <CFormInput
                    type="text"
                    name="contract_number"
                    value={ContractData.contract_number}
                    onChange={handleChange}
                    placeholder="1234"
                    label="N° de Contrato"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={2}>
                  <label htmlFor="location_id" className="form-label">
                    Número de Local
                  </label>
                  <select
                    id="location_id"
                    name="location_id"
                    value={ContractData.location_id}
                    onChange={handleChange}
                    className="form-select mb-2"
                    required
                  >
                    <option value="">Seleccione un local</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.id} - {location.description}
                      </option>
                    ))}
                  </select>
                </CCol>

                <CCol md={2}>
                  <CFormInput
                    type="number"
                    name="rent_amount"
                    value={ContractData.rent_amount}
                    onChange={handleChange}
                    placeholder="500"
                    label="Monto de Renta"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={2}>
                  <CFormInput
                    type="text"
                    name="business_name"
                    value={ContractData.business_name}
                    onChange={handleChange}
                    placeholder="Arte Contemporaneo"
                    label="Nombre del negocio"
                    className="mb-3"
                  />
                </CCol>
               <CCol md={2}>
                  <CFormInput
                    type="date"
                    name="init_date" 
                    value={ContractData.init_date}
                    onChange={handleChange} 
                    label="Fecha emisión"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={2}>
                  <CFormInput
                    type="date"
                    name="end_date" 
                    value={ContractData.end_date}
                    onChange={handleChange} 
                    label="Fecha vencimiento"
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={2}>
                  <CFormInput
                    type="time"
                    name="entry_time" 
                    value={ContractData.entry_time}
                    onChange={handleChange} 
                    placeholder="Horario de Entrada"
                    label="Hora de Entrada"
                    required
                  />
                </CCol>
                <CCol md={2}>
                  <CFormInput
                    type="time"
                    name="exit_time" 
                    value={ContractData.exit_time}
                    onChange={handleChange} 
                    placeholder="Horario de Salida"
                    label="Hora de Salida"
                    required
                  />
                </CCol>
               <CCol md={7}>
                 <label className="form-label">Días de Trabajo</label>
                   <div className="text-center">
                      {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(
                       (dia) => (
                         <CFormCheck
                            key={dia}
                           inline
                           label={dia}
                           value={dia}
                           onChange={handleCheckboxChange}
                           checked={ContractData.diasTrabajo.includes(dia)}
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
              <CButton type="submit" color="primary">
                Generar Contrato
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}

export default Cincome