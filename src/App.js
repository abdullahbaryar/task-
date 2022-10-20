
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Singnup from './pages/Singnup';

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/singnup' element={<Singnup/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;
