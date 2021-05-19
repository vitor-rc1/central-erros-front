import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function SideMenu() {
  const [leave, setLeave] = useState(false);
  const [flag, setFlag] = useState(0);
  const { menu } = useSelector((state) => state.loggers);
  const [menuState, setMenuState] = useState('side-menu-start');
  const leaveOperation = () => {
    localStorage.clear();
    setLeave(true);
  };
  useEffect(() => {
    if (flag === 0) {
      setFlag(flag + 1);
      return setMenuState('side-menu start');
    }
    if (flag % 2 !== 0) {
      setFlag(flag + 1);
      return setMenuState('side-menu slide');
    }
    setFlag(flag + 1);
    return setMenuState('side-menu slide-leave');
  }, [menu]);
  return (
    <div className={menuState}>
      <Link to="/createLog">Criar Log</Link>
      <Link to="/viewLog">Visualizar Log por ID</Link>
      <Link to="/dashboard">Logs</Link>
      <button type="button" onClick={leaveOperation}>
        Sair
      </button>
      {leave && <Redirect to="/" />}
    </div>
  );
}

export default SideMenu;
