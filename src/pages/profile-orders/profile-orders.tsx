import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getMyOrder } from '../../components/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.myOrders);

  useEffect(() => {
    dispatch(getMyOrder());
  }, [dispatch]); 

  return <ProfileOrdersUI orders={orders} />;
};
