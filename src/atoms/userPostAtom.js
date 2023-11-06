import { atom } from 'recoil';

const userPostAtom = atom({
  key: `userPostAtom`,
  default: [],
});

export default userPostAtom;
