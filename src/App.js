import React from 'react';
import Footer from './components/Footer';
import 'normalize.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navabar';
import {Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Itinerary from './components/pages/Itinerary';


function App() {
  return (
    <div>
      <Navbar />
        <Switch>
        
          <Route exact  path="/" component={Home}/>
          <Route path="/itinerary" component={Itinerary}/>
        </Switch>
        
      <Footer />
    </div>
  );
}

export default App;
