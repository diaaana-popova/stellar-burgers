import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearOrder, sendOrder } from '../slices/orderSlice';
import { clearIngredients } from '../slices/constructorSlice';

export const BurgerConstructor: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(
    (state) => state.constructorReducer.items
  );

  const isAuthed = useSelector(
    (state) => state.profile.isAuthenticated
  );

  const orderRequest = useSelector(
    (state) => state.order.isLoading
  );

  const orderData = useSelector(
    (state) => state.order.currentOrder
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || !constructorItems.ingredients) return;

    if (!isAuthed) {
      navigate('/login', {replace: true});
      return
    }

    const bunsId = constructorItems.bun._id;
    const ingrId = constructorItems.ingredients.map((ingr) => ingr._id);

    const ids = [bunsId, ...ingrId]
    
    dispatch(sendOrder(ids));
   };
  
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 1 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
