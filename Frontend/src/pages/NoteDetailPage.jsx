import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // added Link
import axios from "axios";
import { Trash2 } from "lucide-react";
import Navbar from "../components/Navbar.jsx";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  // Fetch note by ID
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`https://mynotes-mern.onrender.com/api/posts/${id}`);
        setNote(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNote();
  }, [id]);

  // Delete note
  const handleDelete = async () => {
    try {
      await axios.delete(`https://mynotes-mern.onrender.com/api/posts/${id}`);
      navigate("/"); // go back to homepage
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  if (!note) return <><Navbar/><p className="text-center mt-10">Loading...</p></>;

  const formattedDate = new Date(note.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-10 flex justify-center pt-28">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl flex flex-col min-h-[300px]">
          
          {/* Back Button */}
          <div className="mb-4">
            <Link
              to="/"
              className="text-blue-600 hover:underline font-medium"
            >
              ← Back to All Notes
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
          <p className="text-gray-700 mb-6 whitespace-pre-line flex-grow">{note.description}</p>
          <div className="mt-auto flex justify-between items-center">
            <p className="text-gray-400">{formattedDate}</p>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteDetailPage;
