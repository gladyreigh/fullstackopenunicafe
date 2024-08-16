// src/components/AnecdoteForm.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import anecdoteService from '../services/anecdoteService';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
    },
    onError: () => {
      dispatch(setNotification('Failed to create new anecdote', 5));
    },
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    if (content.length < 5) {
      dispatch(setNotification('Anecdote must be at least 5 characters long', 5));
      return;
    }

    mutation.mutate(content);
    dispatch(setNotification(`You added: "${content}"`, 5));
  };

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
