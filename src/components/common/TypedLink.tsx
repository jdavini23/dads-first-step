import React from 'react';
import Link from 'next/link';
import { Route, Routes, isValidRoute } from '@/types/routes';

/**
 * Props for the TypedLink component
 */
type TypedLinkProps = {
  route?: Route;
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
};

/**
 * Type-safe link component that ensures only valid routes are used
 */
export const TypedLink: React.FC<TypedLinkProps> = ({
  route, 
  href,
  children, 
  className,
  target = '_self'
}) => {
  // Prioritize route, then href, fallback to home route
  const linkHref = 
    (route && Routes[route]) || 
    (href && isValidRoute(href) ? href : Routes.HOME);

  return (
    <Link 
      href={linkHref} 
      className={className}
      target={target}
    >
      {children}
    </Link>
  );
};
