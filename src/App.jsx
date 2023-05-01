import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RequireAuth from './routing/RequireAuth';
import publicRoutes from './routing/public.routes';
import protectedRoutes from './routing/protected.routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useUserAuth } from './services/auth.service';

const queryClient = new QueryClient();

const App = () => {
  const user = useUserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/home');
    }

    return () => {
      navigate('/login');
    };
  }, [user?.id]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.element />
              </route.layout>
            }
          />
        ))}
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RequireAuth user={user}>
                <route.layout>
                  <route.element />
                </route.layout>
              </RequireAuth>
            }
          />
        ))}
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
