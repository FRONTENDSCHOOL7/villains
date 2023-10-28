import { atom } from "recoil";

const queryAtom = atom({
    key: 'query',
    default: "",
});

export default queryAtom;