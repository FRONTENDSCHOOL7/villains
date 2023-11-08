import { atom } from 'recoil';

const triggerAtom = atom({
  key: `trigger`,
  default: false,
});

export default triggerAtom;
