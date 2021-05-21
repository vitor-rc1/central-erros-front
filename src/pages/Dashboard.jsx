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
import MakeTheirTomorrow from './MakeTheirTomorrowLoading';
import SwitchPages from '../components/SwitchPages';
import SideMenu from '../components/SideMenu';
import GetLogs from '../service/GetLogs';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const {
    loading: popLoading,
    viewLog,
    pageLog,
    ordenation,
    allLoggers,
  } = useSelector((state) => state.loggers);
  const dispatch = useDispatch();
  const loadLogs = async () => {
    const response = await GetLogs({ pageLog, ordenation });
    if (response) {
      const {
        content: logs,
        totalPages,
        pageable: { pageNumber },
      } = response;

      dispatch(Actions.storageAllLoggers({ logs, totalPages }));
      dispatch(Actions.currentPageLog(pageNumber));
    } else {
      alert('Algo deu errado');
    }
  };

  useEffect(async () => {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      await loadLogs();
      return setLoading(false);
    }
    return setRedirect(!authenticated);
  }, []);

  useEffect(async () => {
    if (currentPage !== pageLog.page) {
      await loadLogs();
      setCurrentPage(pageLog.page);
    }
  }, [pageLog, ordenation]);

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
