import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import axios from 'axios';
import NoteCard from '../components/NoteCard.jsx';

const HomePage = () => {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  // Delete note handler
  const handleDelete = async (id) => {
    try {
      // Send delete request to backend
      await axios.delete(`http://localhost:3000/api/posts/${id}`);

      // Remove note from frontend state
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note. Try again.');
    }
  };


  return (
    <div className="min-h-screen bg-gray-300 pt-30">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 px-10">All Notes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-10">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
