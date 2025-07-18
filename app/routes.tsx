import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import Home from './routes/home';
import { AdminLayout } from './routes/admin.layout';
import AdminIndex from './routes/admin.index';
import { AdminExperiences } from './routes/admin.experiences';
import { AdminDegrees } from './routes/admin.degrees';
import { AdminSkills } from './routes/admin.skills';
import { AdminContacts } from './routes/admin.contacts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminIndex />
      },
      {
        path: 'experiences',
        element: <AdminExperiences />
      },
      {
        path: 'degrees',
        element: <AdminDegrees />
      },
      {
        path: 'skills',
        element: <AdminSkills />
      },
      {
        path: 'contacts',
        element: <AdminContacts />
      }
    ]
  }
]);