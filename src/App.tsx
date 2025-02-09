import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthLayout from './layout/AuthLayout';
import AppLayout from './layout/AppLayout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element=""></Route>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="signUp" element={<SignUp />}></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
