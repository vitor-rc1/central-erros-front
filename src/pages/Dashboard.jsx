import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import * as Actions from '../actions/index';
import FilterBar from '../components/FilterBar';
import LogList from '../components/LogList';
import PopUpLog from '../components/PopUpLog';
import { isAuthenticated } from '../service/Auth';
import MakeTheirTomorrow from './MakeTheirTomorrowLoading';
import SwitchPages from '../components/SwitchPages';
import SideMenu from '../components/SideMenu';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const {
    loading: popLoading,
    viewLog,
    allLoggers,
  } = useSelector((state) => state.loggers);
  const dispatch = useDispatch();
  useEffect(async () => {
    const authenticated = await isAuthenticated();
    if (authenticated[1]) {
      dispatch(Actions.storageAllLoggers(authenticated[0]));
      return setLoading(false);
    }
    return setRedirect(!authenticated[1]);
  }, []);
  if (redirect) return <Redirect to="/" />;
  if (loading) return <MakeTheirTomorrow />;
  return (
    <div className="main-container">
      <Header sideMenu />
      <SideMenu />
      <FilterBar />
      <LogList loggers={allLoggers} />
      {viewLog[0] && <PopUpLog log={viewLog[1]} loading={popLoading} />}
      <SwitchPages />
    </div>
  );
}

export default Dashboard;
