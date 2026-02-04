import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {

  const allOrders = useSelector((state) => state.allOrders.orders);
  const total = useSelector((state) => state.allOrders.total);
  const totalToday = useSelector((state) => state.allOrders.totalToday);

  const feed = {
    total: total,
    totalToday: totalToday
  };

  const readyOrders = getOrders(allOrders, 'done');

  const pendingOrders = getOrders(allOrders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
