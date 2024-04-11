import Pages from './pages/Pages';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from './setup/auth/useAuth';
import { GlobalContextProvider } from './setup/app-context-menager/GlobalContext';

function App() {
  const { user } = useAuth0();
  const { getUserData } = useUser();
  useQuery(['context-user'], getUserData, {
    enabled: !!user,
  });

  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Pages />
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
