import { lazy, Suspense } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { setNavigate } from "./lib/navigation.ts";
import LoadingSpinnerFull from "./components/LoadingSpinnerFull.tsx";
import Home from "./pages/Home.tsx";
import GuestRoute from "./components/GuestRoute.tsx";

const Login = lazy(() => import("./pages/Login.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.tsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.tsx"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail.tsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Transactions = lazy(() => import("./pages/Transactions.tsx"));
const Budgets = lazy(() => import("./pages/Budgets.tsx"));
const Pots = lazy(() => import("./pages/Pots.tsx"));
const RecurringBills = lazy(() => import("./pages/RecurringBills.tsx"));
const EditTransaction = lazy(() => import("./pages/EditTransaction.tsx"));
const AddTransaction = lazy(() => import("./pages/AddTransaction.tsx"));
const Overview = lazy(() => import("./pages/Overview.tsx"));

const AppContainer = lazy(() => import("./components/AppContainer.tsx"));

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <Suspense fallback={<LoadingSpinnerFull />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<AppContainer />}>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transaction/add" element={<AddTransaction />} />
          <Route
            path="transaction/:transactionId/edit"
            element={<EditTransaction />}
          />
          <Route path="budgets" element={<Budgets />} />
          <Route path="pots" element={<Pots />} />

          <Route path="recurringbills" element={<RecurringBills />} />

          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/password/forgot"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/password/reset"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/email/verify/:code"
          element={
            <GuestRoute>
              <VerifyEmail />
            </GuestRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
