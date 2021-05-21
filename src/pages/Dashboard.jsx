/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import * as Actions from '../actions/index';
import FilterBar from '../components/FilterBar';
import LogList from '../components/LogList';
import PopUpLog from '../components/PopUpLog';
import { isAuthenticated } from '../service/Auth';
import { pagenation } from '../service/Pagenation';
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
    pageLog,
  } = useSelector((state) => state.loggers);
  const dispatch = useDispatch();
  useEffect(async () => {
    const authenticated = await isAuthenticated();
    if (authenticated.content) {
      const arrayPageable = pagenation(authenticated.content, 8);
      dispatch(Actions.currentPageLog(arrayPageable[0]));
      dispatch(Actions.storageAllLoggers(arrayPageable));
      return setLoading(false);
    }
    return setRedirect(!authenticated.content);
  }, []);
  if (redirect) return <Redirect to="/" />;
  if (loading) return <MakeTheirTomorrow />;
  return (
    <div className="main-container">
      <Header sideMenu />
      <SideMenu />
      <FilterBar />
      <LogList loggers={pageLog} />
      {viewLog[0] && <PopUpLog log={viewLog[1]} loading={popLoading} />}
      <SwitchPages />
    </div>
  );
}

export default Dashboard;
