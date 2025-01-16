import Link from 'next/link';
import type { LinkProps } from 'next/link';
import React from 'react';
import type { RouteValue } from '@/types/routes';

// Type-safe props for our custom Link component
interface AppLinkProps extends Omit<LinkProps, 'href'> {
  href: RouteValue;
  children: React.ReactNode;
  className?: string;
}

// Type-safe Link component
export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <Link {...props} className={className} href={href} ref={ref}>
        {children}
      </Link>
    );
  }
);

AppLink.displayName = 'AppLink';
