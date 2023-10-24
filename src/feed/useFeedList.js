
const fetchPosts = async () => {
  const response = await axios.get('YOUR_API_ENDPOINT_HERE');
  return response.data;
};

const usePosts = () => {
  return useQuery('posts', fetchPosts);
};


export default useFeedList;