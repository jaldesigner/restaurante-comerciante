import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import AppRouter from './Router';
import AuthRouters from './auth';

export default function Routers() {

  const { logado } = useContext(AuthContext);

  return (
    logado ? <AppRouter /> : <AuthRouters />
  )
}