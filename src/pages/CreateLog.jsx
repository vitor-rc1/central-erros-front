import React from 'react';
import Header from '../components/Header';
import LogForm from '../components/LogForm';
import SideMenu from '../components/SideMenu';

function CreateLog() {
  return (
    <section className="main-container">
      <Header sideMenu />
      <div className="form-container create-log">
        <LogForm />
      </div>
      <SideMenu />
    </section>
  );
}

export default CreateLog;
