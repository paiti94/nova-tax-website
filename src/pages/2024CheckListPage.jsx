import React from 'react';
import TaxChecklistForm from '../components/TaxChecklistForm';

const CheckListPage = () => {
  return (
    <section className="checklist-page">
        <div className="checklist-header" >
          <TaxChecklistForm />
        </div>
    </section>
  );
};

export default CheckListPage;