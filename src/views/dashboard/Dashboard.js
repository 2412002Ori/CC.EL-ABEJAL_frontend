import React from 'react'

import {
  CCol,
  CRow,
} from '@coreui/react'

import WidgetStatsDExample from '../widgets/WidgetsDropdown'
import MainChart_loc_mes from './MainChart'
import Chartingreso from './mainChart2'

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
      <CRow className='mt-3 ' >
        <CCol xs={12} md={6}>
          <MainChart_loc_mes />
        </CCol>
        <CCol xs={12} md={6}>
          <Chartingreso />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
