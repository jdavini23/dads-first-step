import React from 'react';
import { UrlObject } from 'url';
import Link, { LinkProps } from 'next/link';
import { Route, Routes, isValidRoute, asHref, ExtendedRouteValue } from '@/types/routes';

type NextUrlObject = {
  pathname: string;
  query?: Record<string, string | number | string[]>;
  hash?: string;
};

/**
 * Props for the TypedLink component
 */
interface TypedLinkProps extends Omit<LinkProps<string>, 'href'> {
  route?: Route;
  href?: ExtendedRouteValue;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  params?: { [key: string]: string };
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
  params,
  ...props
}: TypedLinkProps) => {
  // Validate that either route or href is provided, but not both
  if (route && href) {
    throw new Error(
      'Invalid TypedLink usage: Provide EITHER "route" OR "href", but NOT both. ' +
      'Example usages:\n' +
      '1. Using a predefined route: <TypedLink route="HOME">Home</TypedLink>\n' +
      '2. Using a custom href: <TypedLink href="/custom-path">Custom</TypedLink>'
    );
  }

  // Ensure at least one of route or href is provided
  if (!route && !href) {
    throw new Error(
      'Invalid TypedLink usage: Provide either "route" or "href". ' +
      'Example usages:\n' +
      '1. Using a predefined route: <TypedLink route="HOME">Home</TypedLink>\n' +
      '2. Using a custom href: <TypedLink href="/custom-path">Custom</TypedLink>'
    );
  }

  // Prioritize route, then href, fallback to home route
  const rawHref = 
    (route ? asHref(Routes[route], params) : 
    (href ? asHref(href) : asHref(Routes.HOME)));

  // Convert to Next.js compatible URL object
  const linkHref = typeof rawHref === 'string' ? rawHref : {
    pathname: rawHref.pathname,
    query: rawHref.query,
    hash: rawHref.hash
  } as UrlObject;

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