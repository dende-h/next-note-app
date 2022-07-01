import { Box, Text, Divider, Stack } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { FetchMemoList } from "../../types/fetchMemoList";
import { TodoLabel } from "./TodoLabel";

type Props = {
	id: string;
	title: string;
	todoArray: (FetchMemoList | undefined)[];
	loading: boolean;
};

export const ColumnDropArea: VFC<Props> = memo((props: Props) => {
	const { id, title, todoArray, loading } = props;

	return (
		<>
			<Stack backgroundColor={"purple.50"} p={"4"} borderRadius={"md"} shadow={"lg"} h="850px" w="450px">
				<Text as={"h1"} fontSize={"24px"} fontFamily={"cursive"}>
					{title}
				</Text>
				<Divider />
				<Droppable droppableId={id}>
					{(provided) => (
						<Box ref={provided.innerRef} {...provided.droppableProps} height="800px">
							{todoArray?.map((item, index) => (
								<TodoLabel key={item?.id} todo={item} index={index} loading={loading} />
							))}
							{provided.placeholder}
						</Box>
					)}
				</Droppable>
			</Stack>
		</>
	);
});
