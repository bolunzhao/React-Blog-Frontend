import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../services/postService';
import { fetchCategoryById } from '../../services/categoryService';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    loadPostAndCategory();
  }, []);

  const loadPostAndCategory = async () => {
    try {
      const data = await fetchPostById(id);
      setPost(data);
      if (data && data.categoryId) {
        loadCategory(data.categoryId);
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  const loadCategory = async (categoryId) => {
    try {
      const catData = await fetchCategoryById(categoryId); // Fetch the category details
      setCategory(catData);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Post Details</h2>
      <h3>{post.title}</h3>
      <p><strong>Description: </strong>{post.description}</p>
      <p><strong>Content: </strong>{post.content}</p>
      <p><strong>Category: </strong>{category ? category.name : 'Loading category...'}</p>
      {/* If you want to display comments or other fields, access post.comments, etc. */}
    </div>
  );
}

export default PostDetails;
