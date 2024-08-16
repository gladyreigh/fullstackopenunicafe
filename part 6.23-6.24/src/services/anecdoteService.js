// src/services/anecdoteService.js
import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch anecdotes:', error);
    throw error;
  }
};

const createNew = async (content) => {
  try {
    const response = await axios.post(baseUrl, { content, votes: 0 });
    return response.data;
  } catch (error) {
    console.error('Failed to create new anecdote:', error);
    throw error;
  }
};

const updateVote = async (id, updatedAnecdote) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
    return response.data;
  } catch (error) {
    console.error('Failed to update anecdote vote:', error);
    throw error;
  }
};


export default { getAll, createNew, updateVote };
