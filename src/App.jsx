import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'
import { Toaster } from 'react-hot-toast'

import { Loader } from 'lucide-react'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  // Apply theme on mount and toggle dark class for Tailwind
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.setAttribute("data-theme", "dark");
      htmlElement.classList.add("dark");
    } else {
      htmlElement.removeAttribute("data-theme");
      htmlElement.classList.remove("dark");
    }
  }, [theme]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-surface-primary">
        <Loader className="animate-spin text-primary size-10" />
      </div>
    )
  }

  const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/signup';

  return (
    <div data-theme={theme} className={`h-screen bg-surface-primary text-text-primary flex flex-col ${isAuthPage ? "h-screen overflow-hidden" : ""}`}>
      <Navbar />
      
      <main className="flex-1 overflow-y-hidden">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App