'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Routes } from '@/types/routes';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const NavLinks = [
  { label: 'Home', href: Routes.home },
  { label: 'About', href: Routes.about },
  { label: 'Features', href: Routes.features },
  { label: 'Resources', href: Routes.resources },
  { label: 'Testimonials', href: Routes.testimonials },
  { label: 'Contact', href: Routes.contact },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href={Routes.home} className="flex items-center space-x-2">
          <Image 
            src="/logo.svg" 
            alt="Dad's First Step Logo" 
            width={40} 
            height={40} 
            className="h-10 w-10"
          />
          <span className="text-xl font-bold text-primary-700">Dad's First Step</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {NavLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-neutral-700 hover:text-primary-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search and CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Icon */}
          <button 
            onClick={toggleSearch} 
            className="text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <FaSearch className="h-5 w-5" />
          </button>

          {/* Sign Up Button */}
          <Button 
            variant="primary" 
            href={Routes.signUp}
            className="px-4 py-2 rounded-full"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleSearch} 
            className="text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <FaSearch className="h-5 w-5" />
          </button>
          <button 
            onClick={toggleMenu} 
            className="text-neutral-600 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white/95 z-40 pt-20 px-6">
          <div className="flex flex-col space-y-6">
            {NavLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={toggleMenu}
                className="text-2xl text-neutral-800 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button 
              variant="primary" 
              href={Routes.signUp}
              className="w-full py-3 text-lg rounded-full mt-4"
              onClick={toggleMenu}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white/95 z-50 p-6">
          <div className="container mx-auto">
            <div className="flex items-center border-b-2 border-primary-500 pb-2">
              <FaSearch className="h-5 w-5 text-neutral-600 mr-3" />
              <input 
                type="text" 
                placeholder="Search Dad's First Step..." 
                className="w-full text-xl bg-transparent outline-none"
              />
              <button 
                onClick={toggleSearch} 
                className="text-neutral-600 hover:text-primary-600 transition-colors"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
