import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setCurrentPage } from '../redux/postSlice';
import PostCard from '../components/PostCard';

export default function Posts() {
  const dispatch = useDispatch();
  const { posts, loading, error, currentPage, totalPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (currentPage) {
      dispatch(fetchPosts({ page: currentPage })); 
    }
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    console.log('Changing to page:', page);
    dispatch(setCurrentPage(page)); 
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container bg-purple-100 mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
            
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === index + 1
                ? 'bg-blue-500 text-black'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}