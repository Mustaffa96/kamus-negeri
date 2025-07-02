import React from 'react';
import { FaGithub, FaHeart } from 'react-icons/fa';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left">
              &copy; {year} Kamus Negeri - Malaysian State Dialect Dictionary
            </p>
          </div>
          
          <div className="flex items-center">
            <p className="mr-2">Made with</p>
            <FaHeart className="text-red-500 mx-1" />
            <p className="ml-1">using Next.js, TypeScript, and TailwindCSS</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <a 
              href="https://github.com/Mustaffa96/kamus-negeri" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-gray-300 transition-colors"
            >
              <FaGithub className="mr-2" />
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
