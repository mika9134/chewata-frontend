import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

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
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()
  const { theme } = useThemeStore();

  console.log({ onlineUsers })

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser })

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-orange-400 size-10" />
      </div>
    )
  }

  const isAuthPage = () => {
    const location = useLocation();
    return location.pathname === '/login' || location.pathname === '/signup';
  };

  return (
    <div data-theme={theme} className={`bg-base-100 relative ${window.location.pathname.includes("/login") || window.location.pathname.includes("/signup") ? "overflow-hidden h-screen" : ""}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
      </Routes>

      {isAuthPage() ? (
        <div className={`absolute bottom-0 left-0 w-full h-16 bg-base-200 flex items-center justify-center ${window.location.pathname.includes("/login") || window.location.pathname.includes("/signup") ? "block" : "hidden"}`}>
          <Footer />
        </div>
      ) : (
        <div className={`relative ${window.location.pathname.includes("/login") || window.location.pathname.includes("/signup") ? "hidden" : "block"}}`}>
          <Footer />
        </div>
      )}

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App