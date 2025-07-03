import React from 'react';
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner
} from '@coreui/react';
import WidgetStatsDExample from '../widgets/WidgetsDropdown';

const PagosRecientes = () => {
  const [payments, setPayments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('No se pudieron obtener los pagos');
        const data = await response.json();
        const pagosOrdenados = Array.isArray(data) ? data : (data.rows || []);
        pagosOrdenados.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));
        setPayments(pagosOrdenados.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <CCard bordered hover style={{ border: 'none', margin: '1.5rem 0', boxShadow: '0 2px 12px #0002', maxWidth: 500, marginLeft: 'auto', marginRight: 0, borderRadius: 16 }}>
      <CCardHeader style={{ background: 'linear-gradient(90deg, #0aa3ad 60%, #ffa600b0 100%)', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: '1rem 1.5rem' }}>
        <h4 className="text-center" style={{ color: '#fff', margin: 0, fontWeight: 700, letterSpacing: 1 }}>Pagos Recientes</h4>
      </CCardHeader>
      <CCardBody style={{ padding: '1rem 1.5rem' }}>
        {loading ? (
          <div className="text-center"><CSpinner color="info" /></div>
        ) : error ? (
          <div className="text-danger text-center">{error}</div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <CTable responsive bordered hover className="pagos-recientes-table" style={{ minWidth: 320, fontSize: 14, borderRadius: 12, boxShadow: '0 1px 4px #0001', background: '#fff' }}>
              <CTableHead style={{ background: '#f4f6fb' }}>
                <CTableRow>
                  <CTableHeaderCell className="text-center" style={{fontWeight: 600, fontSize: 15, color: '#0aa3ad', border: 'none'}}>Contrato</CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{fontWeight: 600, fontSize: 15, color: '#0aa3ad', border: 'none'}}>Monto</CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{fontWeight: 600, fontSize: 15, color: '#0aa3ad', border: 'none'}}>Fecha</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {payments.map((payment, idx) => (
                  <CTableRow key={payment.payment_id} style={{background: idx % 2 === 0 ? '#f8f9fa' : '#fff', borderRadius: 8}}>
                    <CTableDataCell className="text-center" style={{fontSize: 14, border: 'none', padding: '0.5rem 0.3rem'}}>{payment.contract_number}</CTableDataCell>
                    <CTableDataCell className="text-center" style={{fontSize: 14, color: '#0aa3ad', fontWeight: 600, border: 'none', padding: '0.5rem 0.3rem'}}>${payment.amount}</CTableDataCell>
                    <CTableDataCell className="text-center" style={{fontSize: 14, border: 'none', padding: '0.5rem 0.3rem'}}>{payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : ''}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        )}
      </CCardBody>
    </CCard>
  );
};

const DashboardFinance = () => {
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
      {/* En vez de las gráficas, mostramos el historial de pagos */}
      <PagosRecientes />
    </>
  )
}

export default DashboardFinance; 