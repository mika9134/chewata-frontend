import React, { useState } from 'react'
import LogoSrc from '../assets/logo/Chewata.svg?react'
import { Settings } from 'lucide-react'
import { CircleUserRound as Profile } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { X } from 'lucide-react'
import { Menu } from 'lucide-react'

import { useAuthStore } from '../store/useAuthStore.js'
import { Navigate } from 'react-router-dom'

export default function Navbar() {
  const { logout, authUser } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    Navigate("/login");
    setIsMobileMenuOpen(false);
  }

  return (
    <div className='navbar top-0 left-0 w-full h-16 sticky flex items-center justify-between px-4 transition-all duration-300 z-50 shadow-lg bg-base-300'>
      <a href='/' className='navbar__logo flex justify-center items-center gap-3'>
        <LogoSrc className="fill-current stroke-4 stroke-current h-10" />
        Chewata
      </a>
      <div className='navbar__links gap-x-8 flex items-center max-md:hidden'>
        <a href='/settings' className='flex justify-center items-center gap-2'><Settings className='size-5' />Settings</a>
        {authUser && (
          <>
            <a href='/profile' className='flex justify-center items-center gap-2'><Profile className='size-5' />Profile</a>
            <a onClick={() => handleLogout()} className='cursor-pointer flex justify-center items-center gap-2'><LogOut className='size-5' />Logout</a>
          </>
        )}
      </div>
      <button
        className='navbar__hamburger max-lg:block hidden cursor-pointer'
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu />
      </button>

      {isMobileMenuOpen && (
        <div
          className={`navbar__mobile-menu absolute top-0 right-0 w-1/2 max-md:w-2/3 h-screen flex flex-col gap-6 p-4 px-8 shadow-lg bg-primary text-primary-content transition-transform duration-300 transform ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button className='absolute top-2 left-8 mt-2 cursor-pointer' onClick={() => setIsMobileMenuOpen(false)}>
            <X />
          </button>
          <a href='/settings' className='flex justify-left items-center gap-4 mt-14'>
            <Settings className='size-5' />
            Settings
          </a>
          {authUser && (
            <>
              <a href='/profile' className='flex justify-left items-center gap-4'><Profile className='size-5' />Profile</a>
              <a onClick={() => handleLogout()} className='flex justify-left gap-4 absolute bottom-6 cursor-pointer'><LogOut className='size-5' />Logout</a>
            </>
          )}
        </div>
      )}
    </div>
  );
}