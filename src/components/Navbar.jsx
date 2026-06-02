import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSrc from "../assets/logo/Chewata.svg?react";
import { Settings, CircleUserRound as Profile, LogOut, Menu, X } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore.js";
import Button from "./ui/Button";
import { useThemeStore } from "../store/useThemeStore";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-surface-primary border-b border-border flex items-center justify-between px-4 lg:px-6 z-50 shadow-sm">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <LogoSrc className="fill-current h-8 w-8" />
          <span className="font-bold text-xl hidden sm:inline text-text-primary">
            Chewata
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-1 max-lg:hidden">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="text-text-secondary hover:text-text-primary"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Settings Link */}
          <Link to="/settings">
            <Button variant="ghost" size="md" className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </Link>

          {/* Profile Link */}
          {authUser && (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="md" className="flex items-center gap-2">
                  <Profile className="h-5 w-5" />
                  Profile
                </Button>
              </Link>

              {/* Logout Button */}
              <Button
                variant="ghost"
                size="md"
                onClick={handleLogout}
                className="flex items-center gap-2 text-error hover:bg-error-light"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 max-w-[80vw] bg-surface-primary border-l border-border shadow-xl z-50 transform transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <span className="font-semibold text-text-primary">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2 p-4">
          <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>
            <Button
              variant="ghost"
              size="md"
              className="w-full justify-start gap-3 text-base"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </Link>

          {authUser && (
            <>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full justify-start gap-3 text-base"
                >
                  <Profile className="h-5 w-5" />
                  Profile
                </Button>
              </Link>

              <div className="border-t border-border my-2"></div>

              <Button
                variant="ghost"
                size="md"
                onClick={handleLogout}
                className="w-full justify-start gap-3 text-base text-error hover:bg-error-light"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Navbar Spacer */}
      <div className="h-16" />
    </>
  );
}