import { redirect } from '@tanstack/react-router';

import { AppLayout } from '@/components';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: AppLayout,
});
