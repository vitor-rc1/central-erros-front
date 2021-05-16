import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function SideMenu() {
  const [leave, setLeave] = useState(false);
  const leaveOperation = () => {
    localStorage.clear();
    setLeave(true);
  };
  return (
    <div className="sideMenu">
      <Link to="/createLog">Criar Log</Link>
      <Link to="/viewLog">Visualizar Log por ID</Link>
      <button type="button" onClick={leaveOperation}>
        Sair
      </button>
      {leave && <Redirect to="/" />}
    </div>
  );
}

export default SideMenu;
