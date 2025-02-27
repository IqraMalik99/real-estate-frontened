
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { login } = useSelector((state) => state.user);
  console.log(`it is login ${login}`);
  // Access the login state from Redux

  // If the user is logged in, render the requested component (Outlet)
  // Otherwise, redirect to the login page
  return login ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;