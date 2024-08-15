
# Better Anecdotes Application (Exercises 6.10 - 6.13)

This project is a continuation of the anecdote application using Redux. The project has been extended with the following features:

## Exercises Overview

### 6.10 Better Anecdotes, step 8
- Installed Redux Toolkit for the project.
- Moved the Redux store creation into the file `store.js` and used Redux Toolkit's `configureStore` to create the store.
- Updated the filter reducer and action creators to use Redux Toolkit's `createSlice` function.
- Integrated Redux DevTools for easier debugging of the application's state.

### 6.11 Better Anecdotes, step 9
- Updated the anecdote reducer and action creators to use Redux Toolkit's `createSlice` function.
- Note: The initial state of anecdotes returned by Redux Toolkit is immutable. Use the spread syntax to copy and sort the anecdotes:  
  ```js
  [...anecdotes].sort()
  ```

### 6.12 Better Anecdotes, step 10
- Extended the `Notification` component to render the message stored in the Redux store.
- The component now looks as follows:
  ```js
  import { useSelector } from 'react-redux'

  const Notification = () => {
    const notification = useSelector(state => state.notification)
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  export default Notification
  ```
- Introduced a separate reducer for handling notifications using Redux Toolkit's `createSlice` function.

### 6.13 Better Anecdotes, step 11
- Extended the application to display a notification message for five seconds when a user votes for an anecdote or creates a new anecdote.
- Created separate action creators for setting and removing notifications.

## How to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

## Dependencies
- Redux Toolkit
- React Redux

## License
This project is licensed under the MIT License.
