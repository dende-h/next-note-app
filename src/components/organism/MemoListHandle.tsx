import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { categoryIsMemoSelector } from "../../globalState/category/categoryIsMemoSelector";
import { categoryIsScheduleSelector } from "../../globalState/category/categoryIsScheduleSelector";
import { categoryIsTodoSelector } from "../../globalState/category/categoryIsTodoSelector";
import { tabIndexState } from "../../globalState/category/tabIndexState";
import { memoListState } from "../../globalState/memo/memoListState";
import { FetchMemoList } from "../../types/fetchMemoList";
import { OneMemo } from "../molecule/OneMemo";

export const MemoListHandle: VFC = memo(() => {
	const categoryIsMemoList = useRecoilValue(categoryIsMemoSelector);
	const categoryIsScheduleList = useRecoilValue(categoryIsScheduleSelector);
	const categoryIsTodoList = useRecoilValue(categoryIsTodoSelector);
	const allMemoList = useRecoilValue(memoListState);
	const tabIndex = useRecoilValue(tabIndexState);

	return (
		<>
			{tabIndex === 0 &&
				allMemoList.map((item: FetchMemoList, index: number) => {
					const oneMemo = allMemoList[index];
					return <OneMemo key={item.id} oneMemo={oneMemo} />;
				})}
			{tabIndex === 1 &&
				categoryIsMemoList.map((item: FetchMemoList, index: number) => {
					const oneMemo = categoryIsMemoList[index];
					return <OneMemo key={item.id} oneMemo={oneMemo} />;
				})}
			{tabIndex === 2 &&
				categoryIsScheduleList.map((item: FetchMemoList, index: number) => {
					const oneMemo = categoryIsScheduleList[index];
					return <OneMemo key={item.id} oneMemo={oneMemo} />;
				})}
			{tabIndex === 3 &&
				categoryIsTodoList.map((item: FetchMemoList, index: number) => {
					const oneMemo = categoryIsTodoList[index];
					return <OneMemo key={item.id} oneMemo={oneMemo} />;
				})}
		</>
	);
});
