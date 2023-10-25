import PageTemplate from '../components/PageTemplate';
import ErrorPage from '../views/Error.view';
import Feed from './Feed';
import usePosts from './usePosts';

const FeedPage = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <PageTemplate>{!loading && (posts.length > 0 ? <Feed posts={posts} /> : <ErrorPage />)}</PageTemplate>
  );
};

export default FeedPage;
