// src/components/AnecdoteList.jsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../services/anecdoteService';
import { useNotification } from '../contexts/NotificationContext';

const AnecdoteList = () => {
  const { dispatch } = useNotification();
  const queryClient = useQueryClient();

  const { data: anecdotes, isLoading, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: false // Disable retries for simplicity
  });

  const mutation = useMutation({
    mutationFn: async ({ id, updatedAnecdote }) => {
      return await anecdoteService.updateVote(id, updatedAnecdote);
    },
    onSuccess: (savedAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']);
      dispatch({ type: 'SHOW_NOTIFICATION', message: `You voted for: "${savedAnecdote.content}"`, messageType: 'success' });
    },
    onError: () => {
      dispatch({ type: 'SHOW_NOTIFICATION', message: 'Failed to record vote', messageType: 'error' });
    }
  });

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id);
    if (!anecdote) return;

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
