import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : sessionStorage //修正
});

export const isShowTodo = atom({
	key: "isShowTodo",
	default: false,
	effects_UNSTABLE: [persistAtom]
});
