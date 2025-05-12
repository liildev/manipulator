import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { TAuthentication } from '@/types/auth';

export const Route = createRootRouteWithContext<TAuthentication>()({
  component: Outlet,
});
