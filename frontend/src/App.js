import './App.css';
import Login from './components/Login';
import Footer from './components/Footer';
import Signup from './components/Signup';
import './bootstrap.min.css'
import Homepage from './screens/Homepage';
import HomeScreen from './screens/HomeScreen';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserProfileScreen from './screens/UserProfileScreen';



function App() {
  return (
    <div>

      <Router>
      
    
      <Routes>

        <Route path='/' element = {<Login />}></Route>
        <Route path='/signup' element = {<Signup />}></Route>
        <Route path ='/homepage' element = {<Homepage/>}></Route>
        <Route path ='/userprofile' element = {<UserProfileScreen/>}></Route>
        <Route path ='/home' element = {<HomeScreen/>}></Route>



      </Routes>

      
      

      </Router>
      <Footer/>
    </div>
  );
}

export default App;
