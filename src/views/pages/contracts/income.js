import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import classNames from 'classnames'

import {
  CCard,
  CCardHeader,
  CForm,
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CRow,
  CCol,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

import helpFetch from '../../hooks/helpFetch'
import { color } from 'chart.js/helpers'
import { getStyle } from '@coreui/utils'

const orderRegister = () => {
  const [options1, setOptions] = useState([])
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState({
    orderId: '',
    fecha: '',
  })

  const [disabled, setDisabled] = useState(false)
  const [reset, setReset] = useState(false)
  const [activeKey, setActiveKey] = useState(1)
  const API = helpFetch()
  const endpoint = 'paciente'
  const [patientData, setPatientData] = useState({
    tipoE: '',
    cedula: '',
    nombres: '',
    sexo: '',
    edad: null,
    telf: '',
    correo: '',
    direccion: '',
  })

  const getOptions = () => {
    API.get('exams').then((response) => {
      console.log(response.msg)
      if (!response.error) setOptions(response.msg)
    })
  }

  useEffect(() => {
    getOptions()
  }, [])

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChange2 = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeCed = (e) => {
    getPatient(e.target.value)
  }

  const resetForm = () => {
    setPatientData({
      cedula: null,
      nombres: '',
      sexo: '',
      fecha_nac: '',
      telf: '',
      correo: '',
      direccion: '',
    })
    setOrder({
      orderId: '',
      date: '',
    })
  }

  const getPatient = (cedula) => {
    if (cedula != '')
      API.get(`${endpoint}?cedula=` + cedula).then((resp) => {
        if (!resp.error) {
          resp.map((item) => {
            setPatientData({
              id: item.id,
              cedula: item.cedula,
              nombres: item.nombres,
              sexo: item.sexo,
              fecha_nac: item.fecha_nac,
              telf: item.telf,
              correo: item.correo,
            })
            setDisabled(true)
            setReset(true)
          })
          if (resp.length == 0) setDisabled(false)
          if (reset && !disabled) {
            resetForm()
            setReset(false)
          }
          console.log(resp)
        }
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(patientData)
    console.log(orders)
    console.log(order)

    if (!(order.orderId === 0)) {
      submitOrder(patientData, order, orders)
    }
  }

  const submitOrder = (patient, orderH, details) => {
    const options = {
      body: { patient, orderH, details },
    }
    console.log(options.body)
    API.post('newOrder', options).then((res) => {
      if (!res.error) {
        resetForm()
        console.log('exito')
      }
    })
  }

  const select_style = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: 'var(--cui-body-bg)',
      border: 'var(--cui-body-bg)',
      color: 'var(--cui-body-color)',
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isFocused ? 'var(--cui-primary)' : 'var(--cui-body-bg)',
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      color: 'var(--cui-body-color)',
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: 'var(--cui-body-bg)',
    }),
    multiValue: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: 'var(--cui-primary)',
    }),
  }

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CCard className="mb-4">
          <CCardHeader>Agregar Examen</CCardHeader>
          <CInputGroup className=" d-flex  pb-2">
            <CInputGroupText>Nro de Orden</CInputGroupText>
            <CFormInput name="orderId" onChange={handleChange2} type="number"></CFormInput>
            <CInputGroupText>Fecha</CInputGroupText>
            <CFormInput
              name="fecha"
              disabled={disabled}
              value={patientData.fecha_nac}
              onChange={handleChange2}
              type="date"
            ></CFormInput>
          </CInputGroup>
          <br />
          <CInputGroup className=" d-flex  pb-2">
            <CInputGroupText>Examen a Realizar</CInputGroupText>
            <Select
              options={options1}
              onInputChange={console.log('hola')}
              isMulti
              className="form-control p-0"
              classNamePrefix="select"
              styles={select_style}
              value={orders}
              onChange={setOrders}
            />
          </CInputGroup>
          <br />
          <CInputGroupText>Tipo de Entrada:</CInputGroupText>
          <CFormSelect
            width="40"
            name="tipoE"
            disabled={disabled}
            value={patientData.tipoE}
            onChange={handleChange}
          >
            <option value="H">Hospitalizado</option>
            <option value="CE">Control Externo</option>
            <option value="E">Emergencia</option>
          </CFormSelect>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>Informacion del Paciente</CCardHeader>
          <CInputGroup>
            <CInputGroupText>N° Documento:</CInputGroupText>
            <CFormInput
              name="cedula"
              onChange={handleChange}
              type="number"
              placeholder="Ej. 12345678"
            ></CFormInput>
          </CInputGroup>
          <br />
          <CInputGroup>
            <CInputGroupText>Nombre:</CInputGroupText>
            <CFormInput
              name="nombres"
              disabled={disabled}
              value={patientData.nombres}
              onChange={handleChange}
              type="text"
              autoComplete="name"
            ></CFormInput>
          </CInputGroup>
          <br />
          <CInputGroup>
            <CInputGroupText>Edad:</CInputGroupText>
            <CFormInput name="edad" onChange={handleChange} value={patientData.edad}></CFormInput>

            <CInputGroupText>Género</CInputGroupText>
            <CFormSelect
              name="sexo"
              disabled={disabled}
              value={patientData.sexo}
              onChange={handleChange}
            >
              <option>Seleccione el género..</option>
              <option value="F">F</option>
              <option value="M">M</option>
            </CFormSelect>
          </CInputGroup>
          <br />
          <CInputGroup>
            <CInputGroupText>Correo</CInputGroupText>
            <CFormInput
              name="correo"
              disabled={disabled}
              value={patientData.correo}
              onChange={handleChange}
              placeholder="ejemplo@gmail.com"
              type="email"
            ></CFormInput>
            <CInputGroupText>Telefono</CInputGroupText>
            <CFormInput
              name="telf"
              disabled={disabled}
              onChange={handleChange}
              value={patientData.telf}
              placeholder="ejm. 042612345678"
              type="tel"
            ></CFormInput>
          </CInputGroup>
          <br />
          <CInputGroup>
            <CInputGroupText>Direccion</CInputGroupText>
            <CFormInput
              name="direccion"
              disabled={disabled}
              value={patientData.direccion}
              onChange={handleChange}
              type="text"
            ></CFormInput>
          </CInputGroup>
        </CCard>

        <CButton type="submit" color="primary">
          Guardar
        </CButton>
      </CForm>
      <br />
    </>
  )
}

export default orderRegister