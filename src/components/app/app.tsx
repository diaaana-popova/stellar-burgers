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
import React from 'react';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../components/slices/ingredientSlice';
import { Preloader } from '@ui';
import { ProtectedRoute } from '../protected-route';
import { checkUser } from '../slices/profileSlice';

const AppLayout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);

const App = () => {

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
    navigate(-1);
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
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
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
        {<Route
          path='feed/:number'
          element={
            <Modal title='Детали заказа' onClose={onClose}>
              <OrderInfo />
            </Modal>
            }
          />}
      </Routes>
      )}
    </div>
  )
};

export default App;


          {/* 
          <Route path='login' element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path='register' element={<ProtectedRoute><Register /></ProtectedRoute>} />
          <Route path='forgot-password' element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
          <Route path='reset-password' element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />

          <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}>
            <Route path='orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>}>
              <Route path=':number' element={<ProtectedRoute><Modal><OrderInfo /></Modal></ProtectedRoute>}></Route>
            </Route>
          </Route> */}


  //           return (
  //   <>
  //     <Routes>
  //       <Route path='/' element={<AppLayout />}>
  //         <Route index element={<ConstructorPage />} />
  //         <Route path='feed' element={<Feed />}>
  //           <Route
  //             path=':number'
  //             element={
  //               <Modal title='1' onClose={onClose}>
  //                 <OrderInfo />
  //               </Modal>
  //             }
  //           />
  //         </Route>
  //         <Route
  //           path='ingredients/:id'
  //           element={
  //             <Modal title='Детали ингредиента' onClose={onClose}>
  //               <IngredientDetails />
  //             </Modal>
  //           }
  //         />
  //         <Route path='*' element={<NotFound404 />} />
  //       </Route>
  //     </Routes>
  //   </>
  // );
