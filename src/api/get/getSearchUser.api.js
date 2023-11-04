import { useRecoilValue } from 'recoil';
import client from '../../config/api.config';
import userAtom from '../../atoms/userAtom';

/**
 * accountname, username을 통해서 유저를 검색합니다.
 * @param {*} keyword 검색어
 *
 */
const getSearchUser = async (keyword) => {
  const user = useRecoilValue(userAtom);
  return await client.get(`/user/searchuser/?keyword=${keyword}`, client.BothType(user.token));
};

/**
 * accountname, username을 통해서 유저를 검색합니다.
 * @param {*} keyword 검색어
 * input에 change 이벤트가 일어나면 실시간으로 비동기처리로 정보를 가져와야 하기 때문에 리액트쿼리를 사용합니다.
 * 검색어가 없다면 작동하지 않도록 조건을 설정했습니다.
 * @returns
[
    {
        "_id": String,
        "username": String,
        "accountname": String,
        "following": [],
        "follower": [],
        "followerCount": Number,
        "followingCount": Number
    }
]
 */
const searchUserQuery = (keyword) => ({
  queryKey: ['get', 'searchUser'],
  queryFn: async () => getSearchUser(keyword),
  enabled: !!keyword,
});

export default searchUserQuery;
