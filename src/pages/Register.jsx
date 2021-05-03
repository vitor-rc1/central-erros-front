import React from 'react';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

function Register() {
  return (
    <section className="main-container">
      <Header />
      <div className="form-container">
        <RegisterForm />
      </div>
    </section>
  );
}

export default Register;
