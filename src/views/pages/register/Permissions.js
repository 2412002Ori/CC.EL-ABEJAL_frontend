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

export const OffCanvasRightPermisos1 = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <CButton color="warning" variant="ghost" onClick={() => setVisible(true)}><CIcon icon={cilFingerprint} className="me-2"/>
                Permisos
            </CButton>

            <COffcanvas backdrop={true} placement="end" visible={visible} onHide={() => setVisible(false)}>
                <COffcanvasHeader>
                    <COffcanvasTitle>Contratos</COffcanvasTitle>
                    <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                </COffcanvasHeader>
            <COffcanvasBody>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Sudcomponentes</CTableHeaderCell>  
                        </CTableRow>
                    </CTableHead>

                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Solicitud</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Ingreso</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Lista Contratos</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </COffcanvasBody>
            </COffcanvas>
        </>
    )
}

export const OffCanvasRightPermisos2 = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <CButton color="warning" variant="ghost" onClick={() => setVisible(true)}><CIcon icon={cilFingerprint} className="me-2"/>
                Permisos
            </CButton>

            <COffcanvas backdrop={true} placement="end" visible={visible} onHide={() => setVisible(false)}>
                <COffcanvasHeader>
                    <COffcanvasTitle>Inquilinos</COffcanvasTitle>
                    <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                </COffcanvasHeader>
            <COffcanvasBody>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Sudcomponentes</CTableHeaderCell>  
                        </CTableRow>
                    </CTableHead>

                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Registro</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Rehubicaciones</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>                  
                    </CTableBody>
                </CTable>
            </COffcanvasBody>
            </COffcanvas>
        </>
    )
}

export const OffCanvasRightPermisos3 = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <CButton color="warning" variant="ghost" onClick={() => setVisible(true)}><CIcon icon={cilFingerprint} className="me-2"/>
                Permisos
            </CButton>

            <COffcanvas backdrop={true} placement="end" visible={visible} onHide={() => setVisible(false)}>
                <COffcanvasHeader>
                    <COffcanvasTitle>Pagos</COffcanvasTitle>
                    <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                </COffcanvasHeader>
            <COffcanvasBody>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Sudcomponentes</CTableHeaderCell>  
                        </CTableRow>
                    </CTableHead>

                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Registro de Pagos</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Listados</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>                  
                    </CTableBody>
                </CTable>
            </COffcanvasBody>
            </COffcanvas>
        </>
    )
}

export const OffCanvasRightPermisos4 = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <CButton color="warning" variant="ghost" onClick={() => setVisible(true)}><CIcon icon={cilFingerprint} className="me-2"/>
                Permisos
            </CButton>

            <COffcanvas backdrop={true} placement="end" visible={visible} onHide={() => setVisible(false)}>
                <COffcanvasHeader>
                    <COffcanvasTitle>Inventario</COffcanvasTitle>
                    <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                </COffcanvasHeader>
            <COffcanvasBody>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Sudcomponentes</CTableHeaderCell>  
                        </CTableRow>
                    </CTableHead>

                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Registro y Listado</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Pedidos</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>                  
                    </CTableBody>
                </CTable>
            </COffcanvasBody>
            </COffcanvas>
        </>
    )
}

export const OffCanvasRightPermisos5 = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <CButton color="warning" variant="ghost" onClick={() => setVisible(true)}><CIcon icon={cilFingerprint} className="me-2"/>
                Permisos
            </CButton>

            <COffcanvas backdrop={true} placement="end" visible={visible} onHide={() => setVisible(false)}>
                <COffcanvasHeader>
                    <COffcanvasTitle>Estadisticas</COffcanvasTitle>
                    <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                </COffcanvasHeader>
            <COffcanvasBody>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Sudcomponentes</CTableHeaderCell>  
                        </CTableRow>
                    </CTableHead>

                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Pagos x Local</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Ingresos</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>                  
                    </CTableBody>
                </CTable>
            </COffcanvasBody>
            </COffcanvas>
        </>
    )
}

export const OffCanvasRightPermisos6 = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <CButton color="warning" variant="ghost" onClick={() => setVisible(true)}><CIcon icon={cilFingerprint} className="me-2"/>
                Permisos
            </CButton>

            <COffcanvas backdrop={true} placement="end" visible={visible} onHide={() => setVisible(false)}>
                <COffcanvasHeader>
                    <COffcanvasTitle>Usuarios</COffcanvasTitle>
                    <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                </COffcanvasHeader>
            <COffcanvasBody>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Sudcomponentes</CTableHeaderCell>  
                        </CTableRow>
                    </CTableHead>

                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Registro</CTableDataCell> 
                            <CTableDataCell><Checkbox/></CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </COffcanvasBody>
            </COffcanvas>
        </>
    )
}

export const Checkbox = () => {
    return (
        <>
            <CFormCheck inline id="inlineCheckbox1" label="Si tiene permisos" />   
            <CFormCheck inline id="inlineCheckbox2" label="No tiene permisos" defaultChecked /> {/*default */}
        </>
    )
}

const Registeruser = () => {
return (
    <CCard>
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
        </CCardBody>
    </CCard>
)
}

export default Registeruser

