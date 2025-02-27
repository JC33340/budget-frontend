import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthLayout from './layout/AuthLayout';
import AppLayout from './layout/AppLayout';
import CheckAuth from './layout/CheckAuth';
import HomePage from './pages/Homepage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route element={<CheckAuth />}>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route
                            path="/transactions"
                            element={<Transactions />}
                        />
                        <Route path="/reports" element={<Reports />} />
                    </Route>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="signUp" element={<SignUp />}></Route>
                        <Route
                            path="forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="reset-password/:token"
                            element={<ResetPassword />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
