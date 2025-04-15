import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addNote, updateNote, deleteNote } from '../app/features/noteSlice';

export default function AddNoteModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = () => {  
    dispatch(addNote({ title, content,token }));
    onClose();
    console.log({ title, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-[#f5e7cc] rounded-md shadow-md p-6 w-full max-w-md relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Notes</h2>
          <button onClick={onClose} className="text-red-500 font-bold text-lg">✕</button>
        </div>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export const EditNoteModal = ({ note, onClose }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState(note.note_content);

  const handleSave = () => {
    dispatch(updateNote({ id:note.note_id, note_content:body , note_title:note.note_title }));
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteNote(note.note_id));
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-red-100 p-4 rounded shadow-md w-96">
        <div className="flex justify-between">
          <h3 className="font-semibold">{note.note_title}</h3>
          <button onClick={onClose}>❌</button>
        </div>
        <textarea
          className="w-full mt-2 p-2 border rounded h-32"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-3">
          <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};




