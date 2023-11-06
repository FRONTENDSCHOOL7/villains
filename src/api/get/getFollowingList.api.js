import { useRecoilValue } from 'recoil';
import client from '../../config/api.config';
import userAtom from '../../atoms/userAtom';
import { useState } from 'react';

/**
 * 팔로잉 리스트를 가져옵니다.
 * @param {*} accoutnanme 계정이름 안 쓰면 내 계정
 * @fail 해당 계정이 존재하지 않을 때
 * @success [
		{
        "_id": String,
        "username": String,
        "accountname": String,
        "intro": String,
        "image": String,
				"isfollow": Boolean,
        "following": [],
        "follower": [
            "접속한 사용자의 id"
        ],
        "followerCount": 1,
        "followingCount": 0
    }
]
 */
const getFollowingList = () => {
  const user = useRecoilValue(userAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFollowing = async (accountname) => {
    setLoading(true);
    // const token = JSON.parse(localStorage.getItem('user')).token;
    try {
      const response = await client.get(`/profile/${accountname ?? user.accoutnanme}/following`, {}, client.BothType(user.token));
      return response.data;
    } catch (error) {
      setError(error);
      return;
    }
    setLoading(false);
  };
  return { fetchFollowing, loading, error };
};
/**
 * 페이지네이션이나 무한스크롤을 적용할 때 쓰는 api입니다.
 * @param {*} accountname 계정이름 안 쓰면 내 계정
 * @param {*} limit 한 번에 불러올 정보
 * @param {*} skip 불러올 정보의 시작 인덱스
 * @fail 해당 계정이 존재하지 않을 때
 * @success [
		{
        "_id": String,
        "username": String,
        "accountname": String,
        "intro": String,
        "image": String,
				"isfollow": Boolean,
        "following": [],
        "follower": [
            "접속한 사용자의 id"
        ],
        "followerCount": 1,
        "followingCount": 0
    }
]
 */
const getFollowingListLimit = async (accountname, limit, skip) => {
  const user = useRecoilValue(userAtom);
  return await client.get(
    `/profile/${accountname ?? user.accoutnanme}/following?limit=${limit}&skip=${skip}`,
    client.BothType(user.token),
  );
};

export { getFollowingListLimit };

export default getFollowingList;
