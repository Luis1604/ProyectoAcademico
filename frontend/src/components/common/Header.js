import React from 'react';
import NotificationBell from './NotificationBell';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#282c34', color: 'white' }}>
      <h1>Academico</h1>
      <NotificationBell />
    </header>
  );
};

export default Header;
