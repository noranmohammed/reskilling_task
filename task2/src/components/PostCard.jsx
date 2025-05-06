import React from 'react';

export default function PostCard({ title, body, userId }) {
  return (
    <div className="bg-amber-50 shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{body}</p>
      <p className="text-sm text-gray-500">Posted by User: {userId}</p>
    </div>
  );
}