import React from 'react'

const Footer = () => {
  return (
    <div className='w-full'>
      <footer className="footer footer-horizontal footer-center bg-base-300 text-base-content rounded p-6">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All Rights Reserved. Developed by Dagmawi Napoleon.</p>
        </aside>
      </footer>
    </div>
  )
}

export default Footer