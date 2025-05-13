import React from 'react';

const NoteCard = ({ note, onUpdate, onDelete }) => {
  return (
    <div className="note-card">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={() => onUpdate(note)}>Update</button>
      <button onClick={() => onDelete(note)}>Delete</button>
    </div>
  );
};

export default NoteCard;