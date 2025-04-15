import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, addNote, deleteNote } from '../app/features/noteSlice';
import { logout } from '../app/features/authSlice';
import { useRouter } from 'next/router';
import AddNoteModal, { EditNoteModal } from '@/app/AddNoteModal';
import NavBar from '@/app/NavBar';
import NoteCard from '@/app/NoteCard';


export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedNote, setSelectedNote] = useState(null);

  const { token,userData } = useSelector((state) => state.auth);
  const notes = useSelector((state) => state.notes.notes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNoteClick = () => setIsModalOpen(true);
  

  useEffect(() => {
    if (!token) return router.replace('/login');
    dispatch(fetchNotes());
  }, [dispatch, token]);

  return (
    <div className="min-h-screen bg-[#88857] text-gray-800">
      <NavBar/>
    <div className="p-10 text-3xl font-bold">Good Morning {userData?.user_name || 'User'}!</div>

    <div className="mt-6 flex flex-wrap gap-4">
        {notes?.length>0 ? (notes.map(note => (
          <NoteCard key={note.note_id} note={note} onEdit={() => setSelectedNote(note)}/>
        ))):('')}
      </div>
      {selectedNote && (
      <EditNoteModal
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />
    )}

    <button
      onClick={handleAddNoteClick}
      className="fixed bottom-6 right-6 bg-[#f4a261] hover:bg-[#e76f51] p-4 rounded-full shadow-lg"
    >
      📝
    </button>

    {isModalOpen && (
      <AddNoteModal onClose={() => setIsModalOpen(false)} />
    )}
  </div>
  );
}

