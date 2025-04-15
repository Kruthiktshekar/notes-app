import { useState } from 'react';
import {EditNoteModal} from './AddNoteModal';

const NoteCard = ({ note, onEdit }) => {
    console.log(note)

  return (
    <>
    <div className="bg-orange-50 p-3 rounded shadow-md w-60 h-40 relative">
      <div className="font-semibold border-1 bg-orange-100">{note.note_title}</div>
      <button className="absolute top-1 right-2 text-red-400" onClick={onEdit}>✏️</button>
      <p className="mt-2 text-sm">{note.note_content}</p>
      <p className="text-xs text-gray-600 absolute bottom-1 right-1">
        Last Modified: {new Date(note.last_update).toLocaleString()}
      </p>
    </div>
    </>
  );
};

export default NoteCard;
