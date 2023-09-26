import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from "./routes/root";
import FormNewIndividual from './components/FormNewIndividual';
import FormNewSighting from './components/FormNewSighting';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/App",
    element: <App />,
  },
  {
    path: "/new-individual",
    element: <FormNewIndividual />,
  },
  {
    path: "/new-sighting",
    element: <FormNewSighting />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
