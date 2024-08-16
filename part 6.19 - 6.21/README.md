
# React Query Integration in Anecdote Application

This document outlines how we used React Query to enhance the anecdote application for exercises 6.20 through 6.22. We transitioned from traditional Redux data fetching to using React Query for managing server state.

## Project Setup

Before diving into the specifics of each exercise, ensure you have set up the project correctly:

### Start the JSON Server:

Ensure your JSON Server is running by executing:

```bash
npm run server
```

Verify the server is accessible and on the correct port by reviewing `server.js`.

### Install Dependencies:

Ensure the following dependencies are installed:

```bash
npm install @reduxjs/toolkit @tanstack/react-query react-redux
```

## Exercise 6.20: Retrieving Anecdotes with React Query

**Objective**: Implement fetching anecdotes from the server using React Query and handle server errors gracefully.

### Steps:

#### Set Up React Query Client:

Create a React Query client and wrap the application with `QueryClientProvider`.

```jsx
// src/main.jsx
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk));
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);
```

#### Fetch Anecdotes:

Use `useQuery` to fetch anecdotes in `AnecdoteList`.

```jsx
// src/components/AnecdoteList.jsx
import { useQuery } from '@tanstack/react-query';
import anecdoteService from '../services/anecdoteService';

const AnecdoteList = () => {
  const { data: anecdotes, isLoading, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: false
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Anecdote service not available due to problems in the server</div>;

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes}</div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
```

#### Error Handling:

In case of a server error, React Query will display the error message defined in the component.

### Testing:

#### Simulate Server Error:

Turn off the JSON Server to see the error message displayed.

## Exercise 6.21: Adding New Anecdotes

**Objective**: Implement adding new anecdotes using React Query. Ensure that the content of the anecdote meets the minimum length requirement.

### Steps:

#### Add Anecdote Form:

Use `useMutation` to handle creating new anecdotes in `AnecdoteForm`.

```jsx
// src/components/AnecdoteForm.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../services/anecdoteService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
      dispatch(setNotification('Anecdote added', 5));
    }
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    if (content.length < 5) {
      dispatch(setNotification('Anecdote must be at least 5 characters long', 5));
      return;
    }
    mutation.mutate(content);
    event.target.content.value = '';
  };

  return (
    <form onSubmit={addAnecdote}>
      <input name="content" />
      <button type="submit">Add Anecdote</button>
    </form>
  );
};

export default AnecdoteForm;
```

#### Notification Handling:

Ensure that the notification about successful addition is displayed.

### Testing:

#### Add New Anecdote:

Ensure that anecdotes with valid content are added and displayed.

## Exercise 6.22: Voting for Anecdotes

**Objective**: Implement voting functionality using React Query and ensure that the updated votes are displayed immediately.

### Steps:

#### Implement Voting:

Use `useMutation` to handle the voting logic in `AnecdoteList`.

```jsx
// src/components/AnecdoteList.jsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../services/anecdoteService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data: anecdotes, isLoading, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: false
  });

  const mutation = useMutation({
    mutationFn: ({ id, updatedAnecdote }) => anecdoteService.updateVote(id, updatedAnecdote),
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
      dispatch(setNotification('Vote recorded', 5));
    }
  });

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id);
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    };
    mutation.mutate({ id, updatedAnecdote });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Anecdote service not available due to problems in the server</div>;

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
```

#### Notification Handling:

Ensure that voting results are updated and a notification is shown.

### Testing:

#### Vote for Anecdotes:

Test the voting functionality and verify that the vote count is updated in real-time.

## Summary

We successfully integrated React Query into the anecdote application for fetching, adding, and voting on anecdotes. This approach simplifies server state management and enhances the user experience with automatic data refetching and optimized error handling.
