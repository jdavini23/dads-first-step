import * as React from 'react';
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
  MILESTONES_DETAILS: '/milestones/[id]',
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
      pathname?: RouteValue;
      href?: RouteValue;
      query?: Record<string, string | number | string[]>;
      hash?: string;
    };

// Type for route parameters if needed
export type RouteParams = Record<string, string | number>;

/**
 * Helper function to create type-safe routes with optional params
 */
export function createRoute(route: ExtendedRouteValue, params?: RouteParams): string {
  const routeObj = typeof route === 'string' ? { pathname: route } : route;

  const { pathname, href, query, hash } = routeObj;
  const finalPath = pathname || href || Routes.HOME;

  const queryString = query
    ? Object.entries(query)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&')
    : '';

  return `${finalPath}${queryString ? `?${queryString}` : ''}${hash ? `#${hash}` : ''}`;
}

/**
 * Type guard to check if a route is valid
 */
export function isValidRoute(route: string): route is Route {
  return (Object.values(Routes) as string[]).includes(route);
}

/**
 * Utility to convert a route to a valid href
 */
export function asHref(
  route: ExtendedRouteValue,
  params?: { [key: string]: string | number }
): string {
  // If route is already a string, return it
  if (typeof route === 'string') return route;

  // If route is an object, extract pathname or href
  const finalPath = route.pathname || route.href || Routes.HOME;

  return finalPath;
}

/**
 * Resolve a route to its string value
 */
export function resolveRoute(route: Route | string): string {
  return typeof route === 'string' ? Routes[route as Route] || route : Routes[route];
}

export type TypedLinkRoute = keyof typeof Routes | string;
