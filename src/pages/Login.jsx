import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <section className="main-container">
      <Header />
      <div className="form-container">
        <LoginForm />
      </div>
    </section>
  );
}

export default Login;
