import './App.css';
import NavbarMain from './components/NavbarMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from './components/toaster';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Women from './pages/Women';
import Men from './pages/Men';
import Bridal from './pages/Bridal';
import Luxe from './pages/Luxe';
import AccountDetails from './pages/AccountDetails';
import ProtectedRoute from './components/ProtectedRoute';



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavbarMain />
          <Women />
        </>
      ),
    },
    {
      path: "/women",
      element: (
        <>
          <NavbarMain />
          <Women />
        </>
      ),
    },
    {
      path: "/men",
      element: (
        <>
          <NavbarMain />
          <Men />
        </>
      ),
    },
    {
      path: "/bridal",
      element: (
        <>
          <NavbarMain />
          <Bridal />
        </>
      ),
    },
    {
      path: "/luxe",
      element: (
        <>
          <NavbarMain />
          <Luxe />
        </>
      ),
    },
    {
      path: "/accountdetails",
      element: (
        <ProtectedRoute>
          <NavbarMain />
          <AccountDetails />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <>
      <Toaster />
      {/* <NavbarMain /> */}
      <RouterProvider router={router} />
    </>

  );
};

export default App;
