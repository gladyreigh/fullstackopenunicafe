// src/components/AnecdoteList.jsx
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import anecdoteService from '../services/anecdoteService';
import { showNotification } from '../reducers/notificationReducer';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Fetch anecdotes using React Query
  const { data: anecdotes, isLoading, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: false, // Disable automatic retries
  });

  // Display loading state or error message
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Anecdote service not available due to problems in the server</div>;

  // Function to handle voting
  const vote = async (id) => {
    try {
      // Find the selected anecdote
      const anecdote = anecdotes.find((a) => a.id === id);
      // Create the updated anecdote
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      // Update the vote on the server
      await anecdoteService.updateVote(id, updatedAnecdote);
      // Invalidate queries to refetch the data
      queryClient.invalidateQueries(['anecdotes']);
      // Notify the user
      dispatch(showNotification(`You voted for: "${anecdote.content}"`, 5));
    } catch (error) {
      // Notify the user about the error
      dispatch(showNotification('Failed to vote for the anecdote', 5));
    }
  };

  // Render the list of anecdotes
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} style={{ marginBottom: '10px' }}>
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

