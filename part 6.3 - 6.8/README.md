
# Anecdote Voting Application

This project is a continuation of the anecdote voting application from Part 1 of the Full Stack Open course. The application has been extended with Redux to manage the state of anecdotes and votes.

## Exercises Implemented (6.3 - 6.8)

### 6.3: Anecdotes, Step 1
Implemented the functionality for voting on anecdotes. The number of votes is saved to the Redux store.

### 6.4: Anecdotes, Step 2
Added functionality to create new anecdotes. The form for adding anecdotes is uncontrolled.

### 6.5: Anecdotes, Step 3
Ensured that anecdotes are ordered by the number of votes.

### 6.6: Anecdotes, Step 4
Separated the creation of action-objects into action creator functions and placed them in the `src/reducers/anecdoteReducer.js` file, following the pattern used in the chapter on action creators.

### 6.7: Anecdotes, Step 5
Moved the logic for creating a new anecdote into a separate component called `AnecdoteForm`.

### 6.8: Anecdotes, Step 6
Separated the rendering of the anecdote list into a component called `AnecdoteList`. All logic related to voting for an anecdote has been moved into this new component.

Now the `App` component is structured as follows:

```javascript
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
```

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/redux-anecdotes.git
    ```

2. Navigate to the project directory:
    ```bash
    cd redux-anecdotes
    ```

3. Remove any existing git configuration:
    ```bash
    rm -rf .git
    ```

4. Install the dependencies:
    ```bash
    npm install
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## Project Structure

- `src/reducers/anecdoteReducer.js`: Handles the logic for voting and creating anecdotes.
- `src/components/AnecdoteForm.js`: Component responsible for rendering the form to add new anecdotes.
- `src/components/AnecdoteList.js`: Component responsible for rendering the list of anecdotes and handling voting logic.

## Features

- Vote for your favorite anecdotes.
- Add new anecdotes to the list.
- Anecdotes are ordered by the number of votes in descending order.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
