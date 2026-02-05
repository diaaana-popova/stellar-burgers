import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../services/slices/profileSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const stateError = useSelector((state) => state.profile.error);
  const isSuccess = useSelector((state) => state.profile.isSuccess);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({email, password}));
    if (isSuccess) navigate('/profile');
  };

  useEffect(() => {
    if (isSuccess) navigate('/profile');
  }, [isSuccess]);

  return (
    <LoginUI
      errorText={stateError || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
