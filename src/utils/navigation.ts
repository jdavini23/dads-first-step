import { useRouter, usePathname } from 'next/navigation';
import { Route, Routes, RouteValue, ExtendedRouteValue, resolveRoute } from '@/types/routes';

/**
 * Custom hook for application-wide navigation
 * Provides type-safe navigation methods
 */
export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  return {
    /**
     * Navigate to a specific route
     * @param route - The route to navigate to
     * @param options - Optional navigation options
     */
    navigate: (
      route: Route | ExtendedRouteValue,
      options?: { replace?: boolean; query?: { [key: string]: string } }
    ) => {
      let path: string;

      if (typeof route === 'string') {
        path = resolveRoute(route);
      } else if (typeof route === 'object') {
        path = route.pathname || route.href || Routes.HOME;
      } else {
        path = Routes[route as Route];
      }

      const navigationConfig = {
        pathname: path,
        query: options?.query,
      };

      // Type assertion to match Next.js router type
      if (options?.replace) {
        router.replace(navigationConfig as any);
      } else {
        router.push(navigationConfig as any);
      }
    },

    /**
     * Get the current route
     * @returns The current route as a Route type
     */
    getCurrentRoute: (): Route | null => {
      const matchedRoute: [Route, RouteValue] | undefined = (
        Object.entries(Routes) as [Route, RouteValue][]
      ).find(([, routePath]) => routePath === pathname);

      return matchedRoute?.[0] ?? null;
    },

    /**
     * Current pathname
     */
    pathname,
  };
};
