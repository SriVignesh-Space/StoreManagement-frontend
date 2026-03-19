import React, { useContext } from 'react'
import { AuthContext, type AuthContextType } from './AuthProvider'
import { Navigate } from 'react-router-dom';

const AdminProvider =  ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext) as AuthContextType;

  if (!auth.user) {
    return <Navigate to="/" />;
  }

  if (auth.user.role !== "ADMIN") {
    return <Navigate to="/v1" />;
  }

  return children;
};

export default AdminProvider