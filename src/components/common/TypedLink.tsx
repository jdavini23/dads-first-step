import React from 'react';
import Link, { LinkProps } from 'next/link';
import { Route, Routes, isValidRoute, asHref, ExtendedRouteValue } from '@/types/routes';

/**
 * Props for the TypedLink component
 */
interface TypedLinkProps extends Omit<LinkProps, 'href'> {
  route?: Route;
  href?: ExtendedRouteValue;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

/**
 * Type-safe link component that ensures only valid routes are used
 */
export const TypedLink = ({
  route, 
  href,
  children, 
  className,
  target = '_self',
  ...props
}: TypedLinkProps) => {
  // Validate that only one of route or href is provided
  if (route && href) {
    console.warn('Both route and href provided. Prioritizing route.');
  }

  // Prioritize route, then href, fallback to home route
  const linkHref = 
    (route ? asHref(Routes[route]) : 
    (href ? asHref(href) : asHref(Routes.HOME)));

  return (
    <Link 
      href={linkHref} 
      className={className}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
};
