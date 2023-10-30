import React from 'react';
import routeConfig from './config/route.config';
import { createHashRouter, createBrowserRouter, useRoutes } from 'react-router-dom';
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import {  RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './assets/fonts/SUIT.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
		// data를 30분 단위로 refetch되기 때문에 자동 refetch 옵션들은 꺼두었습니다.
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error(error, query);
    },
  }),
});

const router = createBrowserRouter(routeConfig);

const App = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
    <RecoilRoot>
      <RouterProvider router={router} basename={process.env.NODE_ENV === 'production' ? '/VILLAINS/' : '/'}/>
      </RecoilRoot>
      <ReactQueryDevtools  initialIsOpen={false} />
    </QueryClientProvider>);
};

export default App;
