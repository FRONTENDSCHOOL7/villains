import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyles from './style/GlobalStyles';


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyles>
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<Main />} /> */}
            </Routes>
          </BrowserRouter>
        </GlobalStyles>
      </RecoilRoot>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
};

export default App;
