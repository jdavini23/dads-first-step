import { LinkProps } from 'next/link';
import type { Route } from 'next/types';
import type { UrlObject } from 'url';

export const Routes = {
  home: '/' as Route,
  about: '/about' as Route,
  features: '/features' as Route,
  resources: '/resources' as Route,
  milestones: '/milestones' as Route,
  testimonials: '/testimonials' as Route,
  contact: '/contact' as Route,
  signUp: '/sign-up' as Route,
  milestonesAdd: '/milestones/add' as Route,
  profile: '/profile' as Route,
  auth: '/auth' as Route,
} as const;

export type RouteKey = keyof typeof Routes;
export type RouteValue = typeof Routes[RouteKey];

// Type alias for route strings
export type RouteString = RouteValue;

// Type for Next.js Link href prop
export type LinkRoute = 
  | Route 
  | UrlObject 
  | { 
      pathname: string; 
      query?: { [key: string]: string | number | string[] | undefined };
      hash?: string;
    };

export function createRoute(route: RouteValue): Route {
  return route;
}

export function createHref(path: string): string {
  return path;
}

export function asRoute(route: string | ((id: string) => string)): string {
  return typeof route === 'function' ? route('') : route;
}

export function asHref(route: string): string {
  return route;
}

// Helper function to convert Routes to Link-compatible href
export function toLinkHref(route: RouteValue): LinkRoute {
  return { pathname: route };
}