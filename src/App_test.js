import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const mockUsers = {
  data: {
    items: [
      { id: 1, login: 'user1', public_repos: 10 },
      { id: 2, login: 'user2', public_repos: 5 },
      { id: 3, login: 'user3', public_repos: 15 },
    ],
  },
};

const mockUserDetails = {
  data: {
    login: 'user1',
    name: 'John Doe',
    location: 'Earth',
    public_repos: 10,
    followers: 50,
  },
};

test('renders user search and shows search results', async () => {
  axios.get.mockResolvedValue(mockUsers);

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: 'user' } });

  const searchButton = screen.getByRole('button', { name: /search/i });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const userLinks = screen.getAllByRole('link');
    expect(userLinks).toHaveLength(3);
  });
});

test('renders user details page', async () => {
  axios.get.mockResolvedValueOnce(mockUsers);
  axios.get.mockResolvedValueOnce(mockUserDetails);

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: 'user' } });

  const searchButton = screen.getByRole('button', { name: /search/i });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const userLink = screen.getByRole('link', { name: /user1/i });
    fireEvent.click(userLink);
  });

  await waitFor(() => {
    const userDetails = screen.getByText(/John Doe/i);
    expect(userDetails).toBeInTheDocument();
  });
});
