import PageTemplate from '../components/PageTemplate';
import Feed from '../components/feed/Feed';
import getPosts from '../api/getPosts.api';
import ErrorPage from './Error.view';

const FeedPage = () => {
  const { posts, loading, error } = getPosts();

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <PageTemplate><Feed posts={posts} /></PageTemplate>
  );
};

export default FeedPage;
