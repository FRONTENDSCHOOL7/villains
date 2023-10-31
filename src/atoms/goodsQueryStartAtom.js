import { atom } from 'recoil';

const goodsQueryStartAtom = atom({
  key: 'goodsQueryStart',
  default: '',
});

export default goodsQueryStartAtom;