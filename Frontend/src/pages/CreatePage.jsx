import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const CreatePage = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const handleSave = async () => {
    try {
      await axios.post("https://mynotes-mern.onrender.com/api/posts", {
        title: noteTitle,
        description: noteBody,
      });
      toast.success("Note created successfully!");
      setNoteTitle("");
      setNoteBody("");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note!");
    }
  };

  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <Navbar />

      {/* Full-Screen Container */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 pt-24">
        {/* Card that covers most of the screen */}
        <div className="w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-lg p-10 flex flex-col">
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-700">
            Create a New Note
          </h2>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg mb-6 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Body Textarea */}
          <textarea
            placeholder="Write your note here..."
            value={noteBody}
            onChange={(e) => setNoteBody(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg flex-grow text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          {/* Buttons */}
          <div className="mt-8 flex justify-between">
            <Link
              to="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-lg transition"
            >
              ← Back to All Notes
            </Link>

            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded-lg transition"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
