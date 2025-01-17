import React from 'react';
import Link, { LinkProps } from 'next/link';
import { Route, Routes } from '@/types/routes';

/**
 * Props for the TypedLink component
 */
type TypedLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  route?: Route;
  href?: string;
};

/**
 * Type-safe link component that ensures only valid routes are used
 */
export function TypedLink({ 
  route, 
  href, 
  children, 
  ...props 
}: TypedLinkProps) {
  // Determine the final href
  const linkHref = route 
    ? Routes[route] 
    : href ?? Routes.HOME;

  return (
    <Link 
      href={linkHref as LinkProps<string>['href']} 
      {...props}
    >
      {children}
    </Link>
  );
}