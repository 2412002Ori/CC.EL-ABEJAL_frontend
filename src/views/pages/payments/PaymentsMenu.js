import React, { useState } from 'react';
import Lfines from './ListFines';
import ListPayment from './listpayment';
import RegisterFinePayment from './RegisterFinePayment';
import RegisterPayment from './registerPayment';
import { CTab,CTabs, CTabContent, CTabList, CTabPanel, CButton, CModal, CModalBody, CModalHeader, CModalFooter } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';

function Paymentsmenu() {
  const [showFineModal, setShowFineModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
    <CTabs activeItemKey={1}>
      <CTabList variant="tabs" layout='justified'>
        <CTab itemKey={1}>PAGOS</CTab>
        <CTab itemKey={2}>MULTAS</CTab>
      </CTabList>
      <CTabContent>
        <CTabPanel itemKey={1}>
          <div>
            <CButton color="primary" className="mb-3 mt-3" style={{marginTop: '2rem'}} onClick={() => setShowPaymentModal(true)}>
              <CIcon icon={cilPlus} className="me-2" /> Agregar Pago de Condominio
            </CButton>
            <ListPayment />
            <CModal visible={showPaymentModal} onClose={() => setShowPaymentModal(false)} size="xl" alignment="center">
              <CModalHeader closeButton onClose={() => setShowPaymentModal(false)}>
                <h5 className="modal-title">Registrar Pago de Condominio</h5>
              </CModalHeader>
              <CModalBody style={{ padding: '2.5rem' }}>
                <RegisterPayment />
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setShowPaymentModal(false)}>
                  Cerrar
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </CTabPanel>
        <CTabPanel itemKey={2}>
          <div>
            <CButton color="primary" className="mb-3 mt-3" style={{marginTop: '2rem'}} onClick={() => setShowFineModal(true)}>
              <CIcon icon={cilPlus} className="me-2" /> Agregar Pago de Multa
            </CButton>
            <Lfines/>
            <CModal visible={showFineModal} onClose={() => setShowFineModal(false)} size="xl" alignment="center">
              <CModalHeader closeButton onClose={() => setShowFineModal(false)}>
                <h5 className="modal-title">Registrar Pago de Multa</h5>
              </CModalHeader>
              <CModalBody style={{ padding: '2.5rem' }}>
                <RegisterFinePayment />
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setShowFineModal(false)}>
                  Cerrar
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </CTabPanel>
      </CTabContent>
    </CTabs>
   </>
  );
}

export default Paymentsmenu;