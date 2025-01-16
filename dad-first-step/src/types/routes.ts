import { LinkProps } from 'next/link';

export type RouteString = 
  | '/' 
  | '/about' 
  | '/milestones' 
  | '/milestones/add'
  | `/milestones/${string}`;

export const Routes = {
  home: '/',
  about: '/about',
  milestones: '/milestones',
  milestonesAdd: '/milestones/add',
  milestoneDetail: (id: string) => `/milestones/${id}`
} as const;

export type Route = typeof Routes[keyof typeof Routes];

export type LinkRoute = Route | (string & {});

export function createHref(path: string): string {
  return path;
}

export function asRoute(route: Route): string {
  return route;
}

export function asHref(route: RouteString): string {
  return route;
}