import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import Homepage from './Screens/Homepage';
import './bootstrap.min.css'

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
