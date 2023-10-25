import React from 'react';
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import {  RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import routeConfig from './config/route.config';
import { createBrowserRouter } from 'react-router-dom';

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
          <RouterProvider router={router} />
      </RecoilRoot>
      <ReactQueryDevtools  initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
