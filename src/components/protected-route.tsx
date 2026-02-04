import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ children, onlyUnAuth = false }: ProtectedRouteProps) => {
    const isAuthChecked = useSelector((state) => state.profile.isAuthChecked);
    const user = useSelector((state) => state.profile.user);
    const location = useLocation();

    if (!isAuthChecked) {
        return <Preloader />;
    }

    if (onlyUnAuth && user) {
      return <Navigate to='/profile' />
    }

    if (!onlyUnAuth && !user) {
      return <Navigate replace to='/login' state={({from: location})}/>
    } 

    return children;
}
