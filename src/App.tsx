import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollReveal from 'scrollreveal'
import './App.css'

import Home from './pages/Homes'
import Fisio from './pages/Fisio'
import Patient from './pages/Patient'
import Activities from './pages/Activities'
import Dashboard from './pages/Dashboard'



const App = () => {

  const options = {
    duration: 1500,
    delay: 250,
  }

  useEffect(() => {
    ScrollReveal().reveal('.reveal', options)
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fisio" element={<Fisio />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
