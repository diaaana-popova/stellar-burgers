import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {

  const allOrders = useSelector((state) => state.allOrders.orders);

  const { number } = useParams();

  const allOrderData = useMemo(() => {
    if (!number || !allOrders.length) return null;

    return allOrders.find((order) => order.number === Number(number));
  }, [allOrders, number]);

  const ingredients = useSelector((state) => state.ingredients.items);

  const orderInfo = useMemo(() => {
    if (!allOrderData || !ingredients.length) return null;

    const date = new Date(allOrderData.createdAt!);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = allOrderData.ingredients!.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...allOrderData,
      ingredientsInfo,
      date,
      total
    };
  }, [allOrderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
