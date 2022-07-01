import { atom } from "recoil";
import { FetchMemoList } from "../../types/fetchMemoList";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : sessionStorage //修正
});

const initialMemoListState: Array<FetchMemoList> = [];

export const memoListState = atom({
	key: "memoListState",
	default: initialMemoListState,
	effects_UNSTABLE: [persistAtom]
});
