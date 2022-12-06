import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'

import Home from './pages/home/Home'
import Listings from './pages/listings/Listings'
import About from './pages/about/About'

import './App.scss';
import './pages/pages.scss';

function App() {
  return (
    <Router>
      <div className="App site-wrapper">
        {/* <BurgerMenu /> */}
        <Header />
        <main>
          <div className={`main-content-wrapper main-content-wrapper-page-`}>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/listings" exact element={<Listings  />} />
              <Route path="/about" exact element={<About />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;

