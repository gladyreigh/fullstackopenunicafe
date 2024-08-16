// src/components/AnecdoteForm.jsx
import { useMutation } from '@tanstack/react-query';
import anecdoteService from '../services/anecdoteService';
import { useNotification } from '../contexts/NotificationContext';

const AnecdoteForm = () => {
  const { dispatch } = useNotification();

  const mutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: () => {
      dispatch({ type: 'SHOW_NOTIFICATION', message: 'Anecdote added', messageType: 'success' });
    },
    onError: (error) => {
      dispatch({ type: 'SHOW_NOTIFICATION', message: 'Failed to add anecdote', messageType: 'error' });
    }
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    if (content.length < 5) {
      dispatch({ type: 'SHOW_NOTIFICATION', message: 'Anecdote must be at least 5 characters long', messageType: 'error' });
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
