import { 
  createContext, 
  useContext, 
  useState, 
  useEffect,
  useMemo
} from 'react';
// import { useNavigate } from 'react-router-dom'; // <-- 1. REMOVE THIS

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  // const navigate = useNavigate(); // <-- 2. REMOVE THIS

  // 3. Effect to update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // 4. Login function (now just sets the token)
  const login = (newToken) => {
    setToken(newToken);
    // navigate('/'); // <-- 3. REMOVE THIS
  };

  // 5. Logout function (now just clears the token)
  const logout = () => {
    setToken(null);
    // navigate('/login'); // <-- 4. REMOVE THIS
  };

  // 6. Memoize the context value
  const contextValue = useMemo(() => ({
    token,
    login,
    logout,
  }), [token]); 

  // 7. Provide the context value to children
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};
