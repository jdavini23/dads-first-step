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
    href: Routes.HOME,
    dropdown: false,
  },
  {
    label: 'Features',
    href: Routes.FEATURES,
    dropdown: true,
    children: [
      { label: 'Milestone Tracking', href: Routes.MILESTONES },
      { label: 'Resources', href: Routes.RESOURCES },
    ],
  },
  {
    label: 'Community',
    href: Routes.ABOUT,
    dropdown: true,
    children: [
      { label: 'Testimonials', href: Routes.TESTIMONIALS },
      { label: 'About', href: Routes.ABOUT },
      { label: 'Contact', href: Routes.CONTACT },
    ],
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { pathname } = useNavigation();
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    console.log('Current Pathname:', pathname);
    console.log('Nav Links:', navLinks);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const renderDropdownLinks = (links: { label: string; href: string }[]) => (
    <div className="absolute top-full left-0 min-w-[200px] bg-white shadow-lg rounded-lg border border-neutral-100 py-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
      {links.map((child, index) => (
        isValidRoute(child.href) && (
          <TypedLink
            key={`${child.href}-${index}`}
            href={child.href}
            className="block px-4 py-2 hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 transition-colors"
          >
            {child.label}
          </TypedLink>
        )
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
        <TypedLink href={Routes.HOME} className="flex items-center space-x-2 group">
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
            <div key={link.label} className="relative group">
              <TypedLink
                href={link.href}
                className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
              >
                {link.label}
                {link.dropdown && (
                  <HiOutlineChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                )}
              </TypedLink>
              {link.dropdown && link.children && renderDropdownLinks(link.children)}
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
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-white/95 z-40 pt-20 px-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-neutral-200 pb-2">
                  <div
                    onClick={() => link.dropdown && toggleDropdown(link.label)}
                    className="flex items-center justify-between text-2xl text-neutral-800 hover:text-primary-600 transition-colors cursor-pointer"
                  >
                    <TypedLink href={link.href}>{link.label}</TypedLink>
                    {link.dropdown && (
                      <HiOutlineChevronDown
                        className={`h-6 w-6 transition-transform ${
                          activeDropdown === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>
                  {link.dropdown && activeDropdown === link.label && link.children && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-2"
                    >
                      {link.children.map((child, childIndex) => (
                        isValidRoute(child.href) && (
                          <TypedLink
                            key={`mobile-${child.href}-${childIndex}`}
                            href={child.href}
                            className="block text-lg text-neutral-700 hover:text-primary-600 transition-colors"
                          >
                            {child.label}
                          </TypedLink>
                        )
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <SignInButton>
                <Button
                  variant="default"
                  className="w-full py-3 text-lg rounded-full mt-4 hover:scale-105 transition-transform"
                >
                  Get Started
                </Button>
              </SignInButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/95 z-50 p-6"
          >
            <div className="container mx-auto max-w-2xl">
              <div className="flex items-center border-b-2 border-primary-500 pb-2">
                <HiOutlineSearch className="h-6 w-6 text-neutral-600 mr-3" />
                <input
                  type="text"
                  placeholder="Search Dad's First Step..."
                  className="w-full text-xl bg-transparent outline-none"
                />
                <button
                  onClick={toggleSearch}
                  className="text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  <HiOutlineX className="h-6 w-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
