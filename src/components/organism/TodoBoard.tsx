//ライブラリインポート
import { Box, HStack } from "@chakra-ui/react";
import { memo } from "react";
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { completedFlag } from "../../globalState/board/completedFlag";
import { startedFlag } from "../../globalState/board/startedFlag";

//srcインポート
import { useDragDropData } from "../../hooks/useDragDropData";
import { useMemoApi } from "../../hooks/useMemoListApi";
import { useModalOpen } from "../../hooks/useModalOpen";
import { BodyType } from "../../types/bodyType";
import { ColumnDropArea } from "../molecule/ColumnDropArea";
import { ModalTodoProgress } from "../molecule/ModalTodoProgress";

type onDragEnd = (result: DropResult, provided: ResponderProvided) => void;

export const TodoBoard = memo(() => {
	const { todoList, setTodoList, columnNumbers } = useDragDropData();
	const { editMarkDiv, loading } = useMemoApi();
	const { modalOpenAndClose, onClose, isOpen } = useModalOpen();
	const [isCompleted, setIsCompleted] = useRecoilState<boolean>(completedFlag);
	const [isStarted, setIsStarted] = useRecoilState<boolean>(startedFlag);
	const beforeStartTodo = "/4009601940-pet-882446_1920-O7DQ-320x213-MM-100.jpg";
	const inProgressImage = "/inProgressImage.jpg";
	const completedImage = "/completedImage.jpg";
	const columnIds = todoList.dropZoneOrder;

	const changeMarkDiv = async (draggableId: string, markDivNumber: number) => {
		const droppedItem = todoList.dragItem[draggableId];
		const editMark: BodyType = { ...droppedItem, mark_div: markDivNumber };
		delete editMark.id;
		editMarkDiv(droppedItem.id, editMark);
	};

	const onDragEnd: onDragEnd = (result) => {
		//DragDropContextのpropsドラッグが終了したときの処理
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (destination) {
			const start = todoList.dropZone[source.droppableId];
			const finish = todoList.dropZone[destination.droppableId];

			if (destination.droppableId === source.droppableId && destination.index === source.index) {
				return;
			}

			if (start === finish) {
				const newTodoIds = Array.from(start.todoIds);
				newTodoIds.splice(source.index, 1);
				newTodoIds.splice(destination.index, 0, draggableId);

				const newColumn = {
					...start,
					todoIds: newTodoIds
				};

				const newState = {
					...todoList,
					dropZone: {
						...todoList.dropZone,
						[newColumn.id]: newColumn
					}
				};
				setTodoList(newState);
				return;
			}
			const startTodoIds = Array.from(start.todoIds);
			startTodoIds.splice(source.index, 1);
			const newStart = {
				...start,
				todoIds: startTodoIds
			};
			const finishTodoIds = Array.from(finish.todoIds);
			finishTodoIds.splice(destination.index, 0, draggableId);
			const newFinish = {
				...finish,
				todoIds: finishTodoIds
			};
			const newState = {
				...todoList,
				dropZone: {
					...todoList.dropZone,
					[newStart.id]: newStart,
					[newFinish.id]: newFinish
				}
			};
			setTodoList(newState);
			if (finish.id === "column-1") {
				changeMarkDiv(draggableId, columnNumbers.todo);
				modalOpenAndClose(1800);
			}
			if (finish.id === "column-2") {
				setIsStarted(true);
				changeMarkDiv(draggableId, columnNumbers.inProgress);
				modalOpenAndClose(1800);
			}
			if (finish.id === "column-3") {
				setIsCompleted(true);
				changeMarkDiv(draggableId, columnNumbers.completed);
				modalOpenAndClose(1800);
			}
		}
	};
	return (
		<Box w={"100%"} m={4} overflowX="scroll">
			{isCompleted ? (
				<ModalTodoProgress onClose={onClose} isOpen={isOpen} modalImage={completedImage}>
					Completed! Good job!!
				</ModalTodoProgress>
			) : isStarted ? (
				<ModalTodoProgress onClose={onClose} isOpen={isOpen} modalImage={inProgressImage}>
					Todo started! Good luck!!
				</ModalTodoProgress>
			) : (
				<ModalTodoProgress onClose={onClose} isOpen={isOpen} modalImage={beforeStartTodo}>
					Let the TODO begin!
				</ModalTodoProgress>
			)}
			<DragDropContext onDragEnd={onDragEnd}>
				<HStack spacing={6}>
					{columnIds.map((columnId) => {
						const columns = todoList.dropZone[columnId];
						const todoArray = columns.todoIds.map((todoId) => {
							if (todoId) {
								return todoList.dragItem[todoId];
							}
						});
						return (
							<ColumnDropArea
								key={columns.id}
								id={columns.id}
								title={columns.title}
								todoArray={todoArray}
								loading={loading}
							/>
						);
					})}
				</HStack>
			</DragDropContext>
		</Box>
	);
});
