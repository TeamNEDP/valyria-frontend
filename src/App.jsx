import { useState } from 'react'
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { CssBaseline } from "@mui/material";
import SiteAppBar from './component/AppBar';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home'
import Battle from './pages/Battle'
import Contest from './pages/Contest'
import Login from './pages/Login'
import History from './pages/History'
import Rank from './pages/Rank'
import { Container } from '@mui/system';

function App() {
  return (
    <RecoilRoot>
      <>
        <CssBaseline />
        <HashRouter>
          <SiteAppBar />
          <Container className="main-container" disableGutters>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/battle' element={<Battle />} />
              <Route path='/contest' element={<Contest />} />
              <Route path='/login' element={<Login />} />
              <Route path='/history' element={<History />} />
              <Route path='/rank' element={<Rank />} />
            </Routes>
          </Container>
        </HashRouter>
      </>
    </RecoilRoot>
  );
}
export default App