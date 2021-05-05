import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function MakeTheirTomorrow() {
  const [falseLoading, setFalseLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => setFalseLoading(true), 1500);
  });
  if (falseLoading) return <Redirect to="/login" />;
  return (
    <div className="main-tomorrow">
      <h1>
        MAKE THEIR
        {' '}
        <b>TOMORROW</b>
      </h1>
    </div>
  );
}

export default MakeTheirTomorrow;
