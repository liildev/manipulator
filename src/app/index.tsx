import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { routeTree } from '@/routeTree.gen';
import { Error, NotFound, ScreenLoader } from '@/components';
import { theme } from '@/shared/theme';
import { useAppSelector } from '@/shared/hooks/use-redux';

const router = createRouter({
  routeTree,
  context: { isAuthenticated: undefined! },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: Error,
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: ScreenLoader,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider context={{ isAuthenticated }} router={router} />
    </ThemeProvider>
  );
};
