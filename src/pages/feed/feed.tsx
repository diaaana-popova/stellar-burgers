import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchAllOrders } from '../../components/slices/allOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {

  const allOrders = useSelector(
    (state) => state.allOrders.orders
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  const handleGetFeeds = () => {
    dispatch(fetchAllOrders());
  }

  if (!allOrders.length) {
    return <Preloader />;
  }

  return (
    <div>
      <FeedUI orders={allOrders} handleGetFeeds={handleGetFeeds} />
    </div>
  )
}

