# Anecdotes and Redux Integration

This project demonstrates the integration of Redux with asynchronous actions and backend interactions using the Redux Thunk library. Below is a summary of the completed steps for this exercise.

## 6.16 Anecdotes and the Backend, Step 3: Initialize Redux Store Asynchronously

**Completed:**

- The `initializeAnecdotes` function in `anecdoteReducer.js` is an asynchronous action creator that fetches anecdotes from the backend and dispatches them to the Redux store. This ensures that the Redux store is populated with initial data from the server when the application starts.

## 6.17 Anecdotes and the Backend, Step 4: Create a New Anecdote Asynchronously

**Completed:**

- The `createAnecdote` function in `anecdoteReducer.js` is an asynchronous action creator that creates a new anecdote via the backend and dispatches it to the Redux store. This allows users to add new anecdotes, which are then saved to the backend and updated in the Redux store.

## 6.18 Anecdotes and the Backend, Step 5: Voting Saves Changes to the Backend

**Completed:**

- The `voteAnecdote` function in `anecdoteReducer.js` is an asynchronous action creator that updates an anecdote’s vote count in the backend and dispatches the updated anecdote to the Redux store. This ensures that votes are saved persistently on the backend and reflected in the UI.

## 6.19 Anecdotes and the Backend, Step 6: Improved Notification Handling

**Completed:**

- Added a `notify` action creator in `notificationReducer.js` that sets a notification message with a duration. This new action creator simplifies the process of showing notifications with a specific display time.

- Updated `AnecdoteForm.jsx` and `AnecdoteList.jsx` to use the `notify` function for notifications. This change ensures that notifications about new anecdotes and votes are displayed correctly and for the specified duration.

## Project Setup

Ensure you have the following dependencies installed:

- `redux`
- `react-redux`
- `@reduxjs/toolkit`
- `redux-thunk`
- `axios`

Make sure your backend server is running and accessible at `http://localhost:3001/anecdotes`.

## Running the Application

1. **Start the backend server**: Ensure your backend server is running and serving data at the specified URL.
2. **Install dependencies**: Run `npm install` or `yarn install` to install the necessary dependencies.
3. **Run the application**: Use `npm start` or `yarn start` to start the React application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
