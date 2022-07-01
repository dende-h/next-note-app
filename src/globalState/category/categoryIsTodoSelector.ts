import { selector } from "recoil";
import { memoListState } from "../memo/memoListState";

export const categoryIsTodoSelector = selector({
	key: "categoryIsTodoState",
	get: ({ get }) => {
		const categoryIsTodo = get(memoListState).filter((item) => {
			return item.category === "TODO";
		});
		return categoryIsTodo;
	}
});
