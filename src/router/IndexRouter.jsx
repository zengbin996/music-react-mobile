import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../views/home/Home';
import Play from '../views/play/Play';

export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}
