import { Box } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FetchMemoList } from "../../types/fetchMemoList";

type Props = {
	todo: FetchMemoList | undefined;
	index: number;
	loading: boolean;
};

export const TodoLabel: VFC<Props> = memo((props: Props) => {
	const { todo, index, loading } = props;

	return todo ? (
		<Draggable draggableId={todo.id} index={index} isDragDisabled={loading}>
			{(provided) => (
				<Box
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					backgroundColor={"pink.300"}
					fontFamily={"メイリオ"}
					minH={"60px"}
					p={4}
					m={2}
					fontSize="20px"
					color={"gray.50"}
					borderRadius="sm"
					shadow={"md"}
				>
					{todo?.title}
				</Box>
			)}
		</Draggable>
	) : (
		<></>
	);
});
