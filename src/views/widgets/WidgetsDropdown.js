import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { CCol, CRow, CWidgetStatsD } from '@coreui/react'
import imagenLocal from '../../assets/images/LOCALES.png'
import imagenTalleres from '../../assets/images/TALLERES.png'
import imagenAreas from '../../assets/images/AREAS.png'

const WidgetStatsDExample = () => {
  return (
    <>
    <CRow>
      <CCol xs={3}>
        <CWidgetStatsD
          className="mb-2 "
          icon={
            <img
              src={imagenLocal}
              alt="Centro Artesanal"
              style={{ maxWidth: '100%',  borderRadius: '8px' }}
            />
          }
          

          values={[
            { title: 'Ocupados', value: '55' },
            { title: 'Disponible', value: '17' },
          ]}
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsD
          className="mb-2 "
          icon={
            <img
              src={imagenTalleres}
              alt="Centro Artesanal"
              style={{ maxWidth: '100%',  borderRadius: '8px' }}
            />
          }
          

          values={[
            { title: 'Ocupados', value: '1' },
            { title: 'Disponible', value: '2' },
          ]}
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsD
          className="mb-2 "
          icon={
            <img
              src={imagenAreas}
              alt="Centro Artesanal"
              style={{ maxWidth: '100%',  borderRadius: '8px' }}
            />
          }
          

          values={[
            { title: 'Ocupados', value: '2' },
            { title: 'Disponible', value: '8' },
          ]}
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsD
          className="mb-2 "
          icon={
            <img
              src={imagenLocal}
              alt="Centro Artesanal"
              style={{ maxWidth: '100%',  borderRadius: '8px' }}
            />
          }
          

          values={[
            { title: 'Ocupados', value: '55' },
            { title: 'Disponible', value: '17' },
          ]}
        />
      </CCol>
    </CRow>
    
  </>
  )
}

export default WidgetStatsDExample