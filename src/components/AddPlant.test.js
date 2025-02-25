import { render, screen, fireEvent } from '@testing-library/react';
import AddPlant from './AddPlant';

test('renders Add Plant heading', () => {
  render(<AddPlant />);
  expect(screen.getByText(/Add a Plant/i)).toBeInTheDocument();
});

test('allows users to add a plant', () => {
  render(<AddPlant />);
  
  const input = screen.getByPlaceholderText(/e.g., Aloe Vera/i);
  const addButton = screen.getByText(/Add Plant/i);

  fireEvent.change(input, { target: { value: 'Rose' } });
  fireEvent.click(addButton);

  expect(screen.getByText(/Rose/i)).toBeInTheDocument();
});

test('allows users to delete a plant', () => {
  render(<AddPlant />);
  
  const input = screen.getByPlaceholderText(/e.g., Aloe Vera/i);
  const addButton = screen.getByText(/Add Plant/i);

  fireEvent.change(input, { target: { value: 'Cactus' } });
  fireEvent.click(addButton);

  const deleteButtons = screen.getAllByText(/Delete/i);
  fireEvent.click(deleteButtons[deleteButtons.length - 1]);

  expect(screen.queryByText(/Cactus/i)).not.toBeInTheDocument();
});
