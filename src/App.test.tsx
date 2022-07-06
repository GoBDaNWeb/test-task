import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query'

describe('APP TEST', () => {
  test('click form tab', () => {
    const queryClient = new QueryClient({
      defaultOptions:  {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    })
    render(
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    );
  
    expect(screen.getByTestId('form-tab')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('form-tab'))
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
  
  test('click table tab', () => {
    const queryClient = new QueryClient({
      defaultOptions:  {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    })
    render(
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    );
  
    expect(screen.getByTestId('table-tab')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('table-tab'))
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });  
})