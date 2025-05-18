import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NewPost from './NewPost';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe('NewPost Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: { user: { id: 1, name: 'Test User' } },
    });
    store.dispatch = jest.fn();
  });

  it('renders the form correctly', () => {
    render(
      <Provider store={store}>
        <NewPost />
      </Provider>
    );

    expect(screen.getByText('Create New Post')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create post/i })).toBeInTheDocument();
  });

  it('updates form fields on user input', () => {
    render(
      <Provider store={store}>
        <NewPost />
      </Provider>
    );

    const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
    const bodyTextarea = screen.getByLabelText('Body') as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyTextarea, { target: { value: 'Test Body' } });

    expect(titleInput.value).toBe('Test Title');
    expect(bodyTextarea.value).toBe('Test Body');
  });
});