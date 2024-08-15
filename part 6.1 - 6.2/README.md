
# Unicafe Redux

This project is a simplified version of the Unicafe application where state management is handled using Redux. It was developed as part of the exercises from the Full Stack Open course.

## Project Setup

The project was initialized by cloning the repository from GitHub, and then the following steps were taken:

1. Removed the existing git configuration to start fresh:
    ```bash
    rm -rf .git
    ```
2. Installed all necessary dependencies:
    ```bash
    npm install
    ```

## Exercises Completed

### 6.1: Unicafe Revisited, Step 1

In this step, we implemented the Redux reducer that will handle the feedback counts (good, ok, bad) in the application.

- **Initial State:** The initial state was defined as:
    ```js
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    };
    ```
- **Reducer Implementation:** The reducer was implemented to handle actions `GOOD`, `OK`, `BAD`, and `ZERO`:
    ```js
    const counterReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'GOOD':
                return { ...state, good: state.good + 1 };
            case 'OK':
                return { ...state, ok: state.ok + 1 };
            case 'BAD':
                return { ...state, bad: state.bad + 1 };
            case 'ZERO':
                return initialState;
            default:
                return state;
        }
    };
    ```
- **Testing:** The reducer was tested using Jest, ensuring that it behaved as expected and that state immutability was maintained.

### 6.2: Unicafe Revisited, Step 2

In this step, we implemented the user interface for the Unicafe application.

- **Buttons:** The UI consists of buttons that dispatch the respective actions (`GOOD`, `OK`, `BAD`) to the Redux store.
- **Feedback Count Display:** The application displays the count of each type of feedback by selecting the relevant state from the Redux store using `useSelector`.

## Running the Project

To start the development server, use the following command:
```bash
npm run dev
```

## Troubleshooting

During the development, a few issues were encountered and resolved:
- **Missing `react-redux` Dependency:** The error was resolved by ensuring that `react-redux` was added to the `dependencies` in `package.json` and installing it via `npm install`.
- **Vite Configuration Errors:** These were resolved by correctly installing and configuring the required dependencies and plugins.

## Conclusion

This project demonstrates the integration of Redux with a React application, managing state centrally and ensuring immutability of the application state. It also serves as a good practice for testing Redux reducers with Jest.

