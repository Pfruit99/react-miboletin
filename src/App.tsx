import React from 'react';

import './App.css';


// importacion de rutas con react dom 6.3
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//pages
import Home from './pages/Home';
import NotFound from './pages/Notfound';
import Login from './pages/Login';
import Notes from './pages/Note_tracking'
import Rol from './pages/Rol';
import Register from './pages/Register';

//pages still in working

import Asignatura from './pages/Asignaturas/Asignatura';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/Home' element={<Home />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='*' element={<NotFound />}/>
        <Route path='/Notes' element={<Notes/>}/>
        <Route path='/Rol' element={<Rol/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Asignatura' element={<Asignatura/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
