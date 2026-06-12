import { AppProvider, useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import CartPage from '@/pages/CartPage';
import OrdersPage from '@/pages/OrdersPage';
import ReviewsPage from '@/pages/ReviewsPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminPage from '@/pages/AdminPage';

function AppRoutes() {
  const { page } = useApp();

  const renderPage = () => {
    if (page === 'home') return <HomePage />;
    if (page === 'catalog') return <CatalogPage />;
    if (page === 'cart') return <CartPage />;
    if (page === 'orders') return <OrdersPage />;
    if (page === 'reviews') return <ReviewsPage />;
    if (page === 'login') return <LoginPage />;
    if (page === 'register') return <RegisterPage />;
    if (page === 'admin') return <AdminPage />;
    if (page.startsWith('review:')) return <ReviewsPage />;
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
