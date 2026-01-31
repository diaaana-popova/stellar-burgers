import { Navigate } from 'react-router-dom';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthChecked = useSelector((state) => state.profile.isAuthChecked);
    const user = useSelector((state) => state.profile.user);

    

    if (!isAuthChecked) {
        return <Preloader />;
    }

    if (!user) {
      return <Navigate replace to='/login'/>
    }

    return children;
}
