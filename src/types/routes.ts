import React from 'react';
import { UrlObject } from 'url';
import type { LinkProps } from 'next/link';

/**
 * Centralized route management for the application
 * Provides type-safe routing with a single source of truth
 */
export const Routes = {
  HOME: '/',
  ABOUT: '/about',
  FEATURES: '/features',
  RESOURCES: '/resources',
  MILESTONES: '/milestones',
  MILESTONES_ADD: '/milestones/add',
  TESTIMONIALS: '/testimonials',
  CONTACT: '/contact',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  AUTH: '/auth',
} as const;

/**
 * Type representing valid route keys
 */
export type Route = keyof typeof Routes;

/**
 * Type representing route values
 */
export type RouteValue = (typeof Routes)[Route];

/**
 * Get the path for a given route
 * @param route - The route key
 * @returns The corresponding route path
 */
export function getRoutePath(route: Route): RouteValue {
  return Routes[route];
}

// Extend RouteValue to include Next.js routing types
export type ExtendedRouteValue =
  | RouteValue
  | { 
      pathname: RouteValue; 
      query?: Record<string, string | number | string[]>; 
      hash?: string 
    }
  | { 
      href: RouteValue; 
      query?: Record<string, string | number | string[]>; 
      hash?: string 
    };

// Type for route parameters if needed
export interface RouteParams {
  [key: string]: string | number;
}

// Helper function to create type-safe routes with optional params
export function createRoute(route: ExtendedRouteValue, params?: RouteParams): RouteValue {
  // Ensure route is a string before manipulation
  const routeStr =
    typeof route === 'string'
      ? route
      : typeof route === 'object' && 'pathname' in route
        ? route.pathname
        : typeof route === 'object' && 'href' in route
          ? route.href
          : '';

  let path = routeStr as RouteValue;
  Object.entries(params || {}).forEach(([key, value]) => {
    path = path.replace(`:${key}`, String(value)) as RouteValue;
  });
  return path;
}

// Type guard to check if a route is valid
export function isValidRoute(route: string): route is Route {
  return Object.values(Routes).includes(route as RouteValue);
}

// Utility to convert a route to a valid href
export function asHref(
  route: ExtendedRouteValue, 
  params?: { [key: string]: string | number }
): string | { 
  pathname: string; 
  query?: Record<string, string | number | string[]>; 
  hash?: string 
} {
  // If it's already a string, return it
  if (typeof route === 'string') return route;
  
  // If it's an object with pathname, return the object
  if ('pathname' in route) return {
    pathname: route.pathname,
    query: params || route.query,
    hash: route.hash
  };
  
  // If it's an object with href, return the object
  if ('href' in route) return {
    pathname: route.href,
    query: params || route.query,
    hash: route.hash
  };
  
  // Fallback to home route
  return Routes.HOME;
}
