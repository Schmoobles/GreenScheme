import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

test('renders Green Scheme title', () => {
  render(<App />);
  expect(screen.getByText(/Garden Planner/i)).toBeInTheDocument();
});