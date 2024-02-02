//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import { Routes, Route } from "react-router-dom"
import HomePage from './components/HomePage'
import HelpPage from './components/HelpPage'
import NavPanel from './components/NavPanel'
import CurrentPageContextProvider from './context/CurrentPageContextProvider'
import AuthorPage from "./components/AuthorPage"
import Footer from "./components/Footer"

function App() {
  return (
    <CurrentPageContextProvider>
      <NavPanel />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/help' element={<HelpPage />} />
        <Route path='/author' element={<AuthorPage />} />
      </Routes>
      <Footer />
    </CurrentPageContextProvider>
  )
}

export default App
