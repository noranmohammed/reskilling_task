import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/postSlice';

export default function NewPost() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); 
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      console.error('User is not logged in');
      return;
    }
    const newPost = {
      ...formData,
      userId: user?.id, 
    };
    console.log(newPost)
    console.log('Submitting new post:', newPost); 
    dispatch(createPost(newPost))
      .unwrap()
      .then(() => {
        console.log('Post created successfully');
        setFormData({ title: '', body: '' }); 
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-amber-50 shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700 font-medium mb-2">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-700 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}