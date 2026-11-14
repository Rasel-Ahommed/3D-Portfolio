import { RouterProvider } from 'react-router';
import { router } from './router';
import { SmoothScroll } from '../components/common/SmoothScroll';

export function App() {
  return (
    <SmoothScroll>
      <RouterProvider router={router} />
    </SmoothScroll>
  );
}
