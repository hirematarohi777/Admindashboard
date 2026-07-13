import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';


// Layout
import PageLayout from './layouts/PageLayout';

// Auth guard
import RequireAuth from './components/auth/RequireAuth';

// Pages

import Dashboard from './pages/dashboard/Dashboard';
import Hospitals from './pages/hospitals/Hospitals';
import MedicalOfficers from './pages/medical-officers/MedicalOfficers';
import Drivers from './pages/drivers/Drivers';
import Ambulances from './pages/ambulances/Ambulances';
import TrafficCenters from './pages/traffic-centers/TrafficCenters';
import LiveMonitoring from './pages/live-monitoring/LiveMonitoring';
import EmergencyMonitoring from './pages/emergency-monitoring/EmergencyMonitoring';
import TripMonitoring from './pages/trip-monitoring/TripMonitoring';

import Notifications from './pages/notifications/Notifications';
import Analytics from './pages/analytics/Analytics';
import AuditLog from './pages/audit-log/AuditLog';
import Settings from './pages/settings/Settings';
import Profile from './pages/profile/Profile';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <DataProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Standalone Routes (no sidebar/navbar) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Nested Routes inside Master Layout */}
                <Route path="/" element={<PageLayout />}>
                  <Route index element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  } />

                
                  {/* User Directories */}
                  <Route
                    path="hospitals"
                    element={
                      <RequireAuth>
                        <Hospitals />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="medical-officers"
                    element={
                      <RequireAuth>
                        <MedicalOfficers />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="drivers"
                    element={
                      <RequireAuth>
                        <Drivers />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="ambulances"
                    element={
                      <RequireAuth>
                        <Ambulances />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="traffic-centers"
                    element={
                      <RequireAuth>
                        <TrafficCenters />
                      </RequireAuth>
                    }
                  />


                  {/* Surveillance & Monitoring */}
                  <Route
                    path="live-monitoring"
                    element={
                      <RequireAuth>
                        <LiveMonitoring />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="emergency-monitoring"
                    element={
                      <RequireAuth>
                        <EmergencyMonitoring />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="trip-monitoring"
                    element={
                      <RequireAuth>
                        <TripMonitoring />
                      </RequireAuth>
                    }
                  />


                  {/* Operations & Configurations */}
                  <Route
                    path="notifications"
                    element={
                      <RequireAuth>
                        <Notifications />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="analytics"
                    element={
                      <RequireAuth>
                        <Analytics />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="audit-log"
                    element={
                      <RequireAuth>
                        <AuditLog />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="settings"
                    element={
                      <RequireAuth>
                        <Settings />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="profile"
                    element={
                      <RequireAuth>
                        <Profile />
                      </RequireAuth>
                    }
                  />
                 </Route>
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </DataProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}


export default App;
