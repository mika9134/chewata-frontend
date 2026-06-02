import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-surface-secondary text-text-secondary text-xs lg:text-sm py-3 lg:py-4 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-center">
          <span className="text-text-tertiary">Copyright © {new Date().getFullYear()} Chewata. </span>
          <span className="text-text-tertiary">Developed by </span>
          <a
            href="https://dagmawi.et/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline hover:text-primary transition-all duration-200 font-medium"
          >
            Dagmawi Napoleon
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;