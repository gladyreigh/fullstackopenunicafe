import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  // Get anecdotes and filter state from Redux store
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
