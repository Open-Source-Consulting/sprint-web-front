import { RouterProvider } from 'react-router/dom';
import AuthProvider from './contexts/AuthProvider.jsx';
import { roteador } from './rotas.jsx';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={roteador} />
    </AuthProvider>
  );
}
