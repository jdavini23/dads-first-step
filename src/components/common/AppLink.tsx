import Link from 'next/link';
import React from 'react';
import type { RouteValue, isValidRoute } from '@/types/routes';

// Type-safe props for our custom Link component
type AppLinkProps = React.ComponentProps<typeof Link> & {
  href: RouteValue;
};

// Type-safe Link component
export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    // Optional validation if needed
    // if (!isValidRoute(href)) {
    //   console.warn(`Invalid route: ${href}`);
    // }

    return (
      <Link {...props} className={className} href={href} ref={ref}>
        {children}
      </Link>
    );
  }
);

AppLink.displayName = 'AppLink';
