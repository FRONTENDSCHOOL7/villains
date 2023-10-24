import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {  RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import routers from './config/route.config';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
          <RouterProvider router={routers} />
      </RecoilRoot>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
};

export default App;
