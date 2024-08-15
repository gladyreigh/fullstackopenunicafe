
# Anecdote Voting Application

This project is a simple React-Redux application where users can view and vote for their favorite anecdotes. It features an integrated filter functionality that allows users to search for anecdotes in real-time.

## Features

- **Anecdote Listing:** Displays a list of anecdotes.
- **Voting System:** Users can vote for their favorite anecdotes.
- **Notification System:** A notification is displayed whenever a user votes.
- **Filter Functionality:** Users can filter anecdotes by typing keywords.

## How We Implemented Filtering

### Step 1: Create a Filter Reducer

We started by creating a new `filterReducer` to manage the filter state in the Redux store. This reducer handles the filter input, which allows us to control the visibility of anecdotes based on user input.

```javascript
// src/reducers/filterReducer.js

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  };
};

export default filterReducer;
```

### Step 2: Combine Reducers

Next, we combined the new `filterReducer` with the existing `anecdoteReducer` using Redux's `combineReducers` function.

```javascript
// src/reducers/index.js
import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

export default rootReducer;
```

### Step 3: Filter Component

We created a `Filter` component that allows users to input text. The component dispatches the `setFilter` action whenever the input value changes.

```javascript
// src/components/Filter.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
```

### Step 4: Update AnecdoteList Component

In the `AnecdoteList` component, we updated the code to filter anecdotes based on the filter state before rendering them. We also made sure to handle voting functionality correctly after filtering.

```javascript
// src/components/AnecdoteList.js
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();
    return state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    );
  });

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id);
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`You voted for: "${anecdote.content}"`, 5));
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id} style={{ marginBottom: '10px' }}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;
```

### Step 5: Integrate Filter in the App Component

Finally, we made sure the `Filter` component is rendered at the top of the main `App` component. This ensures that there is only one filter input in the application.

```javascript
// src/App.js
import React from 'react';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
    </div>
  );
};

export default App;
```

## Conclusion

With these steps, we successfully added a filter functionality to our anecdote voting application. This allows users to easily search for specific anecdotes by typing keywords, enhancing the overall user experience.
