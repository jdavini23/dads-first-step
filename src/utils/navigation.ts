import { useRouter } from 'next/navigation';
import { Route, Routes, getRoutePath } from '@/types/routes';

/**
 * Custom hook for application-wide navigation
 * Provides type-safe navigation methods
 */
export const useNavigation = () => {
  const router = useRouter();

  return {
    /**
     * Navigate to a specific route
     * @param route - The route to navigate to
     * @param options - Optional navigation options
     */
    navigate: (route: Route, options?: { replace?: boolean }) => {
      const path = getRoutePath(route);

      if (options?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    },

    /**
     * Get the current route
     * @returns The current route as a Route type
     */
    getCurrentRoute: (): Route | null => {
      if (typeof window === 'undefined') return null;

      const path = window.location.pathname;
      const matchedRoute = (Object.entries(Routes) as [Route, string][]).find(
        ([, routePath]) => routePath === path
      )?.[0];

      return matchedRoute || null;
    },
  };
};
