import client from '../../config/api.config';

const getPostList = async (limit, skip) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const headers = client.BothType(token);

  return await client.get(`/post?limit=${limit}&skip=${skip}`, {}, headers);
};

const getPostListQuery = (limit, pageParam) => ({
  queryKey: [`get`, `post`, `infinity`],
  queryFn: async () => getPostList(limit, pageParam),
  getNextPageParam: (lastPage, allPages) => lastPage.data.data * pageParam,
  getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
});

export default getPostListQuery;
