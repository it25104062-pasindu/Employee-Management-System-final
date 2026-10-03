import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

import Login from './pages/Login/Login'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Dashboard from './pages/Dashboard/Dashboard'

import Employees from './pages/Employees/Employees'
import AttendanceLeave from './pages/AttendanceLeave/AttendanceLeave'
import Payroll from './pages/Payroll/Payroll'
import Recruitment from './pages/Recruitment/Recruitment'
import DepartmentsRoles from './pages/DepartmentsRoles/DepartmentsRoles'
import TrainingDevelopment from './pages/TrainingDevelopment/TrainingDevelopment'
import Reports from './pages/Reports/Reports'
import Notifications from './pages/Notifications/Notifications'

import MainLayout from './components/MainLayout'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (username, password) => {

    setLoginError('')

    try {

      const response = await fetch(
        'http://localhost:8080/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      )

      if (response.ok) {

        const userData = await response.json()

        console.log('Login successful:', userData)

        // Store logged-in user
        setCurrentUser(userData)

        // Login successful
        setIsLoggedIn(true)

      } else {

        const errorMessage = await response.text()

        setLoginError(
          errorMessage || 'Invalid username or password'
        )
      }

    } catch (error) {

      console.error('Login error:', error)

      setLoginError(
        'Unable to connect to the server'
      )
    }
  }


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    setIsLoggedIn(false)
    setCurrentUser(null)
    setLoginError('')

  }


  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            LOGIN
        ========================= */}

        <Route
          path="/login"
          element={
            isLoggedIn
              ? <Navigate to="/dashboard" />
              : (
                <Login
                  onLogin={handleLogin}
                  loginError={loginError}
                />
              )
          }
        />


        {/* =========================
            FORGOT PASSWORD
        ========================= */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* =========================
            DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <MainLayout
                onLogout={handleLogout}
                currentUser={currentUser}
              >
                <Dashboard />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* =========================
            EMPLOYEES
        ========================= */}

        <Route
          path="/employees"
          element={
            isLoggedIn ? (
              <MainLayout
                onLogout={handleLogout}
                currentUser={currentUser}
              >
                <Employees />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* =========================
            ATTENDANCE & LEAVE
        ========================= */}

        <Route
          path="/attendance-leave"
          element={
            isLoggedIn ? (
              <MainLayout
                onLogout={handleLogout}
                currentUser={currentUser}
              >
                <AttendanceLeave />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* =========================
            PAYROLL
        ========================= */}

        <Route
          path="/payroll"
          element={
            isLoggedIn ? (
              <MainLayout
                onLogout={handleLogout}
                currentUser={currentUser}
              >
                <Payroll />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* =========================
            RECRUITMENT
        ========================= */}

        <Route
          path="/recruitment"
          element={
            isLoggedIn ? (
              <MainLayout
                onLogout={handleLogout}
                currentUser={currentUser}
              >
                <Recruitment />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* =========================
            DEPARTMENTS & ROLES
        ========================= */}

        <Route
          path="/departments-roles"
          element={
            isLoggedIn ? (
              <MainLayout
                onLogout={handleLogout}
                currentUser={currentUser}
              >
                <DepartmentsRoles />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* =========================
            TRAINING & DEVELOPMENT
        ========================= */}

        <Route
          path="/training-development"
          element={
            isLoggedIn ? (
              <MainLayout
                onLogout={handleLogout}
                currentUser={currentUser}
              >
                <TrainingDevelopment />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* =========================
            REPORTS
        ========================= */}

        <Route
          path="/reports"
          element={
            isLoggedIn ? (
              <MainLayout
                onLogout={handleLogout}
                currentUser={currentUser}
              >
                <Reports />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* =========================
            NOTIFICATIONS
        ========================= */}

        <Route
          path="/notifications"
          element={
            isLoggedIn ? (
              <MainLayout
                onLogout={handleLogout}
                currentUser={currentUser}
              >
                <Notifications />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* =========================
            DEFAULT ROUTES
        ========================= */}

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App