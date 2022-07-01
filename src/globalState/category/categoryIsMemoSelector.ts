import { selector } from "recoil";
import { memoListState } from "../memo/memoListState";

export const categoryIsMemoSelector = selector({
	key: "categoryIsMemoState",
	get: ({ get }) => {
		const categoryIsMemo = get(memoListState).filter((item) => {
			return item.category === "メモ";
		});
		return categoryIsMemo;
	}
});
