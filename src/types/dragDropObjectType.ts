import { FetchMemoList } from "./fetchMemoList";

export type DragDropObjectType = {
	dragItem: {
		[todoId: string]: FetchMemoList;
	};
	dropZone: {
		[columnId: string]: {
			id: string;
			title: string;
			todoIds: (string | undefined)[] | never[];
		};
	};
	dropZoneOrder: string[];
};
