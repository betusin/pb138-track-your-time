import { atom } from "recoil";

export const accessTokenAtom = atom<string>({
  key: "accessToken",
  default: "",
});
