import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Kitchen from './components/pages/Kitchen';
import RecipeDetail from './components/pages/RecipeDetail';
import Dashboard from './components/dashboard/Dashboard';
import Assessment from './components/assessment/Assessment';
import Results from './components/assessment/Results';
import Profile from './components/user/Profile';
import Reminders from './components/pages/Reminders';
import YogaSection from './components/pages/YogaSection';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminAssessments from './components/admin/AdminAssessments';
import NotFound from './components/pages/NotFound';

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  const { darkMode } = useTheme();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.add('gradient-bg-dark');
      document.body.classList.remove('gradient-bg-light');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.remove('gradient-bg-dark');
      document.body.classList.add('gradient-bg-light');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/kitchen/recipe/:id" element={<RecipeDetail />} />
            <Route path="/yoga" element={<YogaSection />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/assessment"
              element={
                <PrivateRoute>
                  <Assessment />
                </PrivateRoute>
              }
            />
            <Route
              path="/results/:id"
              element={
                <PrivateRoute>
                  <Results />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/reminders"
              element={
                <PrivateRoute>
                  <Reminders />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRole="admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute requiredRole="admin">
                  <AdminUsers />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/assessments"
              element={
                <PrivateRoute requiredRole="admin">
                  <AdminAssessments />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;