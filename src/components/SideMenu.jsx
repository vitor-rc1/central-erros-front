import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function SideMenu() {
  const [leave, setLeave] = useState(false);
  const { menu } = useSelector((state) => state.loggers);
  const leaveOperation = () => {
    localStorage.clear();
    setLeave(true);
  };
  return (
    <div className={menu ? 'side-menu slide' : 'side-menu slide-leave'}>
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
