import React from 'react'

const Footer = () => {
  return (
    <div className='w-full'>
      <footer className=" bg-base-300 text-base-content text-sm p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All Rights Reserved. Developed by <span></span>
            <a href="https://dagmawi-napoleon.vercel.app/" target='_blank'
              className='text-info hover:text-primary underline-offset-8 hover:underline hover:decoration-dashed transition-all duration-300'>
              Dagmawi Napoleon</a>.
          </p>
        </aside>
      </footer>
    </div>
  )
}

export default Footer