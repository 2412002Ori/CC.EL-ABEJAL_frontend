import React, { useState } from 'react'; 
import {
    CButton,
    CCard,
    CCardBody,
    CHeader,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CCloseButton,
    COffcanvas,
    COffcanvasBody,
    COffcanvasHeader,
    COffcanvasTitle,
    CFormCheck
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFingerprint } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'


const PermissionRow = ({ name, groupName, value, onChange }) => (
    <CTableRow>
        <CTableDataCell>{name}</CTableDataCell>
        <CTableDataCell className="text-center">
            <CFormCheck
                type="radio"
                name={groupName}
                id={`${groupName}-yes`}
                label=""
                checked={value === true}
                onChange={() => onChange(true)}
            />
        </CTableDataCell>
        <CTableDataCell className="text-center">
            <CFormCheck
                type="radio"
                name={groupName}
                id={`${groupName}-no`}
                label=""
                checked={value === false}
                onChange={() => onChange(false)}
            />
        </CTableDataCell>
    </CTableRow>
);

const OffCanvasPermisos = ({ title, rows }) => {
    const [visible, setVisible] = useState(false);
    
    const [permissions, setPermissions] = useState(
        rows.reduce((acc, row) => ({ ...acc, [row]: false }), {})
    );

    const handlePermissionChange = (row, value) => {
        setPermissions(prev => ({ ...prev, [row]: value }));
    };

    return (
        <>
            <CButton color="warning" variant="ghost" onClick={() => setVisible(true)}>
                <CIcon icon={cilFingerprint} className="me-2"/>
                Permisos
            </CButton>
            <COffcanvas backdrop={true} placement="end" visible={visible} onHide={() => setVisible(false)}>
                <COffcanvasHeader>
                    <COffcanvasTitle>{title}</COffcanvasTitle>
                    <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                </COffcanvasHeader>
                <COffcanvasBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>Nombre</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Si tiene permiso</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">No tiene permiso</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {rows.map((row, idx) => (
                                <PermissionRow
                                    key={row}
                                    name={row}
                                    groupName={`${title}-${idx}`}
                                    value={permissions[row]}
                                    onChange={val => handlePermissionChange(row, val)}
                                />
                            ))}
                        </CTableBody>
                    </CTable>
                </COffcanvasBody>
            </COffcanvas>
        </>
    );
};

export const OffCanvasRightPermisos1 = () =>
    <OffCanvasPermisos title="Contratos" rows={["Solicitud", "Ingreso", "Lista Contratos"]} />;
export const OffCanvasRightPermisos2 = () =>
    <OffCanvasPermisos title="Inquilinos" rows={["Registro", "Rehubicaciones"]} />;
export const OffCanvasRightPermisos3 = () =>
    <OffCanvasPermisos title="Pagos" rows={["Registro de Pagos", "Listados"]} />;
export const OffCanvasRightPermisos4 = () =>
    <OffCanvasPermisos title="Inventario" rows={["Registro y Listado", "Pedidos"]} />;
export const OffCanvasRightPermisos5 = () =>
    <OffCanvasPermisos title="Estadisticas" rows={["Pagos x Local", "Ingresos"]} />;
export const OffCanvasRightPermisos6 = () =>
    <OffCanvasPermisos title="Usuarios" rows={["Registro"]} />;

const Registeruser = () => {
    const navigate = useNavigate();

    return (
        <CCard className="mb-3">
            <CHeader>
                <h2>Permisos de Usuario</h2>
            </CHeader> 
            <CCardBody>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Componentes</CTableHeaderCell>
                            <CTableHeaderCell>Acciones</CTableHeaderCell>   
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Contratos</CTableDataCell> 
                            <CTableDataCell><OffCanvasRightPermisos1/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Inquilinos</CTableDataCell>
                            <CTableDataCell><OffCanvasRightPermisos2/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Pagos</CTableDataCell>
                            <CTableDataCell><OffCanvasRightPermisos3/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Inventario</CTableDataCell>
                            <CTableDataCell><OffCanvasRightPermisos4/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Estadisticas</CTableDataCell>
                            <CTableDataCell><OffCanvasRightPermisos5/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Usuarios</CTableDataCell>
                            <CTableDataCell><OffCanvasRightPermisos6/></CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
                <div className="mt-4">
                    <CButton color="primary" onClick={() => navigate('/pages/register/Register')}>
                        Atrás
                    </CButton>
                </div>
            </CCardBody>
        </CCard>
    )
}

export default Registeruser
