import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/postSlice';
import PostCard from '../components/PostCard';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); 
  const { posts, loading, error } = useSelector((state) => state.posts); 

  useEffect(() => {
    dispatch(fetchPosts()); 
  }, [dispatch]);

  if (!user) {
    return <p className="text-center text-red-500">No user information available. Please log in.</p>;
  }

  const userPosts = posts.filter((post) => Number(post.userId) === Number(user.id)); 

  return (
    <div className="w-[90%] mx-auto bg-purple-100 shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Hello, {user.name}</h1>
      <div className="mb-6">
        <p className="text-gray-800">
          <span className="font-medium">Title:</span> {user.title}
        </p>
        <p className="text-gray-800">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p className="text-gray-800">
          <span className="font-medium">Bio:</span> {user.bio}
        </p>
      </div>
       
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Posts</h2>
      {loading && <p>Loading posts...</p>}
      {/* {error && <p className="text-red-500">Error: {error}</p>} */}
      {!loading && userPosts.length === 0 && (
        <p className="text-gray-700">You have not created any posts yet.</p>
      )}
      {!loading && userPosts.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {userPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              body={post.body}
              userId={post.userId}
            />
          ))}
        </div>
      )}
    </div>
  );
}