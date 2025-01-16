import { useRouter, usePathname } from 'next/navigation';
import { Route, Routes, getRoutePath, RouteValue } from '@/types/routes';

/**
 * Custom hook for application-wide navigation
 * Provides type-safe navigation methods
 */
export const useNavigation = (): {
  navigate: (route: Route, options?: { replace?: boolean }) => void;
  getCurrentRoute: () => Route | null;
  pathname: string;
} => {
  const router = useRouter();
  const pathname = usePathname();

  return {
    /**
     * Navigate to a specific route
     * @param route - The route to navigate to
     * @param options - Optional navigation options
     */
    navigate: (route: Route, options?: { replace?: boolean }) => {
      const path = getRoutePath(route);
      const navConfig = path as string;

      if (options?.replace) {
        router.replace(navConfig);
      } else {
        router.push(navConfig);
      }
    },

    /**
     * Get the current route
     * @returns The current route as a Route type
     */
    getCurrentRoute: (): Route | null => {
      const matchedRoute: [Route, RouteValue] | undefined = (Object.entries(Routes) as [Route, RouteValue][]).find(
        ([, routePath]) => routePath === pathname
      );

      return matchedRoute?.[0] || null;
    },

    /**
     * Current pathname
     */
    pathname,
  };
};
