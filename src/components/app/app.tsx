import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientSlice';
import { Preloader } from '@ui';
import { ProtectedRoute } from '../protected-route';
import { checkUser } from '../../services/slices/profileSlice';

const AppLayout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);

export const App = () => {

  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch]);

  const onClose = () => {
    navigate(background);
  };

    const isLoading = useSelector(
    (state) => state.ingredients.isLoading
  );

  return (
    <div>
      {isLoading && <Preloader />}

      <Routes location={background || location}>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<ConstructorPage />} />
          <Route
            path='ingredients/:id'
            element={<IngredientDetails />}
          />
          <Route path='*' element={<NotFound404 />} />
          <Route path='feed' element={<Feed />}>
            <Route
              path=':number'
              element={<OrderInfo />
              }
            />
          </Route>
          <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='profile/orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>}>
              <Route
              path=':number'
              element={<OrderInfo />
              }
            />
          </Route>
          <Route path='login' element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
          <Route path='register' element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
          <Route path='forgot-password' element={<ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>} />
          <Route path='reset-password' element={<ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute>} />
        </Route>
      </Routes>
      {background && (
        <Routes>
        <Route
            path='ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        <Route
          path='feed/:number'
          element={
            <Modal title='Детали заказа' onClose={onClose}>
              <OrderInfo />
            </Modal>
            }
          />
          <Route
          path='profile/orders/:number'
          element={<ProtectedRoute>
              <Modal title='Детали заказа' onClose={onClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
            }
          />
      </Routes>
      )}
    </div>
  )
};

export default App;
