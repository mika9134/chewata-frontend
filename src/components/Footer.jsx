import React from 'react'

const Footer = () => {
  return (
    <div className='w-full'>
      <footer className=" bg-base-300 text-base-content text-sm p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All Rights Reserved. Developed by Dagmawi Napoleon.</p>
        </aside>
      </footer>
    </div>
  )
}

export default Footer