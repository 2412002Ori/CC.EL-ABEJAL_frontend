import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CRow,
  CCol,
  CForm,
  CButton,
} from '@coreui/react';

const RegistrerTenant = ({ data, onSave, isEdit }) => {
  const [formData, setFormData] = useState({
    id_number: '',
    rif: '',
    full_name: '',
    date_birth: '',
    phone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    if (isEdit && data) {
      setFormData(data); // Inicializa los campos con los datos del usuario seleccionado
    }
  }, [isEdit, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    onSave(formData); // Envía los datos actualizados al guardar
  };

  return (
    <CCard bordered hover style={{ border: '2px solid #fff' }}>
      <CCardHeader>
        <h3 className="text-center">Registro de Inquilino</h3>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-center mb-3">
            <CCol md={2}>
              <CFormInput
                type="integer"
                min="0"
                max="99999999"
                name="id_number"
                value={formData.id_number}
                onChange={handleChange}
                placeholder="12345678"
                label="Cédula"
                required
              />
            </CCol>
            <CCol md={2}>
              <CFormInput
                type="integer"
                min="0"
                max="99999999"
                name="rif"
                value={formData.rif}
                onChange={handleChange}
                placeholder="j-12345678-9"
                label="RIF"
                required
              />
            </CCol>
            <CCol md={5}>
              <CFormInput
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Nombre y Apellido"
                label="Nombre y Apellido"
                required
              />
            </CCol>
          </CRow>

          <CRow className="justify-content-center mb-3">
            <CCol md={2}>
              <CFormInput
                type="integer"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="04123456789"
                label="Teléfono"
                required
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@gmail.com"
                label="Correo Electrónico"
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Dirección"
                label="Dirección"
                required
              />
            </CCol>
          </CRow>

          <CRow className="justify-content-center">
            <CCol xs="auto">
              <CButton type="submit" color="primary">
                Registrar
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default RegistrerTenant;