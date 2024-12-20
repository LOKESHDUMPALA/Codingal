import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const lastPostRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = response.data;
      setPosts((prev) => [...prev, ...data]);
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="p-4">
      {/* Navigation Button */}
      <div className="mb-4">
        <Link
          to="/"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-red-600"
        >
          Go to Home
        </Link>
      </div>

      <h1 className="text-xl font-bold mb-4">Posts</h1>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={index === posts.length - 1 ? lastPostRef : null}
            className="p-4 bg-gray-200 rounded shadow"
          >
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            <p className="text-white mt-4 text-lg font-bold">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
