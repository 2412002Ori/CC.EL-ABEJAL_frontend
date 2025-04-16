import React from 'react';
import CAcepted from './contractsAcepted';
import CDefeated from './contractsDefeated';
import { CTab,CTabs, CTabContent, CTabList, CTabPanel, CButton } from '@coreui/react';

function Contractsmenu() {

  

  return (
    <>
    <CTabs activeItemKey={1}>
      <CTabList variant="tabs" layout='justified'>
        <CTab itemKey={1}>CONTRATOS ACEPTADOS</CTab>
        <CTab itemKey={2}>CONTRATOS VENCIDOS</CTab>
      </CTabList>
      <CTabContent>
        <CTabPanel itemKey={1}>
          <div>
          <CAcepted />
          </div>
          <CButton color='primary' onClick={() => toPDF()}>Download PDF</CButton>
        </CTabPanel>
        <CTabPanel itemKey={2}>
          <div>
         <CDefeated />
         </div>
         <CButton color='primary' onClick={() => toPDF()}>Download PDF</CButton>
        </CTabPanel>

      </CTabContent>
    </CTabs>
   
    
    
    
   </>
  );
}

export default Contractsmenu;