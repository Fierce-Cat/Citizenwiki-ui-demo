import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LocationPage } from './pages/LocationPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { FactionsPage } from './pages/FactionsPage';
import { FacilityPage } from './pages/FacilityPage';
import { StarMapPage } from './pages/StarMapPage';
import { UIProvider } from './contexts/UIContext';

export default function App() {
  return (
    <UIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/starmap" element={<StarMapPage />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/location/area18" replace />} />
            <Route path="location/:id" element={<LocationPage />} />
            <Route path="factions" element={<FactionsPage />} />
            <Route path="facilities/:id" element={<FacilityPage />} />
            <Route path="design-system" element={<DesignSystemPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UIProvider>
  );
}


