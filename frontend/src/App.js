import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Container} from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import FeaturesScreen from "./screens/FeaturesScreen"; 

function App() {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path='/' exact element={<HomeScreen />}></Route>
              <Route path='/features' element={<FeaturesScreen />}></Route>
              <Route path='/pricing'></Route>
              <Route path='/cart'></Route>
              <Route path='/user'></Route>
            </Routes>
          </Container>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
