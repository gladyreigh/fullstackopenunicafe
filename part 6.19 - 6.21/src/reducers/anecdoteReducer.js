// src/reducers/anecdoteReducer.js
import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      // Find the index of the anecdote to update
      const index = state.findIndex(anecdote => anecdote.id === updatedAnecdote.id);
      if (index !== -1) {
        // Update the anecdote at the found index
        state[index] = updatedAnecdote;
      }
    },
  },
});

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find(a => a.id === id);
    if (anecdoteToVote) {
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      const savedAnecdote = await anecdoteService.updateVote(id, updatedAnecdote);
      dispatch(updateAnecdote(savedAnecdote));
    } else {
      console.error('Anecdote not found');
    }
  };
};

export default anecdoteSlice.reducer;
