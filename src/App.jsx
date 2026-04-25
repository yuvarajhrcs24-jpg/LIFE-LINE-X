import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import MapView from './pages/MapView';
import Resources from './pages/Resources';
import Volunteers from './pages/Volunteers';
import Requests from './pages/Requests';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Preparedness from './pages/Preparedness';
import Settings from './pages/Settings';
import History from './pages/History';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthProvider } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import { OfflineProvider } from './contexts/OfflineContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SimulationProvider } from './contexts/SimulationContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SimulationProvider>
          <LocationProvider>
            <OfflineProvider>
              <LanguageProvider>
                <BrowserRouter>
                  <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-center"><span className="text-4xl animate-pulse">🆘</span><p className="text-gray-500 mt-2">Loading LIFE-LINE-X...</p></div></div>}>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/map" element={<MapView />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/volunteers" element={<Volunteers />} />
                        <Route path="/requests" element={<Requests />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/preparedness" element={<Preparedness />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/history" element={<History />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Route>
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </LanguageProvider>
            </OfflineProvider>
          </LocationProvider>
        </SimulationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
