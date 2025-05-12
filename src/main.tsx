import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './app';
import { store } from './shared/store';

const container = document.getElementById('app')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
