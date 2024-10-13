import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import InvoicePage from "./pages/InvoicePage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import RequireAuth from "./components/RequireAuth";

import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const ROLES = {
  superadmin: 1000,
  admin: 1001,
  manager: 1002,
  user: 1003,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes*/}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />

        {/* protected routes*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="/invoice" element={<InvoicePage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="/customer" element={<CustomerPage />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.admin, ROLES.manager, ROLES.superadmin]}
            />
          }
        >
          <Route path="/statistic" element={<StatisticPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
