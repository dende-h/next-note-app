import { selector } from "recoil";
import { memoListState } from "../memo/memoListState";

export const categoryIsScheduleSelector = selector({
	key: "categoryIsScheduleState",
	get: ({ get }) => {
		const categoryIsSchedule = get(memoListState).filter((item) => {
			return item.category === "スケジュール";
		});
		return categoryIsSchedule;
	}
});
