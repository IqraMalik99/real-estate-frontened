
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import SingnIn from './components/SingnIn.jsx';
import SingnOut from './components/SingnOut.jsx';
import SignUp from './components/SignUp.jsx';
import { persistor, store } from './store/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Profile from './components/Profile.jsx';
import Delete from './components/Delete.jsx';
import List from './components/List.jsx';
import ShowList from './components/ShowList.jsx';
import FullList from './components/FullList.jsx';
import UpdateList from './components/UpdateList.jsx';
import Search from './components/Search.jsx';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {/* Public Routes */}
      <Route path='' element={<Home />} />
      <Route path='sign-in' element={<SingnIn />} />
      <Route path='sign-out' element={<SingnOut />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='search' element={<Search />} />
      <Route path='all/:id' element={<FullList />} />
  
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
      <Route path='profile' element={<Profile />} />
        <Route path='delete' element={<Delete />} />
        <Route path='createlist' element={<List />} />
        <Route path='showlist' element={<ShowList />} />
        <Route path='update/:id' element={<UpdateList />} />
      
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);