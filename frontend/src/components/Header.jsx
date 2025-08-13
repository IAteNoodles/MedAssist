import React from 'react';

const Header = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <a href="/" aria-current="page" className="mr-6">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6746d4199bb662466d5e5744_logo.svg" loading="lazy" alt="" className="h-8" />
            </a>
            <nav className="hidden md:flex">
              <ul className="flex items-center space-x-6">
                <li className="relative group">
                  <button className="flex items-center text-gray-600 hover:text-gray-900">
                    <span>All Pages</span>
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </button>
                  <div className="absolute z-10 hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-2 w-64">
                    {/* Dropdown content here */}
                  </div>
                </li>
                <li><a href="/features" className="text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                <li><a href="/testimonials" className="text-gray-600 hover:text-gray-900">Reviews</a></li>
              </ul>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="/sign-in" className="text-gray-600 hover:text-gray-900">Login</a>
            <a href="/appointment" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Get Started For Free
            </a>
          </div>
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
