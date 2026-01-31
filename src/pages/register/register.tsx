import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { register } from '../../components/slices/profileSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const stateError = useSelector((state) => state.profile.error);
  const isSuccess = useSelector((state) => state.profile.isSuccess);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({email, name, password}));
  };

    useEffect(() => {
      if (isSuccess) navigate('/login');
    }, [isSuccess]);

  return (
    <RegisterUI
      errorText={stateError || ''}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
