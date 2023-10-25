import PageTemplate from '../components/PageTemplate';
import Feed from '../components/feed/Feed';
import usePosts from '../hooks/usePosts';
import ErrorPage from './Error.view';


const FeedPage = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <PageTemplate>{!loading && (posts.length > 0 ? <Feed posts={posts} /> : <ErrorPage />)}</PageTemplate>
  );
};

export default FeedPage;