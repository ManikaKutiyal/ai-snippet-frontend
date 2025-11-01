import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import AuthPage from './AuthPage.jsx';

// 1. Define our application's routes
const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthPage mode="login" />,
  },
  {
    path: '/register',
    element:<AuthPage mode="register" />,
  },
  {
    path: '/',
    // App is now a protected route.
    // You can only get to it if you are logged in.
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
]);

// 2. Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. Wrap the *entire app* with the AuthProvider */}
    {/* This makes the login state available everywhere */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
