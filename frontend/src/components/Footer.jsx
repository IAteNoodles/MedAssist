import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <a href="/" aria-current="page" className="inline-block">
              <img loading="lazy" src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6746de5b1392b2c3ecb2c7ad_logo-large.svg" alt="Healix Logo" className="h-8" />
            </a>
          </div>
          <div className="w-full md:w-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex flex-col space-y-2">
                <a href="/about-us" className="hover:text-gray-300">About</a>
                <a href="/blog" className="hover:text-gray-300">Blogs</a>
              </div>
              <div className="flex flex-col space-y-2">
                <a href="/contact" className="hover:text-gray-300">Contact Us</a>
                <a href="/license" className="hover:text-gray-300">License</a>
              </div>
              <div className="flex flex-col space-y-2">
                <a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a>
                <a href="/terms" className="hover:text-gray-300">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-wrap justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">Copyright © 2024 Healix. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6746e1f9828217d5124d163c_twitter.svg" loading="lazy" alt="Twitter" className="h-6 w-6" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6746e1f9b7223f2b93b0b888_facebook.svg" loading="lazy" alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6746e1f92e3bc56134e6bde0_linkedin.svg" loading="lazy" alt="LinkedIn" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
