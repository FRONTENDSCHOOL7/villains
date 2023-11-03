import { useRecoilValue } from 'recoil';
import client from '../config/api.config';
import userAtom from '../atoms/userAtom';

const getUerPostList = (accountname) => {
  const user = useRecoilValue(userAtom);
  return client.get(`/post/${accountname ?? user.accountname}/userpost`, {}, client.AuthType(user.token));
};

const contactQuery = (accountname = '') => ({
  queryKey: ['get', 'userPost', accountname],
  queryFn: async () => getUerPostList(accountname),
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
