import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import RegionDetail from './pages/RegionDetail';
import QuestDetail from './pages/QuestDetail';
import Profile from './pages/Profile';
import Archive from './pages/Archive';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="region/:regionId" element={<RegionDetail />} />
              <Route path="quest/:questId" element={<QuestDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="archive" element={<Archive />} />
              <Route path="map" element={<div className="p-8 text-center text-slate-400 font-bold">Coming Soon: Interactive Map</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </LanguageProvider>
  );
};

export default App;
