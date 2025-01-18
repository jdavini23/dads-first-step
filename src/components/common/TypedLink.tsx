import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { Route, Routes, RouteValue, ExtendedRouteValue, TypedLinkRoute } from '@/types/routes';
import { UrlObject } from 'url';

/**
 * Props for the TypedLink component
 */
type TypedLinkProps = 
  Omit<React.ComponentProps<typeof Link>, 'href'> & {
    route?: Route;
    href?: RouteValue | ExtendedRouteValue;
    children: React.ReactNode;
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
    ? (Routes[route])
    : href;

  // Ensure we always have a valid href
  const safeHref = linkHref ?? Routes.HOME;

  // Convert to Next.js Link compatible href
  const finalHref = typeof safeHref === 'string' 
    ? { pathname: safeHref } 
    : safeHref;

  return (
    <Link 
      href={finalHref} 
      {...props}
    >
      {children}
    </Link>
  );
}
