import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router';
import { Layout } from './Layout';

const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Services = lazy(() => import('../pages/Services/Services'));
const ServiceDetails = lazy(() => import('../pages/ServiceDetails/ServiceDetails'));
const Projects = lazy(() => import('../pages/Projects/Projects'));
const ProjectDetails = lazy(() => import('../pages/ProjectDetails/ProjectDetails'));
const Products = lazy(() => import('../pages/Products/Products'));
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails'));
const Team = lazy(() => import('../pages/Team/Team'));
const Careers = lazy(() => import('../pages/Careers/Careers'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Blog = lazy(() => import('../pages/Blog/Blog'));
const BlogDetails = lazy(() => import('../pages/BlogDetails/BlogDetails'));
const Legal = lazy(() => import('../pages/Legal/Legal'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const page = (el: ReactNode) => <Suspense fallback={<div className="route-fallback" aria-busy="true" />}>{el}</Suspense>;

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: page(<Home />) },
      { path: '/about', element: page(<About />) },
      { path: '/services', element: page(<Services />) },
      { path: '/services/:slug', element: page(<ServiceDetails />) },
      { path: '/projects', element: page(<Projects />) },
      { path: '/projects/:slug', element: page(<ProjectDetails />) },
      { path: '/products', element: page(<Products />) },
      { path: '/products/:slug', element: page(<ProductDetails />) },
      { path: '/team', element: page(<Team />) },
      { path: '/blog', element: page(<Blog />) },
      { path: '/blog/:slug', element: page(<BlogDetails />) },
      { path: '/careers', element: page(<Careers />) },
      { path: '/contact', element: page(<Contact />) },
      { path: '/privacy', element: page(<Legal kind="privacy" />) },
      { path: '/terms', element: page(<Legal kind="terms" />) },
      { path: '*', element: page(<NotFound />) },
    ],
  },
]);
