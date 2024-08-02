const express = require('express');
const axios = require('axios'); // Add axios to your project
const { fetchPosts } = require('./posts.service');
const { fetchAllUsers } = require('../users/users.service');

const router = express.Router();

// Fetching images for each post
const fetchImagesForPost = async (postId) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${postId}/photos`);
    return response.data.map(photo => ({ url: photo.url }));
  } catch (error) {
    console.error(`Failed to fetch images for post ${postId}`, error);
    return [];
  }
};

// Fetch user details for each post
const fetchUserDetailsForPost = async (userId) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user details for user ${userId}`, error);
    return null;
  }
};

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    // Fetch images and user details for each post concurrently
    const postsWithDetails = await Promise.all(
      posts.map(async (post) => {
        const images = await fetchImagesForPost(post.id);
        const userDetails = await fetchUserDetailsForPost(post.userId);
        return {
          ...post,
          images,
          user: userDetails,
        };
      })
    );

    res.json(postsWithDetails);
  } catch (error) {
    console.error('Failed to fetch posts, images, or user details', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
