import client from '../../config/api.config';

const getPostList = async (user, limit, skip) => {
  return await client.get(`/post?limit=${limit}&skip=${skip}`, {}, client.BothType(user.token));
};
const getPostInfiniteQuery = (user, limit, skip) => ({
  queryKey: [`get`, `post`, `infinite`],
  queryFn: async () => getPostList(user, limit, skip),
  getNextPageParam: (lastPage, allPages) => {
    const nextPage = skip;
    return lastPage.items?.length !== 0 ? nextPage : undefined;
  },
});

export default getPostInfiniteQuery;
