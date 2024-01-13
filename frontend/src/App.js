import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Footer from './components/Footer';
import Signup from './components/Signup';
import './bootstrap.min.css'
import Homepage from './screens/Homepage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {
  return (
    <div>

      <Router>
      
    
      <Routes>

        <Route path='/' element = {<Login />}></Route>
        <Route path='/signup' element = {<Signup />}></Route>
        <Route path ='/homepage' element = {<Homepage/>}></Route>


      </Routes>

      
      

      </Router>
      <Footer/>
    </div>
  );
}

export default App;
