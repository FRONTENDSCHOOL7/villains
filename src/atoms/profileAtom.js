import { atom } from 'recoil';

const profileAtom = atom({
  key: `profileAtom`,
  default: {
    accountname: '',
    follower: [],
    followerCount: 0,
    following: [],
    followingCount: 0,
    image: '',
    isfollow: false,
    username: '',
    _id: '',
  },
});

export default profileAtom;
