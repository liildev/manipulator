import { createFileRoute } from '@tanstack/react-router';

import { DashboardPage } from '@/features/home';

export const Route = createFileRoute('/_authenticated/')({
  component: DashboardPage,
});
