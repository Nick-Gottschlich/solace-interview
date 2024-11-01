import React from 'react';
// @ts-ignore
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './page';

const mockAdvocates = [
  {
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    degree: 'PhD',
    specialties: ['Family Law', 'Civil Rights'],
    yearsOfExperience: 5,
    phoneNumber: '123-456-7890',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'Los Angeles',
    degree: 'JD',
    specialties: ['Criminal Law'],
    yearsOfExperience: 10,
    phoneNumber: '098-765-4321',
  },
];

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays advocates', async () => {
    render(<Home />);

    // Wait for the advocates to be displayed
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  });

  it('filters advocates based on search term', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    // Search for "John"
    fireEvent.change(screen.getByPlaceholderText('Type to search...'), {
      target: { value: 'John' },
    });

    // Verify that only John is visible
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });

  it('resets the search when the reset button is clicked', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    // Search for "John"
    fireEvent.change(screen.getByPlaceholderText('Type to search...'), {
      target: { value: 'John' },
    });

    // Verify that only John is visible
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();

    // Click the reset button
    fireEvent.click(screen.getByText('Reset Search'));

    // Verify that both advocates are visible again
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });
});
