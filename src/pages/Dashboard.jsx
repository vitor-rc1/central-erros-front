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

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { loading: popLoading, viewLog, allLoggers } = useSelector(
    (state) => state.loggers,
  );
  const dispatch = useDispatch();
  useEffect(async () => {
    const authenticated = await isAuthenticated();
    if (authenticated[1]) {
      dispatch(Actions.storageAllLoggers(authenticated[0]));
      setRedirect(!authenticated[1]);
      return setLoading(false);
    }
    setLoading(false);
    return setRedirect(!authenticated[1]);
  }, []);
  if (loading) return <MakeTheirTomorrow />;
  if (redirect) return <Redirect to="/" />;
  return (
    <div className="main-container">
      <Header />
      <FilterBar />
      <LogList loggers={allLoggers} />
      {viewLog[0] && <PopUpLog log={viewLog[1]} loading={popLoading} />}
    </div>
  );
}

export default Dashboard;
