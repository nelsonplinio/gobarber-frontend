import React, { useEffect } from 'react';

import api from '~/services/api';
// import { Container } from './styles';

export default function Dashboard() {
  useEffect(() => {
    api.get('appointments');
  });
  return <h1>Dashboard</h1>;
}
