import { atom } from "recoil";
import { DragDropObjectType } from "../../types/dragDropObjectType";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : sessionStorage //修正
});

const initialData: DragDropObjectType = {
	dragItem: {},
	dropZone: {
		"column-1": { id: "column-1", title: "Todo", todoIds: [] },
		"column-2": {
			id: "column-2",
			title: "In Progress",
			todoIds: []
		},
		"column-3": { id: "column-3", title: "Completed", todoIds: [] }
	},
	dropZoneOrder: ["column-1", "column-2", "column-3"]
};

export const todoDragDropObjectState = atom({
	key: "todoDragDropObjectState",
	default: initialData,
	effects_UNSTABLE: [persistAtom]
});
