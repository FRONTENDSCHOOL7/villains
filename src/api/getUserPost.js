import client from '../config/api.config';

const getUerPostList = (accountname, token) => {
  return client.get(`/post/${accountname}/userpost`, {}, client.AuthType(token));
};

const contactQuery = (info) => ({
  queryKey: ['get', 'userPost', info.accountname],
  queryFn: async () => getUerPostList(info.accountname, info.token),
});

//사용자 정보를 미리 불러오고 싶다면, 해당 함수를 사용할 수 있습니다.
const loader = (queryClient, info) => {
  try {
    return async () => {
      const query = contactQuery(info);
      return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery({
          ...query,
          staleTime: 1000 * 60 * 2,
        }))
      );
    };
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default contactQuery;
