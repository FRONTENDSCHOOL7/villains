import { useRecoilValue } from 'recoil';
import client from '../../config/api.config';
import userAtom from '../../atoms/userAtom';

/** 다른 사람 계정 팔로우 하기
 * @param accountname 팔로우 할 계정
 * @fail 해당 계정이 존재하지 않는 경우
 * @fail 자기 자신을 팔로우할 경우 {"message": "자기 자신을 팔로우 할 수 없습니다."}
 * @success follow 한 사용자의 프로필 정보
 * {
    "profile": {
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
}
 */
const postFollow = async (accountname) => {
  const token = useRecoilValue(userAtom);
  return await client.post(`/profile/${accountname}/follow`, {}, client.BothType(token.token));
};

export default postFollow;
