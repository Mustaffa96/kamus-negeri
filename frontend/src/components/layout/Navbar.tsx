import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBook, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                Kamus Negeri
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                href="/"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/') ? 'bg-primary-dark' : 'hover:bg-primary-dark'
                }`}
              >
                Halaman Utama
              </Link>
              <Link
                href="/kamus"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/kamus') ? 'bg-primary-dark' : 'hover:bg-primary-dark'
                }`}
              >
                <FaBook className="mr-1" />
                Kamus
              </Link>
              <Link
                href="/negeri"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/negeri') ? 'bg-primary-dark' : 'hover:bg-primary-dark'
                }`}
              >
                <FaMapMarkerAlt className="mr-1" />
                Negeri
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-dark focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') ? 'bg-primary-dark' : 'hover:bg-primary-dark'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Halaman Utama
          </Link>
          <Link
            href="/kamus"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/kamus') ? 'bg-primary-dark' : 'hover:bg-primary-dark'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center">
              <FaBook className="mr-2" />
              Kamus
            </span>
          </Link>
          <Link
            href="/negeri"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/negeri') ? 'bg-primary-dark' : 'hover:bg-primary-dark'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Negeri
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
