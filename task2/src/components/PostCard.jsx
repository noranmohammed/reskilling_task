import React from 'react';

export default function PostCard({ title, body, userId, onEdit, onDelete }) {
  return (
    <div className="bg-amber-50 shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{body}</p>
      <p className="text-sm text-gray-500">Posted by User: {userId}</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-300 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}