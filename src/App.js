import React from 'react';
import { useEffect } from 'react';


import './styles/style.css'
import LandingPage from './components/LandingPage'
import OneCountryPage from './components/OneCountry'
import PopularPage from './components/PopularPage'
import WorldAtAGlancePage from './components/WorldAtAGlance'

// Add Popular Page Later

function App() {
  return (
    <div>
      <LandingPage />
      <WorldAtAGlancePage />
      <PopularPage />
      <OneCountryPage />
      
    </div>
    )
}

export default App;
