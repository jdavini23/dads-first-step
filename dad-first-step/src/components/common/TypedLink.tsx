import React from 'react';
import Link, { LinkProps } from 'next/link';
import { Route, Routes, RouteValue, ExtendedRouteValue } from '@/types/routes';
import { UrlObject } from 'url';

/**
 * Props for the TypedLink component
 */
type TypedLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  route?: Route;
  href?: RouteValue | ExtendedRouteValue;
};

/**
 * Type-safe link component that ensures only valid routes are used
 */
export function TypedLink({ 
  route, 
  href, 
  children, 
  ...props 
}: TypedLinkProps): React.ReactElement {
  // Determine the final href
  const linkHref = route 
    ? Routes[route] 
    : (href ?? Routes.HOME);

  return (
    <Link 
      href={typeof linkHref === 'string' 
        ? { pathname: linkHref } 
        : linkHref} 
      {...props}
    >
      {children}
    </Link>
  );
}
