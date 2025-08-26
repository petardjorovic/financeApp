import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Overview from "./pages/Overview.tsx";
import VerifyEmail from "./pages/VerifyEmail.tsx";
import AppContainer from "./components/AppContainer.tsx";
import Profile from "./pages/Profile.tsx";
import Transactions from "./pages/Transactions.tsx";
import Budgets from "./pages/Budgets.tsx";
import Pots from "./pages/Pots.tsx";
import RecurringBills from "./pages/RecurringBills.tsx";
import { setNavigate } from "./lib/navigation.ts";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route index element={<Overview />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="budgets" element={<Budgets />} />
        <Route path="pots" element={<Pots />} />
        <Route path="recurringbills" element={<RecurringBills />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset" element={<ResetPassword />} />
      <Route path="/email/verify/:code" element={<VerifyEmail />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
