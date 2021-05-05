import React from 'react';
import { Link } from 'react-router-dom';

function PopUpCreatedAccount() {
  return (
    <div className="created">
      <h1> Sua conta foi criada com sucesso!</h1>
      <Link to="/login"> Retonar a página de login</Link>
    </div>
  );
}

export default PopUpCreatedAccount;
