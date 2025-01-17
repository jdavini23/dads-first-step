'use client';

import { Routes, Route, isValidRoute } from '@/types/routes';
import { TypedLink } from '@/components/common/TypedLink';
import { useNavigation } from '@/utils/navigation';
import { useState, useEffect, useRef } from 'react';
import asHref from '@/utils/asHref';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { HiOutlineSearch, HiOutlineMenu, HiOutlineX, HiOutlineChevronDown } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInButton } from '@/components/auth/SignInButton';

const navLinks = [
  {
    label: 'Home',
    route: 'HOME' as Route,
    dropdown: false,
  },
  {
    label: 'Features',
    route: 'FEATURES' as Route,
    dropdown: true,
    children: [
      { label: 'Milestone Tracking', route: 'MILESTONES' as Route },
      { label: 'Resources', route: 'RESOURCES' as Route },
    ],
  },
  {
    label: 'Community',
    route: 'ABOUT' as Route,
    dropdown: true,
    children: [
      { label: 'Testimonials', route: 'TESTIMONIALS' as Route },
      { label: 'About', route: 'ABOUT' as Route },
      { label: 'Contact', route: 'CONTACT' as Route },
    ],
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null);
  const { pathname } = useNavigation();
  const navRef = useRef<HTMLDivElement>(null);

  // Debugging log
  useEffect(() => {
    console.log('Mobile Menu State:', {
      isMenuOpen,
      activeDropdown,
      pathname
    });
  }, [isMenuOpen, activeDropdown, pathname]);

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the nav and hamburger menu
      if (
        navRef.current && 
        !navRef.current.contains(event.target as Node) && 
        isMenuOpen
      ) {
        // Close menu and reset dropdowns
        setIsMenuOpen(false);
        setActiveDropdown(null);
        setHoverDropdown(null);
      }
    };

    // Only add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMenuOpen, navRef]);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
    setHoverDropdown(null);
  }, [pathname]);

  const toggleMenu = () => {
    console.log('Toggle Menu Clicked', !isMenuOpen);
    setIsMenuOpen(prev => !prev);
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const renderDropdownLinks = (links: { label: string; route: Route }[], parentLabel: string) => (
    <div
      className={`absolute top-full left-0 min-w-[200px] bg-white shadow-lg rounded-lg border border-neutral-100 py-2 z-50 transition-all duration-200 ease-in-out ${
        hoverDropdown === parentLabel
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      {links.map((child, index) => (
        <TypedLink
          key={`${child.route}-${index}`}
          route={child.route}
          className="block px-4 py-2 hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 transition-colors"
        >
          {child.label}
        </TypedLink>
      ))}
    </div>
  );

  const renderMobileDropdownLinks = (links: { label: string; route: Route }[], parentLabel: string) => (
    <div className="pl-4 mt-2">
      {links.map((child, index) => (
        <TypedLink
          key={`${child.route}-${index}`}
          route={child.route}
          className="block py-2 text-neutral-700 hover:text-primary-600 transition-colors"
          onClick={() => {
            setIsMenuOpen(false);
            setActiveDropdown(null);
          }}
        >
          {child.label}
        </TypedLink>
      ))}
    </div>
  );

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <TypedLink route="HOME" className="flex items-center space-x-2 group">
          <Image
            src="/logo.svg"
            alt="Dad's First Step Logo"
            width={40}
            height={40}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="text-xl font-bold text-primary-700 group-hover:text-primary-600 transition-colors">
            Dad's First Step
          </span>
        </TypedLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setHoverDropdown(link.label)}
              onMouseLeave={() => setHoverDropdown(null)}
            >
              <div className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors cursor-pointer py-3">
                <TypedLink route={link.route} className="flex items-center">
                  {link.label}
                </TypedLink>
                {link.dropdown && (
                  <HiOutlineChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      hoverDropdown === link.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </div>
              {link.dropdown && link.children && renderDropdownLinks(link.children, link.label)}
            </div>
          ))}
        </div>

        {/* Search and CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Icon */}
          <button
            onClick={toggleSearch}
            className="text-neutral-600 hover:text-primary-600 transition-colors group"
          >
            <HiOutlineSearch className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Sign Up Button */}
          <SignInButton>
            <Button
              variant="default"
              className="px-4 py-2 rounded-full hover:scale-105 transition-transform"
            >
              Get Started
            </Button>
          </SignInButton>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleSearch}
            className="text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <HiOutlineSearch className="h-6 w-6" />
          </button>
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            className="text-neutral-600 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? (
              <HiOutlineX className="h-6 w-6" />
            ) : (
              <HiOutlineMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/20 z-[9998]"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, type: 'tween' }}
              className="md:hidden fixed top-[72px] right-0 w-screen max-w-[300px] bg-white z-[9999] shadow-lg"
            >
              <div className="flex flex-col max-h-[calc(100vh-72px)] overflow-y-auto">
                <div className="px-6 py-4 space-y-4 flex-grow">
                  {navLinks.map((link) => (
                    <div key={link.label} className="border-b border-neutral-100 pb-4">
                      <div 
                        className="flex items-center justify-between text-neutral-800 font-semibold cursor-pointer"
                        onClick={() => {
                          if (!link.dropdown) {
                            setIsMenuOpen(false);
                          } else {
                            toggleDropdown(link.label);
                          }
                        }}
                      >
                        <TypedLink 
                          route={link.route} 
                          className="flex-grow hover:text-primary-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </TypedLink>
                        {link.dropdown && (
                          <HiOutlineChevronDown
                            className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                              activeDropdown === link.label ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </div>
                      
                      {link.dropdown && link.children && activeDropdown === link.label && (
                        <div className="pl-4 mt-2 space-y-2">
                          {link.children.map((child) => (
                            <TypedLink 
                              key={child.route} 
                              route={child.route} 
                              className="block py-2 text-neutral-600 hover:text-primary-600 transition-colors"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              {child.label}
                            </TypedLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="px-6 py-4 border-t border-neutral-100 bg-white">
                  <SignInButton>
                    <Button
                      variant="default"
                      className="w-full py-2.5 rounded-full"
                    >
                      Get Started
                    </Button>
                  </SignInButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
