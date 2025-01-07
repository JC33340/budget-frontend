import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element=''></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path ='signUp' element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App;
