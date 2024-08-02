import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { WindowWidthContext } from '../common/WindowWidthProvider';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const { isSmallerDevice } = useContext(WindowWidthContext);

  const fetchPosts = async (newStart, newLimit) => {
    const { data: fetchedPosts } = await axios.get('/api/v1/posts', {
      params: { start: newStart, limit: newLimit },
    });
    return fetchedPosts;
  };

  useEffect(() => {
    const loadInitialPosts = async () => {
      const initialLimit = isSmallerDevice ? 5 : 10;
      const initialPosts = await fetchPosts(0, initialLimit);
      setPosts(initialPosts);
      setLimit(initialLimit);
      setHasMorePosts(initialPosts.length === initialLimit);
    };

    loadInitialPosts();
  }, [isSmallerDevice]);

  const handleClick = async () => {
    setIsLoading(true);

    const newLimit = isSmallerDevice ? 5 : 10;
    const additionalPosts = await fetchPosts(posts.length, newLimit);

    setPosts((prevPosts) => [...prevPosts, ...additionalPosts]);
    setLimit(newLimit);
    setHasMorePosts(additionalPosts.length === newLimit);
    setIsLoading(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </PostListContainer>

      {hasMorePosts && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
