import { Outlet } from 'react-router-dom';
import { QuestionProvider } from '../context/QuestionContext';
import ProtectedRoute from './ProtectedRoute';

const AuthenticatedLayout = () => {
  return (
    <ProtectedRoute>
      <QuestionProvider>
        <Outlet />
      </QuestionProvider>
    </ProtectedRoute>
  );
};

export default AuthenticatedLayout;