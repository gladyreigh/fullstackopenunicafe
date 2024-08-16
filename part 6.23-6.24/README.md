
# Redux Anecdotes Application

This project is a React application that demonstrates the use of React Query for data fetching, Redux for state management, and a context-based notification system. The application manages anecdotes, allowing users to view, vote on, and add new anecdotes with real-time updates and notifications.

## Overview

- **Data Fetching with React Query**: Fetching and managing data from a JSON server using React Query.
- **State Management with Redux**: Managing application state, including anecdotes and notifications, using Redux.
- **Notification System with Context API**: Providing user feedback with a notification system using React's Context API.

## Setup

### 1. Install Dependencies

Ensure that all necessary dependencies are installed. Run:

```bash
npm install
```

### 2. Start the JSON Server

The JSON Server is used to mock a backend. Start it with:

```bash
npm run server
```

Ensure the server is running on http://localhost:3001.

### 3. Start the Development Server

Run the development server with:

```bash
npm run dev
```

## Implementation Details

### Exercises Covered

#### Exercise 6.20

**Implement retrieving anecdotes from the server using React Query.**

- **Objective**: Fetch anecdotes from the server and handle errors.
- **Implementation**:
  - Used `useQuery` from React Query to fetch anecdotes.
  - Implemented error handling to display a message when the server is unavailable.
  - Disabled automatic retries for failed requests.

**Code Example:**

```jsx
const { data: anecdotes, isLoading, error } = useQuery({
  queryKey: ['anecdotes'],
  queryFn: anecdoteService.getAll,
  retry: false
});
```

#### Exercise 6.21

**Implement adding new anecdotes to the server using React Query.**

- **Objective**: Add new anecdotes and handle content length requirements.
- **Implementation**:
  - Used `useMutation` from React Query to handle adding new anecdotes.
  - Added validation to ensure content length is at least 5 characters.

**Code Example:**

```jsx
const mutation = useMutation({
  mutationFn: (newAnecdote) => anecdoteService.createNew(newAnecdote),
  onSuccess: () => {
    queryClient.invalidateQueries(['anecdotes']);
    dispatch(showNotification('Anecdote added successfully', 5));
  },
  onError: () => {
    dispatch(showNotification('Failed to add anecdote', 5));
  }
});
```

#### Exercise 6.22

**Implement voting for anecdotes using React Query.**

- **Objective**: Update the vote count and automatically refresh the display.
- **Implementation**:
  - Used `useMutation` from React Query for voting.
  - Invalidated queries to refresh the anecdote list after voting.

**Code Example:**

```jsx
const vote = async (id) => {
  try {
    const anecdote = anecdotes.find((a) => a.id === id);
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.updateVote(id, updatedAnecdote);
    queryClient.invalidateQueries(['anecdotes']);
    dispatch(showNotification(`You voted for: "${anecdote.content}"`, 5));
  } catch (error) {
    dispatch(showNotification('Failed to vote for the anecdote', 5));
  }
};
```

#### Exercise 6.23

**Implement notification management using `useReducer` and context.**

- **Objective**: Show notifications for actions like adding and voting on anecdotes.
- **Implementation**:
  - Created a notification context with `useReducer` to manage notifications.
  - Displayed notifications with a timeout of 5 seconds.

**Code Example:**

- **Notification Context:**

```jsx
const NotificationContext = React.createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { ...state, message: action.payload.message, type: action.payload.type };
    case 'HIDE_NOTIFICATION':
      return { ...state, message: '', type: '' };
    default:
      return state;
  }
};
```

- **Notification Component:**

```jsx
const Notification = () => {
  const { state, dispatch } = useContext(NotificationContext);

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.message, dispatch]);

  return state.message ? <div className={`notification ${state.type}`}>{state.message}</div> : null;
};
```

#### Exercise 6.24

**Implement error handling for adding anecdotes with insufficient content length.**

- **Objective**: Display a notification when adding an anecdote with less than 5 characters.
- **Implementation**:
  - Added error handling to the mutation function to catch and notify users of invalid inputs.

**Code Example:**

```jsx
const mutation = useMutation({
  mutationFn: (newAnecdote) => anecdoteService.createNew(newAnecdote),
  onSuccess: () => {
    queryClient.invalidateQueries(['anecdotes']);
    dispatch(showNotification('Anecdote added successfully', 5));
  },
  onError: (error) => {
    dispatch(showNotification('Failed to add anecdote: Content too short', 5));
  }
});
```

## File Structure

```plaintext
src/
  components/
    AnecdoteList.jsx
    AnecdoteForm.jsx
    Filter.jsx
    Notification.jsx
  contexts/
    NotificationContext.jsx
  reducers/
    anecdoteReducer.js
    notificationReducer.js
  services/
    anecdoteService.js
  App.jsx
  main.jsx
```

## Contributing

Feel free to open issues or pull requests to contribute to the project.

## License

This project is licensed under the MIT License.
