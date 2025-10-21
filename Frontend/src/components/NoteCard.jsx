import React from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const NoteCard = ({ note, onDelete }) => {
  // Format date nicely
  const formattedDate = new Date(note.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link
      to={`/note/${note._id}`}
      className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-shadow duration-200 flex flex-col min-h-[220px] min-w-[250px] relative"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>

      {/* Content */}
      <p className="text-gray-600 mb-4 line-clamp-4 flex-grow">{note.description}</p>

      {/* Footer */}
      <div className="mt-auto flex justify-between items-center pt-2">
        {/* Created Date */}
        <p className="text-sm text-gray-400">{formattedDate}</p>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.preventDefault();    // prevent Link navigation
            e.stopPropagation();   // stop event bubbling
            onDelete(note._id);    // call delete handler
          }}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
          title="Delete Note"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </Link>
  );
};

export default NoteCard;
