import React from 'react'
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import Login from './pages/login.jsx'
import NoteList from './containers/NoteList.jsx'


export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/notes" element={<NoteList/> } />
      </Routes>
    </BrowserRouter>
  );
}