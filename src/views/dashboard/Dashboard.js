import React from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetStatsDExample from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
   
  return (
    <>
      <WidgetStatsDExample className="mb-2" />
      <CRow className='mt-3'>
        <CCol >
          <CRow>
           <CCol >
             <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
               <div className="text-body-secondary text-truncate small">INQUILINOS AL DIA </div>
               <div className="fs-5 fw-semibold">40</div>
             </div>
           </CCol>    
           <CCol >
                <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                  <div className="text-body-secondary text-truncate small">
                  INQUILINOS MOROSOS 
                </div>

                <div className="fs-5 fw-semibold">25</div>
                </div>
              </CCol>
         </CRow>

       </CCol>

        <CCol >
          <CRow>

              <CCol>
                 <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                    <div className="text-body-secondary text-truncate small">INQUILINOS MULTADOS</div>
                    <div className="fs-5 fw-semibold">7</div>
                  </div>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

    </>
  )
}

export default Dashboard
