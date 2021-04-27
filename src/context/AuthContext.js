import { createContext } from 'react';
import useLocalStorage from '../utils/useLocalStorage';

const AuthContext = createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useLocalStorage('auth', null);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
