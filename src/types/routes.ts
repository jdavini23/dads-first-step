import React from 'react';

export const Routes = {
  home: '/',
  about: '/about',
  features: '/features',
  resources: '/resources',
  milestones: '/milestones',
  testimonials: '/testimonials',
  contact: '/contact',
  signUp: '/sign-up',
  milestonesAdd: '/milestones/add',
  profile: '/profile',
  auth: '/auth',
} as const;

export type RouteKey = keyof typeof Routes;
export type RouteValue = (typeof Routes)[RouteKey];

// Type for route parameters if needed
export interface RouteParams {
  [key: string]: string | number;
}

// Helper function to create type-safe routes with optional params
export function createRoute(route: RouteValue, params?: RouteParams): string {
  let path = route;
  Object.entries(params || {}).forEach(([key, value]) => {
    path = path.replace(`:${key}`, String(value));
  });
  return path;
}
