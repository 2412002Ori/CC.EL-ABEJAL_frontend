import React from 'react';
import Lfines from './ListFines';
import LPayments from './ListPayment';
import { CTab,CTabs, CTabContent, CTabList, CTabPanel, CButton } from '@coreui/react';

function Paymentsmenu() {

  

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
          <LPayments />
          </div>
          
        </CTabPanel>
        <CTabPanel itemKey={2}>
          <div>
         <Lfines/>
         </div>
        </CTabPanel>

      </CTabContent>
    </CTabs>
   
    
    
    
   </>
  );
}

export default Paymentsmenu;