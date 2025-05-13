import React, { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import axios from 'axios';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/notes',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    axiosInstance
      .get('/')
      .then(response => {
        setNotes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (note) => {
    axiosInstance
      .put(`/${note.id}`, note)
      .then(response => {
        setNotes(notes.map((n) => (n.id === note.id ? response.data : n)));
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (note) => {
    axiosInstance
      .delete(`/${note.id}`)
      .then(() => {
        setNotes(notes.filter((n) => n.id !== note.id));
      })
      .catch(error => console.error(error));
  };

  const handleSubmit = (newNote) => {
    axiosInstance
      .post('/create', newNote)
      .then(response => {
        setNotes([...notes, response.data]);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Notes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
          <NoteForm onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default NoteList;
